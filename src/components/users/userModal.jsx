import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { adminPermissions } from "../../utils/constants";
import FormInput from "../auth/FormInput";
import { FlexContainer, TitleText } from "../styledElements";
import StyledButton from "../UI/btn";
import modal from "../UI/modal";
import MultiSelect from "../UI/multiSelect";
import Select from "../UI/select";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const initData = {
  name: {
    label: "Name",
    value: "",
    placeholder: "Organisation Name",
  },

  email: {
    label: "Email Address",
    value: "",
    placeholder: "Organisation Email",
    rules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
    ],
  },
  role: {
    label: "Role",
    // optionIdx: 1,
    type: "select",
    options: [
      { text: "All", value: "all" },
      ...adminPermissions.map((each) => ({ text: each, value: each })),
    ],
  },
  country: {
    label: "Area of Country",
    // optionIdx: 1,
    type: "multiselect",
    options: [
      //   { text: "All", value: "all" },
      //   ...adminPermissions.map((each) => ({ text: each, value: each })),
      { text: "Niger", value: "niger" },
      { text: "Nigeria", value: "nigeria" },
      { text: "Nepal", value: "nepal" },
      { text: "U.S", value: "us" },
      { text: "england", value: "england" },
    ],
  },
  city: {
    label: "City",
    // optionIdx: 1,
    type: "multiselect",
    options: [
      //   { text: "All", value: "all" },
      ...adminPermissions.map((each) => ({ text: each, value: each })),
    ],
  },
};

const UserModal = ({
  data = initData,
  showModal = false,
  setShowModal = {},
}) => {
  return (
    <Modal show={showModal} close={() => setShowModal(false)} width="35rem">
      <FlexContainer className="justify-between">
        <TitleText className="">Create User</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowModal(false)}
        >
          close
        </StyledButton>
      </FlexContainer>
      <div className="flex flex-col space-y-4">
        {Object.entries(data).map(([key, input]) => {
          switch (input.type) {
            case "select":
              return (
                <Select
                  key={key}
                  width="100%"
                  height="3.0rem"
                  plain={true}
                  options={input.options}
                  label={input.label}
                  title={input.label}
                  // changeHandler={(v) => setValue(key, v)}
                  optionIdx={input.optionIdx !== null && input.optionIdx}
                  disabled={input.disabled}
                  checkbox={input.checkbox}
                />
              );
            case "multiselect":
              return (
                <MultiSelect
                  key={key}
                  width="100%"
                  height="3.0rem"
                  plain={true}
                  options={input.options}
                  label={input.label}
                  title={input.title || input.label}
                  // changeHandler={(v) => setValue(key, v)}
                  optionIdxs={input.optionIdxs || null}
                  disabled={input.disabled}
                />
              );
            default:
              return (
                <FormInput
                  placeholder={input.placeholder}
                  type={input.type}
                  label={input.label}
                  key={input.label}
                  height="3.0rem"
                  // changeHandler={(e) => setValue(key, e.target.value)}
                  // errorMsg={errorMsgs[key]}
                  // value={formValues[key]}
                  disabled={input.disabled}
                />
              );
          }
        })}
        <div className="w-1/4">
          <StyledButton
            buttonSize="btn--medium"
            buttonStyle="btn--primary--outline"
            onClick={() => setShowModal(false)}
          >
            Add User
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
