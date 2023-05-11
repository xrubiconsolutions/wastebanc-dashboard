import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FlexContainer } from "../../../components/styledElements";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import Option from "../../../components/UI/Option";
import { userDetail } from "../../../store/actions";

import BreadCrumb from "../../../components/UI/breadCrumbs";
export const UserContainer = styled.div`
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

export const InsuranceUserDetails = ({ match }) => {
  const {
    params: { id },
  } = match;

  const pages = [
    { name: "Total Insurance Users", link: "/admin/total_insurance_user" },
  ];

  const dispatch = useDispatch();
  const { payout, modal } = useSelector((state) => state.app);
  const [userData, setuserData] = useState([]);

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
      title: "User Name",
      value: userData.name,
    },
    {
      title: "Date of Purchase",
      value: "",
    },
    {
      title: "Phone Number",
      value: "",
    },
    {
      title: "Insurance Plan",
      value: "",
    },
    {
      title: "Last Purchase",
      value: "",
    },
    {
      title: "Amount",
      value: "",
    },
    {
      title: "Start Date",
      value: "",
    },
    {
      title: "End Date",
      value: "",
    },
    {
      title: "Date Joined",
      value: "",
    },

    {
      title: "Plan Status",
      value: "",
    },
  ];

  return (
    <>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb pages={pages} current="User Detaifls" />
        </NavBarLeft>
      </UserContainer>

      <UserTitle>More Details</UserTitle>
      <ModalBackground>
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
