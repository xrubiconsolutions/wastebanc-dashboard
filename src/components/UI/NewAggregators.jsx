import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import Modal from "./modal";
import { FlexContainer, ModalTitle, TitleText } from "../styledElements";
import { Tag } from "antd";

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
    title: "Aggregator's ID",
    value: "17288",
  },
  {
    title: "Name",
    value: "John Doe",
  },
  {
    title: "Phone Number",
    value: "01-26634622",
  },
  // {
  //   title: "Gender",
  //   value: "Male",
  // },
  {
    title: "Waste Category",
    value: ["Can", "Pet bottles", "Carton"],
  },
  {
    title: "Preferred Organization",
    value: "Plastic Solutions Ng",
  },
  {
    title: "LGA/LCDA",
    value: "Alimosho",
  },
  {
    title: "Date",
    value: "Jan 15, 2022",
  },
  {
    title: "Status",
    value: "Pending",
  },
  {
    title: "Accepted Pickup:",
    value: "12",
  },
  {
    title: "Missed Pickup",
    value: "2",
  },
  {
    title: "No. of Trips Completed",
    value: "0",
  },
];

const Pointer = styled.div`
  ${tw`h-1 w-1 rounded-full bg-red-500 mr-2`};
  /* box-shadow: 0 0 0 3px rgb(217 144 144); */
  box-shadow: ${(props) =>
    props.color ? props.color : "0 0 0 3px rgb(217 144 144)"};
  background-color: ${(props) => (props.color ? props.color : "red")};
`;

const NewUserModal = ({
  data = initData,
  showAggModal = false,
  setAggModal = {},
  userData,
}) => {
  return (
    <Modal show={showAggModal} close={() => setAggModal(false)} width="48rem">
      <ModalTitle>
        <TitleText className="">More Details</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setAggModal(false)}
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
              color = "#295011";

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
            <InfoTitle>Name:</InfoTitle>
            <InfoValue>{userData.fullname}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Phone Number:</InfoTitle>
            <InfoValue>{userData.phone}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Email Address:</InfoTitle>
            <InfoValue>{userData.email}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>No of Trips Completed:</InfoTitle>
            <InfoValue>{userData.numberOfTripsCompleted}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Date Created:</InfoTitle>
            <InfoValue>{userData.createdAt}</InfoValue>
          </InfoItem>
        </InfoUserWrapper>
      )}
    </Modal>
  );
};

export default NewUserModal;
