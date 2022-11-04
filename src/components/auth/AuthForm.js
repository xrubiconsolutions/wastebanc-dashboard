import React, { useEffect, useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import useForm from "../../hooks/useForm";
import FormInput from "./FormInput";
import { CheckInput } from "./FormInput";
import Checkbox from "../UI/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../UI/loader";
import { MessageContainer } from "../styledElements";
import { clearError } from "../../store/reducers/appSlice";
import PakamLogo from "../../assets/images/logo.png";
import { resetPassword } from "../../store/reducers/authSlice";
import { BiArrowBack } from "react-icons/bi";
import PromptModal from "../common/PromptModal";

const FormContainer = styled.div`
  ${tw`py-4 shadow-2xl bg-white  lg:max-w-xl rounded-[20px] px-4 md:py-6 md:px-16`}

  > div {
    ${tw`mx-auto`}
  }
`;
const FormTitle = styled.p`
  ${tw`font-bold text-title-active text-2xl text-center mb-6`}
`;

const PasswordLinktext = styled(Link)`
  ${tw`text-secondary text-sm font-bold ml-2`}
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

const RecoveryCodeText = styled.p`
  ${tw`text-sm text-label text-center mt-3`}
  > span {
    color: #005700;
  }
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

const PasswordSection = () => (
  <div className="text-center my-5 h-4">
    <p className="text-body font-normal text-sm">
      Forgot Password?
      <PasswordLinktext to="/auth/forgot-password">
        Retrieve now
      </PasswordLinktext>
    </p>
  </div>
);

const AuthForm = ({
  formEntries = {},
  title = "",
  type = "",
  instructionText = "",
  submitHandler = () => null,
  email,
}) => {
  const login_mode = localStorage.getItem("login_mode") || "super_admin";
  const [signRoute, setSignRoute] = useState(login_mode);
  const { setValue, errorMsgs, formValues, isValid } = useForm(formEntries);
  const { error, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState("");
  const [showPostAction, setPostAction] = useState(false);

  const data = { email: email, role: "COMPANY" };
  const handler = async () => {
    sessionStorage.setItem("data", JSON.stringify(data));
    const res = await dispatch(resetPassword(data));
    if (res.meta.requestStatus === "fulfilled") {
      setTimeout(() => {
        setAlert(res.payload.message);
      }, 2000);
      setPostAction(true);
    } else {
      console.log("rejected!!");
    }
  };

  const handleClick = () => {
    handler();
  };

  const RecoveryCodeLink = () => (
    <RecoveryCodeText>
      Didn 't get code?{" "}
      <span onClick={handleClick} className="hover:cursor-pointer">
        Resend
      </span>
    </RecoveryCodeText>
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, pathname]);

  const mainHandleSubmit = () => {
    submitHandler(formValues, signRoute);
  };

  const submitText = {
    login: "Log In",
    forgotPassword: "Retrieve Password",
    recoveryCode: "Confirm Code",
    "new-password": "Update New Password",
    "change-password": "Save Changes",
  }[type];

  return (
    <>
      <div>
        {/* <div>
          {alert && (
            <div className=" text-center pt-3 pb-3 text-primary text-xs">
              {alert}
            </div>
          )}
        </div> */}
        {showPostAction && PromptModal}
        <div className="flex items-center justify-center pb-5 absolute left-20 top-20 ">
          <BiArrowBack size={25} color="#008300" />
          <div className="text-primary pl-2">
            <Link
              to={{
                pathname: "/auth/login",
                state: { from: pathname },
              }}
              className="text-primary hover:text-blue-400"
            >
              back to Login
            </Link>
          </div>
        </div>
        <div>
          {loading && <Loader />}
          <FormContainer>
            <LogoWrapper>
              <img src={PakamLogo} alt="pakam" />
              <p>Pakam</p>
            </LogoWrapper>

            <FormTitle> {title} </FormTitle>
            {["/auth/login", "/auth/forgot-password"].includes(pathname) ? (
              <HeaderBody className="h">
                {/* <Checkbox
              label="Pakam Admin"
              checked={signRoute === "super_admin" ? true : false}
              onClick={() => {
                localStorage.setItem("login_mode", "super_admin");
                setSignRoute("super_admin");
              }}
            /> */}

                {/* <div className="hidden"> */}
                <Checkbox
                  label="Company"
                  checked={signRoute !== "super_admin" ? true : false}
                  onClick={() => {
                    localStorage.setItem("login_mode", "user_admin");
                    setSignRoute("user_admin");
                  }}
                />
                {/* </div> */}
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
                {type === "new-password" && (
                  <FadedText> e.g Davtg1kl </FadedText>
                )}
              </InstructionText>
            )}

            <InputWrapper className="mx-auto pt-5">
              {Object.entries(formEntries).map(([title, value], idx) => (
                <>
                  {value.type !== "checkbox" ? (
                    <FormInput
                      key={idx}
                      placeholder={value.placeholder}
                      type={value.type}
                      label={value.label}
                      changeHandler={(e) => setValue(title, e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && mainHandleSubmit()
                      }
                      errorMsg={errorMsgs[title]}
                      value={formValues[title]}
                    />
                  ) : (
                    <CheckInput
                      key={idx}
                      type={value.type}
                      changeHandler={(e) => setValue(title, e.target.value)}
                      value={formValues[title]}
                      clickHandler={() => setChecked(!checked)}
                      checked={checked}
                    />
                  )}
                </>
              ))}
              {pathname === "/user/dashboard" ? (
                <SubmitButton
                  onClick={mainHandleSubmit}
                  disabled={!isValid || !checked}
                >
                  {submitText}
                </SubmitButton>
              ) : pathname === "/admin/dashboard" ? (
                <SubmitButton
                  onClick={mainHandleSubmit}
                  disabled={!isValid || !checked}
                >
                  {submitText}
                </SubmitButton>
              ) : (
                <SubmitButton onClick={mainHandleSubmit} disabled={!isValid}>
                  {submitText}
                </SubmitButton>
              )}
              {type === "recoveryCode" && <RecoveryCodeLink />}{" "}
              {type === "login" && <PasswordSection />}
            </InputWrapper>
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default memo(AuthForm);
