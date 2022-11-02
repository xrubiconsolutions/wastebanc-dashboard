import React, { useEffect, useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import useForm from "../../hooks/useForm";
import FormInput from "./FormInput";
import Checkbox from "../UI/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../UI/loader";
import { MessageContainer } from "../styledElements";
import { clearError } from "../../store/reducers/appSlice";

const FormContainer = styled.div`
  ${tw`py-4 shadow-2xl bg-white max-w-lg lg:max-w-full rounded-[10px] px-4 md:py-6 md:px-16`}

  > div {
    ${tw`mx-auto`}
  }
`;
const FormTitle = styled.p`
  ${tw`font-bold text-title-active text-2xl text-center mt-6`}
`;

const InstructionText = styled.p`
  ${tw`mt-6 font-medium text-sm text-body mb-2 leading-[24px] w-[402px] mx-auto`}
`;

const HeaderBody = styled.div`
  ${tw`w-[402px] mx-auto py-4 flex justify-between items-center`}
`;

const SubmitButton = styled.button`
  ${tw`disabled:cursor-not-allowed disabled:opacity-50 hover:text-secondary hover:border-2 hover:bg-white hover:border-secondary outline-none text-white bg-secondary rounded-lg text-xl py-3 w-full`}
  // height: 70px
  transition: .2s ease-in-out;
`;

const InputWrapper = styled.div`
  width: 402px;
`;

const FadedText = styled.span`
  color: #e5e5e5;
`;

const LogoWrapper = styled.div`
  ${tw`flex items-center justify-around w-[120px] mx-auto my-4`}

  p {
    ${tw`font-medium text-[20px] text-secondary`}
  }
`;

const ChangePassForm = ({
  formEntries = {},
  title = "",
  type = "",
  instructionText = "",
  submitHandler = () => null,
}) => {
  const login_mode = localStorage.getItem("login_mode") || "super_admin";
  const [signRoute, setSignRoute] = useState(login_mode);
  const { setValue, errorMsgs, formValues, isValid } = useForm(formEntries);
  const { error, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, pathname]);

  const mainHandleSubmit = () => {
    submitHandler(formValues, signRoute);
  };

  const submitText = {
    "change-password": "Save Changes",
  }[type];

  return (
    <>
      {loading && <Loader />}
      <FormContainer>
        <FormTitle> {title} </FormTitle>
        {pathname === "/auth/login" ? (
          <HeaderBody className="">
            <Checkbox
              label="Pakam Admin"
              checked={signRoute === "super_admin" ? true : false}
              onClick={() => {
                localStorage.setItem("login_mode", "super_admin");
                setSignRoute("super_admin");
              }}
            />
            <Checkbox
              label="Company"
              checked={signRoute !== "super_admin" ? true : false}
              onClick={() => {
                localStorage.setItem("login_mode", "user_admin");
                setSignRoute("user_admin");
              }}
            />
          </HeaderBody>
        ) : null}
        {error && (
          <MessageContainer>
            <p> {error} </p>
          </MessageContainer>
        )}
        {instructionText && (
          <InstructionText>
            {instructionText}
            {type === "new-password" && <FadedText> e.g Davtg1kl </FadedText>}
          </InstructionText>
        )}
        <InputWrapper className="mx-auto pt-5">
          {Object.entries(formEntries).map(([title, value], idx) => (
            <FormInput
              key={idx}
              placeholder={value.placeholder}
              type={value.type}
              label={value.label}
              changeHandler={(e) => setValue(title, e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && mainHandleSubmit()}
              errorMsg={errorMsgs[title]}
              value={formValues[title]}
            />
          ))}

          <SubmitButton onClick={mainHandleSubmit} disabled={!isValid}>
            {submitText}
          </SubmitButton>
        </InputWrapper>
      </FormContainer>
    </>
  );
};

export default memo(ChangePassForm);
