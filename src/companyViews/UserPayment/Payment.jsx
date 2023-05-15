import React, { useEffect, useState } from "react";
import { Space } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { useDispatch, useSelector } from "react-redux";
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
  const [pendingPayoutPaginationData, setPendingPayoutPaginationData] =
    useState();
  const [fetchFailedPaginationData, setFetchedFailedPaginationData] =
    useState();
  const [completedPaginationData, setCompletedPaginationData] = useState();
  const [fetchPendingPayoutData, setFetchedPendingPayoutData] = useState([]);

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

  const { pendingRequest, completedRequest, failedRequest } = useSelector(
    (state) => state?.payments
  );
  // console.log(pendingRequest, completedRequest, failedRequest);

  const dispatch = useDispatch();
  const fetchPendingPayoutRequest = async (page = 1) => {
    const res = await dispatch(
      getpendingPayoutRequest({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedPendingPayoutData(result);
      setPendingPayoutPaginationData(paginationData);
    }
  };

  const searchPendingPayoutRequest = async (key, page = 1) => {
    const res = await dispatch(searchpendingPayoutRequest({ key, page }));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedPendingPayoutData(result);
      setPendingPayoutPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterPendingPayoutRequest = async (date, page = 1) => {
    const res = await dispatch(
      filterpendingPayoutRequest({
        currentMonth: date,
        page,
      })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedPendingPayoutData(result);
      setPendingPayoutPaginationData({ ...paginationData, date });
    }
  };

  const fetchCompletedPayoutRequest = async (page = 1) => {
    const res = await dispatch(
      getcompletedPayoutRequest({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedCompletedPayoutData(result);
      setCompletedPaginationData(paginationData);
    }
  };

  const searchCompletedPayoutRequest = async (key, page = 1) => {
    const res = await dispatch(
      searchcompletedPayoutRequest({
        key,
        page,
      })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedCompletedPayoutData(result);
      setCompletedPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterCompletedPayoutRequest = async (date, page = 1) => {
    const res = await dispatch(
      filtercompletedPayoutRequest({ currentMonth: date, page })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFetchedCompletedPayoutData(result);
      setCompletedPaginationData({ ...paginationData, date });
    }
  };

  const fetchFailedPayoutRequest = async (page = 1) => {
    const res = await dispatch(getfailedPayoutRequest({ ...payload, page }));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFailedPayoutRequest(result);
      setFetchedFailedPaginationData(paginationData);
    }
  };

  const searchFailedPayoutRequest = async (key, page = 1) => {
    const res = await dispatch(searchfailedPayoutRequest({ key, page }));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFailedPayoutRequest(result);
      setFetchedFailedPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterFailedPayoutRequest = async (date, page = 1) => {
    const res = await dispatch(
      filterfailedPayoutRequest({ currentMonth: date, page })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setFailedPayoutRequest(result);
      setFetchedFailedPaginationData({ ...paginationData, date });
    }
  };

  useEffect(() => {
    if (!pendingRequest) setFetchedPendingPayoutData(pendingRequest);
    if (!completedRequest) setFetchedCompletedPayoutData(completedRequest);
    if (!failedRequest) setFetchedPendingPayoutData(failedRequest);
  }, [pendingRequest, completedRequest, failedRequest]);

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
      totalPages: pendingPayoutPaginationData?.totalPages,
      paginationData: pendingPayoutPaginationData,
      searchHandler: searchPendingPayoutRequest,
      filterHandler: filterPendingPayoutRequest,
      fetch: fetchPendingPayoutRequest,
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
          title: "Beneficary Name",
          dataIndex: "beneName",
          key: "beneName",
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
      fetch: fetchCompletedPayoutRequest,

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
      fetch: fetchFailedPayoutRequest,
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
          // setCurrentPage={setCurrentPage}
        />
      </AggregatorsContainer>
    </>
  );
};
