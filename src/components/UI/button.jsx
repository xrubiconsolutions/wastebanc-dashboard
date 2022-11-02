import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const CustomButton = styled.button`
  ${tw`disabled:cursor-not-allowed disabled:opacity-50 hover:text-secondary hover:border-2 hover:bg-white hover:border-secondary outline-none text-white bg-secondary rounded-lg text-xl py-3 w-full`}
  ${tw`text-sm rounded-md my-auto px-5 flex items-center justify-center`}
  font-weight: 400;
  height: ${(props) => (props.submit ? "60px" : "40px")};
  width: ${(props) => props.width || "initial"};
  background-color: ${(props) =>
    props.type === "filled" ? props.color || "#005700" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "#005700")};

  :hover {
    background-color: ${(props) =>
      props.type === "filled" ? "white" : "#005700"};
    color: ${(props) => (props.type === "filled" ? "#005700" : "white")};
  }
`;

const Button = ({
  type = "filled",
  text = "",
  color = "#005700",
  children,
  ...props
}) => {
  return type === "filled" ? (
    <CustomButton className="bg-secondary" type={type} color={color} {...props}>
      {children || text}
    </CustomButton>
  ) : (
    <CustomButton
      {...props}
      className="bg-transparent border border-secondary text-secondary text-md"
    >
      {children || text}
    </CustomButton>
  );
};

export default Button;
