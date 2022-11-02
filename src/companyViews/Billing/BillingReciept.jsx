import { Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import Pdf from "react-to-pdf";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";

const TitleContainer = styled.div`
  ${tw`bg-white px-8 py-4 flex items-center justify-between`}
`;
const CardNotice = styled.div`
  //   ${tw`mb-7`}
`;
const CardNoticeCaption = styled.p`
  font-size: 20px;
`;
const CardPricingContainer = styled.div`
  ${tw`flex items-end bg-white flex-col px-24 py-7 space-y-3`}
`;
const CardPricing = styled.div`
  ${tw`flex items-center justify-between space-x-16`}
`;

const ref = React.createRef();

const BillingReciept = ({ allTransaction }) => {
  const billlingdata = [
    {
      key: "1",
      Reference: "2324fgg546577",
      categories: ["plastic", "rubber"],
      Amount: "N5,000",
      Address: "126 kalakuta road, Ikeja",
      Kg: "15",
    },
    {
      key: "2",
      Reference: "2324fgg546577",
      Amount: "N5,000",
      categories: ["plastic", "rubber"],
      Address: "126 kalakuta road, Ikeja",
      Kg: "15",
    },

    {
      key: "3",
      Reference: "2324fgg546577",
      Amount: "N5,000",
      categories: ["plastic", "rubber"],
      Address: "126 kalakuta road, Ikeja",
      Kg: "15",
    },

    {
      key: "4",
      Reference: "2324fgg546577",
      Amount: "N5,000",
      categories: ["plastic", "rubber"],
      Address: "126 kalakuta road, Ikeja",
      Kg: "15",
    },
  ];

  const billingcolumns = [
    {
      title: "Reference No",
      dataIndex: "ref_id",
      key: "ref_id",
    },
    {
      title: "Name",
      dataIndex: "recycler",
      key: "recycler",
    },
    {
      title: "Waste Category",
      dataIndex: "categories",
      key: "categories",
      render: (wastes) => (
        <span>
          {(wastes.slice(0, 3) || []).map((waste) => {
            return <Tag key={waste}>{waste.name.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },

    {
      title: "Kg",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Amount",
      dataIndex: "coin",
      key: "coin",
    },
  ];

  return (
    <div ref={ref}>
      <TitleContainer>
        <div className="space-y-2 ">
          <CardNoticeCaption>
            Month - to date Summary{" "}
            {`${moment(allTransaction?.startMonth).format(
              "MMM Do YY"
            )} - ${moment(allTransaction?.endMonth).format("MMM Do YY")}`}
          </CardNoticeCaption>
          <CardNotice>
            These charges are factored into your account balance.
          </CardNotice>
        </div>
        {/* <Pdf targetRef={ref} filename="BillingReciept.pdf">
          {({ toPdf }) => (
            <StyledButton
              raffle
              buttonStyle="btn--primary--outline"
              buttonSize="btn--small"
              onClick={toPdf}
            >
              Capture as PDF
            </StyledButton>
          )}
        </Pdf> */}
      </TitleContainer>
      <hr />
      <Table
        dataSource={allTransaction?.transactions}
        columns={billingcolumns}
        pagination={false}
      ></Table>
      {allTransaction?.transaction?.length !== 0 ? (
        <div>
          <CardPricingContainer>
            <CardPricing>
              <p>Subtotal</p>
              <p>{allTransaction?.subtotal}</p>
            </CardPricing>
            <CardPricing>
              <p>Service charge</p>
              <p>N{allTransaction?.serviceCharge}</p>
            </CardPricing>
            <CardPricing>
              <b>Total</b>
              <b>N{allTransaction?.total}</b>
            </CardPricing>
          </CardPricingContainer>
        </div>
      ) : null}
    </div>
  );
};

export default BillingReciept;
