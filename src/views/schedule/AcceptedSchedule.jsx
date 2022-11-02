import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import InfoModal from "../../components/UI/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMonthAccepted,
  filterAccepted,
  searchAccepted,
} from "../../store/actions";
import moment from "moment";
import { truncate } from "../../utils/constants";
import PickupModal from "../../components/UI/PickupModal";

const AcceptedSchedule = () => {
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

  const [paginationData, setPaginationData] = useState();

  // for payload
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchAccepted({
        key: key || "",
        page,
      })
    );

    console.log("Responses", res);
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setBodyData(schedules);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterAccepted({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setBodyData(schedules);
      // console.log(paginationData);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      currentMonthAccepted({
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
  const { currentMonthAcceptedSchedule } = thisMonth;

  // useEffect(() => {
  //   if (!currentMonthAcceptedSchedule) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(currentMonthAccepted(payload));
  //   } else {
  //     setBodyData(currentMonthAcceptedSchedule?.schedules);
  //   }
  // }, []);

  // console.log(currentMonthAcceptedSchedule, "currentMonthAcceptedSchedule");

  // useEffect(() => {
  //   setBodyData(currentMonthAcceptedSchedule?.schedules);
  //   setTotalPages(currentMonthAcceptedSchedule?.totalResult);
  // }, [currentMonthAcceptedSchedule]);

  const columns = [
    {
      title: "Schedule Creator",
      dataIndex: "scheduleCreator",
      key: "scheduleCreator",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Waste Category",
      dataIndex: "categories",
      key: "categories",
      // render: (text) => <a>{text}</a>,

      // dataIndex: "wastes",
      // key: "wastes",
      render: (wastes) => (
        <span>
          {wastes?.map((waste) => {
            return <Tag key={waste}>{waste?.name || waste}</Tag>;
          })}
        </span>
      ),
    },
    // {
    //   title: "Waste Category",
    //   dataIndex: "wastes",
    //   key: "wastes",
    //   render: (wastes) => (
    //     <span>
    //       {wastes?.map((waste) => {
    //         return <Tag key={waste}>{waste.toUpperCase()}</Tag>;
    //       })}
    //     </span>
    //   ),
    // },
    {
      title: "Pickup Location",
      dataIndex: "address",
      key: "address",
      render: (text) => <p>{truncate(text, 30)}</p>,
    },
    {
      title: "Organization",
      dataIndex: "organisation",
      key: "organisation",
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
          {/* <a>See More</a> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
      /> */}

      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        pending
        accepted
      />
      <div>
        <DataTable
          data={bodyData || []}
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

export default AcceptedSchedule;
