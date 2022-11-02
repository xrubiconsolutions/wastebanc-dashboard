import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { adminPermissions } from "../../utils/constants";
import FormInput from "../auth/FormInput";
import { FlexContainer } from "../styledElements";
import StyledButton from "../UI/btn";
import modal from "../UI/modal";
import MultiSelect from "../UI/multiSelect";
import Select from "../UI/select";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createUserAgencies, modifyUserAgency } from "../../store/actions";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const ModifyUser = ({
  rolesData,
  // userData,
  selectedAgency,
  showModal = false,
  setShowModal = {},
  onRefresh,
  isModify,
}) => {
  const [relativeStates, setRelativeStates] = useState([]);
  const [updatedStates, setUpdatedStates] = useState([]);
  // const [revisedStates, setRevisedStates] = useState([]);
  // const [isModify, setIsModify] = useState(false);
  const dispatch = useDispatch();
  const { worldLocations } = useSelector((state) => state.location);
  const initData = selectedAgency;

  // Save the recieved roles data in a variable with option of empty array if its undefined.
  const fetchedRoles = rolesData || [];
  const revisedStates =
    updatedStates?.length > 0 ? updatedStates : relativeStates;
  const fetchedStates =
    updatedStates?.length > 0 ? revisedStates : initData.states.options;

  // Populate the roles option.
  initData.role.options = fetchedRoles.map((each) => ({
    text: each.title,
    value: each._id,
  }));
  initData.states.options = fetchedStates;
  const { setValue, errorMsgs, formValues, isValid } = useForm(initData);

  useEffect(() => {
    if (initData?.states?.options?.length === 0 && formValues.countries) {
      const countryIdx = formValues
        ? formValues?.countries?.map((myCountry) =>
            worldLocations?.findIndex(
              (country) =>
                country.name?.toLowerCase() === myCountry.toLowerCase()
            )
          )
        : null;

      const states =
        countryIdx && countryIdx.length > 0
          ? countryIdx
              .map((cIdx) =>
                worldLocations[cIdx].states.map((state) => ({
                  text: state.name,
                  value: state.name,
                }))
              )
              .flat()
          : [];
      setRelativeStates(states);
    }
  }, [formValues.countries]);

  useEffect(() => {
    if (formValues.countries) {
      const countryIdx = formValues
        ? formValues?.countries?.map((myCountry) =>
            worldLocations?.findIndex(
              (country) =>
                country.name?.toLowerCase() === myCountry.toLowerCase()
            )
          )
        : null;

      const states =
        countryIdx && countryIdx.length > 0
          ? countryIdx
              .map((cIdx) =>
                worldLocations[cIdx].states.map((state) => ({
                  text: state.name,
                  value: state.name,
                }))
              )
              .flat()
          : [];
      setUpdatedStates(states);
    }
  }, [formValues.countries]);

  useEffect(() => {
    setRelativeStates([]);
  }, [showModal]);

  const submitHandler = () => {
    if (isModify) {
      const myValues = {
        id: selectedAgency.countries.locationId,
        payload: formValues,
      };

      // console.log("myValues", myValues);

      dispatch(modifyUserAgency(myValues))
        .unwrap()
        .then(() => {
          onRefresh();
        });
    }

    if (!isModify) {
      dispatch(createUserAgencies(formValues))
        .unwrap()
        .then(() => {
          onRefresh();
        });
    }
  };

  return (
    <Modal show={showModal} close={() => setShowModal(false)} width="35rem">
      <FlexContainer className="flex justify-end">
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowModal(false)}
        >
          close
        </StyledButton>
      </FlexContainer>
      <div className="flex flex-col space-y-4">
        {Object.entries(initData).map(([key, input]) => {
          switch (input.type) {
            case "select":
              return (
                <Select
                  key={key}
                  width="100%"
                  height="3.0rem"
                  plain={true}
                  options={input.options}
                  label={input.label}
                  title={input.label}
                  changeHandler={(v) => setValue(key, v)}
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
                  height="3.0rem"
                  plain={true}
                  options={
                    input.options?.length > 0 ? input.options : revisedStates
                  }
                  label={input.label}
                  title={input.title || input.label}
                  changeHandler={(v) => setValue(key, v)}
                  optionIdxs={input.optionIdxs || null}
                  disabled={input.disabled}
                />
              );
            default:
              return (
                <FormInput
                  placeholder={input.placeholder}
                  type={input.type}
                  label={input.label}
                  key={input.label}
                  height="3.0rem"
                  changeHandler={(e) => setValue(key, e.target.value)}
                  errorMsg={errorMsgs[key]}
                  value={formValues[key]}
                  disabled={input.disabled}
                />
              );
          }
        })}
        <div className="w-1/4">
          <StyledButton
            buttonSize="btn--medium"
            buttonStyle="btn--primary--outline"
            onClick={() => {
              submitHandler();
              setShowModal(false);
            }}
            disabled={!isValid}
          >
            {isModify ? "Modify" : "Create"}
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default ModifyUser;
