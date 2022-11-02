import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../assets/images/logo.png";

const LogoContainer = styled.div``;

const LogoWrapper = styled.div``;

const Text = styled.p`
  word-wrap: break-word;
  font-family: Circular Std;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

function Logo() {
  return (
    <Link to="/admin/dashboard">
    <LogoContainer className="flex">
      <LogoWrapper>
        <img src={logo} alt={"logo"} className="" />
      </LogoWrapper>
      <Text className="w-1/2 ml-1">Pakam Responder</Text>
    </LogoContainer>
    </Link>
  );
}

export default Logo;
