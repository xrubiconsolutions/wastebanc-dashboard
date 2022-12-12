import React, { useEffect, useState } from "react";
import { Space } from "antd";
import ContentCard from "../../components/UI/ContentCard";
import { colors, TotalCardAggregators } from "../../utils/data";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import Modal from "../../components/UI/modal";
import { useDispatch, useSelector } from "react-redux";
import ApprovedModal from "../../components/UI/ApprovedModal";
import moment from "moment";
import DeleteModal from "../../components/common/DeleteModal";
import { chunk } from "../../utils";
import { truncate } from "../../utils/constants";
import { Card } from "./Card";
import { CompletedPayoutPayment } from "./CompletedPayoutPayment";
import { PendingPayoutPayment } from "./PendingPayoutPayment";
import { FailedPayoutPayment } from "./FailedPayoutPayment";
import { useHistory } from "react-router";

const AggregatorsContainer = styled.div`
  ${tw`space-y-4`}

  .text {
    color: red;
  }
`;
const Vector = styled.div`
  ${tw`flex justify-between items-center px-4 py-3`}
`;
export const PayoutRequest = () => {
  const history = useHistory();
  const data = [
    {
      title: "Pending Requests",
      link: "Pending Requests",
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
        },
        {
          title: "Amount Requested(Naira)",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Date Requested",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  history.push("/pending_payout");
                  //   <PendingPayoutPayment />;
                }}
              >
                See More
              </StyledButton>
            </Space>
          ),
        },
      ],
    },

    {
      title: "Completed Requests",
      link: "Completed Requests",
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        {
          title: "Amount Paid(Naira)",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Date of Payment",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Reference Number",
          dataIndex: "reference ",
          key: "reference ",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={
                  () => history.push("/completed_payout")
                  // <CompletedPayoutPayment />
                }
              >
                See More
              </StyledButton>
            </Space>
          ),
        },
      ],
    },

    {
      title: "Failed Requests",
      link: "Failed Requests",
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },

        {
          title: "Reference Number",
          dataIndex: "reference ",
          key: "reference ",
        },

        {
          title: "Amount Requested(Naira)",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Date Of Request",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  // push to the route
                  history.push("/failed_payout");
                  //   <FailedPayoutPayment />;
                }}
              >
                See More
              </StyledButton>
            </Space>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <AggregatorsContainer>
        <div className="flex items-center justify-center ">
          <Card title="SAF Account Balance" amount={10000} />
        </div>

        <Tabcontent data={data} onRefresh={""} totalPages={""} onSwitch={""} />
      </AggregatorsContainer>
    </>
  );
};
