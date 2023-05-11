import { Popover, Space, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import ContentCard from "../components/UI/ContentCard";
import Disable from "../components/UI/Disable";
import Filter from "../components/UI/Filter";
import Tabcontent from "../components/UI/TabContent";
import StyledButton from "../components/UI/btn";
import { chunk, formatValue } from "../utils";
import { claimPermissions, infoData, truncate } from "../utils/constants";
import { CardDashbordDetails } from "../utils/data";

import { MapWrapper } from "../components/GoogleMaps/Map";
import Location from "../components/UI/Location";
import NewAggregators from "../components/UI/NewAggregators";
import NewUserModal from "../components/UI/NewUserModal";
import PickupModal from "../components/UI/PickupModal";
import Modal from "../components/UI/modal";
import {
  FilterNewAggregators,
  FilterNewUsers,
  FilterNewWastePickers,
  SearchNewAggregators,
  SearchNewUsers,
  SearchNewWastePickers,
  filterMatrix,
  getFilteredRecentPickups,
  getNewAggregators,
  getNewUsers,
  getRecentPickups,
  getWastePickers,
  getcurrentMonthMatrix,
  searchRecentPickups,
} from "../store/actions";

const colors = [
  "#00966D",
  "#5D5FEF",
  "#009A00",
  "#EF5DA8",
  "#009A00",
  "#F5000F",
  "#006700",
  "#FE0110",
];
const DashbordContainer = styled.div`
  ${tw`space-y-4`}
`;
const Vector = styled.div`
  ${tw`flex justify-between items-center px-4 py-3`}
`;

const Dashbord = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setNewModal] = useState(false);
  const [showAggModal, setAggModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pickupPagination, setPickupPagination] = useState();
  const [newUserPagination, setNewUserPagination] = useState();
  const [newAggregatorPagination, setNewAggregatorPagination] = useState();
  const [newPickerPagination, setNewPickerPagination] = useState();
  const [bodyData, setBodyData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [tableBody2, setTableBody2] = useState([]);
  const [tableBody3, setTableBody3] = useState([]);
  const [tableBody4, settableBody4] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [markerId, setMarkerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const date = new Date();
  const dispatch = useDispatch();
  let dtFilter = [];
  // const currentMonth = {
  //   start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
  //     "YYYY-MM-DD"
  //   ),
  //   end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
  //     "YYYY-MM-DD"
  //   ),
  // };

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const handlePickupFilter = async (date, page = 1) => {
    const res = await dispatch(
      getFilteredRecentPickups({ currentMonth: date, page })
    );
    const { schedules, ...paginationData } = res.payload.data;
    console.log(res.payload.data, "res.payload.data");
    setTableBody(schedules);
    setPickupPagination({ ...paginationData, date });
    setTotalPages(paginationData.totalPages);
  };

  const handlePickupSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchRecentPickups({
        // currentMonth: payload,
        key,
        page,
      })
    );
    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setTableBody(schedules);
      setPickupPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const handleNewUsersFilter = async (date, page = 1) => {
    const res = await dispatch(FilterNewUsers({ currentMonth: date, page }));
    const { users, ...paginationData } = res.payload.data;
    setTableBody2(users);
    setNewUserPagination({ ...paginationData, date });
  };

  const handleNewUsersSearch = async (key, page = 1) => {
    const res = await dispatch(
      SearchNewUsers({
        // currentMonth: payload,
        key,
        page,
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setTableBody2(users);
      setNewUserPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const handleNewAggregatorsFilter = async (date, page = 1) => {
    const res = await dispatch(
      FilterNewAggregators({
        currentMonth: date,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody3(collectors);
      setNewAggregatorPagination({ ...paginationData, date });
      // setTotalPages(paginationData.totalPages);
    }
  };

  const handleNewAggregatorsSearch = async (key, page = 1) => {
    const res = await dispatch(
      SearchNewAggregators({
        //  currentMonth: payload,
        key,
        page,
      })
    );

    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody3(collectors);
      setNewAggregatorPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const {
    currentMonthCardContent,
    recentPickup,
    newUsers,
    newAggregator,
    newWastePickers,
  } = useSelector((state) => state.dashboard);

  const {
    userInfo: { claims },
  } = useSelector((state) => state.auth);

  // initial data

  const fetchRecent = async (page = 1) => {
    const res = await dispatch(
      getRecentPickups({
        ...payload,
        page,
      })
    );

    if (!res.error) {
      const { schedules, ...paginationData } = res.payload.data;
      setTableBody(schedules);
      setPickupPagination({ ...paginationData, date: payload });
    }
  };

  const fetchNewUser = async (page = 1) => {
    const res = await dispatch(
      getNewUsers({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setTableBody2(users);
      setNewUserPagination({ ...paginationData, date: payload });
    }
  };

  const fetchNewCollector = async (page = 1) => {
    const res = await dispatch(
      getNewAggregators({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody3(collectors);
      setNewAggregatorPagination(paginationData);
    }
  };
  // /////////////////////////

  const openInfo = (mark, markId) => {
    setMarkerId(markId);
    setIsOpen(mark);
  };

  useEffect(() => {
    if (!currentMonthCardContent) dispatch(getcurrentMonthMatrix(payload));
    if (!recentPickup) setTableBody(recentPickup);

    if (!newUsers) setTableBody2(newUsers);
    if (!newAggregator) setTableBody3(newAggregator);
    // if (!newWastePickers) {
    //   const payload = {
    //     page: currentPage,
    //     currentMonth,
    //   };
    //   dispatch(getWastePickers(payload));
    // }
  }, [recentPickup, newUsers, newUsers, currentMonthCardContent]);

  const data = [
    {
      title: "Recent Pickups",
      link: "Recent Pickups",
      data: tableBody,
      totalPages: pickupPagination?.totalPages,
      paginationData: pickupPagination,
      filterHandler: handlePickupFilter,
      searchHandler: handlePickupSearch,
      fetch: fetchRecent,
      columns: [
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
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "PickUp Date",
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
      title: "New Users",
      link: "New Users",
      data: tableBody2,
      totalPages: newUserPagination?.totalPages,
      paginationData: newUserPagination,
      filterHandler: handleNewUsersFilter,
      searchHandler: handleNewUsersSearch,
      fetch: fetchNewUser,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "LGA / LCDA",
          dataIndex: "lcd",
          key: "lcd",
        },
        {
          title: "Customer Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
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
                  setNewModal(true);
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
      title: "New Aggregators",
      link: "New Aggregators",
      // data: newAggregator?.collectors,
      data: tableBody3,
      totalPages: newAggregatorPagination?.totalPages,
      paginationData: newAggregatorPagination,
      filterHandler: handleNewAggregatorsFilter,
      searchHandler: handleNewAggregatorsSearch,
      fetch: fetchNewCollector,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
        },
        {
          title: "Aggerator Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Verified",
          dataIndex: "verified",
          key: "verified",
          render: (text) => (
            <p className="text-secondary font-bold">
              {text === false ? "not verified" : "verified"}
            </p>
          ),
        },
        {
          title: "Date",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
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
                  setAggModal(true);
                }}
              >
                See More
              </StyledButton>
            </Space>
          ),
        },
      ],
    },
    // {
    //   title: "New Waste Pickers",
    //   link: "New Waste Pickers",
    //   data: wasteData,
    //   filterHandler: handleNewUsersFilter,
    //   searchHandler: handleNewUsersSearch,
    //   // filterHandler: handleNewWastePickersFilter ,
    //   // searchHandler: handleNewWastePickersSearch ,

    //   columns: [
    //     {
    //       title: "Full Name",
    //       dataIndex: "fullname",
    //       key: "fullname",
    //     },
    //     {
    //       title: "Organization",
    //       dataIndex: "org",
    //     },
    //     {
    //       title: "Customer Phone",
    //       dataIndex: "phone",
    //       key: "phone",
    //     },
    //     {
    //       title: "Gender",
    //       dataIndex: "gender",
    //       key: "gender",
    //     },
    //     // {
    //     //   title: "Verified",
    //     //   dataIndex: "verified",
    //     //   key: "verified",
    //     //   render: (text) => (
    //     //     <p className="text-secondary font-bold">
    //     //       {text === false ? "not verified" : "verified"}
    //     //     </p>
    //     //   ),
    //     // },
    //     // {
    //     //   title: "Date",
    //     //   dataIndex: "createdAt",
    //     //   key: "createdAt",
    //     //   render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    //     // },
    //     {
    //       title: "Action",
    //       dataIndex: "action",
    //       key: "action",
    //       render: (text, record) => (
    //         <Space size="middle">
    //           <StyledButton
    //             type=""
    //             buttonStyle="btn--primary--outline"
    //             buttonSize="btn--small"
    //             // onClick={() => {
    //             //   setRowInfo(record);
    //             //   setNewModal(true);
    //             // }}
    //           >
    //             Assign
    //           </StyledButton>
    //           <Vector
    //             onClick={() => {
    //               setSelectedInfo(record);
    //             }}
    //           >
    //             <Disable data={selectedInfo} onRefresh={onRefresh} />
    //           </Vector>
    //         </Space>
    //       ),
    //     },
    //   ],
    // },
  ];

  /****************************
   *
   * handler functions and utils
   *
   ****************************/

  const financePermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.FINANCIALS.title
  );
  // from here
  const ff = (actualArr, data) => {
    const newData = [...actualArr];
    // be careful with object manipulations, do not try to mutate the instance
    // of object an saved in a component state, just like the returned result of this function
    // rather, create the object copy (shallow copy would suffice here) and make mutations as fit
    // then return the modified copy
    newData[0].amount = data && formatValue(data?.totalDropOff);
    newData[1].amount = data && `${formatValue(data?.totalWastes)} Kg`;
    newData[2].amount = data && formatValue(data?.totalOrganisation);
    newData[3].amount = data && formatValue(data?.totalInsuranceUsers);
    newData[4].amount = data && formatValue(data?.totalSchedules);
    // newData[4].amount = data && formatValue(0);
    newData[5].amount = data && formatValue(data?.totalPending);
    newData[5].progress =
      data && formatValue((data?.totalPending * 100) / data?.totalSchedules);
    newData[6].amount = data && formatValue(data?.totalCompleted);
    newData[6].progress =
      data && formatValue((data?.totalCompleted * 100) / data?.totalSchedules);
    newData[7].amount = data && formatValue(data?.totalMissed);
    newData[7].progress =
      data && formatValue((data?.totalMissed * 100) / data?.totalSchedules);
    newData[8].schedules = data?.schedules;
    if (!financePermissions.read) {
      newData.splice(2, 1);
    }
    return newData;
  };

  useEffect(() => {
    const dt = ff(CardDashbordDetails, currentMonthCardContent);
    setBodyData(dt);
  }, [currentMonthCardContent]);

  const onFilter = async (date) => {
    const res = await dispatch(filterMatrix(date));
    dtFilter = ff(CardDashbordDetails, res?.payload?.data);
    setBodyData(dtFilter);
  };

  const onRefresh = () => {
    dispatch(getcurrentMonthMatrix(payload));
    fetchRecent();
    fetchNewUser();
    fetchNewCollector();
  };
  useEffect(() => {
    onRefresh();
  }, []);

  /****************************
   *
   * lifecycle hooks
   *
   * takes in any object as an argument
   ****************************/
  const tableList = bodyData.slice(0, -1);
  return (
    <>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
        dashboard
      />
      <NewUserModal
        showNewModal={showNewModal}
        setNewModal={setNewModal}
        data={rowInfo}
        userData={rowInfo}
      />
      <NewAggregators
        showAggModal={showAggModal}
        setAggModal={setAggModal}
        data={rowInfo}
        userData={rowInfo}
      />

      <DashbordContainer>
        {/* <DashboardAction> */}
        <Location />
        <Filter onFilter={onFilter} />
        {/* </DashboardAction> */}

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {bodyData &&
            bodyData.length > 0 &&
            tableList?.map((el, i) => {
              return (
                <ContentCard
                  ImgUrl={el.icon}
                  title={el.title}
                  // amount={Result[el.key]}
                  // amount={formatValue(el.amount)}
                  amount={el.amount}
                  link={el.link}
                  // progress={el.progress}
                  style={{ color: colors[i] }}
                  key={i}
                />
              );
            })}
        </div>
        {/* <Map /> */}
        <MapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{ height: `600px` }}
              className="map-canvas"
              id="map-canvas"
            />
          }
          // schedulesLocation={currentMonthCardContent?.schedules}
          schedulesLocation={bodyData[8]?.schedules}
          markerId={markerId}
          isOpen={isOpen}
          openInfo={openInfo}
          mapElement={
            <div style={{ height: `100%`, borderRadius: "inherit" }} />
          }
        />
        <Tabcontent
          data={data}
          // onSwitch={onSwitch}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onRefresh={onRefresh}
        />
      </DashbordContainer>
    </>
  );
};

export default Dashbord;
