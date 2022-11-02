import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import ChangePassForm from "../../components/auth/ChangePassForm";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../store/actions";
// import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { setError } from "../../store/reducers/appSlice";
import { logout } from "../../store/reducers/authSlice";
import Modal from "../../components/UI/modal";
import { type } from "@testing-library/user-event/dist/type";
import BreadCrumb from "../../components/UI/breadCrumbs";

const BreadcrumbLink = styled.div`
  ${tw`mb-2`}
`;

const ChangePassword = () => {
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
        (v) => v.length > 8 || "Password must not be less than 6 characters",
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
    }
  };
  const pages = [{ name: "Dashboard", link: "/user/dashboard" }];

  return (
    <>
      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error
          ? "Password updated successfully, log back in after the logout"
          : error}
      </Modal>

      <BreadCrumb pages={pages} current="Change Password" />
      <ChangePassForm
        formEntries={entries}
        submitHandler={handler}
        title=""
        type="change-password"
      />
    </>
  );
};

export default withRouter(ChangePassword);
