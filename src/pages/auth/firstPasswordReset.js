import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { updateUserPassword } from "../../store/actions";
import { setError } from "../../store/reducers/appSlice";
import { logout } from "../../store/reducers/authSlice";
import Modal from "../../components/UI/modal";
import Disable from "../../components/UI/Disable";

const LayoutContainer = styled.div`
  ${tw`
  w-full
  h-screen
  flex
  items-center
  justify-center
`}
`;

const FirstPasswordReset = ({ history, location }) => {
  /****************************
   * states and hooks
   ****************************/
  const dispatch = useDispatch();
  const [showPostModal, setPostModal] = useState(false);
  const {
    app: { error },
  } = useSelector((state) => state);

  const entries = {
    currentPassword: {
      name: "currentPassword",
      placeholder: "Input your current password",
      label: "Current Password",
      type: "password",
      value: "",
      required: true,
      rules: [
        (v) => !!v || "Current password is required",
        (v) => v.length > 6 || "Password must not be less than 6 characters",
      ],
    },
    newPassword: {
      name: "newPassword",
      placeholder: "Input your password",
      label: "New Password",
      type: "password",
      value: "",
      required: true,
      rules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 8 || "Password must not be less than 6 characters",
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
        (v) => v.length > 8 || "Password must not be less than 6 characters",
      ],
    },
    terms: {
      name: "terms",
      type: "checkbox",
      value: "",
      required: true,
    },
  };

  /****************************
   * util functions
   ****************************/
  const handler = async (data) => {
    // display error if there is a password mismatch
    if (data.newPassword !== data.confirmPassword) {
      dispatch(setError("Password mismatch"));
      return;
    }
    // update user password then logout
    const res = await dispatch(updateUserPassword(data));
    if (!res.error) {
      setPostModal(true);
      setTimeout(() => dispatch(logout()), 2000);
    }
  };
  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error
          ? "Password updated successfully, log back in after the logout"
          : error}
      </Modal>
      <LayoutContainer>
        <AuthForm
          formEntries={entries}
          submitHandler={handler}
          title="Create New Password"
          type="new-password"
          instructionText="Ensure your new password is 8 character long, contain at least one number"
        />
      </LayoutContainer>
    </>
  );
};

export default withRouter(FirstPasswordReset);
