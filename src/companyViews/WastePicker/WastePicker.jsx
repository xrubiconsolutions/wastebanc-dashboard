import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Tag, Space } from "antd";
import ContentCard from "../../components/UI/ContentCard";
import { colors, TotalCardWastePicker } from "../../utils/data";
import WastePickerModal from "../../components/wastePicker/wastePickerModal";
import { infoData, truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Disable from "../../components/UI/Disable";
import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { MapWrapper } from "../TotalAggregators/AggregatorMap";
import {
  approveCompanyCollector,
  ApprovedPickerCompany,
  declineCompanyCollector,
  disableCompanyPickerCollector,
  enableCompanyPickerCollector,
  getCompanyPickerPending,
  getCompanyWastePickerStats,
} from "../../store/actions";
import Modal from "../../components/UI/modal";
import { chunk } from "../../utils";
import InfoModal from "../../components/UI/InfoModal";

const WastePickerContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;
const WastePickerHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const Vector = styled.div`
  ${tw`flex justify-between items-center px-4 py-3`}
`;

const Br = styled.div`
  margin-bottom: 2rem;
`;

const WastePicker = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [modalMode, setModalMode] = useState("create");
  const [selectedArea, setSelectedArea] = useState({});
  const [fetchedPickers, setFetchedPickers] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [markerId, setMarkerId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [approvedPagination, setApprovedPagination] = useState();
  const [unapprovedPagination, setUnapprovedPagination] = useState();
  const [bodyData, setBodyData] = useState([]);
  const [showPostAction, setPostAction] = useState(false);
  const [fetchedAggregators, setFetchedAggregators] = useState([]);
  const [fetchedPending, setFetchedPending] = useState([]);
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });
  const [selectedKey, setSelectedKey] = useState("0");

  const [showpending, setShowPending] = useState(false);

  const openInfo = (mark, markId) => {
    setMarkerId(markId);
    setIsOpen(mark);
  };

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.app);
  const { approvedPicker, pendingPicker, pickersStats } = useSelector(
    (state) => state?.pickers
  );

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const approveHandler = async (d) => {
    setShowModal(false);
    const data = {
      collectorId: d._id,
    };
    const res = await dispatch(approveCompanyCollector(data));
    if (!res.error) {
      await dispatch(ApprovedPickerCompany(currentMonth));
      await dispatch(getCompanyPickerPending(currentMonth));
      fetchApproved();
      fetchUnapproved();
    }
    setPostAction(true);
  };

  const declineHandler = async (d) => {
    setShowModal(false);
    const data = {
      collectorId: d._id,
    };

    const res = await dispatch(declineCompanyCollector(data));
    if (!res.error) {
      await dispatch(ApprovedPickerCompany(currentMonth));
      await dispatch(getCompanyPickerPending(currentMonth));
    }
    fetchApproved();
    fetchUnapproved();
    setPostAction(true);
  };

  const fetchApproved = async (page = 1) => {
    const res = await dispatch(
      ApprovedPickerCompany({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedAggregators(collectors);
      setApprovedPagination({ ...paginationData, date: payload });
    }
  };
  const fetchUnapproved = async (page = 1) => {
    const res = await dispatch(
      getCompanyPickerPending({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedPending(collectors);
      setUnapprovedPagination({ ...paginationData, date: payload });
    }
  };
  const filterApprovedCollector = async (date, page) => {
    const res = await dispatch(
      ApprovedPickerCompany({
        ...date,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedAggregators(collectors);
      setApprovedPagination({ ...paginationData, date });
    }
  };

  const searchApprovedCollector = async (key, page) => {
    const res = await dispatch(
      ApprovedPickerCompany({
        key,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedAggregators(collectors);
      setApprovedPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterPendingCollector = async (date, page) => {
    const res = await dispatch(getCompanyPickerPending({ ...date, page }));
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedPending(collectors);
      setUnapprovedPagination({ ...paginationData, date });
    }
  };

  const searchPendingCollector = async (key, page) => {
    const res = await dispatch(getCompanyPickerPending({ key, page }));
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedPending(collectors);
      setUnapprovedPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };
  const onRefresh = () => {
    dispatch(getCompanyWastePickerStats(payload));
    fetchApproved();
    fetchUnapproved();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      title: "Approved Pickers",
      link: "Approved Pickers",
      data: fetchedAggregators,
      totalPages: approvedPagination?.totalPages,
      paginationData: approvedPagination,
      filterHandler: filterApprovedCollector,
      searchHandler: searchApprovedCollector,
      fetch: fetchApproved,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Trips Completed",
          dataIndex: "totalCollected",
          key: "totalCollected",
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
            </Space>
          ),
        },
      ],
    },

    {
      title: "Pending Pickers",
      link: "Pending Pickers",
      data: fetchedPending,
      totalPages: unapprovedPagination?.totalPages,
      paginationData: unapprovedPagination,
      filterHandler: filterPendingCollector,
      searchHandler: searchPendingCollector,
      fetch: fetchUnapproved,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        // {
        //   title: "Organization",
        //   dataIndex: "organisation",
        //   key: "organisation",
        // },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
        // {
        //   title: "Verified",
        //   dataIndex: "verified",
        //   key: "verified",
        //   render: (text) => (
        //     <p className="text-secondary font-bold">
        //       {text === false ? "not verified" : "verified"}
        //     </p>
        //   ),
        // },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (text) => (
            <p
              className={`${
                text === "active" ? "text-secondary" : "text-red-400"
              } font-bold`}
            >
              {text}
            </p>
          ),
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--danger--outline"
                buttonSize="btn--small"
                onClick={() => declineHandler(record)}
              >
                Decline
              </StyledButton>
              <Vector>
                <StyledButton
                  type=""
                  buttonStyle="btn--primary--outline"
                  buttonSize="btn--small"
                  onClick={() => approveHandler(record)}
                >
                  Approve
                </StyledButton>
              </Vector>
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
  const ff = (actualArr, data) => {
    const newData = [...actualArr];
    // be careful with object manipulations, do not try to mutate the instance
    // of object an saved in a component state, just like the returned result of this function
    // rather, create the object copy (shallow copy would suffice here) and make mutations as fit
    // then return the modified copy
    newData[0].user = data?.male;
    newData[1].user = data?.female;
    newData[2].user = data?.newCollectors;
    newData[3].user = data?.verified;
    newData[4].collectors = data?.collectors;
    return newData;
  };

  useEffect(() => {
    if (!approvedPicker) setFetchedAggregators(approvedPicker);
    if (!pendingPicker) setFetchedPending(pendingPicker);
    setFetchedPickers(pickersStats);
  }, [approvedPicker, pendingPicker, pickersStats]);

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  // useEffect(() => {
  //   const dt = ff(TotalCardWastePicker, companyAggregator);
  //   if (companyAggregator) {
  //     setFetchedAggregators(approvedPicker);
  //   }
  //   setBodyData(dt);
  // }, [approvedPicker]);

  useEffect(() => {
    const dt = ff(TotalCardWastePicker, fetchedPickers);
    // if (pickersStats) {
    //   setFetchedPickers(pickersStats);
    // }
    setBodyData(dt);
  }, [fetchedPickers]);
  const tableList = bodyData.slice(0, -1);
  return (
    <>
      {/* <WastePickerModal
        mode={modalMode}
        showModal={showModal}
        setShowPending={setShowPending}
        // setShowModal={setShowModal}
        // selectedArea={selectedArea}
        // // data={lgaCoverage}
        // data={rowInfo}
        // userData={rowInfo}
      /> */}

      <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
        picker
      />

      <Modal
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
        type="postAction"
        color={error && "#F5000F"}
        showpending={showpending}
      >
        <p>{!error ? `Done Successfully` : error}</p>
      </Modal>

      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {bodyData &&
            bodyData.length > 0 &&
            chunk(tableList.slice(0, 4), 4).map((items) => {
              return items.map((el, i) => {
                // console.log("USers", el);
                return (
                  <ContentCard
                    ImgUrl={el.icon}
                    title={el.title}
                    // amount={Result[el.key]}
                    amount={el.user}
                    style={{ color: colors[i] }}
                    key={i}
                  />
                );
              });
            })}
        </div>

        <WastePickerContainer>
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
            collectorsLocation={bodyData[4]?.collectors}
            mapElement={
              <div style={{ height: `100%`, borderRadius: "inherit" }} />
            }
            isOpen={isOpen}
            markerId={markerId}
            openInfo={openInfo}
          />
          <Tabcontent
            data={data}
            onSwitch={onSwitch}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            onRefresh={onRefresh}
          />
          <Br />
        </WastePickerContainer>
      </div>
    </>
  );
};

export default WastePicker;
