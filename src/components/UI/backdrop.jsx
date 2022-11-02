import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BackdropContainer = styled.div`
  ${tw`fixed left-0 top-0 w-full h-screen bg-gray-800 opacity-70 z-10`}
  background-color: ${(props) => props.transparent && "transparent"}
`;

const Backdrop = ({ show, close = () => null }) =>
  show ? <BackdropContainer onClick={close} /> : null;

export default Backdrop;
