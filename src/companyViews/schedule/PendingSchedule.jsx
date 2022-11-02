import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import { infoData, truncate } from "../../utils/constants";
import PickupModal from "../../components/UI/PickupModal";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyPendingSchedules } from "../../store/actions";
import moment from "moment";

const PendingSchedule = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
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

  const { currentMonthPendingSchedule } = useSelector(
    (state) => state.schedules
  );

  const onRefresh = () => {
    dispatch(getCompanyPendingSchedules());
  };
  useEffect(() => {
    if (!currentMonthPendingSchedule) {
      dispatch(getCompanyPendingSchedules());
    } else {
      setBodyData(currentMonthPendingSchedule?.schedules);
    }
  }, []);

  useEffect(() => {
    setBodyData(currentMonthPendingSchedule);
  }, [currentMonthPendingSchedule]);

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
      title: "Waste Quantity (bags)",
      dataIndex: "quantity",
      key: "quantity",
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

  const matchQuery = (regex, obj, fields) => {
    // test the object if it matches the regex pattern
    for (let k of fields) {
      let key = obj[k];
      if (typeof key === "object" && key.length > 0) key = obj[k].join(", ");

      if (regex.test(key)) return true;
    }
  };

  const onSearch = async (searchQuery) => {
    const fields = ["address", "client", "lcd", "Category", "categories"];
    const regex = new RegExp(`.*${searchQuery}.*`, "i");
    const results = currentMonthPendingSchedule.filter((schedule) =>
      matchQuery(regex, schedule, fields)
    );
    setBodyData(results);
  };

  useEffect(() => {
    if (!currentMonthPendingSchedule) dispatch(getCompanyPendingSchedules());
  }, []);

  useEffect(() => {
    setBodyData(currentMonthPendingSchedule);
  }, [currentMonthPendingSchedule]);
  // console.log(currentMonthPendingSchedule, "pending");

  return (
    <>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        pending
      />
      <div>
        <DataTable
          data={bodyData}
          columns={columns}
          // header
          onSearch={onSearch}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          nopagination
        />
      </div>
    </>
  );
};

export default PendingSchedule;
