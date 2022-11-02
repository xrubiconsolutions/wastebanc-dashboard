import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/reducers/authSlice";

const ForgotPassword = ({ history }) => {
  const entries = {
    email: {
      name: "email",
      value: "",
      label: "Email",
      placeholder: "Input your email address",
      rules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
      ],
    },
  };
  const dispatch = useDispatch();

  const handler = async (data) => {
    sessionStorage.setItem("data", JSON.stringify(data));
    const res = await dispatch(resetPassword(data));
    if (res.meta.requestStatus === "fulfilled")
      history.push({
        pathname: "/auth/recovery-code",
        state: data,
      });
  };
  return (
    <AuthForm
      formEntries={entries}
      submitHandler={handler}
      title="Forgot Password"
      type="forgotPassword"
      instructionText="Enter the email address asscoiated with your account to retrieve your password"
    />
  );
};

export default withRouter(ForgotPassword);
