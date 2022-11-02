import React from "react";
// import Notification from "./notification";
import Logo from "./logo";
import tw from "twin.macro";
import Profile from "./profile";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { PageTitle } from "../../utils/data";

const NavContainer = styled.div`
  width: calc(100% - 253px);
  height: 70px;
  color: #005900;
  position: fixed;
  top: 0;
  z-index: 2;
  // position: absolute;
  left: 253px;
  // right: 0%;
  // top: 0%;
  // bottom: 0%;
  // background: #ffffff;
  background: #f7f7f4;
  // box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.03);
  border-radius: 0px;
`;

const NavWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBarLeft = styled.p`
  ${tw`font-bold text-lg lg:text-2xl`}
  letter-spacing: 0.3px;
  color: #222d33;
  text-transform: capitalize;
`;
const Divder = styled.div`
  ${tw`w-1 h-9`}
  background:#DFE0EB;
`;
const NavNotification = styled.img``;

const NavBarRight = styled.div`
  ${tw`flex space-x-6 items-center`}
`;

const Navbar = () => {
  const location = useLocation();
  const getTitle = location.pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];
  return (
    <NavContainer>
      <NavWrapper>
        <NavBarLeft>{PageTitle[getTitleEnum]}</NavBarLeft>
        <NavBarRight>
          <NavNotification
            src="/assets/images/notification.svg"
            alt="notification"
          />
          <Divder />
          <Profile />
        </NavBarRight>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;
