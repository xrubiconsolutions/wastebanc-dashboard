import React from "react";
import styled from "styled-components";
import LocationButton from "./LocationButton";
import Filterlogo from "../navbar/logo/sliders-h-Light.png";
import tw from "twin.macro";

const ModalBackground = styled.div`
  width: 255px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: fixed;
  border-radius: 10px;
  right: 155px;
  margin-top: 8px;
  padding-bottom: 10px;
  z-index: 999;

  modalContainer {
    position: relative;
  }
`;
const ModalHeaderTitle = styled.h3`
  ${tw`text-base mb-0`}
`;
const ModalHeaderImg = styled.img``;
const OverlayBackground = styled.div`
position: fixed;
left: 0px;
top: 0px;
width: 100%;
height: 100vh;
--tw-bg-opacity: 1;
background-color: rgba(31,41,55,var(--tw-bg-opacity));
opacity: 0.7;
z-index: 10;
}


`;
const ModalHeader = styled.div`
  ${tw`flex justify-between items-center px-4 py-3`}
`;

function LocationModal({ setModalOpen }) {
  return (
    <div className="modalContainer">
      <ModalBackground>
        <ModalHeader>
          <ModalHeaderTitle>Switch Location</ModalHeaderTitle>
        </ModalHeader>
        <hr />
        <LocationButton />
      </ModalBackground>
      <OverlayBackground
        onClick={() => {
          setModalOpen(false);
        }}
      ></OverlayBackground>
    </div>
  );
}

export default LocationModal;
