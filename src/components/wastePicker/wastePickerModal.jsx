import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../auth/FormInput";
import { FlexContainer, TitleText } from "../styledElements";
import StyledButton from "../UI/btn";
import modal from "../UI/modal";
import MultiSelect from "../UI/multiSelect";
import Select from "../UI/select";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createManagedArea, updateManagedArea } from "../../store/actions";
import { valAggregator } from "../../utils";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const WastePickerModal = ({
  data,
  showModal = false,
  setShowModal = {},
  selectedArea = {},
  mode = "create",
  // onRefresh,
  formState = {},
  actionHandler = () => null,
}) => {
  const {
    app: { error },
  } = useSelector((state) => state);

  const formData = mode === "create" ? data : selectedArea;
  const dispatch = useDispatch();
  let { setValue, errorMsgs, formValues, isValid, clearForm } = formState;
  const [showPostModal, setPostModal] = useState(false);

  const texts = {
    title: { create: "Setup", update: "Modify" }[mode],
    buttionText: { create: "Done", update: "Update" }[mode],
  };

  const submitHandler = async (type) => {
    const res = await actionHandler(formValues);
    // clear form and close modal only if creation is successful
    if (!res.error) {
      clearForm();
      setShowModal(false);
    }
    setPostModal(true);
    setTimeout(() => setPostModal(false), 2000);
  };

  useEffect(() => {}, [errorMsgs, isValid]);

  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Account created successfully" : error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)} width="45rem">
        <FlexContainer className="justify-between">
          <TitleText className="">{texts.title} New Waste Pickers</TitleText>
          <StyledButton
            buttonSize="btn--medium"
            onClick={() => setShowModal(false)}
          >
            close
          </StyledButton>
        </FlexContainer>
        <div className="w-full grid md:grid-cols-2 gap-x-5">
          {Object.entries(data).map(([key, input]) => {
            switch (input.type) {
              case "select":
                return (
                  <Select
                    key={key}
                    width="100%"
                    height="3.5rem"
                    plain={true}
                    options={input.options}
                    label={input.label}
                    title={input.label}
                    changeHandler={(v) => setValue(key, v)}
                    optionIdx={input.optionIdx || null}
                    disabled={input.disabled}
                    checkbox={input.checkbox}
                  />
                );
              case "multiselect":
                return (
                  <MultiSelect
                    key={key}
                    width="100%"
                    height="3.5rem"
                    plain={true}
                    options={input.options}
                    label={input.label}
                    title={input.title || input.label}
                    changeHandler={(v) => setValue(key, v)}
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
                    extraDetail={input.extraDetail}
                    key={input.label}
                    height="3.5rem"
                    changeHandler={(e) => setValue(key, e.target.value)}
                    errorMsg={errorMsgs[key]}
                    disabled={input.disabled}
                    value={formValues[key] || ""}
                    onBlur={input.onBlur || null}
                  />
                );
            }
          })}
        </div>
        <FlexContainer className="justify-end">
          <StyledButton
            buttonSize="btn--medium"
            buttonStyle="btn--primary--outline"
            onClick={submitHandler}
            disabled={!!valAggregator(errorMsgs) || !isValid}
          >
            {texts.buttionText}
          </StyledButton>
        </FlexContainer>
      </Modal>
    </>
  );
};

export default WastePickerModal;
