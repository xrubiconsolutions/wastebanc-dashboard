import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import PendingModal from "../../components/UI/PendingModal";
import { infoData, truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  currentMonthCancelled,
  filterCancelled,
  searchCancelled,
} from "../../store/actions";
import PickupModal from "../../components/UI/PickupModal";

const CancelledSchedule = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showPending, setShowPending] = useState(false);
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
  const [paginationData, setPaginationData] = useState();
  const [showModal, setShowModal] = useState(false);

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  // const onSearch = async (searchQuery) => {
  //   const payload = {
  //     page: currentPage,
  //     searchQuery: searchQuery || "",
  //   };
  //   const res = await dispatch(searchCancelled(payload));
  //   setBodyData(res?.payload?.data?.schedules);
  // };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchCancelled({
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

  // const onFilter = async (date) => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth: date,
  //   };
  //   const res = await dispatch(filterCancelled(payload));
  //   setBodyData(res?.payload?.data?.schedules);
  //   setTotalPages(res?.payload?.data?.totalResult);
  // };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterCancelled({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setBodyData(schedules);
      setPaginationData({ ...paginationData, date });
    }
  };

  // const fetchAll = async (page = 1) => {
  //   const res = await dispatch(
  //     filterCancelled({
  //       currentMonth: payload,
  //       page,
  //     })
  //   );

  //   if (!res.error) {
  //     const { schedules, ...paginationData } = res.payload.data;
  //     setBodyData(schedules);
  //     setPaginationData({ ...paginationData, date: payload });
  //   }
  // };

  // // const onFilter = async (date) => {
  // //   const res = await dispatch(filterCancelled(date));
  // //   setBodyData(res?.payload?.data?.schedules);
  // // };

  // const onRefresh = () => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(currentMonthCancelled(payload));
  // };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      filterCancelled({
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
  const { currentMonthCancelledSchedule } = thisMonth;

  // useEffect(() => {
  //   if (!currentMonthCancelledSchedule) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(currentMonthCancelled(payload));
  //   } else {
  //     setBodyData(currentMonthCancelledSchedule?.schedules);
  //   }
  // }, []);

  // useEffect(() => {
  //   setBodyData(currentMonthCancelledSchedule?.schedules);
  //   setTotalPages(currentMonthCancelledSchedule?.totalResult);
  // }, [currentMonthCancelledSchedule]);

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
            return <Tag key={waste}>{waste.name || waste}</Tag>;
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
              // console.log(record.info);
            }}
          >
            See More
          </Button> */}

          <Button
            type=""
            onClick={() => {
              setRowInfo(record);
              setShowModal(true);
              // console.log(record.info);
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
          // totalPages={totalPages}
          totalPages={paginationData?.totalPages}
          paginationData={paginationData}
          onFetch={fetchAll}
        />
      </div>
    </>
  );
};

export default CancelledSchedule;
