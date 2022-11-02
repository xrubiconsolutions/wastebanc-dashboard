import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

export const Label = styled.label`
  ${tw`text-body text-sm font-medium`};
`;

export const CheckBox = styled.input`
  ${tw`mr-3`}
  width: 24px;
  height: 24px;
  opacity: 0;
  z-index: 10;
  + .custom-checkbox {
    height: 24px;
    width: 24px;
    border: 2px solid #005700;
    border-color: ${(props) => props.color || "#005700"};
    border-radius: 5px;
    position: absolute;
  }
  &:active + .custom-checkbox {
    background-color: white;
  }
  &:hover + .custom-checkbox {
    border-color: purple;
    box-shadow: 1px -1px 2px purple, -1px 1px 2px purple;
  }
  &:checked + .custom-checkbox {
    background-color: ${(props) => props.color || "#005700"};
  }
  + .custom-checkbox:after {
    content: "";
    position: absolute;
    display: none;
  }
  &:checked + .custom-checkbox:after {
    display: block;
  }

  &:checked ~ label {
    ${tw`text-secondary`}
  }

  ~ label {
    ${tw`font-semibold text-base`}
  }

  + .custom-checkbox:after {
    left: 8px;
    bottom: 5px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Checkbox = ({ label = "", ...props }) => {
  return (
    <div className="flex items-center justify-start relative">
      <CheckBox
        type="checkbox"
        onChange={() => null}
        title={label}
        id={label}
        {...props}
      />
      <span className="custom-checkbox"></span>
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
};

export default Checkbox;
