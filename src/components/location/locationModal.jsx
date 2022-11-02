import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import useForm from "../../hooks/useForm";
import { FlexContainer, TitleText } from "../styledElements";
import { useDispatch } from "react-redux";
import {
  createLocation,
  modifyLocation,
  getAllWorldLocations,
} from "../../store/actions";
import StyledButton from "../UI/btn";
import modal from "../UI/modal";
import MultiSelect from "../UI/multiSelect";
import Select from "../UI/select";
import { useSelector } from "react-redux";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

// const [allLocate, setAllLocate] = useState([]);

// useEffect(() => {
//   setAllLocate(worldLocations);
// }, [worldLocations]);

// const fetchedLocations = allLocate?.map((worldLocate) => (
//   {
//     country: {
//       options: [
//         { text: worldLocate.name, value: worldLocate.name}
//       ],
//     },
//     states: {
//       options: worldLocate?.states?.map((state) => (
//         { text: state.name, value: state.name }
//       ))
//     },
//   }
// ));

// console.log("fetchedLocations", fetchedLocations);

// const dataInfo =  worldLocations && worldLocations > 0 ? fetchedLocations : data;

const LocationModal = ({
  selectedLocation,
  showModal = false,
  setShowModal = () => null,
  mode = "create",
}) => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const dispatch = useDispatch();
  const { worldLocations } = useSelector((state) => state.location);
  const [currentStates, setStates] = useState();
  const initData = selectedLocation;

  const texts = {
    title: { create: "Setup", update: "Modify" }[mode],
    buttionText: { create: "Create Location", update: "Update" }[mode],
  };

  const { setValue, formValues } = useForm(initData);

  // console.log("selectedLocation", selectedLocation);

  /****************************
   *
   * handlers and utils functions
   *
   ****************************/

  // function formatSelectOptions

  const submitHandler = (type) => {
    switch (type) {
      case "Create Location":
        dispatch(createLocation(formValues));
        break;
      case "Update":
        const myValues = {
          id: initData.country.locationId,
          formValues,
        };

        dispatch(modifyLocation(myValues));
        break;
      default:
    }
  };

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/
  useEffect(() => {
    // fetch world locations if it's not yet cached in redux store
    if (!worldLocations) dispatch(getAllWorldLocations());
  }, []);

  useEffect(() => {
    // This hook ensures that the corresponding states of the selected
    // country if filled into the states multiselect component
    if (!selectedLocation?.states?.optionIdxs) {
      const country = worldLocations?.find(
        (country) => country.name === formValues.country
      );
      const states = country
        ? country.states.map((state) => ({
            text: state.name,
            value: state.name,
          }))
        : [];
      setStates(states);
    }
  }, [formValues]);

  return (
    <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
      <FlexContainer className="justify-between">
        <TitleText className="">{texts.title} Location</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowModal(false)}
        >
          close
        </StyledButton>
      </FlexContainer>
      <div className="flex flex-col">
        {Object.entries(initData).map(([key, input]) => {
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
                  height="3.5rem"
                  plain={true}
                  options={input.options || currentStates}
                  label={input.label}
                  title={input.title || input.label}
                  changeHandler={(v) => setValue(key, v)}
                  optionIdxs={input.optionIdxs || null}
                  disabled={input.disabled}
                />
              );
            default:
              return <></>;
          }
        })}
        <div className="max-w-content">
          <StyledButton
            buttonSize="btn--medium"
            buttonStyle="btn--primary--outline"
            onClick={() => {
              submitHandler(texts.buttionText);
              setShowModal(false);
            }}
            disabled={formValues.states?.length === 0}
          >
            {texts.buttionText}
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default LocationModal;
