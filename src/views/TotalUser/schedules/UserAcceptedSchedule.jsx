import React, { useState, useEffect } from "react";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { UserContainer, NavBarLeft } from "../UserDetails";
import {
  userAcceptedSchedule,
  userSearchAcceptedSchedule,
} from "../../../store/actions";
import { useDispatch } from "react-redux";
import { truncate } from "../../../utils/constants";
import { Popover } from "antd";
import moment from "moment";
import { Tag, Space } from "antd";
import Button from "../../../components/UI/button";
import PickupModal from "../../../components/UI/PickupModal";

const UserAcceptedSchedule = ({ match }) => {
  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);

  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  const dispatch = useDispatch();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      userAcceptedSchedule({
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

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      userAcceptedSchedule({
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

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      userSearchAcceptedSchedule({
        key: key || "",
        page,
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

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
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
      title: "Accepted By",
      dataIndex: "recycler",
      key: "recycler",
    },
    {
      title: "Pickup Location",
      dataIndex: "address",
      key: "address",
      // render: (text) => <a>{text}</a>,
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
    <div>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        pending={false}
        accepted
      />

      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Accepted Schdeule"
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
    </div>
  );
};

export default UserAcceptedSchedule;
