import moment from "moment";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { FlexContainer } from "../../../components/styledElements/index";
import BreakdownTable from "./BreakdownTable";
import {
  BreakDownContainer,
  GridContainer,
  InfoItem,
  InfoTitle,
  InfoValue,
  ModalBackground,
  NavBarLeft,
  UserContainer,
  UserTitle,
} from "./style";

const ApprovedBreakdown = ({ match }) => {
  const { state } = useLocation();

  useEffect(() => {}, []);

  const data = [
    {
      title: "Waste Quantity (kg)",
      value: state?.weight,
    },

    {
      title: "Collector's Phone Number",
      value: state["collectors"]?.phone,
    },

    {
      title: "Location",
      value: state["collectors"]?.address,
    },

    {
      title: "Date of Request",
      value: moment(state?.date).format("YYYY-MM-DD"),
    },

    {
      title: "Collector's Name",
      value: state["collectors"]?.fullname,
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
