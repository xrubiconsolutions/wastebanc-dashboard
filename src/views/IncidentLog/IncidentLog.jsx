import React, { useEffect, useState } from "react";
import { Space } from "antd";
import StyledButton from "../../components/UI/btn";
import DataTable from "../../components/UI/Table";
import IncidentModal from "../../components/UI/IncidentModal";
import {
  filterReportLog,
  ReportLog,
  searchReportLog,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const IncidentLog = () => {
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });
  const onSearch = async (searchQuery) => {
    const payload = {
      page: currentPage,
      searchQuery: searchQuery || "",
    };
    const res = await dispatch(searchReportLog(payload));
    setBodyData(res?.payload?.data?.incidents);
  };

  const onFilter = async (date, page) => {
    const res = await dispatch(filterReportLog(date));
    setBodyData(res?.payload?.data?.incidents);
  };

  const onRefresh = () => {
    dispatch(ReportLog(currentMonth));
  };

  const thisMonth = useSelector((state) => state?.report);
  const { incidentLog } = thisMonth;

  useEffect(() => {
    if (!incidentLog) {
      dispatch(ReportLog(currentMonth));
    } else {
      setBodyData(incidentLog);
    }
  }, []);

  useEffect(() => {
    setBodyData(incidentLog);
  }, [incidentLog]);

  const columns = [
    {
      title: "Customer Number",
      dataIndex: "userPhoneNo",
      key: "userPhoneNo",
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
              setRowInfo(record);
              setShowModal(true);
            }}
          >
            See More
          </StyledButton>
          {/* </Link> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <IncidentModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
      />
      <DataTable
        data={bodyData}
        columns={columns}
        onRefresh={onRefresh}
        onSearch={onSearch}
        onFilter={onFilter}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        header
      />
    </>
  );
};

export default IncidentLog;
