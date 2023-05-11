import React, { useState, useEffect } from "react";
import DataTable from "../../../components/UI/Table";
import { UserContainer, NavBarLeft } from "../UserDetails";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import Tabcontent from "../../../components/UI/TabContent";
import { useDispatch } from "react-redux";

import {
  totalUsersCompletedPickupSchedule,
  totalUsersPickupSearchSchedules,
  totalUsersCompletedDropoffSchedule,
  totalUsersDropoffSearchSchedules,
} from "../../../store/actions";
import moment from "moment";
import { Space, Tag, Popover } from "antd";
import StyledButton from "../../../components/UI/btn";
import PickupModal from "../../../components/UI/PickupModal";
import { truncate } from "../../../utils/constants";

const UserCompletedSchedule = ({ match }) => {
  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  const [bodyData, setBodyData] = useState();
  const [pickupBodyData, setPickupBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [pickuppaginationData, setPickupPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [pickuptotalPages, setPickupTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);

  const dispatch = useDispatch();
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearchDropoff = async (key, page = 1) => {
    const res = await dispatch(
      totalUsersDropoffSearchSchedules({
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

  const onSearchPickups = async (key, page = 1) => {
    const res = await dispatch(
      totalUsersPickupSearchSchedules({
        key: key || "",
        page,
        id,
      })
    );

    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setPickupBodyData(schedules);
      setPickupPaginationData({ ...paginationData, key });
      setPickupTotalPages(paginationData.totalPages);
    }
  };

  const onFilterDropoff = async (date, page = 1) => {
    const res = await dispatch(
      totalUsersCompletedDropoffSchedule({
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

  const onFilterPickups = async (date, page = 1) => {
    const res = await dispatch(
      totalUsersCompletedPickupSchedule({
        currentMonth: date,
        page,
        id,
      })
    );
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setPickupBodyData(schedules);

      setPickupPaginationData({ ...paginationData, date });
      setPickupTotalPages(paginationData.totalPages);
    }
  };

  const fetchAllDropoff = async (page = 1) => {
    const res = await dispatch(
      totalUsersCompletedDropoffSchedule({
        currentMonth: payload,
        page,
        id,
      })
    );

    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData, date: payload });
    }
  };
  const fetchAllPickups = async (page = 1) => {
    const res = await dispatch(
      totalUsersCompletedPickupSchedule({
        currentMonth: payload,
        page,
        id,
      })
    );

    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;

      setPickupBodyData(schedules);
      setPickupPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchAllDropoff();
    fetchAllPickups();

    console.log("resfressssh");
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      title: "Pickup",
      data: pickupBodyData,
      totalPages: pickuptotalPages,
      paginationData: pickuppaginationData,
      filterHandler: onFilterPickups,
      searchHandler: onSearchPickups,
      fetch: fetchAllPickups,

      columns: [
        {
          title: "Date",
          dataIndex: "pickupDate",
          key: "pickupDate",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Waste Categories",
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
          title: "Pickup Location",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Waste Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Completed By",
          dataIndex: "fullname",
          key: "fullname",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  setRowInfo(record);
                  setShowModal(true);
                }}
              >
                See More
              </StyledButton>
              {/* <a>See More</a> */}
            </Space>
          ),
        },
      ],
    },
    {
      title: "Drop off",
      data: bodyData,
      totalPages: totalPages,
      paginationData: paginationData,
      filterHandler: onFilterDropoff,
      searchHandler: onSearchDropoff,
      fetch: fetchAllDropoff,

      columns: [
        {
          title: "Date",
          dataIndex: "dropoffDate",
          key: "dropoffDate",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
        {
          title: "Recycling Company",
          dataIndex: "organisation",
          key: "organisation",
        },
        {
          title: "Waste Categories",
          dataIndex: "categories",
          key: "categories",

          render: (categories) => (
            <span>
              {(categories?.slice(0, 3) || [])?.map((waste) => {
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
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  setRowInfo(record);
                  setShowModal(true);
                }}
              >
                See More
              </StyledButton>
              {/* <a>See More</a> */}
            </Space>
          ),
        },
      ],
    },
  ];

  return (
    <div>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        totalusercompleted
      />

      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Completed Schdeule"
            previous={previous}
          />
        </NavBarLeft>
      </UserContainer>
      <Tabcontent
        data={data}
        totalPages={totalPages}
        onRefresh={onRefresh}
        // setCurrentPage={setCurrentPage}
        // onSwitch={onSwitch}
      />
    </div>
  );
};

export default UserCompletedSchedule;
