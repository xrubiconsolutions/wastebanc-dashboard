/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateAdminReset } from "../../store/reducers/authSlice";

const RecoveryCode = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!location.state.email) history.push("/auth/forgot-password");
  }, [location]);
  const dispatch = useDispatch();

  const entries = {
    token: {
      name: "OTP",
      value: "",
      label: "OTP Code",
      placeholder: "Recovery Code",
      rules: [(v) => !!v || "OTP is required"],
    },
  };
  const handler = async (data) => {
    data.email = location.state.email;
    const res = await dispatch(validateAdminReset(data));
    if (!res.error)
      history.push({
        pathname: "/auth/create-new-password",
        state: {
          email: data.email,
          token: data.token,
        },
      });
  };
  const email = location.state.email;
  return (
    <AuthForm
      email={email}
      formEntries={entries}
      title="Recovery OTP Code"
      type="recoveryCode"
      submitHandler={handler}
      instructionText={`Please enter the 4 digit code sent to you via email ${email} into the text-field below`}
    />
  );
};

export default RecoveryCode;
