import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Tag, Space } from "antd";
import { truncate } from "../utils/constants";
import StyledButton from "../components/UI/btn";
import Filter from "../components/UI/Filter";
import { CardDashbordDetails } from "../companyViews/utils/data";
import { chunk, formatValue } from "../utils";
import ContentCard from "../components/UI/ContentCard";
import Tabcontent from "../components/UI/TabContent";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getCompanyMatrix,
  getCompanyPendingSchedules,
  getCompanyRecentPickups,
  getFilteredCompanyMatrix,
  getFilteredCompanyRecentPickups,
  searchCompanyPickups,
} from "../store/actions";
import { MapWrapper } from "../components/GoogleMaps/Map";
import PickupModal from "../components/UI/PickupModal";
import Location from "../components/UI/Location";

const colors = [
  "#00966D",
  "#5D5FEF",
  "#009A00",
  "#EF5DA8",
  "#009A00",
  "#F5000F",
  // "#006700",
  "#295011",
  "#FE0110",
];
const DashbordContainer = styled.div`
  ${tw`space-y-4`}
`;

const Dashboard = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [markerId, setMarkerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pickupPagination, setPickupPagination] = useState();

  const dispatch = useDispatch();
  let dtFilter = [];
  const {
    dashboard: { currentMonthCardContent, recentPickup },
    schedules: { currentMonthPendingSchedule },
  } = useSelector((state) => state);

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const handlePickupFilter = async (page = 1) => {
    const res = await dispatch(
      getFilteredCompanyRecentPickups(...payload, page)
    );
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setTableBody(companySchedules);
      setPickupPagination(paginationData);
    }
  };

  const handlePickupSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchCompanyPickups({
        key,
        page,
      })
    );
    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setTableBody(companySchedules);
      setPickupPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
      // setTotalPages(paginationData.totalPages);
    }
  };

  const fetchRecent = async (page = 1) => {
    const res = await dispatch(
      getCompanyRecentPickups({
        ...payload,
        page,
      })
    );

    if (!res.error) {
      const { companySchedules, ...paginationData } = res.payload;
      setTableBody(companySchedules);
      setPickupPagination(paginationData);
    }
  };

  useEffect(() => {
    if (!currentMonthCardContent) dispatch(getCompanyMatrix(payload));
    if (!recentPickup) setTableBody(recentPickup);
    if (!currentMonthPendingSchedule) dispatch(getCompanyPendingSchedules());
  }, []);

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
          title: "PickUp Date",
          dataIndex: "pickUpDate",
          key: "pickUpDate",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
        {
          title: "Waste Quantity (Kg)",
          dataIndex: "quantity",
          key: "quantity",
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

  /****************************
   *
   * handler functions and utils
   *
   ****************************/

  const generateCardData = (source, data) => {
    const newData = [...source];

    // console.log()
    // be careful with object manipulations, do not try to mutate the instance
    // of object used as a component state, just like the returned result of this function
    // rather, create the object copy (shallow copy would suffice here) and make mutations as fit
    // then return the modified copy
    newData[0].amount = data && formatValue(data?.totalDropOff);
    newData[1].amount = data && `${formatValue(data?.totalWastes)} Kg`;
    // newData[2].amount = data && formatValue(data?.totalPayment);
    // newData[3].amount = data && formatValue(data?.totalOutstanding);
    newData[2].amount = data && formatValue(data?.totalSchedules);
    // newData[4].amount = data && formatValue(0);
    // newData[5].amount = data && formatValue(data?.totalPending);
    newData[3].amount = formatValue(currentMonthPendingSchedule?.length) || 0;
    newData[3].progress =
      data &&
      formatValue(
        (data?.totalPending * 100) / currentMonthPendingSchedule?.length
      );
    newData[4].amount = data && formatValue(data?.totalCompleted);
    newData[4].progress =
      data && formatValue((data?.totalCompleted * 100) / data?.totalSchedules);
    newData[5].amount = data && formatValue(data?.totalMissed);
    newData[5].progress =
      data && formatValue((data?.totalMissed * 100) / data?.totalSchedules);
    newData[6].schedules = data?.schedules.concat(currentMonthPendingSchedule);
    // console.log("The concat result is: ", newData[8]);
    return newData;
  };

  useEffect(() => {
    const fmtCardData = generateCardData(
      CardDashbordDetails,
      currentMonthCardContent
    );
    setBodyData(fmtCardData);
  }, [currentMonthCardContent, currentMonthPendingSchedule]);

  const handleMetricsFilter = async (date) => {
    const res = await dispatch(getFilteredCompanyMatrix(date));
    dtFilter = generateCardData(CardDashbordDetails, res?.payload?.data);
    setBodyData(dtFilter);
  };

  const openInfo = (mark, markId) => {
    setMarkerId(markId);
    setIsOpen(mark);
  };

  const onRefresh = () => {
    dispatch(getCompanyMatrix(payload));
    fetchRecent();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/

  useEffect(() => {
    if (!currentMonthCardContent) dispatch(getCompanyMatrix(payload));

    // if (!recentPickup) {
    //   const payload = {
    //     page: currentPage,
    //     currentMonth,
    //   };
    //   dispatch(getCompanyRecentPickups(payload));
    // }
    if (!currentMonthPendingSchedule) dispatch(getCompanyPendingSchedules());
  }, []);

  useEffect(() => {
    const fmtCardData = generateCardData(
      CardDashbordDetails,
      currentMonthCardContent
    );
    setBodyData(fmtCardData);
  }, [currentMonthCardContent, currentMonthPendingSchedule]);

  return (
    <>
      <PickupModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
        completed
      />
      <DashbordContainer>
        <Filter onFilter={handleMetricsFilter} />

        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 container -order-1">
          {bodyData &&
            chunk(bodyData?.slice(0, 6), 6)?.map((items) => {
              return items
                .map((el, i) => {
                  return (
                    <ContentCard
                      ImgUrl={el.icon}
                      title={el.title}
                      amount={el.amount}
                      link={el.link}
                      // progress={el.progress}
                      style={{ color: colors[i] }}
                      key={i}
                    />
                  );
                })
                .reverse();
            })}
        </div>
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
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onRefresh={onRefresh}
        />
      </DashbordContainer>
    </>
  );
};

export default Dashboard;
