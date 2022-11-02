import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Label = styled.label`
  ${tw`text-body text-sm font-medium`}
`;

const TextareaElement = styled.textarea`
  ${tw`p-5 w-full text-base rounded-lg text-body border border-gray-100 outline-none resize-none`}
  height: ${(props) => props.height || "119px"};
  ${(props) => props.useColor && "border-color: #464f54;"}

  ::placeholder {
    color: #464f54;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Textarea = ({ label, color = false, ...props }) => {
  return (
    <div>
      <Label>{label}</Label>
      <TextareaElement {...props} />
    </div>
  );
};

export default Textarea;
