import React, { useEffect, useState } from "react";
import { Space } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { useDispatch } from "react-redux";
import { truncate } from "../../utils/constants";
import { Card } from "./Card";
import { useHistory } from "react-router";
import {
  getpendingPayoutRequest,
  getcompletedPayoutRequest,
  searchpendingPayoutRequest,
  filterpendingPayoutRequest,
  searchcompletedPayoutRequest,
  filtercompletedPayoutRequest,
  getfailedPayoutRequest,
  searchfailedPayoutRequest,
  filterfailedPayoutRequest,
} from "../../store/actions";
import moment from "moment";

const AggregatorsContainer = styled.div`
  ${tw`space-y-4`}

  .text {
    color: red;
  }
`;

export const PayoutRequest = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKey, setSelectedKey] = useState("0");
  const [fetchPendingPayoutData, setFetchedPendingPayoutData] = useState([]);
  const [pendingPayoutPaginationData, setPendingPayoutPaginationData] =
    useState();
  const [fetchFailedPaginationData, setFetchedFailedPaginationData] =
    useState();
  const [completedPaginationData, setCompletedPaginationData] = useState();

  const [fetchCompletedPayoutData, setFetchedCompletedPayoutData] = useState(
    []
  );
  const [failedPayoutRequest, setFailedPayoutRequest] = useState([]);

  const [approvedPagination, setApprovedPagination] = useState();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  // total balcance
  // const totalCustomerAmount = useSelector((state) => state);
  // let total = 0;
  // totalCustomerAmount.payments.totalWithdrawalAmount.result?.map(
  //   (i) => (total += i.withdrawalAmount)
  // );

  const dispatch = useDispatch();
  const fetchPendingPayoutRequest = async (date = payload) => {
    const res = await dispatch(getpendingPayoutRequest(date));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      // const { ...paginationData } = res.payload;
      setFetchedPendingPayoutData(result);
      setPendingPayoutPaginationData({ ...paginationData });
    }
  };

  const searchPendingPayoutRequest = async (key) => {
    const res = await dispatch(searchpendingPayoutRequest(key));
    if (!res.error) {
      const { result } = res.payload.data;
      setFetchedPendingPayoutData(result);
    }
  };

  const filterPendingPayoutRequest = async (date = payload) => {
    const res = await dispatch(filterpendingPayoutRequest(date));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      console.log("paginationData", paginationData);
      setFetchedPendingPayoutData(result);
      setPendingPayoutPaginationData({ ...paginationData });
    }
  };

  const fetchCompletedPayoutRequest = async (date = payload) => {
    const res = await dispatch(getcompletedPayoutRequest(date));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedCompletedPayoutData(result);
      setCompletedPaginationData(paginationData);
    }
  };

  const searchCompletedPayoutRequest = async (key) => {
    const res = await dispatch(searchcompletedPayoutRequest(key));
    if (!res.error) {
      const { result } = res.payload.data;
      setFetchedCompletedPayoutData(result);
    }
  };

  const filterCompletedPayoutRequest = async (date = payload) => {
    const res = await dispatch(filtercompletedPayoutRequest(date));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedCompletedPayoutData(result);
    }
  };

  const fetchFailedPayoutRequest = async (page = 1) => {
    const res = await dispatch(getfailedPayoutRequest({ ...payload, page }));
    console.log("resssponseee", res);
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      console.log("pagination data", paginationData);
      setFailedPayoutRequest(result);
      setFetchedFailedPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchFailedPayoutRequest = async (key) => {
    const res = await dispatch(searchfailedPayoutRequest(key));
    if (!res.error) {
      const { result } = res.payload.data;
      setFailedPayoutRequest(result);
    }
  };

  const filterFailedPayoutRequest = async (date = payload) => {
    const res = await dispatch(filterfailedPayoutRequest(date));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFailedPayoutRequest(result);
    }
  };

  useEffect(() => {
    fetchPendingPayoutRequest();
    fetchCompletedPayoutRequest();
    fetchFailedPayoutRequest();
  }, []);

  const onRefresh = () => {
    fetchPendingPayoutRequest();
    fetchCompletedPayoutRequest();
    fetchFailedPayoutRequest();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  const history = useHistory();
  const data = [
    {
      title: "Pending Requests",
      link: "Pending Requests",
      data: fetchPendingPayoutData,
      paginationData: pendingPayoutPaginationData,
      searchHandler: searchPendingPayoutRequest,
      filterHandler: filterPendingPayoutRequest,
      totalPages: pendingPayoutPaginationData?.totalPages,

      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
        },
        {
          title: "Amount Requested (Naira)",
          dataIndex: "withdrawalAmount",
          key: "withdrawalAmount",
        },

        {
          title: "Date Requested",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
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
                onClick={() => history.push("/user/pending_payout")}
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
      data: fetchCompletedPayoutData,
      searchHandler: searchCompletedPayoutRequest,
      filterHandler: filterCompletedPayoutRequest,
      paginationData: completedPaginationData,
      totalPages: completedPaginationData?.totalPages,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        {
          title: "Amount Paid (Naira)",
          dataIndex: "withdrawalAmount",
          key: "withdrawalAmount",
        },
        {
          title: "Date of Payment",
          dataIndex: "date",
          key: "date",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },

        {
          title: "Reference Number",
          dataIndex: "reference",
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
                onClick={() => history.push("/user/completed_payout")}
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
      data: failedPayoutRequest,
      searchHandler: searchFailedPayoutRequest,
      filterHandler: filterFailedPayoutRequest,
      paginationData: fetchFailedPaginationData,
      totalPages: fetchFailedPaginationData?.totalPages,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },

        {
          title: "Reference Number",
          dataIndex: "reference",
          key: "reference",
        },

        {
          title: "Amount Requested(Naira)",
          dataIndex: "withdrawalAmount",
          key: "withdrawalAmount",
        },
        {
          title: "Date Of Request",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
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
                  history.push("/user/failed_payout");
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
          <Card
            title="SAF Account Balance"
            // amount={totalCustomerAmount.payments.totalWithdrawalAmount}
            amount={0}
          />
        </div>

        <Tabcontent
          data={data}
          onRefresh={onRefresh}
          totalPages={totalPages}
          onSwitch={onSwitch}
          setCurrentPage={setCurrentPage}
        />
      </AggregatorsContainer>
    </>
  );
};
