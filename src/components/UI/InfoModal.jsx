import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import Modal from "./modal";
import { FlexContainer, ModalTitle, TitleText } from "../styledElements";
import { Tag } from "antd";
import moment from "moment";
import { type } from "@testing-library/user-event/dist/type";

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

const InfoModal = ({
  data = initData,
  // data,
  showModal = false,
  setShowModal = {},
  userData,
  agencies,
  user,
  picker,
}) => {
  // const test = moment(userData.createAt).format("DD MM YYYY");

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
          {data?.map(({ title, value }, index) => {
            let color = "";
            if (["status", "missed pickup"].includes(title.toLowerCase()))
              color = "red";
            else if (
              title.toLowerCase() === "status" &&
              value.toLowerCase() !== "pending"
            )
              color = "#005700";

            return (
              <InfoItem key={index}>
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
          {!agencies && !picker && (
            <InfoItem>
              <InfoTitle>User ID:</InfoTitle>
              <InfoValue>{userData.cardID}</InfoValue>
            </InfoItem>
          )}

          {picker && (
            <InfoItem>
              <InfoTitle>User ID:</InfoTitle>
              <InfoValue>{userData?._id?.slice(0, 5)}</InfoValue>
            </InfoItem>
          )}

          {picker && (
            <InfoItem>
              <InfoTitle>FullName:</InfoTitle>
              <InfoValue>{userData.fullname}</InfoValue>
            </InfoItem>
          )}

          {agencies && (
            <InfoItem>
              <InfoTitle>Name:</InfoTitle>
              <InfoValue>{userData.name}</InfoValue>
            </InfoItem>
          )}

          {agencies && (
            <InfoItem>
              <InfoTitle>Status:</InfoTitle>
              <InfoValue>{userData.status}</InfoValue>
            </InfoItem>
          )}

          {agencies && (
            <InfoItem>
              <InfoTitle>Roles:</InfoTitle>
              <InfoValue>{userData.roles}</InfoValue>
            </InfoItem>
          )}

          {agencies && (
            <InfoItem>
              <InfoTitle>City:</InfoTitle>
              <InfoValue>
                <span>
                  {(userData.city?.slice(0, 3) || [])?.map((c) => {
                    return <Tag key={c}>{c}</Tag>;
                  })}
                </span>
                {/* <Tag>{userData.city}</Tag> */}
              </InfoValue>
            </InfoItem>
          )}

          {!agencies && !picker && (
            <InfoItem>
              <InfoTitle>FullName:</InfoTitle>
              <InfoValue>{userData.firstname}</InfoValue>
            </InfoItem>
          )}

          {!agencies && (
            <InfoItem>
              <InfoTitle>Customer Phone:</InfoTitle>
              <InfoValue>{userData.phone}</InfoValue>
            </InfoItem>
          )}
          {!agencies && (
            <InfoItem>
              <InfoTitle>Gender:</InfoTitle>
              <InfoValue>{userData.gender}</InfoValue>
            </InfoItem>
          )}

          {!agencies && picker && (
            <InfoItem>
              <InfoTitle>Account Number:</InfoTitle>
              <InfoValue>
                {userData.account?.accountNo?.slice(0, 5).concat("*****")}
              </InfoValue>
            </InfoItem>
          )}

          {!agencies && (
            <InfoItem>
              {userData.lcd && (
                <div>
                  <InfoTitle>LCDA:</InfoTitle>
                  <InfoValue>{userData.lcd}</InfoValue>
                </div>
              )}
            </InfoItem>
          )}
          {!agencies && (
            <InfoItem>
              <InfoTitle>Location/Address:</InfoTitle>
              <InfoValue>{userData.address}</InfoValue>
            </InfoItem>
          )}
          {!agencies && (
            <InfoItem>
              <InfoTitle>Date Created:</InfoTitle>
              <InfoValue>
                {moment(userData.createAt).format("DD MM YYYY")}
              </InfoValue>
            </InfoItem>
          )}
          {/* <InfoItem>
            <InfoTitle>Total Scheduled  Pickup:</InfoTitle>
            <InfoValue>{userData.raffle}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Pending Pickup:</InfoTitle>
            <InfoValue>{userData.raffle}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Completed Pickup:</InfoTitle>
            <InfoValue>{userData.raffle}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Missed Pickup:</InfoTitle>
            <InfoValue>{userData.raffle}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoTitle>Total Scheduled Drop-off:</InfoTitle>
            <InfoValue>{userData.raffle}</InfoValue>
          </InfoItem> */}
          {!agencies && (
            <InfoItem>
              <InfoTitle>Wallet Balance:</InfoTitle>
              <InfoValue>{userData.pointGained}</InfoValue>
            </InfoItem>
          )}

          {picker && (
            <InfoItem>
              <InfoTitle>Waste Collected(kg):</InfoTitle>
              <InfoValue>{userData.totalCollected}</InfoValue>
            </InfoItem>
          )}
          {/* 
          {!agencies && (
            <InfoItem>
              <InfoTitle>Raffle-Draw Won:</InfoTitle>
              <InfoValue>{userData.rafflePoints}</InfoValue>
            </InfoItem>
          )} */}
          {/* <InfoItem>
            <InfoTitle>Amount Collected:</InfoTitle>
            <InfoValue>{userData.raffle}</InfoValue>
          </InfoItem> */}
          {/* <InfoItem>
            <InfoTitle>Schedule Creator:</InfoTitle>
            <InfoValue>{userData.scheduleCreator}</InfoValue>
          </InfoItem> */}
          <InfoItem>
            <InfoTitle>Email Address:</InfoTitle>
            <InfoValue>{userData.email || userData.client}</InfoValue>
          </InfoItem>
          {/* <InfoItem>
            <InfoTitle>Collector Status:</InfoTitle>
            <InfoValue>{userData.collectorStatus}</InfoValue>
          </InfoItem> */}
          {/* <InfoItem>
            <InfoTitle>Completion Status:</InfoTitle>
            <InfoValue>{userData.completionStatus}</InfoValue>
          </InfoItem> */}

          {/* <InfoItem>
            <InfoTitle>Waste Quantity:</InfoTitle>
            <InfoValue>{userData.quantity}</InfoValue>
          </InfoItem> */}

          {!agencies && (
            <InfoItem>
              <InfoTitle>City:</InfoTitle>
              <InfoValue>{userData.state}</InfoValue>
            </InfoItem>
          )}

          {/* {picker && (
            <InfoItem>
              <InfoTitle>Missed Pickup:</InfoTitle>
              {userData?.schedules?.map((t) => {
                return (
                  t._id === "missed" && <InfoValue>{t.totalCount}</InfoValue>
                );
              })}
            </InfoItem>
          )} */}

          {picker && (
            <InfoItem>
              {userData?.schedules?.map((t) => {
                return (
                  t._id === "missed" && (
                    <>
                      <InfoTitle>Missed Pickup:</InfoTitle>
                      <InfoValue>{t.totalCount}</InfoValue>
                    </>
                  )
                );
              })}
            </InfoItem>
          )}

          {picker && (
            <InfoItem>
              {userData?.schedules?.map((t) => {
                return (
                  t._id === "pending" && (
                    <>
                      <InfoTitle>Pending Pickup:</InfoTitle>
                      <InfoValue>{t.totalCount}</InfoValue>
                    </>
                  )
                );
              })}
            </InfoItem>
          )}
          {picker && (
            <InfoItem>
              {userData?.schedules?.map((t) => {
                return (
                  t._id === "completed" && (
                    <>
                      <InfoTitle>Completed Pickup:</InfoTitle>
                      <InfoValue>{t.totalCount}</InfoValue>
                    </>
                  )
                );
              })}
            </InfoItem>
          )}

          {picker && (
            <InfoItem>
              {userData?.schedules?.map((t) => {
                return (
                  t._id === "cancelled" && (
                    <>
                      <InfoTitle>Cancelled Pickup:</InfoTitle>
                      <InfoValue>{t.totalCount}</InfoValue>
                    </>
                  )
                );
              })}
            </InfoItem>
          )}

          {/* 
          <InfoItem>
            <InfoTitle>Amount Colected:</InfoTitle>
            <InfoValue>{userData}</InfoValue>
          </InfoItem> */}
        </InfoUserWrapper>
      )}
    </Modal>
  );
};
export default InfoModal;
