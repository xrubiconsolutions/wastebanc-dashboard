import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FlexContainer } from "../../components/styledElements/index";
import Option from "../../components/UI/Option";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/UI/breadCrumbs";
import { Button, Tag } from "antd";
import { userDetail } from "../../store/actions";
import moment from "moment";
import { Link } from "react-router-dom";

export const UserContainer = styled.div`
  //   display: grid;
  //   grid-template-coloumns: auto 1fr;
  margin-bottom: 20px;
  display: grid;
`;

export const NavBarLeft = styled.div`
  ${tw`flex justify-between`}

  .text {
    font-size: 15px;
    color: "#0e0e0e";
  }
`;
const ModalBackground = styled.div`
  ${tw`p-3 mt-4`}
  background-color: white!important;
`;

const UserTitle = styled.div`
  font-size: 20px;
  margin-left: 20px;
  margin-top: 30px;
`;

const ColumnStyle = styled.div`
  letter-spacing: 1px;
  margin-top: 30px;
  margin-left: 30px;
  justify-content: space-between;
  color: green;
  font-size: 17px;
`;

const InfoWrapper = styled.div`
  ${tw`flex flex-wrap gap-10 gap-x-12 w-11/12`}
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
`;

const UserDetails = ({ match }) => {
  const [userData, setuserData] = useState([]);

  const {
    params: { id },
  } = match;

  const fetchAll = async () => {
    const res = await dispatch(userDetail(id));
    if (!res.error) {
      const { data } = res.payload;
      setuserData(data);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const data = [
    {
      title: "Full Name",
      value: userData.firstName,
    },
    {
      title: "Phone Number",
      value: userData.phoneNumber,
    },
    {
      title: "Gender",
      value: userData.gender,
    },
    {
      title: "LGA / LCDA",
      value: userData.lcd,
    },
    {
      title: "Wallet Balance",
      value: userData.walletBalance,
    },
    {
      title: "Location / Address",
      value: userData.address,
    },
    {
      title: "Date Created",
      value: moment(userData.createdAt).format("YYYY-MM-DD"),
    },

    {
      title: "Total Scheduled Pickup",
      value: userData.totalSchedulePickup,
    },

    {
      title: "Pending Pickup",
      value: userData.pendingSchedulePickup,
    },

    {
      title: "Completed Pickup",
      value: userData.completedSchedulePickup,
    },

    {
      title: "Missed Pickup",
      value: userData.missedSchedulePickup,
    },

    {
      title: "Total Scheduled Drop-off",
      value: userData.totalScheduleDrop,
    },
  ];
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];

  const optiondata = [
    {
      pathname: "/admin/user_pending_schedule/",
      title: "Pending Schedule",
    },

    {
      pathname: "/admin/user_completed_schedule/",
      title: "Completed Schedule",
    },

    {
      pathname: "/admin/user_accepted_schedule/",
      title: " Accepted Schedule",
    },

    {
      pathname: "/admin/user_missed_schedule/",
      title: "Missed Schedule",
    },

    {
      pathname: "/admin/user_cancelled_schedule/",
      title: "Cancelled Schedule",
    },

    {
      pathname: "/admin/user_dropoff_request/",
      title: "Drop-off Request",
    },

    {
      title: "Payout History",
      payoutroutes: [
        {
          title: "Payout to Bank",
          pathname: "/admin/bank_payout/",
        },
        {
          title: "Payout to Charity",
          pathname: "/admin/charity_payout/",
        },
        {
          title: "Insurance Purchase",
          pathname: "/admin/insurance_purchase/",
        },
      ],
    },
  ];

  const dispatch = useDispatch();
  const { payout, modal } = useSelector((state) => state.app);

  return (
    <>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb pages={pages} current="User Details" />
        </NavBarLeft>
      </UserContainer>

      <ModalBackground>
        <UserTitle>
          <>
            More Details
            <Option user_organisation_id={id} optiondata={optiondata} />
          </>
        </UserTitle>
        <ColumnStyle>
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
                <InfoItem>
                  <InfoTitle>{title}:</InfoTitle>
                  {typeof value !== "object" ? (
                    title.toLowerCase() !== "status" ? (
                      <InfoValue color={color}>{value}</InfoValue>
                    ) : (
                      <FlexContainer>
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
        </ColumnStyle>
      </ModalBackground>
    </>
  );
};

export default UserDetails;
