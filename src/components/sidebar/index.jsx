/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBarData from "./routeData";
import { NavLink } from "react-router-dom";
import tw from "twin.macro";
import DropdownNavLink from "./SubMenu";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/reducers/appSlice";
import { getClaims } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";
// import { useLocation } from "react-router";

const SidebarParent = styled.div`
  position: absolute;
  // top: 72px;
  bottom: 0;
  scroll-padding-bottom: 0;
  // max-height: calc(100% - 70px);
  // height: calc(100% - 70px);
  height: 100%;
  width: 253px;
  left: 0px;
  border-radius: 0px;
  color: #ffff;
  background: linear-gradient(178.54deg, #008300 -24.78%, #005700 98.76%);
  box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
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
const SidebarFooter = styled.div`
  ${tw`flex flex-col `}
`;

function Sidebar() {
  const dispatch = useDispatch();
  const [fetchedClaims, setFetchedClaims] = useState([]);
  const {
    role: { claims },
    auth: {
      userInfo: { claims: accountClaims },
    },
  } = useSelector((state) => state);

  const myRoles = localStorage.getItem("current_user_role");

  useEffect(() => {
    if (myRoles) {
      dispatch(getClaims(myRoles));
    }
  }, [myRoles]);

  useEffect(() => {
    if (claims) setFetchedClaims(claims);
    // console.log("The claims: ", claims);
  }, [claims]);

  useEffect(() => {
    if (!fetchedClaims) dispatch(getClaims(myRoles));
  }, [fetchedClaims]);

  const filteredClaim = fetchedClaims.filter(
    (cl) =>
      accountClaims?.claims?.findIndex(
        (ac) =>
          cl.path === ac.claimId.path &&
          ac.read &&
          !["User Agencies", "Roles & Permission"].includes(cl.title)
      ) > -1
  );

  const rolePermissions = accountClaims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.ROLES.title
  );

  const agenciesPermissions = accountClaims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.AGENCIES.title
  );

  const locationPermissions = accountClaims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.LOCATION.title
  );

  return (
    <>
      <SidebarParent>
        <SidebarLogo src="/assets/images/logo.svg" alt="pakam-logo" />
        {fetchedClaims?.map((item, idx) => {
          if (item.children && item.children.length) {
            return <DropdownNavLink item={item} key={item.title} />;
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
          Powered by Pakam Technologies
        </p>
        <SidebarFooter>
          {/* {locationPermissions?.read && (
            <StyledNavLink
              exact
              activeClassName="selected"
              to={`/admin/location`}
            >
              <p>Location</p>
            </StyledNavLink>
          )} */}
          {/* {agenciesPermissions?.read && (
            <StyledNavLink
              exact
              activeClassName="selected"
              to={`/admin/user_agencies`}
            >
              <p>User Agencies</p>
            </StyledNavLink>
          )} */}
          {/* {rolePermissions?.read && (
            <StyledNavLink
              exact
              activeClassName="selected"
              to={`/admin/roles_permission`}
            >
              <p>Roles & Permission</p>
            </StyledNavLink>
          )} */}
          {/* <StyledNavLink
            exact
            activeClassName="selected"
            to={`/admin/waste_picker`}
          >
            <p>Waste Picker</p>
          </StyledNavLink> */}

          {/* <StyledNavLink
            exact
            activeClassName="selected"
            to={`/admin/resource`}
          >
            <p>Resource</p>
          </StyledNavLink> */}
        </SidebarFooter>
      </SidebarParent>
    </>
  );
}

export default Sidebar;
