import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../../auth/FormInput";
import { FlexContainer, TitleText } from "../../styledElements";
import StyledButton from "../../UI/btn";
import Modal from "../../UI/modal";
import useForm from "../../../hooks/useForm";
import { updateResources, getResources } from "../../../store/actions";

const UpdateResourceModal = ({
  showModal,
  setShowModal,
  title,
  url,
  message,
  id,
  fetchAll = () => {},
}) => {
  const [showPostModal, setPostModal] = useState(false);

  // console.log("titleeeee", title);
  // console.log("message", message);

  const [values, setValues] = useState({
    resource: {
      label: "Title",
      value: title,
      placeholder: "",
      rules: [(v) => !!v || "Title is required"],
    },
    youtubeId: {
      label: "Youtube ID",
      value: url,
      placeholder: "",
      rules: [(v) => !!v || "Youtube ID is required"],
    },
    message: {
      label: "Message",
      value: message,
      placeholder: "",
      rules: [(v) => !!v || "Message is required"],
    },
  });

  // const entities = {
  //   resource: {
  //     label: "Title",
  //     value: title,
  //     placeholder: "",
  //     rules: [(v) => !!v || "Title is required"],
  //   },
  //   youtubeId: {
  //     label: "Youtube ID",
  //     value: url,
  //     placeholder: "",
  //     rules: [(v) => !!v || "Youtube ID is required"],
  //   },
  //   message: {
  //     label: "Message",
  //     value: message,
  //     placeholder: "",
  //     rules: [(v) => !!v || "Message is required"],
  //   },
  // };

  const {
    app: { error },
  } = useSelector((state) => state);
  const { setValue, formValues, errorMsgs } = useForm(values);

  const dispatch = useDispatch();

  const updateResourceHandler = async () => {
    setShowModal(false);
    const resourceData = {
      title: formValues.resource,
      youtubeId: formValues.youtubeId,
      message: formValues.message,
    };

    const payload = {
      id,
      resourceData,
    };
    const res = await dispatch(updateResources(payload));

    if (!res.error) {
      // dispatch(getResources());
      setPostModal(true);
      fetchAll();
    }
  };
  const [form, setFormValues] = useState(values);

  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Resource updated successfully" : error}
      </Modal>

      <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
        <FlexContainer className="justify-between mb-4">
          <TitleText>Update Resources</TitleText>
          <StyledButton
            buttonSize="btn--medium"
            onClick={() => setShowModal(false)}
          >
            close
          </StyledButton>
        </FlexContainer>

        <div className="flex flex-col">
          {Object.entries(values).map(([key, input], index) => (
            <>
              <FormInput
                placeholder={input.placeholder}
                type={input.type}
                label={input.label}
                key={key}
                height="3.5rem"
                s
                changeHandler={(e) => setValue(key, e.target.value)}
                errorMsg={errorMsgs[key]}
                value={formValues[key]}
                disabled={input.disabled}
              />
            </>
          ))}
          <div className="max-w-content">
            <StyledButton
              buttonSize="btn--medium"
              buttonStyle="btn--primary--outline"
              onClick={updateResourceHandler}
              disabled={
                formValues.resource.length === 0 ||
                formValues.message.length === 0 ||
                formValues.youtubeId.length === 0
              }
            >
              Update
            </StyledButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateResourceModal;
