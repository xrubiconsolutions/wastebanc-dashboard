import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import Tabcontent from "../../../components/UI/TabContent";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import Button from "../../../components/UI/button";
import { FlexContainer } from "../../../components/styledElements/index";
import BreakdownTable from "./BreakdownTable";

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
  ${tw`px-7 flex flex-col`}
`;

const ButtonContainer = styled.div`
  > button {
    ${tw`text-sm px-7 py-2 rounded-md transition-all ease-in-out duration-500`}
  }
  > button:first-child {
    ${tw`bg-secondary text-white hover:bg-white hover:text-secondary border-2 border-secondary`}
  }

  > button:last-child {
    ${tw`bg-white text-red-400 border-[2px] border-red-400   hover:bg-secondary hover:text-white`}
  }
`;
const ApprovedBreakdown = ({ match }) => {
  const {
    params: { id },
  } = match;

  const { state } = useLocation();

  useEffect(() => {}, []);

  const data = [
    {
      title: "Waste Quantity",
      value: state?.weight,
    },

    {
      title: "Collector's Phone Number",
      value: state["collectors"].phone,
    },

    {
      title: "Location",
      value: state["collectors"].address,
    },

    {
      title: "Date of Request",
      value: moment(state?.date).format("YYYY-MM-DD"),
    },

    {
      title: "Collector's Name",
      value: state["collectors"].fullname,
    },
  ];
  const pages = [{ name: "Approved", link: "/user/evacuation" }];

  return (
    <>
      <BreakDownContainer>
        <UserContainer>
          <NavBarLeft>
            <BreadCrumb pages={pages} current="Breakdown Request" />
          </NavBarLeft>
        </UserContainer>

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

        <BreakdownTable state={state} />
      </BreakDownContainer>
    </>
  );
};

export default ApprovedBreakdown;
