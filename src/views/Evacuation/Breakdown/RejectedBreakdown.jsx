import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { FlexContainer } from "../../../components/styledElements/index";
import { adminRequestActions } from "../../../store/actions";
import { EvacuationModal } from "../evacuationModal";
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
    ${tw`text-sm px-6 py-2 rounded-md transition-all ease-in-out duration-500`}
  }
  > button:first-child {
    ${tw`bg-secondary text-white  border-2 border-secondary `}
  }
`;
const AdminRejectBreakdown = ({ match }) => {
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
  const pages = [{ name: "Rejected", link: "/admin/evacuation" }];

  const dispatch = useDispatch();

  const reqActions = async (status, id) => {
    try {
      const res = await dispatch(
        adminRequestActions({
          status: status,
          id: id,
        })
      );
      if (!res.error) {
        history.push("/admin/evacuation");
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

        <ButtonContainer className="flex gap-6 self-end">
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

export default AdminRejectBreakdown;