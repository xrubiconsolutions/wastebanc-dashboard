import { Button, Drawer, Radio, Space } from "antd";
import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Sidebar } from "..";
import { PageTitle } from "../../../utils/data";
import DropdownNavLink from "../usersidebar/SubMenu";
import Data from "../usersidebar/data";
import Profile from "./Profile/index";

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
const NavNotification = styled.img`
  ${tw`hidden lg:block`}
`;
const SidebarDrawer = styled(Drawer)`
  /* background: linear-gradient(178.54deg, #008300 -24.78%, #005700 98.76%);
  box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06); */
`;

const NavBarRight = styled.div`
  ${tw`flex space-x-6 items-center`}
`;
const SidebarParent = styled.div`
  color: #ffff;
`;

const SidebarLogo = styled.img`
  ${tw`
  my-4 mx-8
`}
`;
const SubNavContainer = styled.div``;

const DropdownLink = styled.div`
  ${tw`
text-white
`}
`;

const StyledNavLink = styled(NavLink)`
  padding: 18px 30px;
  transition: all 0.25s ease-in-out;
  background: transparent;
  margin: 4px 10px 4px 1px;
  // border-radius: 4px;
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
    bg-label
  `}
  }
  &.selected {
    ${tw`
    // bg-label
    border-l-4
    border-white
  `}// background: rgba(255, 255, 255, 0.1);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const location = useLocation();
  const getTitle = location.pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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

          <NavBarRight className="flex justify-center items-center">
            {/* <Notification /> */}
            <NavNotification
              src="/assets/images/notification.svg"
              alt="notification"
            />
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
          {Data.map((item) => {
            if (item.subNav && item.subNav.length) {
              return <DropdownNavLink item={item} key={item.title} />;
            }
            return (
              <div key={item.title}>
                <StyledNavLink
                  exact
                  to={`/user${item.path}`}
                  activeClassName="selected"
                  className="flex space-x-4 justify-start items-center"
                >
                  <img src={item.icon} alt={item.title} />
                  <p>{item.title}</p>
                </StyledNavLink>
              </div>
            );
          })}
          <p className="text-white text-center font-bold text-sm bottom-0 absolute px-4">
            Powered by Pakam Technology
          </p>
        </SidebarParent>
      </SidebarDrawer>
    </>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import SideBarData from "./routeData";
// import { NavLink } from "react-router-dom";
// import tw from "twin.macro";
// import DropdownNavLink from "./SubMenu";
// import { useDispatch, useSelector } from "react-redux";
// import { setPage } from "../../store/reducers/appSlice";
// import { getClaims } from "../../store/actions";
// import { claimPermissions } from "../../utils/constants";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Profile from "../user/usernavbar/Profile";
// import { useLocation } from "react-router-dom";
// import { Drawer } from "antd";
// import { PageTitle } from "../../utils/data";

// // import { useLocation } from "react-router";

// // testing..
// const NavContainer = styled.div`
//   width: 100%;
//   height: 70px;
//   color: #005900;
//   position: fixed;
//   top: 0;
//   z-index: 2;
//   background: #f7f7f4;

//   @media (min-width: 920px) {
//     width: calc(100% - 253px);
//     height: 70px;
//     color: #005900;
//     position: fixed;
//     top: 0;
//     z-index: 2;
//     left: 253px;

//     background: #f7f7f4;
//     border-radius: 0px;
//   }
// `;

// const NavWrapper = styled.div`
//   height: 100%;
//   padding: 0px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const NavBarLeft = styled.p`
//   ${tw`font-bold text-lg lg:text-2xl`}
//   letter-spacing: 0.3px;
//   color: #222d33;
//   text-transform: capitalize;
// `;

// const Divder = styled.div`
//   ${tw`w-1 h-9`}
//   background:#DFE0EB;
// `;
// const NavNotification = styled.img`
//   ${tw`hidden lg:block`}
// `;
// const SidebarDrawer = styled(Drawer)`
//   /* background: linear-gradient(178.54deg, #008300 -24.78%, #005700 98.76%);
//   box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06); */
// `;

// const NavBarRight = styled.div`
//   ${tw`flex space-x-6 items-center`}
// `;
// const SidebarParent = styled.div`
//   color: #ffff;
// `;

// const SidebarLogo = styled.img`
//   ${tw`
//   my-4 mx-8
// `}
// `;
// const SubNavContainer = styled.div``;

// const DropdownLink = styled.div`
//   ${tw`
// text-white
// `}
// `;

// const StyledNavLink = styled(NavLink)`
//   padding: 18px 30px;
//   transition: all 0.25s ease-in-out;
//   background: transparent;
//   margin: 4px 10px 4px 1px;
//   // border-radius: 4px;
//   p {
//     font-style: normal;
//     font-weight: bold;
//     font-size: 14px;
//     line-height: 18px;
//     letter-spacing: 0.1px;
//     ${tw`
//       text-white
//     `}
//   }
//   &:hover {
//     ${tw`
//     // bg-label
//     border-l-4
//     border-white
//   `}
//     background: rgba(255, 255, 255, 0.1);

//     cursor: pointer;
//     tranistion: 0.2s ease-in-out;
//   }

//   &:hover:not(:first-child) {
//     ${tw`
//     bg-label
//   `}
//   }
//   &.selected {
//     ${tw`
//     // bg-label
//     border-l-4
//     border-white
//   `}// background: rgba(255, 255, 255, 0.1);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
//   }
// `;

// function Sidebar() {
//   const dispatch = useDispatch();
//   const [fetchedClaims, setFetchedClaims] = useState([]);
//   const {
//     role: { claims },
//     auth: {
//       userInfo: { claims: accountClaims },
//     },
//   } = useSelector((state) => state);

//   const myRoles = localStorage.getItem("current_user_role");

//   useEffect(() => {
//     if (myRoles) {
//       dispatch(getClaims(myRoles));
//     }
//   }, [myRoles]);

//   useEffect(() => {
//     if (claims) setFetchedClaims(claims);
//   }, [claims]);

//   useEffect(() => {
//     if (!fetchedClaims) dispatch(getClaims(myRoles));
//   }, [fetchedClaims]);

//   const filteredClaim = fetchedClaims.filter(
//     (cl) =>
//       accountClaims?.claims?.findIndex(
//         (ac) =>
//           cl.path === ac.claimId.path &&
//           ac.read &&
//           !["User Agencies", "Roles & Permission"].includes(cl.title)
//       ) > -1
//   );

//   const rolePermissions = accountClaims?.claims?.find(
//     (claim) => claim.claimId.title === claimPermissions.ROLES.title
//   );

//   const agenciesPermissions = accountClaims?.claims?.find(
//     (claim) => claim.claimId.title === claimPermissions.AGENCIES.title
//   );

//   const locationPermissions = accountClaims?.claims?.find(
//     (claim) => claim.claimId.title === claimPermissions.LOCATION.title
//   );

//   // testing..

//   const [open, setOpen] = useState(false);
//   const [placement, setPlacement] = useState("left");
//   const location = useLocation();
//   const getTitle = location.pathname.split("/");
//   let getTitleEnum = getTitle[getTitle.length - 1];
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <NavContainer>
//         <NavWrapper>
//           <GiHamburgerMenu
//             onClick={showDrawer}
//             className="lg:hidden block"
//             style={{ cursor: "pointer" }}
//             size={20}
//           />
//           <NavBarLeft>{PageTitle[getTitleEnum]}</NavBarLeft>

//           <NavBarRight className="flex justify-center items-center">
//             {/* <Notification /> */}
//             <NavNotification
//               src="/assets/images/notification.svg"
//               alt="notification"
//             />
//             <Profile />
//           </NavBarRight>
//         </NavWrapper>
//       </NavContainer>
//       <SidebarDrawer
//         // title="Basic SidebarDrawer"
//         placement="right"
//         closable={true}
//         getContainer={false}
//         visible={open}
//         onClose={onClose}
//         width="300px"
//         // open={open}
//       >
//         <SidebarParent>
//           <SidebarLogo src="/assets/images/logo.svg" alt="pakam-logo" />
//           {fetchedClaims?.map((item, sidx) => {
//             if (item.children && item.children.length) {
//               return <DropdownNavLink item={item} key={item.title} />;
//             }
//             return (
//               <div key={idx}>
//                 <StyledNavLink
//                   exact
//                   to={`/admin/${item.path}`}
//                   onClick={() => localStorage.setItem("Title", item.title)}
//                   activeClassName="selected"
//                   className="flex space-x-4 justify-start items-center"
//                 >
//                   <img src={`/${item.icon}`} alt={item.title} />
//                   <p>{item.title}</p>
//                 </StyledNavLink>
//               </div>
//             );
//           })}
//           <p className="text-white text-center font-bold text-sm bottom-0 absolute px-4">
//             Powered by Pakam Technology
//           </p>
//         </SidebarParent>
//       </SidebarDrawer>
//     </>
//   );
// }

// export default Sidebar;

{
  /* <SidebarFooter> */
}
{
  /* {locationPermissions?.read && (
  <StyledNavLink
    exact
    activeClassName="selected"
    to={`/admin/location`}
  >
    <p>Location</p>
  </StyledNavLink>
)} */
}
{
  /* {agenciesPermissions?.read && (
  <StyledNavLink
    exact
    activeClassName="selected"
    to={`/admin/user_agencies`}
  >
    <p>User Agencies</p>
  </StyledNavLink>
)} */
}
{
  /* {rolePermissions?.read && (
  <StyledNavLink
    exact
    activeClassName="selected"
    to={`/admin/roles_permission`}
  >
    <p>Roles & Permission</p>
  </StyledNavLink>
)} */
}
{
  /* <StyledNavLink
  exact
  activeClassName="selected"
  to={`/admin/waste_picker`}
>
  <p>Waste Picker</p>
</StyledNavLink> */
}

{
  /* <StyledNavLink
  exact
  activeClassName="selected"
  to={`/admin/resource`}
>
  <p>Resource</p>
</StyledNavLink> */
}
{
  /* </SidebarFooter> */
}
