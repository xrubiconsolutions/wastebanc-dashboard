import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import BreadCrumb from "../../../components/UI/breadCrumbs";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { DisplayModal } from "../../../components/UI/DisplayModal";
import { FlexContainer } from "../../../components/styledElements/index";
import { requestActions } from "../../../store/actions";
import BreakdownTable from "./BreakdownTable";
import {
  BreakDownContainer,
  ButtonContainer,
  GridContainer,
  InfoItem,
  InfoTitle,
  InfoValue,
  ModalBackground,
  NavBarLeft,
  UserContainer,
  UserTitle,
} from "./style";

const ApprovalBreakdown = ({ match }) => {
  const {
    params: { id },
  } = match;

  useEffect(() => {}, []);

  const { state } = useLocation();
  const [isModal, setIsModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

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

  const pages = [{ name: "Awaiting Approval", link: "/user/evacuation" }];
  const dispatch = useDispatch();

  const reqActions = async (status, id) => {
    try {
      const res = await dispatch(
        requestActions({
          status: status,
          id: id,
        })
      );
      if (!res.error) {
        history.push("/user/evacuation");
      } else {
        setShowModal(true);
        setIsModal(true);
      }
    } catch (error) {}
  };

  return (
    <>
      {isModal && (
        <DisplayModal showModal={showModal} setShowModal={setShowModal} />
      )}

      <BreakDownContainer>
        <UserContainer>
          <NavBarLeft>
            <BreadCrumb pages={pages} current="Breakdown Request" />
          </NavBarLeft>
        </UserContainer>

        <ButtonContainer>
          <button onClick={() => reqActions("approve", id)}>Approve</button>
          <button onClick={() => reqActions("reject", id)}>Reject</button>
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

        <BreakdownTable state={state} />
      </BreakDownContainer>
    </>
  );
};

export default ApprovalBreakdown;
