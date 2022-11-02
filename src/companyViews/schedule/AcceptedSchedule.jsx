import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import Button from "../../components/UI/button";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCompanyAcceptedSchedule } from "../../store/actions";
import {
  searchCompanyAccepted,
  filterCompanyAccepted,
} from "../../store/actions/scheduleActions";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const { currentMonthAcceptedSchedule } = useSelector(
    (state) => state.schedules
  );
  const date = new Date();

  // deprecated
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
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Accepted By",
      dataIndex: "recycler",
      key: "recycler",
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
      searchCompanyAccepted({
        key,
        page,
      })
    );
    console.log(res, "res.payload.data");
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterCompanyAccepted({
        page,
        currentMonth: date,
      })
    );
    // console.log(res);
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setBodyData(companySchedules);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getCompanyAcceptedSchedule({
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
  console.log(bodyData, "bodyData");
  return (
    <>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        accepted
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
          paginationData={paginationData}
          totalPages={paginationData?.totalPages}
          onFetch={fetchAll}
        />
      </div>
    </>
  );
};

export default AcceptedSchedule;
