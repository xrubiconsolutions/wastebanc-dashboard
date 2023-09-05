import React, { useState, useEffect } from "react";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { UserContainer, NavBarLeft } from "../UserDetails";
import Tabcontent from "../../../components/UI/TabContent";
import { payoutpending, payoutpendingSearch } from "../../../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { truncate } from "../../../utils/constants";

import StyledButton from "../../../components/UI/btn";
import { Space } from "antd";

const BankPayout = ({ match }) => {
  const [pendingBodyData, setPendingBodyData] = useState([]);
  const [successfulBodyData, setsuccessfulBodyData] = useState([]);
  const [failedBodyData, setFailedBodyData] = useState([]);
  const [pendingpaginationData, setpendingPaginationData] = useState();
  const [successfulpaginationData, setsuccessfulPaginationData] = useState();
  const [failedPaginationData, setFailedPaginationData] = useState();

  const [pendingtotalPages, setpendingTotalPages] = useState(1);
  const [successfultotalPages, setsuccessfulTotalPages] = useState(1);
  const [failedtotalPages, setfailedTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [selectedKey, setSelectedKey] = useState("0");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  const dispatch = useDispatch();
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const {
    params: { id },
  } = match;

  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  const onFilterPendingPayout = async (date, page = 1) => {
    const res = await dispatch(
      payoutpending({
        currentMonth: date,
        page,
        id,
        status: "pending",
      })
    );
    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setPendingBodyData(payments);
      setpendingPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchPendingPayout = async (page = 1) => {
    const res = await dispatch(
      payoutpending({
        currentMonth: payload,
        id,
        page,
        status: "pending",
      })
    );

    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setPendingBodyData(payments);
      setpendingPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchPendingPayout = async (key, page = 1) => {
    const res = await dispatch(
      payoutpendingSearch({
        key: key || "",
        page,
        id,
        status: "failed",
      })
    );

    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setPendingBodyData(payments);
      setpendingPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchSuccessfulPayout = async (key, page = 1) => {
    const res = await dispatch(
      payoutpendingSearch({
        key: key || "",
        page,
        id,
        status: "successful",
      })
    );

    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setsuccessfulBodyData(payments);
      setsuccessfulPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchFailedPayout = async (key, page = 1) => {
    const res = await dispatch(
      payoutpendingSearch({
        key: key || "",
        page,
        id,
        status: "failed",
      })
    );

    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setFailedBodyData(payments);
      setFailedPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchSuccessfulPayout = async (page = 1) => {
    const res = await dispatch(
      payoutpending({
        currentMonth: payload,
        id,
        page,
        status: "successful",
      })
    );

    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;

      setsuccessfulBodyData(payments);
      setsuccessfulPaginationData({ ...paginationData, date: payload });
    }
  };
  const filterSuccessfullPayout = async (date, page = 1) => {
    const res = await dispatch(
      payoutpending({
        currentMonth: date,
        page,
        id,
        status: "successful",
      })
    );
    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setsuccessfulBodyData(payments);
      setsuccessfulPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchFailedPayout = async (page = 1) => {
    const res = await dispatch(
      payoutpending({
        currentMonth: payload,
        id,
        page,
        status: "failed",
      })
    );

    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setFailedBodyData(payments);
      setFailedPaginationData({ ...paginationData, date: payload });
    }
  };
  const filterFailedPayout = async (date, page = 1) => {
    const res = await dispatch(
      payoutpending({
        currentMonth: date,
        page,
        id,
        status: "failed",
      })
    );
    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setFailedBodyData(payments);
      setFailedPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchPendingPayout();
    fetchSuccessfulPayout();
    fetchFailedPayout();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      title: "Pending Requests",
      data: pendingBodyData,
      totalPages: pendingtotalPages,
      paginationData: pendingpaginationData,
      filterHandler: onFilterPendingPayout,
      searchHandler: searchPendingPayout,
      fetch: fetchPendingPayout,
      columns: [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
        {
          title: "Amount requested",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Bank",
          dataIndex: "bankName",
          key: "bankName",
        },
        {
          title: "Account Name",
          dataIndex: "beneName",
          key: "beneName",
        },
        {
          title: "Account Number",
          dataIndex: "destinationAccount",
          key: "destinationAccount",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <Link
                to={{
                  pathname: `/admin/payout_breakdown/${id}`,
                  state: {
                    transactions: record?.transactions,
                    requestType: "Failed Requests",
                  },
                }}
              >
                <StyledButton
                  type=""
                  buttonStyle="btn--primary--outline"
                  buttonSize="btn--small"
                  onClick={() => {
                    setRowInfo(record);
                  }}
                >
                  See More
                </StyledButton>
              </Link>
            </Space>
          ),
        },
      ],
    },
    {
      title: "Successful Requests",
      data: successfulBodyData,
      totalPages: successfultotalPages,
      paginationData: successfulpaginationData,
      filterHandler: filterSuccessfullPayout,
      searchHandler: searchSuccessfulPayout,
      fetch: fetchSuccessfulPayout,
      columns: [
        {
          title: "Payment ID",
          dataIndex: "_id",
          key: "_id",
          render: (text) => <p>{truncate(text, 8)}</p>,
        },
        {
          title: "Date of Payment",
          dataIndex: "updatedAt",
          key: "updatedAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
        {
          title: "Amount Paid",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Bank",
          dataIndex: "bankName",
          key: "bankName",
        },
        {
          title: "Account Name",
          dataIndex: "beneName",
          key: "beneName",
        },
        {
          title: "Account Number",
          dataIndex: "destinationAccount",
          key: "destinationAccount",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",

          render: (text, record) => (
            <Space size="middle">
              <Link
                to={{
                  pathname: `/admin/payout_breakdown/${id}`,
                  state: {
                    transactions: record?.transactions,
                    requestType: "Successful Requests",
                  },
                }}
              >
                <StyledButton
                  type=""
                  buttonStyle="btn--primary--outline"
                  buttonSize="btn--small"
                  onClick={() => {
                    setRowInfo(record);
                  }}
                >
                  See More
                </StyledButton>
              </Link>
            </Space>
          ),
        },
      ],
    },
    {
      title: "Failed Requests",
      data: failedBodyData,
      totalPages: failedtotalPages,
      paginationData: failedPaginationData,
      filterHandler: filterFailedPayout,
      searchHandler: searchFailedPayout,
      fetch: fetchFailedPayout,
      columns: [
        {
          title: "Refrence Number",
          dataIndex: "_id",
          key: "_id",
        },
        {
          title: "Date of Request",
          dataIndex: "date",
          key: "date",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
        {
          title: "Amount Requested",
          dataIndex: "requested",
          key: "requested",
        },
        {
          title: "Bank",
          dataIndex: "bankName",
          key: "bankName",
        },
        {
          title: "Account Name",
          dataIndex: "baneName",
          key: "baneName",
        },
        {
          title: "Account Number",
          dataIndex: "destinationAccount",
          key: "destinationAccount",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <Link
                to={{
                  pathname: `/admin/payout_breakdown/${id}`,
                  state: {
                    transactions: record?.transactions,
                    requestType: "Failed Requests",
                  },
                }}
              >
                <StyledButton
                  type=""
                  buttonStyle="btn--primary--outline"
                  buttonSize="btn--small"
                  onClick={() => {
                    setRowInfo(record);
                  }}
                >
                  See More
                </StyledButton>
              </Link>
            </Space>
          ),
        },
      ],
    },
  ];
  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Payout to Bank"
            previous={previous}
          />
        </NavBarLeft>
      </UserContainer>
      <Tabcontent
        data={data}
        totalPages={totalPages}
        onRefresh={onRefresh}
        setCurrentPage={setCurrentPage}
        onSwitch={onSwitch}
      />
    </div>
  );
};

export default BankPayout;
