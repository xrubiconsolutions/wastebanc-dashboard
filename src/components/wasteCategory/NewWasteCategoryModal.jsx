import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../auth/FormInput";
import { FlexContainer, TitleText } from "../styledElements";
import StyledButton from "../UI/btn";
import modal from "../UI/modal";
import useForm from "../../hooks/useForm";
import { createCategory, getCategory } from "../../store/actions";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const initData = {
  name: {
    label: "Waste Category Name",
    value: "",
    placeholder: "Type Waste Category",
    rules: [(v) => !!v || "Waste Category is required"],
  },
  wastepicker: {
    label: "Waste Picker Price",
    value: "",
    placeholder: "Type Waste Picker",
    rules: [(v) => !!v || "Waste Picker Price is required"],
  },
};

const NewWasteCategoryModal = ({
  data = initData,
  showModal = false,
  setShowModal = {},
}) => {
  const {
    app: { error },
  } = useSelector((state) => state);
  const { setValue, formValues, errorMsgs } = useForm(initData);
  const [showPostModal, setPostModal] = useState(false);
  const dispatch = useDispatch();

  const createCategoryHandler = async () => {
    setShowModal(false);
    const data = {
      name: formValues.name,
      wastepicker: formValues.wastepicker,
    };
    const res = await dispatch(createCategory(data));
    if (!res.error) dispatch(getCategory());
    setPostModal(true);
  };

  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Waste Category updated successfully" : error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
        <FlexContainer className="justify-between mb-4">
          <TitleText>Create Waste Category</TitleText>
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
              onClick={createCategoryHandler}
              disabled={formValues.name.length === 0}
            >
              <FiPlusCircle size={"20"} />
              Add
            </StyledButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewWasteCategoryModal;
