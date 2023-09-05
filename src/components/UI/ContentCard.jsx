import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Progress } from "antd";
import { Link } from "react-router-dom";
const CardContainer = styled(Link)`
  ${tw`flex flex-col gap-y-2 p-4 bg-white items-center justify-center`}
  border: 1px solid #e5e7eb;
  box-shadow: 0px 40px 40px rgba(215, 228, 249, 0.2);
  border-radius: 12px;
  cursor: pointer;
  color: #222d33;
  word-break: break-all;

  &:hover {
    border: 1px solid #00966d;
    transition: 0.2s ease-in-out;
    color: #222d33;
  }
`;
const CardTitle = styled.div`
  ${tw`flex items-center justify-center gap-2`}
  >img {
  }
`;
const CardNumber = styled.p`
  ${tw``}
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  letter-spacing: 1px;
`;
const CardProgress = styled.div`
  ${tw``}
  z-index:-1
`;

const ContentCard = (props) => {
  return (
    <>
      <CardContainer to={props.link}>
        <CardTitle>
          <img src={props.ImgUrl} alt="" />
          <p>{props.title}</p>
        </CardTitle>
        <CardNumber style={props.style}>{props.amount}</CardNumber>
        {props.progress && (
          <Progress
            percent={props.progress}
            showInfo={false}
            strokeColor={
              props.title === "Pending Pickup" ||
              props.title === "Missed Pickup"
                ? "#FE0110"
                : "#006700"
            }
          />
        )}
      </CardContainer>
    </>
  );
};

export default ContentCard;
