import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Modal from "../../../UI/modal";
import { FlexContainer, CountIndicator } from "../../../styledElements/index";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/reducers/authSlice";

const ProfileContainer = styled.div`
  ${tw`relative`}
  cursor: pointer;
`;
const UserInitial = styled(CountIndicator)``;
const ProfileItem = styled(FlexContainer)`
  ${tw`space-x-5 text-body mt-4`};
`;
const ItemText = styled.p`
  ${tw`text-sm text-body font-light`}
`;

const AdminText = styled.p`
  background: #d3d3d352;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  border-radius: 2px;
  padding: 2px;
`;

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  // const {
  //   userInfo: { companyName},
  // } = useSelector((state) => state.auth);
  const companyName = localStorage.getItem("current_companyname")
  const initials = companyName && companyName[0]

  const ProfileContent = () => (
    <>
      <UserInitial>{initials}</UserInitial>
      <div>
        {/* <p>{firstName + " " + lastName}</p> */}
        <AdminText>{companyName}</AdminText>
      </div>
    </>
  );

  return (
    <ProfileContainer>
      <FlexContainer
        onClick={() => setShowModal(true)}
        className="space-x-1 cursor-pointer"
      >
        <ProfileContent />
      </FlexContainer>
      <Modal
        type="dropdown"
        show={showModal}
        width="13rem"
        close={() => setShowModal(false)}
      >
        <div onClick={() => setShowModal(false)}>
          <FlexContainer
            style={{ transform: "scale(.8)" }}
            className="space-x-1 -ml-6"
          >
            <ProfileContent />
          </FlexContainer>
          <ProfileItem onClick={() =>history.push("/user/total_organizations_modify")}>
            <FiUser />
            <ItemText>Edit Organization</ItemText>
          </ProfileItem>
          <ProfileItem onClick={() => history.push("/user/change_password")}>
            <IoSettingsOutline />
            <ItemText>Change Password</ItemText>
          </ProfileItem>
          {/*
          <ProfileItem onClick={() => history.push("/user/settings")}>
            <IoSettingsOutline />
            <ItemText>Settings</ItemText>
          </ProfileItem> */}
          <ProfileItem onClick={() => dispatch(logout())}>
            <IoLogOutOutline />
            <ItemText>Logout</ItemText>
          </ProfileItem>
        
        </div>
      </Modal>
    </ProfileContainer>
  );
}

export default Profile;
