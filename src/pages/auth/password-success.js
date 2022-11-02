import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import LockImg from "../../assets/images/password_changed.png";
import { withRouter } from "react-router-dom";

const PageContainer = styled.div`
  ${tw`flex flex-col items-center space-y-4`}
`;
const TitleText = styled.h3`
  ${tw`text-secondary text-2xl font-bold`}
`;
const RegularText = styled.p`
  ${tw`text-title-active`}
  font-size: 16px;
  font-weight: 400px;
`;

const CustomButton = styled.button`
  ${tw`bg-transparent border border-secondary text-secondary text-base rounded-xl w-5/6 h-14`}
  font-weight: 400
    font-size: 18px;
`;

const PasswordUpdateSuccess = ({ history }) => {
  const handler = (data = {}) => history.push("/auth/login");
  return (
    <PageContainer>
      <img src={LockImg} alt={"Lock"} className="bg-transparent mx-auto" />
      <TitleText>Password Updated!</TitleText>
      <div className="text-center">
        <RegularText>
          Congratulation!! you have successfully changed your password
        </RegularText>
        <RegularText>
          Click on the button below to access dashboard page
        </RegularText>
      </div>

      <CustomButton onClick={handler}>Continue</CustomButton>
    </PageContainer>
  );
};

export default withRouter(PasswordUpdateSuccess);
