import { Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Tabcontent from "../../components/UI/TabContent";
import StyledButton from "../../components/UI/btn";
import {
  adminEvacuationRequest,
  adminFilterEvacuationRequest,
  adminSearchEvacuationRequest,
} from "../../store/actions";

const AdminEvacuationRequest = () => {
  const [rowInfo, setRowInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState("0");

  const [approvedEvacuationBodyData, setApprovedEvacuationBodyData] = useState(
    []
  );
  const [approvedEvacuationPagintionData, setApprovedEvacuationPaginationData] =
    useState();

  const [rejectedEvacuationBodyData, setRejectedEvacuationBodyData] = useState(
    []
  );
  const [rejectedEvacuationPagintionData, setRejectedEvacuationPaginationData] =
    useState();

  const [pendingEvacuationBodyData, setPendingEvacuationBodyData] = useState(
    []
  );
  const [pendingEvacuationPagintionData, setPendingEvacuationPaginationData] =
    useState();

  const [
    awaitingApprovalEvacuationBodyData,
    setAwaitingApprovalEvacuationBodyData,
  ] = useState([]);
  const [
    awaitingApprovalEvacuationPagintionData,
    setAwaitingApprovalEvacuationPaginationData,
  ] = useState();

  const d = new Date();

  d.setDate(d.getDate());
  const payload = {
    start: "2020-01-01",
    end: d,
  };

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  const fetchPendingEvacuationRequest = async () => {
    const res = await dispatch(
      adminEvacuationRequest({ status: "PENDING", page: 1 })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setPendingEvacuationBodyData(requests);
      setPendingEvacuationPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchAwaitingApprovalEvacuationRequest = async () => {
    const res = await dispatch(
      adminEvacuationRequest({ status: "ACCEPTED", page: 1 })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setAwaitingApprovalEvacuationBodyData(requests);
      setAwaitingApprovalEvacuationPaginationData({
        ...paginationData,
        date: payload,
      });
    }
  };

  const fetchApprovedEvacuationRequest = async () => {
    const res = await dispatch(
      adminEvacuationRequest({ status: "APPROVED", page: 1 })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setApprovedEvacuationBodyData(requests);
      setApprovedEvacuationPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchRejectedEvacuationRequest = async () => {
    const res = await dispatch(
      adminEvacuationRequest({ status: "REJECTED", page: 1 })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setRejectedEvacuationBodyData(requests);
      setRejectedEvacuationPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchAwatingApprovalEvacuationRequest = async (key, page = 1) => {
    const res = await dispatch(
      adminSearchEvacuationRequest({
        status: "ACCEPTED",
        key,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setAwaitingApprovalEvacuationBodyData(requests);
      setAwaitingApprovalEvacuationPaginationData({
        ...paginationData,
        date: payload,
      });
      setTotalPages(paginationData.totalPages);
    }
  };

  const searchPendingEvacuationRequest = async (key, page = 1) => {
    const res = await dispatch(
      adminSearchEvacuationRequest({
        status: "PENDING",
        key,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setPendingEvacuationBodyData(requests);
      setPendingEvacuationPaginationData({ ...paginationData, date: payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const searchApprovedEvacuationRequest = async (key, page = 1) => {
    const res = await dispatch(
      adminSearchEvacuationRequest({
        status: "APPROVED",
        key,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setApprovedEvacuationBodyData(requests);
      setApprovedEvacuationPaginationData({ ...paginationData, date: payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const searchRejectedEvacuationRequest = async (key, page = 1) => {
    const res = await dispatch(
      adminSearchEvacuationRequest({
        status: "REJECTED",
        key,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setRejectedEvacuationBodyData(requests);
      setRejectedEvacuationPaginationData({ ...paginationData, date: payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterAwaitingApprovalEvacuationRequest = async (date, page = 1) => {
    const res = await dispatch(
      adminFilterEvacuationRequest({
        status: "Accepted",
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setAwaitingApprovalEvacuationBodyData(requests);
      setAwaitingApprovalEvacuationPaginationData({
        ...paginationData,
        date: payload,
      });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterPendingEvacuationRequest = async (date, page = 1) => {
    const res = await dispatch(
      adminFilterEvacuationRequest({
        status: "PENDING",
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setPendingEvacuationBodyData(requests);
      setPendingEvacuationPaginationData({ ...paginationData, date: payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterApprovedEvacuationRequest = async (date, page = 1) => {
    const res = await dispatch(
      adminFilterEvacuationRequest({
        status: "APPROVED",
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setApprovedEvacuationBodyData(requests);
      setApprovedEvacuationPaginationData({ ...paginationData, date: payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterRejectedEvacuationRequest = async (date, page = 1) => {
    const res = await dispatch(
      adminFilterEvacuationRequest({
        status: "REJECTED",
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { requests, ...paginationData } = res.payload.data;
      setRejectedEvacuationBodyData(requests);
      setRejectedEvacuationPaginationData({ ...paginationData, date: payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onRefresh = () => {
    fetchPendingEvacuationRequest();
    fetchAwaitingApprovalEvacuationRequest();
    fetchApprovedEvacuationRequest();
    fetchRejectedEvacuationRequest();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      title: "Incoming",
      data: pendingEvacuationBodyData,
      totalPages: pendingEvacuationPagintionData?.totalPages,
      paginationData: pendingEvacuationPagintionData,
      filterHandler: filterPendingEvacuationRequest,
      searchHandler: searchPendingEvacuationRequest,
      fetch: fetchPendingEvacuationRequest,
      columns: [
        {
          title: "Date",
          dataIndex: "updatedAt",
          key: "updatedAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },

        {
          title: "Agent's Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text, record) => <p>{record["collector"].fullname}</p>,
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          render: (text, record) => <p>{record["collector"].phone}</p>,
        },
        {
          title: "Location",
          dataIndex: "address",
          key: "address",
          render: (text, record) => <p>{record["collector"]?.address}</p>,
        },

        {
          title: "Waste Quantity",
          dataIndex: "totalWeight",
          key: "totalWeight",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/breakdown_request/${record?._id}`,
                    state: {
                      weight: record?.totalWeight,
                      date: record?.createdAt,
                      transactions: record?.transactions,
                      collectors: record?.collector,
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
            );
          },
        },
      ],
    },
    {
      title: "Awaiting Approval",
      data: awaitingApprovalEvacuationBodyData,
      totalPages: awaitingApprovalEvacuationPagintionData?.totalPages,
      paginationData: awaitingApprovalEvacuationPagintionData,
      filterHandler: filterAwaitingApprovalEvacuationRequest,
      searchHandler: searchAwatingApprovalEvacuationRequest,
      fetch: fetchAwaitingApprovalEvacuationRequest,
      columns: [
        {
          title: "Date",
          dataIndex: "updatedAt",
          key: "updatedAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },

        {
          title: "Agent's Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text, record) => <p>{record["collector"].fullname}</p>,
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          render: (text, record) => <p>{record["collector"].phone}</p>,
        },
        {
          title: "Location",
          dataIndex: "address",
          key: "address",
          render: (text, record) => <p>{record["collector"]?.address}</p>,
        },

        {
          title: "Waste Quantity",
          dataIndex: "totalWeight",
          key: "totalWeight",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/approval_breakdown_request/${record?._id}`,
                    state: {
                      weight: record?.totalWeight,
                      date: record?.createdAt,
                      transactions: record?.transactions,
                      collectors: record?.collector,
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
            );
          },
        },
      ],
    },

    {
      title: "Approved",
      data: approvedEvacuationBodyData,
      totalPages: approvedEvacuationPagintionData?.totalPages,
      paginationData: approvedEvacuationPagintionData,
      filterHandler: filterApprovedEvacuationRequest,
      searchHandler: searchApprovedEvacuationRequest,
      fetch: fetchApprovedEvacuationRequest,
      columns: [
        {
          title: "Date",
          dataIndex: "updatedAt",
          key: "updatedAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },

        {
          title: "Agent's Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text, record) => <p>{record["collector"].fullname}</p>,
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          render: (text, record) => <p>{record["collector"].phone}</p>,
        },
        {
          title: "Location",
          dataIndex: "address",
          key: "address",
          render: (text, record) => <p>{record["collector"]?.address}</p>,
        },

        {
          title: "Waste Quantity",
          dataIndex: "totalWeight",
          key: "totalWeight",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/approved_breakdown_request/${record?._id}`,
                    state: {
                      weight: record?.totalWeight,
                      date: record?.createdAt,
                      transactions: record?.transactions,
                      collectors: record?.collector,
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
            );
          },
        },
      ],
    },

    {
      title: "Rejected",
      data: rejectedEvacuationBodyData,
      totalPages: rejectedEvacuationPagintionData?.totalPages,
      paginationData: rejectedEvacuationPagintionData,
      filterHandler: filterRejectedEvacuationRequest,
      searchHandler: searchRejectedEvacuationRequest,
      fetch: fetchRejectedEvacuationRequest,
      columns: [
        {
          title: "Date",
          dataIndex: "updatedAt",
          key: "updatedAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },

        {
          title: "Agent's Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text, record) => <p>{record["collector"].fullname}</p>,
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
          render: (text, record) => <p>{record["collector"].phone}</p>,
        },
        {
          title: "Location",
          dataIndex: "address",
          key: "address",
          render: (text, record) => <p>{record["collector"]?.address}</p>,
        },

        {
          title: "Waste Quantity",
          dataIndex: "totalWeight",
          key: "totalWeight",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/rejected_breakdown_request/${record?._id}`,
                    state: {
                      weight: record?.totalWeight,
                      date: record?.createdAt,
                      transactions: record?.transactions,
                      collectors: record?.collector,
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
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <Tabcontent
        data={data}
        totalPages={totalPages}
        onRefresh={onRefresh}
        setCurrentPage={setCurrentPage}
        onSwitch={onSwitch}
      />
    </>
  );
};

export default AdminEvacuationRequest;
