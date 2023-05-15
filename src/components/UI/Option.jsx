import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import OptionModal from "./OptionModal";

const FilterButton = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  float: right;
  margin-right: 20px;
  margin-bottom: 20px;
  color: green;

  &:hover {
    background-color: green;
    color: #fff;
  }
  button {
    padding-left: 14px;
    margin-top: 5px;
    font-size: 18px;
  }

  .iconStyle1 {
    display: inline-block;
    margin-left: 10px;
  }
`;

const OverlayBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

function Option({
  selectedOrganisation,
  user_organisation_id,
  optiondata,
  message,
}) {
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modalOpen && ref.current && !ref.current.contains(e.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [modalOpen]);

  return (
    <FilterButton ref={ref}>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Options
      </button>

      {modalOpen && (
        <OptionModal
          selectedOrganisation={selectedOrganisation || user_organisation_id}
          setModalOpen={setModalOpen}
          optiondata={optiondata}
          message={message}
        />
      )}
    </FilterButton>
  );
}

export default Option;
