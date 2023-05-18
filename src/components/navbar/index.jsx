import React, { useEffect, useState } from "react";
// import Notification from "./notification";
import { Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { PageTitle } from "../../utils/data";
import SubMenu from "../sidebar/SubMenu";
import Logo from "./logo";
import Profile from "./profile";

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  color: #005900;
  position: fixed;
  top: 0;
  z-index: 2;
  background: #f7f7f4;

  @media (min-width: 920px) {
    width: calc(100% - 253px);
    height: 70px;
    color: #005900;
    position: fixed;
    top: 0;
    z-index: 2;
    left: 253px;

    background: #f7f7f4;
    border-radius: 0px;
  }
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

const SidebarDrawer = styled(Drawer)`
  /* background: linear-gradient(178.54deg, #008300 -24.78%, #295011 98.76%);
  box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06); */

  display: block;
  @media screen and (min-width: 960px) {
    display: none;
  }
`;

// const SidebarParent = styled.div`
//   position: absolute;
//   // top: 72px;
//   bottom: 0;
//   scroll-padding-bottom: 0;
//   // max-height: calc(100% - 70px);
//   // height: calc(100% - 70px);
//   height: 100%;
//   width: 253px;
//   left: 0px;
//   border-radius: 0px;
//   color: #ffff;
//   background: linear-gradient(178.54deg, #008300 -24.78%, #295011 98.76%);
//   box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06);
//   overflow-y: auto;
// `;

const SidebarParent = styled.div`
  color: #ffff;
`;

const SidebarLogo = styled.img`
  ${tw`
  my-4 mx-8
`}
`;

const StyledNavLink = styled(NavLink)`
  padding: 18px 30px;
  transition: all 0.25s ease-in-out;
  background: transparent;
  margin: 4px 10px 4px 1px;
  p {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.1px;
    ${tw`
      text-white
    `}
  }
  &:hover {
    ${tw`
    // bg-label
    border-l-4
    border-white
  `}
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    tranistion: 0.2s ease-in-out;
  }

  &:hover:not(:first-child) {
    ${tw`
    // bg-label
    `}
    background: rgba(255, 255, 255, 0.1);
  }
  &.selected {
    ${tw`
    // bg-label
    border-l-4
    border-white
  `}
  }
`;

const Navbar = () => {
  const location = useLocation();
  const getTitle = location.pathname.split("/");
  // let getTitleEnum = getTitle[getTitle.length - 1];
  let getTitleEnum;

  for (let i = getTitle.length - 1; i >= 0; i--) {
    if (getTitle[i].includes("_")) {
      getTitleEnum = getTitle[i];
      break;
    }
  }

  if (!getTitleEnum) {
    getTitleEnum = getTitle[getTitle.length - 1];
  }

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [fetchedClaims, setFetchedClaims] = useState([]);

  const {
    role: { claims },
    auth: {
      userInfo: { claims: accountClaims },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    if (claims) setFetchedClaims(claims);
  }, [claims]);

  return (
    <>
      <NavContainer>
        <NavWrapper>
          <div className="flex items-center">
            <GiHamburgerMenu
              onClick={showDrawer}
              className="block lg:hidden"
              style={{ cursor: "pointer", marginRight: "2rem" }}
              size={20}
            />
            <NavBarLeft>{PageTitle[getTitleEnum]}</NavBarLeft>
          </div>
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

      <SidebarDrawer
        // title="Basic SidebarDrawer"
        placement="right"
        closable={true}
        getContainer={false}
        visible={open}
        onClose={onClose}
        width="300px"
        // open={open}
      >
        <SidebarParent>
          <SidebarLogo src="/assets/images/logo.svg" alt="pakam-logo" />
          {fetchedClaims?.map((item, idx) => {
            if (item.children && item.children.length) {
              return <SubMenu item={item} key={item.title} />;
            }
            return (
              <div key={idx}>
                <StyledNavLink
                  exact
                  to={`/admin/${item.path}`}
                  onClick={() => localStorage.setItem("Title", item.title)}
                  activeClassName="selected"
                  className="flex space-x-4 justify-start items-center"
                >
                  <img src={`/${item.icon}`} alt={item.title} />
                  <p>{item.title}</p>
                </StyledNavLink>
              </div>
            );
          })}
          <hr />
          <p className="text-white text-center font-bold text-sm py-4">
            Powered by Pakam Technologyxxx
          </p>
        </SidebarParent>
      </SidebarDrawer>
    </>
  );
};

export default Navbar;
