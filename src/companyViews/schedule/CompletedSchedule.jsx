import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import {
  filterCompanyCompleted,
  searchCompanyCompleted,
  getCompanyCompletedSchedule,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PickupModal from "../../components/UI/PickupModal";
import { truncate } from "../../utils/constants";

const CompletedSchedule = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const { currentMonthCompletedSchedule } = useSelector(
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
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Completed By",
      dataIndex: "recycler",
      key: "recycler",
    },

    // {
    //   title: "Completed By",
    //   dataIndex: "completed",
    //   key: "completed",
    // },
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
      searchCompanyCompleted({
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
      filterCompanyCompleted({
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
      getCompanyCompletedSchedule({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData });
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
        completed
      />
      <div>
        <DataTable
          data={bodyData}
          columns={columns}
          header
          onFilter={onFilter}
          onSearch={onSearch}
          setCurrentPage={setCurrentPage}
          onFetch={fetchAll}
          onRefresh={onRefresh}
          paginationData={paginationData}
          totalPages={paginationData?.totalPages}
        />
      </div>
    </>
  );
};

export default CompletedSchedule;
