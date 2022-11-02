import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import RaffleModalContainer from "./raffle";
import { FlexContainer, ModalTitle, TitleText } from "../styledElements";
import DataTable from "../../components/UI/Table";
import { truncate } from "../../utils/constants";

const columns = [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "LGA/LCDA",
    dataIndex: "address",
    key: "address",
    render: (text) => <p>{truncate(text, 15)}</p>,
  },
  {
    title: "USER ID",
    dataIndex: "id",
    key: "id",
  },
];

const data = [];

const Pointer = styled.div`
  ${tw`h-1 w-1 rounded-full bg-red-500 mr-2`};
  /* box-shadow: 0 0 0 3px rgb(217 144 144); */
  box-shadow: ${(props) =>
    props.color ? props.color : "0 0 0 3px rgb(217 144 144)"};
  background-color: ${(props) => (props.color ? props.color : "red")};
`;

const RaffleModal = ({ showPending = false, setShowPending = {} }) => {
  return (
    <RaffleModalContainer
      show={showPending}
      close={() => setShowPending(false)}
      width="48rem"
    >
      <ModalTitle>
        <TitleText className="">Hurray</TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowPending(false)}
        >
          Close
        </StyledButton>
      </ModalTitle>
      <DataTable
        raffle
        data={data}
        columns={columns}
        refreshUrl="drop-off"
        header
      />
    </RaffleModalContainer>
  );
};

export default RaffleModal;
