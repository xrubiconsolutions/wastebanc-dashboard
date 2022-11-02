import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../UI/btn";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LocationModal from "./locationModal";
import {
  deleteLocation,
  getAllWorldLocations,
  getAllLocations,
} from "../../store/actions";

const CardContainer = styled.div`
  ${tw`bg-white px-8 py-4`}
  display:grid;
  grid-template-columns: 1fr auto;
`;
const CardContent = styled.div`
  ${tw`flex flex-col items-start gap-6`}
`;
const CardButtons = styled.div`
  ${tw`flex items-center gap-4`}
`;
const CountryTag = styled.div`
  ${tw`flex items-center gap-4`}
`;
const CountryTitle = styled.div`
  ${tw`text-secondary font-bold`}
`;
const StateTag = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const States = styled.div`
  ${tw`flex flex-row`}
`;
const StateTitle = styled.div`
  ${tw`text-secondary font-bold`}
`;
const LocationCard = ({
  showDeleteButton = false,
  showModifyButton = false,
}) => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const { locations, worldLocations } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const handleLocationDelete = (loc) => {
    dispatch(deleteLocation(loc._id));
  };

  const saveLocation = (location) => {
    const countryIdx = location
      ? worldLocations?.findIndex(
          (country) =>
            country.name?.toLowerCase() === location.country?.toLowerCase()
        )
      : null;
    const states =
      countryIdx !== null && countryIdx > -1
        ? worldLocations[countryIdx].states.map((state) => ({
            text: state.name,
            value: state.name,
          }))
        : [];
    // setStates(states);
    const stateIdxs =
      states.length > 0
        ? location.states.map((selState) =>
            states.findIndex(
              (state) => state.text.toLowerCase() === selState?.toLowerCase()
            )
          )
        : null;
    setSelectedLocation({
      country: {
        locationId: location._id,
        label: "Country",
        type: "select",
        title: "Select country",
        optionIdx: countryIdx,
        options:
          worldLocations?.map(({ name }) => ({
            text: name,
            value: name,
          })) || [],
        disabled: true,
      },
      states: {
        label: "State/City",
        type: "multiselect",
        title: "Select state/city",
        optionIdxs: stateIdxs,
        options: states,
      },
    });
  };

  useEffect(() => {
    // fetch world locations if it's not yet cached in redux store
    if (!worldLocations) dispatch(getAllWorldLocations());
    if (!locations) dispatch(getAllLocations());
  }, []);

  const locationData = locations?.map((location) => (
    <CardContainer key={location._id}>
      <CardContent>
        <CountryTag>
          <CountryTitle>Country</CountryTitle>
          <Tag>{location.country}</Tag>
        </CountryTag>
        <StateTag>
          <StateTitle>State/City</StateTitle>
          <States>
            {location?.states?.map((stateLocation, index) => (
              <Tag key={index}>{stateLocation}</Tag>
            ))}
          </States>
        </StateTag>
      </CardContent>
      <CardButtons>
        {showModifyButton && (
          <StyledButton
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            onClick={() => {
              saveLocation(location);
              setShowModal(true);
            }}
          >
            Modify
          </StyledButton>
        )}
        {showDeleteButton && (
          <StyledButton
            buttonStyle="btn--danger--outline"
            buttonSize="btn--small"
            onClick={() => {
              handleLocationDelete(location);
            }}
          >
            Delete
          </StyledButton>
        )}
      </CardButtons>
    </CardContainer>
  ));

  return (
    <>
      <LocationModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedLocation={selectedLocation}
        mode="update"
      />
      {locationData}
    </>
  );
};

export default LocationCard;
