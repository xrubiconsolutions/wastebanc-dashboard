import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import DataTable from "../../../components/UI/Table";
import { UserContainer, NavBarLeft } from "../UserDetails";
import {
  userMissedSchedule,
  userSearchMissedSchedule,
} from "../../../store/actions";
import { useDispatch } from "react-redux";
import PickupModal from "../../../components/UI/PickupModal";
import { Tag, Space } from "antd";
import { Popover } from "antd";
import { truncate } from "../../../utils/constants";
import moment from "moment";
import Button from "../../../components/UI/button";

const UserMissedSchedule = ({ match }) => {
  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const dispatch = useDispatch();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      userSearchMissedSchedule({
        page,
        key: key || "",
        id,
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
      userMissedSchedule({
        currentMonth: date,
        page,
        id,
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
      userMissedSchedule({
        currentMonth: payload,
        page,
        id,
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

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

    {
      title: "Pickup Location",
      dataIndex: "address",
      key: "address",
    },

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
      title: "Waste Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Missed By",
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

  return (
    <>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
        missed
      />

      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Missed Schedule"
            previous={previous}
          />
        </NavBarLeft>
      </UserContainer>
      <DataTable
        data={bodyData}
        columns={columns}
        header
        onFilter={onFilter}
        onSearch={onSearch}
        onRefresh={onRefresh}
        // setCurrentPage={setCurrentPage}
        totalPages={paginationData?.totalPages}
        paginationData={paginationData}
        onFetch={fetchAll}
      />
    </>
  );
};

export default UserMissedSchedule;
