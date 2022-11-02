import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

const StyledNavLink = styled(NavLink)`
  padding: 18px 30px;
  transition: all 0.25s ease-in-out;
  background: transparent;
  margin: 4px 12px 4px 1px;
  // border-radius: 4px;

  p {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.1px;
    ${tw`
      text-white
      items-center
    `}
  }
  &:hover {
    cursor: pointer;
    ${tw`
    // bg-label
    border-l-4
    border-white
  `}
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    tranistion: 0.2s ease-in-out;
  }

  &:hover:not(:first-child) {
    // ${tw`
    // border-l-4
    // border-white
    // `}
    ${tw`
    bg-label
  `}
    background: rgba(255, 255, 255, 0.1);
  }
  &.selected {
    ${tw`
    // bg-label
    border-l-4
    border-white
  `}// background: rgba(255, 255, 255, 0.1);;;;;;;;;;
  }
`;

const Arrow = styled.div`
  color: white;
`;

const SubMenu = ({ item }) => {
  const location = useLocation();
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  useEffect(() => {
    if (!location.pathname.includes("Total Schedule")) {
      setSubnav(false);
    }
  }, [location.pathname]);

  return (
    <>
      <StyledNavLink
        key={item.title}
        to={`/user${item.path}`}
        // activeClassName="selected"
        className="flex justify-start items-center w-100"
        onClick={(e) => {
          e.preventDefault();
          showSubnav();
        }}
      >
        <img src={item.icon} alt={item.title} />
        <p className="ml-4">{item.title}</p>
        <Arrow className="ml-auto">
          {subnav && item.iconOpened}
          {!subnav && item.iconClosed}
        </Arrow>
      </StyledNavLink>
      {subnav &&
        item.subNav.map((item) => {
          return (
            <StyledNavLink
              exact
              key={item.title}
              to={`/user${item.path}`}
              //   onClick={() => localStorage.setItem("Title", item.title)}
              activeClassName="selected"
              className="flex space-x-4 justify-start items-center"
            >
              {item.icon}
              <p>{item.title}</p>
            </StyledNavLink>
          );
        })}
    </>
  );
};

export default SubMenu;
