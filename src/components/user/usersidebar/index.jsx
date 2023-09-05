import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import DropdownNavLink from "./SubMenu";
import Data from "./data";

const SidebarParent = styled.div`
  /* width: 0; */
  display: none;
  /* position: absolute;
  // top: 72px;
  bottom: 0;
  scroll-padding-bottom: 0;

  height: 100%;
  width: 253px;
  left: 0px;
  border-radius: 0px;
  background:#7AF033;
  box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06);
  overflow-y: auto; */

  @media (min-width: 920px) {
    display: block;
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
    background: #7af033;
    box-shadow: 0px 30px 24px rgba(0, 0, 0, 0.06);
    overflow-y: auto;
  }
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
    color: #295011;
  }
  &:hover {
    ${tw`
    border-l-4
    border-green-800
  `}
    background: rgba(34, 34, 34, 0.1);
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

    border-l-4
    border-white
  `}
    background: rgba(34, 34, 34, 0.2);
  }
`;

function sidebar() {
  return (
    <>
      <SidebarParent>
        <SidebarLogo
          src="/assets/images/wastebancLogo.svg"
          alt="wastebanc-logo"
        />
        <img
          src="/assets/images/pakamTech.svg"
          alt="pakam-logo"
          className="-mt-2 mb-10 mx-8 w-[200px]"
        />
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
        {/* <p className="text-white text-center font-bold text-sm bottom-0 absolute px-4">
          Powered by Pakam Technology
        </p> */}
      </SidebarParent>
    </>
  );
}

export default sidebar;
