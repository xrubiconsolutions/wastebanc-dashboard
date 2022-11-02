import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Togglelabel = styled.label`
  ${tw`relative inline-block`}
  width: 44px;
  height: 24px;
`;

const ToggleSlider = styled.span`
  ${tw`absolute cursor-pointer top-0 left-0 right-0 bottom-0 duration-500 bg-label`}
  border-radius: 34px;
  &:before {
    ${tw`absolute bg-white duration-500 rounded-full`}
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 3px;
  }
`;

const ToggleInput = styled.input`
  ${tw`opacity-0 w-0 h-0`}
  &:checked + ${ToggleSlider} {
    ${tw`bg-secondary`}
  }
  &:focus + ${ToggleSlider} {
    ${tw`shadow-md`}
  }
  &:checked + ${ToggleSlider}:before {
    transform: translateX(22px);
  }
`;

const ToggleCheck = ({ label, ...props }) => {
  return (
    <Togglelabel {...props}>
      <ToggleInput type="checkbox" {...props} />
      <ToggleSlider {...props} />
      {label}
    </Togglelabel>
  );
};

export default ToggleCheck;
