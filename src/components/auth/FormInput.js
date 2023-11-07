import { animated, config, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa/";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import Checkbox from "../UI/Checkbox";
import CustomButton from "../UI/button";
import Modal from "../UI/modal";
import { ModalText, PageTitle } from "../styledElements";

const TextInput = styled.input`
  ${tw`h-14 w-full px-3 border outline-none rounded-lg text-lg text-body focus:border-secondary`}
  border-color: #bdbdbd;
  ::placeholder {
    font-size: 16px;
  }
  &:disabled {
    background-color: rgba(229, 231, 235);
  }
  height: ${(props) => (props.height ? props.height : "56px")};
`;

const Label = styled.label`
  ${tw`text-body text-sm font-medium`}
`;

const Flex = styled.input`
  ${tw`text-body text-sm font-medium`}
`;

const FormInput = ({
  label,
  placeholder,
  type = "text",
  errorMsg = "",
  extraLink = "",
  extraDetail = "",
  changeHandler = () => null,
  ...props
}) => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: errorMsg ? "translateY(100px)" : "translateY(0)",
    },
    to: {
      opacity: errorMsg ? 1 : 0,
      transform: errorMsg ? "translateY(0)" : "translateY(100px)",
    },
    config: config.wobbly,
    delay: 50,
  });

  const [textType, setType] = useState(type);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <PageTitle>Check your mail</PageTitle>
        <ModalText>
          A reset link has been sent to your registered email address
          {props.value}
        </ModalText>
        <ModalText className="mt-5">
          Didn't get a mail? <b className="text-secondary">Resend email</b>
        </ModalText>

        <div className="flex justify-end space-x-8 mt-4">
          <CustomButton text="Cancel" onClick={() => setShowModal(false)} />
          {/* <CustomButton
            text="close"
            color="red"
            onClick={deleteHandler}
          /> */}
        </div>
      </Modal>

      <div className="mb-8">
        <Label htmlFor={label}>
          {label && label[0].toUpperCase() + label.slice(1)}
        </Label>
        <div className="mt-1 relative">
          <TextInput
            type={textType}
            placeholder={placeholder}
            onChange={changeHandler}
            id={label}
            {...props}
          />

          {type === "password" &&
            (textType === "password" ? (
              <FaEyeSlash
                size="20"
                className="text-gray-400 absolute top-5 right-4"
                onClick={() => setType("text")}
              />
            ) : (
              <FaEye
                size="20"
                className="text-gray-400 absolute top-5 right-4"
                onClick={() => setType("password")}
              />
            ))}
          {extraLink && (
            <p
              onClick={() => setShowModal(true)}
              className="text-sm font-medium text-secondary"
            >
              {extraLink}
            </p>
          )}
          {extraDetail && (
            <p className="text-sm font-medium text-gray-600">{extraDetail}</p>
          )}
          <animated.p
            className="text-sm font-medium text-red-600 text-right"
            style={animationProps}
          >
            {errorMsg}
          </animated.p>
        </div>
      </div>
    </>
  );
};

export default FormInput;

export const CheckInput = ({ type, clickHandler, checked, changeHandler }) => {
  return (
    <Checkbox
      label={
        <label>
          Do you accept
          <a
            href="https://paka m.ng/terms-and-conditions"
            target="_blank"
            className="ml-2"
            rel="noreferrer"
          >
            the terms and conditions ?
          </a>
        </label>
      }
      type={type}
      onClick={clickHandler}
      checked={checked}
      className="mb-8"
      onChange={changeHandler}
    />
  );
};
