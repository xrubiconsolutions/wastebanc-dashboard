import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCompanyCancelled,
  getCompanyCancelledSchedule,
  searchCompanyCancelled,
} from "../../store/actions";
import moment from "moment";
import PickupModal from "../../components/UI/PickupModal";
import { truncate } from "../../utils/constants";

const CancelledSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [bodyData, setBodyData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState();

  const dispatch = useDispatch();
  const { currentMonthCancelledSchedule } = useSelector(
    (state) => state.schedules
  );
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
      render: (text) => <p>{truncate(text, 30)}</p>,
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
      title: "Cancelled By",
      dataIndex: "scheduleCreator",
      key: "scheduleCreator",
    },
    {
      title: "Reasons",
      dataIndex: "cancelReason",
      key: "cancelReason",
      render: (text) => <p>{truncate(text, 30)}</p>,
      // render: (text) => {
      //   <p>{text == "" ? "Unavailable" : text}</p>;
      // },
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

  // const onSearch = async (searchQuery) => {
  //   const res = await dispatch(searchCompanyCancelled(searchQuery));
  //   setBodyData(res?.payload?.data?.companySchedules);
  // };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchCompanyCancelled({
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
      filterCompanyCancelled({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData, date });
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getCompanyCancelledSchedule({
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
        cancelled
      />
      <div>
        <DataTable
          data={bodyData}
          columns={columns}
          header
          onFilter={onFilter}
          onSearch={onSearch}
          setCurrentPage={setCurrentPage}
          paginationData={paginationData}
          totalPages={paginationData?.totalPages}
          onRefresh={onRefresh}
        />
      </div>
    </>
  );
};

export default CancelledSchedule;
