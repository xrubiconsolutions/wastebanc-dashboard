import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Modal from "../../UI/modal";
import { FlexContainer, CountIndicator } from "../../styledElements/index";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/reducers/authSlice";


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
  //   userInfo: { firstname, lastname,fullname},
  // } = useSelector((state) => state.auth);
  const fullname = localStorage.getItem("current_fullname")
  const firstname = localStorage.getItem("current_firstname")
  const lastname = localStorage.getItem("current_lastname")
  const initials = firstname && firstname[0] + lastname[0];
  
  const ProfileContent = () => (
    
    <>
      <UserInitial>{initials}</UserInitial>
      <div>

        {/* <p>{firstname + " " + lastname}</p> */}
        <AdminText>{fullname}</AdminText>
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
          {/* <ProfileItem
            onClick={() => history.push("/admin/settings/users/edit")}
          >
            <FiUser />
            <ItemText>Edit profile</ItemText>
          </ProfileItem> */}
          <ProfileItem onClick={() => history.push("/admin/change_password")}>
            <IoSettingsOutline />
            <ItemText>Change Password</ItemText>
          </ProfileItem>
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
