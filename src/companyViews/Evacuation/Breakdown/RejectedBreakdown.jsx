import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { FlexContainer } from "../../../components/styledElements/index";
import { requestActions } from "../../../store/actions";
import { EvacuationModal } from "../evacuationModal";
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

const ButtonContainer = styled.div`
  ${tw`flex gap-6 justify-end`}
  > button {
    ${tw`text-sm px-6 py-2 rounded-md transition-all ease-in-out duration-500`}
  }
  > button:first-child {
    ${tw`bg-secondary text-white  border-2 border-secondary `}
  }
`;

const ApprovalBreakdown = ({ match }) => {
  const {
    params: { id },
  } = match;

  const { state } = useLocation();
  const history = useHistory();
  const [isModal, setIsModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  const pages = [{ name: "Rejected", link: "/user/evacuation" }];

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
        <EvacuationModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <BreakDownContainer>
        <UserContainer>
          <NavBarLeft>
            <BreadCrumb pages={pages} current="Breakdown Request" />
          </NavBarLeft>
        </UserContainer>

        <ButtonContainer>
          <button onClick={() => reqActions("approve", id)}>Approve</button>
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
