import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FlexContainer } from "../../../components/styledElements/index";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import Button from "../../../components/UI/button";
import DataTable from "../../../components/UI/Table";

export const UserContainer = styled.div`
  margin-bottom: 20px;
  display: grid;
`;

const GridContainer = styled.div`
  ${tw`py-10 grid grid-cols-4 gap-5`}
`;

export const NavBarLeft = styled.div`
  ${tw`flex justify-between`}

  .text {
    font-size: 15px;
    color: "#0e0e0e";
  }
`;
const ModalBackground = styled.div`
  ${tw`py-5`}
`;

const UserTitle = styled.div`
  ${tw`text-xl font-medium`}
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

const BreakDownContainer = styled.div`
  ${tw`px-7 flex flex-col `}
`;

const ButtonContainer = styled.div`
  > button {
    ${tw`text-sm px-7 py-2 rounded-md transition-all ease-in-out duration-500`}
  }
  > button:first-child {
    ${tw`bg-secondary text-white hover:bg-white hover:text-secondary border-2 border-secondary`}
  }

  > button:last-child {
    ${tw`bg-white text-secondary border-[2px] border-secondary   hover:bg-secondary hover:text-white`}
  }
`;
const UserDetails = ({ match }) => {
  const {
    params: { id },
  } = match;

  useEffect(() => {}, []);

  const data = [
    {
      title: "Agent's Name",
      value: "",
    },
    {
      title: "Phone Number",
      value: "",
    },

    {
      title: "Waste Quantity",
      value: "",
    },

    {
      title: "Collector's Phone Number",
      value: "",
    },

    {
      title: "Location",
      value: "",
    },

    {
      title: "Date of Request",
      value: "",
    },

    {
      title: "Collector's Name",
      value: "",
    },
  ];
  const pages = [{ name: "Incoming", link: "/user/evacuation" }];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Agent's Name",
      dataIndex: "agent",
      key: "agent",
    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <p className="space-x-2 ">
          {text}
          <span>Kg</span>
        </p>
      ),
    },

    {
      title: "Waste Quanity",
      dataIndex: "waste",
      key: "waste",
    },
  ];

  return (
    <>
      <BreakDownContainer>
        <UserContainer>
          <NavBarLeft>
            <BreadCrumb pages={pages} current="Breakdown Request" />
          </NavBarLeft>
        </UserContainer>

        <ButtonContainer className="flex gap-6 self-end">
          <button>Accept</button>
          <button>Cancel</button>
        </ButtonContainer>
        <ModalBackground>
          <UserTitle>
            <>More Details</>
          </UserTitle>

          <GridContainer>
            {data.map(({ title, value }) => {
              return (
                <InfoItem>
                  <InfoTitle>{title}:</InfoTitle>
                  <FlexContainer>
                    <InfoValue>{value}</InfoValue>
                  </FlexContainer>
                </InfoItem>
              );
            })}
          </GridContainer>
        </ModalBackground>
      </BreakDownContainer>

      <DataTable
        data=""
        columns={columns}
        header
        onSearch=""
        onFilter=""
        onRefresh=""
        setCurrentPage=""
        paginationData=""
        totalPages=""
        onFetch=""
      />
    </>
  );
};

export default UserDetails;
