import React from "react";
import styled from "styled-components";
import Data from "./data";
import { NavLink } from "react-router-dom";
import tw from "twin.macro";
import DropdownNavLink from "./SubMenu";

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
`};
  width: 190px;
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
  `}// background: rgba(255, 255, 255, 0.1);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  }
`;
function sidebar() {
  return (
    <>
      <SidebarParent>
        <SidebarLogo src="/assets/images/wasteebanc.svg" alt="wastebac-logo" />
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
    </>
  );
}

export default sidebar;
