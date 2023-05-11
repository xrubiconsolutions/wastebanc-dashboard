import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Bell from "../../../assets/images/notification.svg";
import { useHistory } from "react-router";


const Wrapper = styled.section`
  width: 303px;
  height: 300px;
  top: 30px;
  right: 0px;
  box-shadow: 0px 50px 40px rgba(0, 0, 0, 0.024);
  ${tw`
    absolute
    bg-white
    shadow-lg
    rounded-lg
    flex
    flex-col
    justify-start
    items-start
  `}

  &:after {
    content: "";Profile
    position: absolute;
    bottom: 100%;
    left: 85%;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }Profile
`;

const Header = styled.div`
  padding: 24px;
  ${tw`
      flex
      justify-start
      items-center
      w-full
  `}
  p {
    font-family: Circular Std;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 26px;
    display: flex;
    align-items: center;
    letter-spacing: 0.3px;
    ${tw`
      text-body
      mr-4
  `}
  }
  .count {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    ${tw`
      flex
      justify-center
      items-center
      bg-secondary
      p-3
      text-white
    `}
  }
  img {
    width: 24px;
    height: 24px;
    ${tw`
    ml-auto
    cursor-pointer
  `}
  }
`;

const Button = styled.button`
  height: 70px;
  ${tw`
    flex
    justify-center
    items-center
    bg-secondary
    w-full
    mt-auto
    text-white
    rounded-b-lg
    py-4
`}
`;

const BubbleWraapper = styled.div`
  padding: 24px;
  ${tw`
    w-full
`}
`;

const ReportBubbleWrapper = styled.article`
  p {
    font-family: Circular Std;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    ${tw`
        text-body
    `}
  }
`;
const DetailBubbleWrapper = styled.article`
  p {
    font-family: Circular Std;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    ${tw`
      text-body
  `}
  }
`;

const ReportBubble =  ({ closeModal, ...props }) => {
  const history = useHistory();
  return (
    <ReportBubbleWrapper className="flex justify-start items-start mb-4">
      <div className="w-6 h-6 rounded-full mr-4 flex justify-center items-center">
        <img className="w-full h-full" src={Bell} alt="Bell_logo" />
      </div>
      <div className="text-wrapper">
        <p>
          Report completed: <bdo className="text-error">report {23}</bdo> by{" "}
          {"sanni"} -{" "}
          <bdo
            className="text-secondary cursor-pointer"
            onClick={() => {
              history.push("/admin/completed-incidents");
              closeModal();
            }}
          >
            view report
          </bdo>
        </p>
        <span></span>
      </div>
    </ReportBubbleWrapper>
  );
};

const DetailBubble =  ({ closeModal, ...props }) => {
  const history = useHistory();
  return (
    <DetailBubbleWrapper className="flex justify-start items-start mb-4">
      <div className="w-6 h-6 rounded-full mr-4 flex justify-center items-center">
        <img className="w-full h-full" src={Bell} alt="bell" />
      </div>
      <div className="text-wrapper">
        <p>
          New sign up : waiting for approval -{" "}
          <bdo
            className="text-secondary cursor-pointer"
            onClick={() => {
              history.push("/admin/all-respondent");
              closeModal();
            }}
          >
            view details
          </bdo>
        </p>
        <span></span>
      </div>
    </DetailBubbleWrapper>
  );
};

const Notifications = ({ closeModal, ...props }) => {
  const history = useHistory();
  return (
    <Wrapper>
      <Header className="Header">
        <p className="text-secondary">Notifications</p>
        <span className="count">{3}</span>
        <img
          src={Bell}
          alt="Bell_logo"
          onClick={() => {
            history.push("/admin/notifications/settings");
            closeModal();
          }}
        />
      </Header>

      <BubbleWraapper>
        <DetailBubble />
        <ReportBubble />
      </BubbleWraapper>

      <Button
        onClick={() => {
          history.push("/admin/notifications");
          closeModal();
        }}
      >
        Show all notification
      </Button>
    </Wrapper>
  );
};

export default Notifications;
