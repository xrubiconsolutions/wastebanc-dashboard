import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import InfoModal from "../../components/UI/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { Link } from "react-router-dom";

const EvacuationRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState("0");

  const d = new Date();

  d.setDate(d.getDate());
  const payload = {
    start: "2020-01-01",
    end: d,
  };

  const data = [
    {
      title: "Incoming",
      data: "",
      totalPages: "",
      paginationData: "",
      filterHandler: "",
      searchHandler: "",
      fetch: "",

      columns: [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Agent's Name",
          dataIndex: "agent",
          key: "agent",
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },

        {
          title: "Waste Quantity",
          dataIndex: "quantity",
          key: "quantity",
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
                    pathname: `/user/evacuation_breakdown/${record.id}`,
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
      data: "",
      totalPages: "",
      paginationData: "",
      filterHandler: "",
      searchHandler: "",
      fetch: "",
      columns: [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Agent's Name",
          dataIndex: "agent",
          key: "agent",
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },

        {
          title: "Waste Quantity",
          dataIndex: "quantity",
          key: "quantity",
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
                    pathname: ``,
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
      data: "",
      totalPages: "",
      paginationData: "",
      filterHandler: "",
      searchHandler: "",
      fetch: "",
      columns: [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Agent's Name",
          dataIndex: "agent",
          key: "agent",
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },

        {
          title: "Waste Quantity",
          dataIndex: "quantity",
          key: "quantity",
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
                    pathname: ``,
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
      data: "",
      totalPages: "",
      paginationData: "",
      filterHandler: "",
      searchHandler: "",
      fetch: "",
      columns: [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },

        {
          title: "Agent's Name",
          dataIndex: "agent",
          key: "agent",
        },

        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },

        {
          title: "Waste Quantity",
          dataIndex: "quantity",
          key: "quantity",
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
                    pathname: ``,
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

  const onRefresh = () => {};

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

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

export default EvacuationRequest;
