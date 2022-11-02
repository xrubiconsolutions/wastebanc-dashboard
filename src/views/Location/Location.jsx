import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import LocationCard from "../../components/location/LocationCard";
import LocationModal from "../../components/location/locationModal";
import StyledButton from "../../components/UI/btn";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";

const LocationContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
`;
const LocationHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const Location = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { worldLocations } = useSelector((state) => state.location);

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/

  const location = {
    country: {
      label: "Country",
      type: "select",
      title: "Select country",
      optionIdx: null,
      options:
        worldLocations?.map(({ name }) => ({
          text: name,
          value: name,
        })) || [],
    },
    states: {
      label: "State/City",
      type: "multiselect",
      title: "Select state/city",
      optionIdxs: null,
      options: null,
    },
  };

  const {
    userInfo: { claims },
  } = useSelector((state) => state.auth);

  const locationPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.LOCATION.title
  );

  useEffect(() => {
    // fetch world locations if it's not yet cached in redux store
    if (!worldLocations) dispatch(getAllLocations());
  }, []);

  return (
    <>
      <LocationModal
        selectedLocation={location}
        showModal={showModal}
        setShowModal={setShowModal}
        worldLocations={worldLocations}
      />
      <LocationContainer>
        <LocationHeader>
          {locationPermissions?.create && (
            <StyledButton
              buttonStyle="btn--primary--outline"
              buttonSize="btn--medium"
              className="flex justify-between items-center"
              onClick={() => setShowModal(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add Location
            </StyledButton>
          )}
        </LocationHeader>
        <LocationCard
          showDeleteButton={locationPermissions?.delete}
          showModifyButton={locationPermissions?.edit}
        />
      </LocationContainer>
    </>
  );
};

export default Location;
