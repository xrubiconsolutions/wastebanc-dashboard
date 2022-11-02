import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import { truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  currentMonthPending,
  filterPending,
  searchPending,
} from "../../store/actions";
import PendingModal from "../../components/UI/PendingModal";
import PickupModal from "../../components/UI/PickupModal";

const PendingSchedule = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showPending, setShowPending] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState();
  const date = new Date();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });

  const [showModal, setShowModal] = useState(false);

  const onSearch = async (searchQuery) => {
    const payload = {
      page: currentPage,
      searchQuery: searchQuery || "",
    };
    const res = await dispatch(searchPending(payload));
    setBodyData(res?.payload?.data?.schedules);
    setTotalPages(res?.payload?.data?.totalResult);
  };

  const onFilter = async (date) => {
    // const payload ={
    //   page: currentPage,
    //   date,
    // }
    const res = await dispatch(filterPending(date));
    setBodyData(res?.payload?.data?.schedules);
    setTotalPages(res?.payload?.data?.totalResult);
  };

  const onRefresh = () => {
    dispatch(currentMonthPending(currentMonth));
  };

  const thisMonth = useSelector((state) => state?.schedules);
  const { currentMonthPendingSchedule } = thisMonth;

  useEffect(() => {
    if (!currentMonthPendingSchedule) {
      // const payload = {
      //   page: currentPage,
      //   currentMonth,
      // };
      dispatch(currentMonthPending(currentMonth));
    } else {
      setBodyData(currentMonthPendingSchedule?.schedules);
    }
  }, []);

  useEffect(() => {
    setBodyData(currentMonthPendingSchedule?.schedules);
    setTotalPages(currentMonthPendingSchedule?.totalPages);
  }, [currentMonthPendingSchedule]);

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <p>{truncate(text, 30)}</p>,
    },

    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

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
          {(wastes.slice(0, 3) || []).map((waste) => {
            return <Tag key={waste}>{waste?.name || waste}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Waste Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Pickup Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            type=""
            onClick={() => {
              setRowInfo(record);
              setShowPending(true);
            }}
          >
            See More
          </Button> */}

          <Button
            type=""
            onClick={() => {
              setRowInfo(record);
              setShowModal(true);
            }}
          >
            See More
          </Button>

          {/* <a>See More</a> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* <PendingModal
        showPending={showPending}
        setShowPending={setShowPending}
        data={rowInfo}
        userData={rowInfo}
      /> */}
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
        pending
      />
      <div>
        <DataTable
          data={bodyData}
          columns={columns}
          // header
          raffle
          onSearch={onSearch}
          setCurrentPage={setCurrentPage}
          onFilter={onFilter}
          onRefresh={onRefresh}
          totalPages={totalPages}
          nopagination
        />
      </div>
    </>
  );
};

export default PendingSchedule;
