import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import Modal from "./modal";
import { FlexContainer, ModalTitle, TitleText } from "../styledElements";
import { Tag } from "antd";
import moment from "moment";

const InfoWrapper = styled.div`
  ${tw`flex flex-wrap gap-10 gap-x-12 w-11/12`}
`;

const InfoUserWrapper = styled.div`
  ${tw`flex flex-wrap gap-10 gap-x-16 w-11/12`}
`;

const InfoItem = styled.div`
  ${tw`flex flex-col space-y-2`}
`;

const InfoTitle = styled.p`
  ${tw`font-semibold text-sm leading-[22px] text-secondary`}
`;
const InfoValue = styled.p`
  ${tw`font-bold text-base leading-[28px]`};
  color: ${(props) => (props.color ? props.color : "#464F54")};
  font-size: ${(props) => (props.userAgencies ? "smaller" : "")};
`;

const initData = [
  {
    title: "User ID",
    value: "17288",
  },
  {
    title: "Customer Name",
    value: "John Doe",
  },
  {
    title: "Amount",
    value: "5000",
  },
  {
    title: "Schedule ID",
    value: "17088",
  },
  {
    title: "Organization Name",
    value: "Plastic Solutions Ng",
  },
];

const Pointer = styled.div`
  ${tw`h-1 w-1 rounded-full bg-red-500 mr-2`};
  /* box-shadow: 0 0 0 3px rgb(217 144 144); */
  box-shadow: ${(props) =>
    props.color ? props.color : "0 0 0 3px rgb(217 144 144)"};
  background-color: ${(props) => (props.color ? props.color : "red")};
`;

const TotalPayoutModal = ({
  data = initData,
  showPayout = false,
  setShowPayout = {},
  userData,
}) => {
  return (
    <Modal show={showPayout} close={() => setShowPayout(false)} width="48rem">
      <ModalTitle>
        <TitleText className="">More Details</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowPayout(false)}
        >
          Close
        </StyledButton>
      </ModalTitle>
      {!userData ? (
        <InfoWrapper>
          {data.map(({ title, value }) => {
            let color = "";
            if (["status", "missed pickup"].includes(title.toLowerCase()))
              color = "red";
            else if (
              title.toLowerCase() === "status" &&
              value.toLowerCase() !== "pending"
            )
              color = "#005700";

            return (
              <InfoItem key={title}>
                <InfoTitle>{title}:</InfoTitle>
                {typeof value !== "object" ? (
                  title.toLowerCase() !== "status" ? (
                    <InfoValue color={color}>{value}</InfoValue>
                  ) : (
                    <FlexContainer>
                      <Pointer />
                      <InfoValue color={color}>{value}</InfoValue>:
                    </FlexContainer>
                  )
                ) : (
                  <FlexContainer>
                    {value.map((v) => (
                      <Tag>{v}</Tag>
                    ))}
                  </FlexContainer>
                )}
              </InfoItem>
            );
          })}
        </InfoWrapper>
      ) : (
        <InfoUserWrapper>
          <InfoItem>
            <InfoTitle>User ID:</InfoTitle>
            <InfoValue>{userData.userId}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Customer Name:</InfoTitle>
            <InfoValue>{userData.fullname}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Amount (#):</InfoTitle>
            <InfoValue>{userData.amount}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Schedule ID:</InfoTitle>
            <InfoValue>{userData.scheduleId}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Recycler's Name:</InfoTitle>
            <InfoValue>{userData.aggregatorName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Recycler's ID:</InfoTitle>
            <InfoValue>{userData.aggregatorId}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Organization Name:</InfoTitle>
            <InfoValue>{userData.aggregatorOrganisation}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Waste Quantity:</InfoTitle>
            <InfoValue>{userData.quantityOfWaste}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Requested Date:</InfoTitle>
            <InfoValue>
              {moment(userData.createdAt).format("YYYY-MM-DD")}
            </InfoValue>
          </InfoItem>
        </InfoUserWrapper>
      )}
    </Modal>
  );
};

export default TotalPayoutModal;
