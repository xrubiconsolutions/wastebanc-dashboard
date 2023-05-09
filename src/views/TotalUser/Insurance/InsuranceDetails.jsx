import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FlexContainer } from "../../../components/styledElements";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { insuranceUserDetail } from "../../../store/actions";

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

export const InsuranceDetails = ({ match }) => {
  const [userData, setuserData] = useState([]);

  const {
    params: { id },
  } = match;

  const fetchAll = async () => {
    const res = await dispatch(insuranceUserDetail(id));
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
      value: `${userData.first_name} ${userData.last_name}`,
    },
    // {
    //   title: "Date of Purchase",
    //   value: "",
    // },
    {
      title: "Phone Number",
      value: userData?.phone,
    },
    {
      title: "Insurance Plan",
      value: userData?.plan_name,
    },
    {
      title: "Last Purchase",
      value: moment(userData?.createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      value: userData?.price,
    },
    {
      title: "Start Date",
      value: moment(userData?.activation_date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      value: moment(userData?.expiration_date).format("YYYY-MM-DD"),
    },
    // {
    //   title: "Date Joined",
    //   value: moment(userData?.createdAt).format("YYYY-MM-DD"),
    // },

    // {
    //   title: "Plan Status",
    //   value: "",
    // },
  ];

  const pages = [
    {
      name: "Total Insurance Users",
      link: "/admin/total_users/total_insurance_user",
    },
  ];

  const dispatch = useDispatch();

  return (
    <>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb pages={pages} current="User Details" />
        </NavBarLeft>
      </UserContainer>

      <ModalBackground>
        <UserTitle>
          <div className="flex justify-between">
            User Details
            <Link to={`/admin/renewal_history/${id}`}>
              <button className="border-[1px] border-primary text-primary text-sm rounded-lg px-8 py-3">
                Renewal History
              </button>
            </Link>
          </div>
        </UserTitle>
        <ColumnStyle>
          <InfoWrapper>
            {data.map(({ title, value }, index) => {
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
