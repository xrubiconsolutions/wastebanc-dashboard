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
  {
    title: "Recycler No",
    value: "01-26634622",
  },
];

const Pointer = styled.div`
  ${tw`h-1 w-1 rounded-full bg-red-500 mr-2`};
  /* box-shadow: 0 0 0 3px rgb(217 144 144); */
  box-shadow: ${(props) =>
    props.color ? props.color : "0 0 0 3px rgb(217 144 144)"};
  background-color: ${(props) => (props.color ? props.color : "red")};
`;

const PickupModal = ({
  data = initData,
  showModal = false,
  setShowModal = {},
  userData,
  missed,
  cancelled,
  completed,
  accepted,
  pending,
}) => {
  // console.log("userdata", userData);
  return (
    <Modal show={showModal} close={() => setShowModal(false)} width="48rem">
      <ModalTitle>
        <TitleText className="">More Details</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowModal(false)}
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
                      <Tag key={v}>{v?.name || v}</Tag>
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
            <InfoTitle>Schedule ID:</InfoTitle>
            <InfoValue>{userData._id?.slice(0, 6)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Phone Number:</InfoTitle>
            <InfoValue>{userData.phone}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Waste Category:</InfoTitle>
            <FlexContainer>
              {userData?.categories?.map((v) => (
                <Tag>{v?.name || v}</Tag>
              ))}
            </FlexContainer>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Waste Quantity:</InfoTitle>
            <InfoValue>{userData.quantity} bags</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Pickup Location:</InfoTitle>
            <InfoValue>{userData.address}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Pickup Date:</InfoTitle>
            <InfoValue>
              {moment(userData.pickUpDate).format("YYYY-MM-DD")}
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoTitle>Status:</InfoTitle>

            {userData.completionStatus === "pending" &&
              userData.collectorStatus === "accept" && (
                <FlexContainer
                  // userAgencies
                  // color={
                  //   userData.completionStatus === "completed"
                  //     ? "rgba(0, 154, 0, 0.1)"
                  //     : userData.completionStatus === "accepted"
                  //     ? "rgba(50, 68, 168, 0.4)"
                  //     : "rgba(254, 1, 16, 0.1)"
                  // }

                  userAgencies
                  color="rgba(0, 154, 0, 1)"
                >
                  <Pointer color="#fff" />
                  {/* <InfoValue
                userAgencies
                color={
                  userData.completionStatus === "completed"
                    ? "#005700"
                    : userData.completionStatus === "accepted"
                    ? "#3a32a8"
                    : "#FE0110"
                }
              >
                {userData.completionStatus}
              </InfoValue> */}

                  <InfoValue userAgencies color="#fff">
                    Accepted
                  </InfoValue>
                </FlexContainer>
              )}

            {userData.completionStatus === "pending" &&
              userData.collectorStatus === "decline" && (
                <FlexContainer userAgencies color="rgba(254, 1, 16, 0.7)">
                  <Pointer color="#fff" />
                  <InfoValue userAgencies color="#fff">
                    Pending
                  </InfoValue>
                </FlexContainer>
              )}

            {userData.completionStatus === "completed" &&
              userData.collectorStatus === "accept" && (
                <FlexContainer userAgencies color="rgba(50, 68, 168, 1)">
                  <Pointer color="#fff" />
                  <InfoValue userAgencies color="#fff">
                    Completed
                  </InfoValue>
                </FlexContainer>
              )}

            {userData.completionStatus === "cancelled" &&
              userData.collectorStatus === "accept" && (
                <FlexContainer userAgencies color="rgba(254, 1, 16, 0.7)">
                  <Pointer color="#fff" />

                  <InfoValue userAgencies color="#fff">
                    Cancelled
                  </InfoValue>
                </FlexContainer>
              )}

            {userData.completionStatus === "cancelled" &&
              userData.collectorStatus === "decline" && (
                <FlexContainer userAgencies color="rgba(254, 1, 16, 0.7)">
                  <Pointer color="#fff" />

                  <InfoValue userAgencies color="#fff">
                    Cancelled
                  </InfoValue>
                </FlexContainer>
              )}

            {userData.completionStatus === "missed" &&
              userData.collectorStatus === "accept" && (
                <FlexContainer userAgencies color="rgba(254, 1, 16, 0.7)">
                  <Pointer color="#fff" />

                  <InfoValue userAgencies color="#fff">
                    Missed
                  </InfoValue>
                </FlexContainer>
              )}
          </InfoItem>

          {missed && !cancelled && (
            <InfoItem>
              <InfoTitle>Scheduled Date:</InfoTitle>
              <InfoValue>
                {moment(userData.createdAt).format("YYYY-MM-DD")}
              </InfoValue>
            </InfoItem>
          )}

          {!cancelled && !missed && !pending && (
            <InfoItem>
              <InfoTitle>Accepted By:</InfoTitle>
              <InfoValue>{userData.recycler}</InfoValue>
            </InfoItem>
          )}

          {missed && (
            <InfoItem>
              <InfoTitle>Missed By:</InfoTitle>
              <InfoValue>{userData.recycler}</InfoValue>
            </InfoItem>
          )}

          {!missed && !cancelled && !pending && (
            <InfoItem>
              <InfoTitle>Agent's Number:</InfoTitle>
              <InfoValue>{userData.collectedPhone}</InfoValue>
            </InfoItem>
          )}

          {userData.acceptedDate ? (
            <InfoItem>
              <InfoTitle>Accepted Date:</InfoTitle>
              <InfoValue>
                {moment(userData.acceptedDate).format("YYYY-MM-DD")}
              </InfoValue>
            </InfoItem>
          ) : (
            ""
          )}

          {/* {userData.completionDate ? (
            <InfoItem>
              <InfoTitle>Completed Date:</InfoTitle>
              <InfoValue>
                {moment(userData.completionDate).format("YYYY-MM-DD")}
              </InfoValue>
            </InfoItem>
          ) : (
            ""
          )} */}

          {!completed && !pending && !accepted && !cancelled && !missed && (
            <InfoItem>
              <InfoTitle>Completed Date:</InfoTitle>
              <InfoValue>
                {moment(userData.completionDate).format("YYYY-MM-DD")}
              </InfoValue>
            </InfoItem>
          )}

          {!missed ||
            (!cancelled && (
              <InfoItem>
                <InfoTitle>Waste Collector:</InfoTitle>
                <InfoValue>{userData.recycler}</InfoValue>
              </InfoItem>
            ))}

          {!missed && !completed && !accepted && !pending && (
            <InfoItem>
              <InfoTitle>Cancelled By:</InfoTitle>
              <InfoValue>{userData.scheduleCreator}</InfoValue>
            </InfoItem>
          )}

          {!completed && !accepted && !pending && (
            <InfoItem>
              <InfoTitle>Cancelled Reason:</InfoTitle>
              <InfoValue>{userData.cancelReason}</InfoValue>
            </InfoItem>
          )}
        </InfoUserWrapper>
      )}
    </Modal>
  );
};

export default PickupModal;
