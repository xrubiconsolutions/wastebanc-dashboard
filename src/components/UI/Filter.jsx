import React, { useState, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import FilterModal from "./FilterModal";

const FilterButton = styled.div`
  // ${tw`flex items-end justify-end`}
  width: 100px;
  height: 40px;
  float: right;
  ${tw`mr-4`}
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

function Filter({ onFilter }) {
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <FilterButton ref={ref}>
      <StyledButton
        buttonStyle="btn--gray--outline"
        buttonSize="btn--small"
        className="flex items-center gap-6 text-base"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Filter
        <img
          src="/assets/images/sliders.svg"
          alt="filter-icon"
          className="iconStyle1"
        />
      </StyledButton>

      {modalOpen && (
        <FilterModal setModalOpen={setModalOpen} onFilter={onFilter} />
      )}
    </FilterButton>
  );
}

export default Filter;
