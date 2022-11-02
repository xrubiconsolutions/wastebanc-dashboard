import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/reducers/authSlice";

const NewPassword = ({ history, location }) => {
  const dispatch = useDispatch();
  const entries = {
    password: {
      name: "newPassword",
      placeholder: "Input your password",
      label: "New Password",
      type: "password",
      value: "",
      required: true,
      rules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must not be less than 8 characters",
      ],
    },
    confirmPassword: {
      name: "confirmPassword",
      placeholder: "Input your password",
      label: "Confirm New Password",
      type: "password",
      value: "",
      required: true,
      rules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must not be less than 8 characters",
      ],
    },
  };
  const handler = async (data) => {
    const res = await dispatch(
      changePassword({
        ...data,
        email: location.state.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        // resetToken: location.state.resetToken,
      })
    );
    if (!res.error) history.push("/auth/password-update-success");
  };
  return (
    <AuthForm
      formEntries={entries}
      submitHandler={handler}
      title="Create New Password"
      type="new-password"
      instructionText="Ensure your new password, minimum of 6 character long, contain at least one number"
    />
  );
};

export default withRouter(NewPassword);
