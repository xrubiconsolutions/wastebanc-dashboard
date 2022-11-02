import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import {
  filterCompanyMissed,
  getCompanyMissedSchedule,
  searchCompanyMissed,
} from "../../store/actions";
import PickupModal from "../../components/UI/PickupModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const MissedSchedule = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();

  const { currentMonthMissedSchedule } = useSelector(
    (state) => state.schedules
  );
  const date = new Date();
  const currentMonth = {
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  };

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const columns = [
    {
      title: "Pickup Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Waste Category",
      dataIndex: "categories",
      key: "categories",
      render: (wastes) => (
        <span>
          {wastes.map((waste) => (
            <Tag key={waste}>{waste?.name || waste}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: "Missed By",
      dataIndex: "recycler",
      key: "recycler",
    },
    {
      title: "Reasons",
      dataIndex: "cancelReason",
      key: "cancelReason",
      render: (text) => {
        return <p>{text == "" ? "Unavailable" : text}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              setRowInfo(record);
              setShowModal(true);
            }}
          >
            See More
          </Button>
        </Space>
      ),
    },
  ];

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchCompanyMissed({
        key,
        page,
      })
    );
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterCompanyMissed({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getCompanyMissedSchedule({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        missed
      />
      <div>
        <DataTable
          data={bodyData}
          columns={columns}
          header
          onFilter={onFilter}
          onSearch={onSearch}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          totalPages={paginationData?.totalPages}
          paginationData={paginationData}
          onFetch={fetchAll}
        />
      </div>
    </>
  );
};

export default MissedSchedule;
