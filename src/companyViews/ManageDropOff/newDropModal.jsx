import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../../components/auth/FormInput";
import { FlexContainer, TitleText } from "../../components/styledElements";
import StyledButton from "../../components/UI/btn";
import modal from "../../components/UI/modal";
import MultiSelect from "../../components/UI/multiSelect";
import Select from "../../components/UI/select";
import useForm from "../../hooks/useForm";
import { createDropOffLocation } from "../../store/actions";
// import fetchAll from "../../companyViews/ManageDropOff/ManageDropOff";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const TextInput = styled.input`
  ${tw`h-14 w-full px-3 border outline-none rounded-lg text-lg text-body focus:border-secondary`}
  border-color: #bdbdbd;
  ::placeholder {
    font-size: 16px;
  }
  &:disabled {
    background-color: rgba(229, 231, 235);
  }
  height: ${(props) => (props.height ? props.height : "56px")};
`;

const Label = styled.label`
  ${tw`text-body text-sm font-medium`}
`;

const initData = {
  // organisation: {
  //   label: "Organization Name",
  //   value: "",
  //   placeholder: "Organisation",
  // },
  phone: {
    label: "Contact Line",
    value: "",
    placeholder: "contact",
    rules: [
      (v) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
        "contact line is invalid",
    ],
  },
  location: {
    label: "Drop-off Location",
    value: "",
    placeholder: "address",
    type: "autocomplete",
  },
};

let autoComplete;

const handleScriptLoad = async (searchKey, autoCompleteRef) => {
  // assign autoComplete with Google maps place one time
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      componentRestrictions: { country: "ng" },
    }
  );
  autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener("place_changed", () => handlePlaceSelect(searchKey));
};

const handlePlaceSelect = (updateQuery) => {
  const addressObject = autoComplete.getPlace(); // get place from google api
  // console.log("The instaces: ", autoComplete, addressObject);
  const query = addressObject?.formatted_address;
  updateQuery(query);
};

const NewDropModal = ({
  data = initData,
  showModal = false,
  setShowModal = {},
  mode = "create",
  fetchAll = () => null,
}) => {
  const texts = {
    title: { create: "Add Drop-Off", update: "Modify" }[mode],
    buttionText: { create: "Save Drop-Off ", update: "Update" }[mode],
  };
  const [query, setQuery] = useState("");
  const [showPostModal, setPostModal] = useState(false);
  const autoCompleteRef = useRef(null);
  const { setValue, formValues, errorMsgs, clearForm } = useForm(initData);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.app);

  let autoComplete;

  const handleScriptLoad = async (searchKey, autoCompleteRef) => {
    // assign autoComplete with Google maps place one time
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "ng" },
      }
    );
    autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
    // add a listener to handle when the place is selected
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(searchKey)
    );
  };

  const handlePlaceSelect = (updateQuery) => {
    const addressObject = autoComplete.getPlace(); // get place from google api
    // console.log("The instaces: ", autoComplete, addressObject);
    const query = addressObject?.formatted_address;
    updateQuery(query);
  };

  const handleSubmit = async () => {
    // const place = autoComplete.getPlace();

    // geocode address
    const geocoder = new window.google.maps.Geocoder();
    const result = await geocoder.geocode({ address: query });
    const results = result.results;

    // get lat and long
    const lat = results[0].geometry.location.lat();
    const long = results[0].geometry.location.lng();

    // construct server request payload
    const { _id: organisationId, companyName: organisation } = JSON.parse(
      localStorage.getItem("current_company")
    );
    const data = {
      organisation,
      organisationId,
      phone: formValues.phone,
      location: {
        lat,
        long,
        address: query,
      },
    };
    const res = await dispatch(createDropOffLocation(data));
    if (!res.error) {
      clearForm();
      fetchAll();
      setPostModal(true);
    }
  };

  // console.log("form Values", formValues);
  // console.log("Clear form", clearForm);
  //This is needed for proper funcioning of the
  // autocomplete feature
  if (!window.google) {
    setTimeout(() => {
      handleScriptLoad(setQuery, autoCompleteRef);
    }, 2000);
  }
  handleScriptLoad(setQuery, autoCompleteRef);

  return (
    <>
      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Drop-off Location created successfully" : error}
      </Modal>

      <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
        <FlexContainer className="justify-between">
          <TitleText className="">{texts.title}</TitleText>
          <StyledButton
            buttonSize="btn--medium"
            onClick={() => setShowModal(false)}
          >
            close
          </StyledButton>
        </FlexContainer>
        <div className="flex flex-col">
          {Object.entries(data).map(([key, input]) => {
            switch (input.type) {
              case "select":
                return (
                  <Select
                    key={key}
                    width="100%"
                    height="3.5rem"
                    plain={true}
                    options={input.options}
                    label={input.label}
                    title={input.title}
                    // changeHandler={(v) => setValue(key, v)}
                    optionIdx={input.optionIdx !== null && input.optionIdx}
                    disabled={input.disabled}
                    checkbox={input.checkbox}
                  />
                );
              case "multiselect":
                return (
                  <MultiSelect
                    key={key}
                    width="100%"
                    height="3.5rem"
                    plain={true}
                    options={input.options}
                    label={input.label}
                    title={input.title || input.label}
                    // changeHandler={(v) => setValue(key, v)}
                    optionIdxs={input.optionIdxs || null}
                    disabled={input.disabled}
                  />
                );
              case "autocomplete":
                return (
                  <div>
                    <Label htmlFor={input.label}>{input.label}</Label>
                    <TextInput
                      ref={autoCompleteRef}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setValue(key, event.target.value);
                      }}
                      value={query}
                      placeholder={input.placeholder}
                    />
                  </div>
                );

              default:
                return (
                  <FormInput
                    placeholder={input.placeholder}
                    type={input.type}
                    label={input.label}
                    key={input.label}
                    height="3.5rem"
                    changeHandler={(e) => setValue(key, e.target.value)}
                    errorMsg={errorMsgs[key]}
                    value={formValues[key]}
                    disabled={input.disabled}
                  />
                );
            }
          })}
          <div className="max-w-content mt-10">
            <StyledButton
              buttonSize="btn--medium"
              buttonStyle="btn--primary--outline"
              onClick={() => {
                handleSubmit();
                setShowModal(false);
              }}
            >
              {texts.buttionText}
            </StyledButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewDropModal;
