import React, { useEffect, useState } from "react";
import { Space } from "antd";
import ContentCard from "../../components/UI/ContentCard";
import { colors, TotalCardAggregators } from "../../utils/data";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import Modal from "../../components/UI/modal";
import { useDispatch, useSelector } from "react-redux";
import ApprovedModal from "../../components/UI/ApprovedModal";
import moment from "moment";
import DeleteModal from "../../components/common/DeleteModal";
import { chunk } from "../../utils";
import {
  getCompanyAggregator,
  getCompanyPending,
  approveCompanyCollector,
  declineCompanyCollector,
  filterCompanyAggregator,
  filterCompanyPending,
  companySearchAggregator,
} from "../../store/actions";
import { MapWrapper } from "./AggregatorMap";
import { truncate } from "../../utils/constants";

const AggregatorsContainer = styled.div`
  ${tw`space-y-4`}

  .text {
    color: red;
  }
`;
const Vector = styled.div`
  ${tw`flex justify-between items-center px-4 py-3`}
`;
const TotalAggregators = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/

  const [showModal, setShowModal] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [showPostAction, setPostAction] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [markerId, setMarkerId] = useState(null);
  // const [bodyData, setBodyData] = useState(false);
  const [bodyData, setBodyData] = useState([]);
  const [fetchedAggregators, setFetchedAggregators] = useState();
  const [fetchedPending, setFetchedPending] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [approvedPagination, setApprovedPagination] = useState();
  const [unapprovedPagination, setUnapprovedPagination] = useState();

  const [selectedKey, setSelectedKey] = useState("0");

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  const dispatch = useDispatch();
  const date = new Date();
  const currentMonth = {
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  };
  const openInfo = (mark, markId) => {
    setMarkerId(markId);
    setIsOpen(mark);
  };

  const { error } = useSelector((state) => state.app);
  const { companyAggregator, companyPending } = useSelector(
    (state) => state?.aggregators
  );

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const approveHandler = async (collectorId) => {
    setShowModal(false);
    const res = await dispatch(
      approveCompanyCollector({ collectorId: collectorId })
    );

    if (!res.error) {
      await dispatch(getCompanyAggregator(currentMonth));
      await dispatch(getCompanyPending(currentMonth));
      fetchUnapproved();
      fetchApproved();
    }
    // setPostAction(true);
  };

  const declineHandler = async (collectorId) => {
    setShowModal(false);
    const res = await dispatch(
      declineCompanyCollector({ collectorId: collectorId })
    );

    if (!res.error) {
      await dispatch(getCompanyAggregator(currentMonth));
      await dispatch(getCompanyPending(currentMonth));
      fetchUnapproved();
      fetchApproved();
    }
    // setPostAction(true);
  };

  const fetchApproved = async (page = 1) => {
    const res = await dispatch(
      filterCompanyAggregator({
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

  const filterApprovedCollector = async (date, page) => {
    const res = await dispatch(
      filterCompanyAggregator({
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

  const searchApprovedCollector = async (key) => {
    const res = await dispatch(
      companySearchAggregator({
        key,
        page: 1,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedAggregators(collectors);
      setApprovedPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchUnapproved = async (page = 1) => {
    const res = await dispatch(
      filterCompanyPending({
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

  const filterPendingCollector = async (date, page) => {
    const res = await dispatch(filterCompanyPending({ ...date, page }));
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedPending(collectors);
      setUnapprovedPagination({ ...paginationData, date });
    }
  };

  const searchPendingCollector = async (key, page) => {
    const res = await dispatch(filterCompanyPending({ key, page }));
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedPending(collectors);
      setUnapprovedPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  // const searchPendingCollector = async (key) => {
  //   const res = await dispatch(filterCompanyPending({ key }));
  //   if (!res.error) setFetchedPending(res.payload.data);
  // };

  // const onRefresh = async () => {
  //   await dispatch(getCompanyAggregator(currentMonth));
  //   await dispatch(getCompanyPending(currentMonth));
  // };
  const onRefresh = () => {
    dispatch(getCompanyAggregator(payload));
    fetchApproved();
    fetchUnapproved();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      // title: "Approved Aggregators",
      title: "Approved Agents",
      link: "Approved Aggregators",
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
          title: "Wastebanc location",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        // {
        //   title: "Trips Completed",
        //   dataIndex: "totalCollected",
        //   key: "totalCollected",
        // },

        {
          title: "No. Of Waste (Kg)",
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
                  setShowPending(true);
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
      // title: "Pending Aggregators",
      title: "Pending Agents",
      link: "Pending Aggregators",
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
        {
          title: "Wastebanc location",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        // {
        //   title: "localGovernment",
        //   dataIndex: "localGovernment",
        //   key: "localGovernment",
        // },
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
          render: (text, record) => {
            return (
              <Space size="middle">
                <StyledButton
                  type=""
                  buttonStyle="btn--danger--outline"
                  buttonSize="btn--small"
                  onClick={() => declineHandler(record?._id)}
                >
                  Decline
                </StyledButton>
                <Vector>
                  <StyledButton
                    type=""
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    onClick={() => approveHandler(record?._id)}
                  >
                    Approve
                  </StyledButton>
                </Vector>
              </Space>
            );
          },
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
    if (!companyAggregator) setFetchedAggregators(companyAggregator);
    // if (!companyPending) setFetchedPending(companyPending);
  }, [companyPending, companyAggregator]);

  useEffect(() => {
    const dt = ff(TotalCardAggregators, companyAggregator);
    // if (companyAggregator) {
    //   setFetchedAggregators(companyAggregator);
    // }
    setBodyData(dt);
  }, [companyAggregator]);

  // const companyAgg = async () => {
  //   const res = await dispatch(getCompanyAggregator(currentMonth));
  //   const { data } = res.payload;
  // };

  // useEffect(() => {
  //   companyAgg();
  // }, []);

  useEffect(() => {
    if (companyPending) {
      setFetchedPending(companyPending);
    }
  }, [companyPending]);

  return (
    <>
      <Modal
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
        type="postAction"
        color={error && "#F5000F"}
      >
        <p>{!error ? `Done Successfully` : error}</p>
      </Modal>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        // handleDelete={deleteHandler}
        type="aggregator"
      />
      <ApprovedModal
        showPending={showPending}
        setShowPending={setShowPending}
        data={rowInfo}
        userData={rowInfo}
        aggregator
      />
      <AggregatorsContainer>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {bodyData &&
            bodyData.length > 0 &&
            chunk(bodyData.slice(0, 4), 4).map((items) => {
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
          onRefresh={onRefresh}
          totalPages={totalPages}
          onSwitch={onSwitch}
        />
      </AggregatorsContainer>
    </>
  );
};

export default TotalAggregators;
