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
import {
  updateCategory,
  getCategory,
} from "../../store/actions/wasteCategoryAction";
const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const UpdateCategoryModal = ({
  showModal,
  setShowModal,
  name,
  wastepicker,
  id,
}) => {
  const [showPostModal, setPostModal] = useState(false);
  const [values, setValues] = useState({
    name: {
      label: "Waste Category",
      value: name,
      placeholder: "Type Waste Category",
      rules: [(v) => !!v || "Waste Category is required"],
    },
    wastepicker: {
      label: "Waste Picker Price",
      value: wastepicker,
      placeholder: "Type Waste Picker",
      rules: [(v) => !!v || "Waste Picker Price is required"],
    },
  });
  const {
    app: { error },
  } = useSelector((state) => state);
  const { setValue, formValues, errorMsgs } = useForm(values);
  const dispatch = useDispatch();

  const updateCategoryHandler = async () => {
    setShowModal(false);
    const categoryData = {
      name: formValues.name,
      wastepicker: formValues.wastepicker,
    };

    const payload = {
      id,
      categoryData,
    };
    const res = await dispatch(updateCategory(payload));
    if (!res.error) {
      dispatch(getCategory());
      setPostModal(true);
    }
  };

  return (
    <>
      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Waste Category updated successfully" : error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
        <FlexContainer className="justify-between mb-4">
          <TitleText>Edit Waste Category</TitleText>
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
              {/* {console.log("key", key)} */}
              <FormInput
                placeholder={input.placeholder}
                type={input.type}
                label={input.label}
                key={key}
                height="3.5rem"
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
              onClick={updateCategoryHandler}
              disabled={
                formValues.name.length === 0 ||
                formValues.wastepicker.length === 0
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

export default UpdateCategoryModal;
