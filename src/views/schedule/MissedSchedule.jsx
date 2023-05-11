import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import PendingModal from "../../components/UI/PendingModal";
import PickupModal from "../../components/UI/PickupModal";
import { infoData, truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Popover } from "antd";
import {
  currentMonthMissed,
  filterMissed,
  searchMissed,
} from "../../store/actions";

const MissedSchedule = () => {
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
  const [paginationData, setPaginationData] = useState();
  const [showModal, setShowModal] = useState();

  const d = new Date();
  d.setDate(d.getDate());

  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchMissed({
        key,
        page,
      })
    );
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setBodyData(schedules);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterMissed({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setBodyData(schedules);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      currentMonthMissed({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setBodyData(schedules);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const thisMonth = useSelector((state) => state?.schedules);
  const { currentMonthMissedSchedule } = thisMonth;

  const columns = [
    {
      title: "Pickup Location",
      dataIndex: "address",
      key: "address",
      render: (text) => <p>{truncate(text, 30)}</p>,
    },
    // {
    //   title: "Waste Category",
    //   dataIndex: "categories",
    //   key: "categories",
    //   render: (wastes) => (
    //     <span>
    //       {(wastes?.slice(0, 3) || []).map((waste) => {
    //         return <Tag key={waste}>{waste?.name || waste}</Tag>;
    //       })}
    //     </span>
    //   ),
    // },

    {
      title: "Waste Category",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => (
        <span>
          {(categories.slice(0, 3) || []).map((waste) => {
            return (
              <Tag key={waste}>
                <Popover content={waste?.name || waste}>
                  {truncate(waste?.name, 10)}
                </Popover>
              </Tag>
            );
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
        userData={rowInfo}
        pending
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
