import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../../auth/FormInput";
import { FlexContainer, TitleText } from "../../styledElements";
import StyledButton from "../../UI/btn";
import modal from "../../UI/modal";
import useForm from "../../../hooks/useForm";
import { createResources, getResources } from "../../../store/actions";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const initData = {
  resource: {
    label: "Title",
    value: "",
    placeholder: "How to request for a waste pickup",
    rules: [(v) => !!v || "Title is required"],
  },
  youtubeId: {
    label: "Youtube ID",
    value: "",
    placeholder: "27hje889",
    rules: [(v) => !!v || "Youtube ID is required"],
  },
  message: {
    label: "Message",
    value: "",
    placeholder: "short text ...",
    rules: [(v) => !!v || "Message is required"],
  },
};

const UploadResourceModal = ({
  data = initData,
  showModal = false,
  setShowModal = {},
}) => {
  const { setValue, formValues, errorMsgs } = useForm(initData);
  const dispatch = useDispatch();
  const createResourceHandler = async () => {
    setShowModal(false);
    const data = {
      title: formValues.resource,
      youtubeId: formValues.youtubeId,
      message: formValues.message,
    };
    // console.log(data, "dataaaa");
    const res = await dispatch(createResources(data));
    if (!res.error) dispatch(getResources());
  };

  return (
    <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
      <FlexContainer className="justify-between mb-4">
        <TitleText>Create Resources</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowModal(false)}
        >
          close
        </StyledButton>
      </FlexContainer>
      <div className="flex flex-col">
        {Object.entries(data).map(([key, input]) => (
          <FormInput
            placeholder={input.placeholder}
            type={input.type}
            label={input.label}
            key={input.label}
            height="3.5rem"
            changeHandler={(e) => setValue(key, e.target.value)}
            errorMsg={errorMsgs[key]}
            value={formValues[key]}
            disabled={input.disabled}
          />
        ))}
        <div className="max-w-content">
          <StyledButton
            buttonSize="btn--medium"
            buttonStyle="btn--primary--outline"
            onClick={createResourceHandler}
            disabled={
              formValues.resource.length === 0 ||
              formValues.message.length === 0 ||
              formValues.youtubeId.length === 0
            }
          >
            <FiPlusCircle size={"20"} />
            Upload
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default UploadResourceModal;
