import React, { useState, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import LocationModal from "./LocationModal";

const FilterButton = styled.div`
  ${tw`mt-6`}
  width: 150px;
  height: 40px;
  float: right;
  // margin-bottom: 20px;

  button {
    font-size: 14px;
    padding: 3px 25px;
    transform: translateY(5px);
    font-weight: bold;
  }
  .iconStyle1 {
    display: inline-block;
    margin-left: 10px;
  }
`;
const onClickButton = styled.div``;
function Location() {
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <FilterButton ref={ref}>
      <onClickButton
        // buttonStyle="btn--gray--outline"
        // buttonSize="btn--small"
        // className="flex items-center gap-6 text-base"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Available Location
        <img
          src="/assets/images/dropdown.svg"
          alt="filter-icon"
          className="iconStyle1"
        />
      </onClickButton>

      {modalOpen && <LocationModal setModalOpen={setModalOpen} />}
    </FilterButton>
  );
}

export default Location;

// const fetchCurrentUserLocation = async () => {
//   const res = await dispatch(getUserLocations());
//   if (!res.error) {
//     const { data } = res.payload;
//     setCurrentLocation(data.map((d) => d.name));
//   }
// };

// const fetchState = async (page = 1) => {
//   if (value === "All") {
//     const res = await dispatch(getAllAreas(page));
//     console.log("res", res);
//     setAreas(res.payload);
//   } else {
//     const res = await dispatch(getStateAreas(value));
//     const { data } = res.payload;
//     setAreas(data);
//   }
// };

// useEffect(() => {
//   fetchCurrentUserLocation();
//   fetchState();
// }, []);
