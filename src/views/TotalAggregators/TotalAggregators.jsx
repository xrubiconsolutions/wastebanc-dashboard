import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import ContentCard from "../../components/UI/ContentCard";
import { colors, TotalCardAggregators } from "../../utils/data";
import DataTable from "../../components/UI/Table";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import ApprovedModal from "../../components/UI/ApprovedModal";
import EnableModal from "../../components/UI/EnableModal";
import { infoData } from "../../utils/constants";
import Tabcontent from "../../components/UI/TabContent";
import Disable from "../../components/UI/Disable";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAggregator,
  mapAggregator,
  searchAggregator,
} from "../../store/actions";
import moment from "moment";
import { chunk } from "../../utils";
import { MapWrapper } from "./AggregatorsMap";
import Modal from "../../components/UI/modal";
import { deleteAggregator, toggleStatusAggregator } from "../../store/actions";

const AggregatorsContainer = styled.div`
  ${tw`space-y-4`}
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
  const [isOpen, setIsOpen] = useState(false);
  const [markerId, setMarkerId] = useState(null);
  const [rowInfo, setRowInfo] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedKey, setSelectedKey] = useState("0");
  const [fetchedAggregators, setFetchedAggregators] = useState([]);
  const [fetchEnabledAggregators, setFetchEnabledAggregators] = useState([]);
  const date = new Date();

  const [currentMonth, setcurrentMonth] = useState({
    // start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
    //   "YYYY-MM-DD"
    // ),
    // end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
    //   "YYYY-MM-DD"
    // ),
    // start: moment().startOf("year").format("YYYY-MM-DD"),
    // end: moment().endOf("year").format("YYYY-MM-DD"),
  });

  const [paginationData, setPaginationData] = useState();
  const [enabledPaginationData, setEnabledPaginationData] = useState();
  const [disabledPaginationData, setDisabledPaginationData] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [enabledData, setEnabledData] = useState();
  const [disabledData, setDisabledData] = useState();
  const { error } = useSelector((state) => state.app);
  const [showPostModal, setPostModal] = useState(false);
  const [postMessage, setPostMessage] = useState();

  const openInfo = (mark, markId) => {
    setMarkerId(markId);
    setIsOpen(mark);
  };

  const { aggregators, aggregatorsMap, searchAggre } = useSelector(
    (state) => state?.aggregators
  );

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  // useEffect(() => {
  //   if (!bodyData) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(filterAggregator(payload));
  //     setBodyData(true);
  //   }
  // }, [bodyData]);

  useEffect(() => {
    if (aggregators) {
      setFetchedAggregators(aggregators);
    }
  }, [aggregators]);

  useEffect(() => {});

  // useEffect(() => {
  //   if (!fetchedAggregators) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(filterAggregator(payload));
  //     setBodyData(true);
  //   }
  // }, [fetchedAggregators]);

  const handleFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterAggregator({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedData(collectors);
      setPaginationData({ ...paginationData, payload });
      // setTotalPages(paginationData.totalPages);
    }
  };

  const handleEnabledFilter = async (date, page = 1, enabled = true) => {
    const res = await dispatch(
      filterAggregator({
        page,
        currentMonth: date,
        enabled,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;

      setEnabledData(collectors);
      setEnabledPaginationData({ ...paginationData, payload });
      // setTotalPages(enabledPaginationData.totalPages);
    }
  };

  const handleDisabledFilter = async (date, page = 1, enabled = false) => {
    const res = await dispatch(
      filterAggregator({
        page,
        currentMonth: date,
        enabled,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setDisabledData(collectors);
      setDisabledPaginationData({ ...paginationData, payload });
      // setTotalPages(enabledPaginationData.totalPages);
    }
  };

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  useEffect(() => {
    if (!aggregatorsMap) dispatch(mapAggregator(payload));
  }, []);

  useEffect(() => {
    if (searchAggre) {
      setTotalPages(searchAggre?.totalResult);
      setFetchedAggregators(searchAggre);
    }
  }, [searchAggre]);

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchAggregator({
        key: key || "",
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedData(collectors);
      setPaginationData({ ...paginationData, key });
    }
  };

  const handleEnabledSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchAggregator({
        key: key || "",
        page,
        enabled: true,
      })
    );

    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setEnabledData(collectors);
      setEnabledPaginationData({ ...paginationData, key });
      setTotalPages(enabledPaginationData.totalPages);
    }
  };

  const handleDisabledSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchAggregator({
        key: key || "",
        page,
        enabled: false,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setDisabledData(collectors);
      setDisabledPaginationData(paginationData);
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      filterAggregator({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedData(collectors);
      setPaginationData({ ...paginationData });
      // setPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchAllEnabled = async (page = 1, enabled = true) => {
    const res = await dispatch(
      filterAggregator({
        currentMonth: payload,
        page,
        enabled,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setEnabledData(collectors);
      setEnabledPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchALlDisabled = async (page = 1, enabled = false) => {
    const res = await dispatch(
      filterAggregator({
        currentMonth: payload,
        page,
        enabled,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setDisabledData(collectors);
      setDisabledPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchAll();
    fetchAllEnabled();
    fetchALlDisabled();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  // console.log(
  //   "data",
  //   fetchedData?.map((d) => d.status)
  // );

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
    newData[0].user = data?.totalMale;
    newData[1].user = data?.totalFemale;
    newData[2].user = data?.totalCollectors;
    newData[3].user = data?.totalVerified;
    newData[4].collectors = data?.collectors;
    return newData;
  };

  useEffect(() => {
    const dt = ff(TotalCardAggregators, aggregatorsMap);
    setBodyData(dt);
  }, [aggregatorsMap]);

  // const [modalOpen, setModalOpen] = useState(false);

  const deleteHandler = async (data) => {
    const payload = {
      collectorId: data.id,
    };
    const res = await dispatch(deleteAggregator(payload));
    const { message } = res.payload;
    setPostMessage(message);

    if (!res.error) {
      setPostModal(!showPostModal);
    }
    onRefresh();
  };

  const [enabled, setEnabled] = useState("Enabled");

  const data = [
    {
      title: "All",
      link: "All",
      // data:
      //   fetchedAggregators?.collectors?.length > 0 &&
      //   fetchedAggregators?.collectors?.map((collect) => ({
      //     key: c phone: collect.phone,
      //     quantity: collect.totalCollected,
      //     gender: "male",
      //     email: collect.email,
      //     trips: collect.numberOfTripsCompleted,
      //     status: collect?.status,
      //   })),ollect._id,
      //     name: collect.fullname,
      //     lga: "alimosho",
      //
      data: fetchedData?.map((collect) => ({
        key: collect.aggregatorId,
        id: collect._id,
        name: collect.fullname,
        lga: "alimosho",
        schedules: collect.schedules,
        phone: collect.phone,
        quantity: collect.totalCollected,
        gender: collect.gender,
        organisation: collect.organisation,
        trips: collect.numberOfTripsCompleted,
        status: collect?.approvalStatus,
      })),
      fetch: fetchAll,
      filterHandler: handleFilter,
      searchHandler: onSearch,
      paginationData: paginationData,
      // totalPages: paginationData?.totalPages,

      columns: [
        {
          title: "Full Name",
          dataIndex: "name",
          key: "name",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Organization",
          dataIndex: "organisation",
          key: "organisation",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Trips Completed",
          dataIndex: "trips",
          key: "trips",
        },
        // {
        //   title: "Status",
        //   dataIndex: "status",
        //   key: "status",
        // },
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

              {/* <Vector
                onClick={() => {
                  setSelectedInfo(record);
                }}
              >
                <Disable
                  data={selectedInfo}
                  onRefresh={onRefresh}
                  deletehandler={() => deleteHandler(record)}
                />
              </Vector> */}
            </Space>
          ),
        },
      ],
    },

    {
      title: "Enabled",
      link: "Enabled",
      // data:
      //   fetchedAggregators?.collectors?.length > 0 &&
      //   fetchedAggregators?.collectors
      //     ?.filter((aggre) => aggre.status === "active")
      //     .map((collect) => ({
      //       key: collect._id,
      //       name: collect.fullname,
      //       lga: "alimosho",
      //       phone: collect.phone,
      //       quantity: collect.totalCollected,
      //       gender: "male",
      //       trips: collect.numberOfTripsCompleted,
      //       status: collect?.status,
      //     })),
      data: enabledData?.map((collect) => ({
        key: collect.aggregatorId,
        id: collect._id,
        name: collect.fullname,
        lga: "alimosho",
        phone: collect.phone,
        quantity: collect.totalCollected,
        gender: collect.gender,
        organisation: collect.organisation,
        trips: collect.numberOfTripsCompleted,
        status: collect?.approvalStatus,
      })),
      filterHandler: handleEnabledFilter,
      searchHandler: handleEnabledSearch,
      paginationData: enabledPaginationData,
      // totalPages: enabledPaginationData?.totalPages,

      columns: [
        {
          title: "Full Name",
          dataIndex: "name",
          key: "name",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Organization",
          dataIndex: "organisation",
          key: "organisation",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Trips Completed",
          dataIndex: "trips",
          key: "trips",
        },
        // {
        //   title: "Status",
        //   dataIndex: "status",
        //   key: "status",
        // },
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
              <Vector
                onClick={() => {
                  setSelectedInfo(record);
                }}
              >
                <Disable
                  data={selectedInfo}
                  onRefresh={onRefresh}
                  deletehandler={() => deleteHandler(record)}
                />
              </Vector>
            </Space>
          ),
        },
      ],
    },
    {
      title: "Disabled",
      link: "Disabled",
      // data:
      //   fetchedAggregators?.collectors?.length > 0 &&
      //   fetchedAggregators?.collectors
      //     ?.filter((aggre) => aggre.status === "disable")
      //     .map((collect) => ({
      //       key: collect._id,
      //       name: collect.fullname,
      //       lga: "alimosho",
      //       phone: collect.phone,
      //       quantity: collect.totalCollected,
      //       gender: "male",
      //       trips: collect.numberOfTripsCompleted,
      //       status: collect?.status,
      //     })),
      data:
        // disabledData.length > 0 &&
        disabledData?.map((collect) => ({
          key: collect.aggregatorId,
          id: collect._id,
          name: collect.fullname,
          lga: "alimosho",
          schedules: collect.schedules,
          phone: collect.phone,
          quantity: collect.totalCollected,
          gender: collect.gender,
          organisation: collect.organisation,
          trips: collect.numberOfTripsCompleted,
          status: collect?.approvalStatus,
        })),
      filterHandler: handleDisabledFilter,
      searchHandler: handleDisabledSearch,
      paginationData: disabledPaginationData,
      // totalPages: disabledPaginationData?.totalPages,

      columns: [
        {
          title: "Full Name",
          dataIndex: "name",
          key: "name",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Organization",
          dataIndex: "organisation",
          key: "organisation",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Trips Completed",
          dataIndex: "trips",
          key: "trips",
        },
        // {
        //   title: "Status",
        //   dataIndex: "status",
        //   key: "status",
        // },
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
              <Vector
                onClick={() => {
                  setSelectedInfo(record);
                }}
              >
                <Disable
                  data={selectedInfo}
                  onRefresh={onRefresh}
                  deletehandler={() => deleteHandler(record)}
                  enabled={enabled}
                />
              </Vector>
            </Space>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => {
          setPostModal(false);
        }}
      >
        {!error ? postMessage : error}
      </Modal>

      <ApprovedModal
        showPending={showPending}
        setShowPending={setShowPending}
        data={rowInfo}
        userData={rowInfo}
      />
      <EnableModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
      />
      <AggregatorsContainer>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {bodyData &&
            bodyData.length > 0 &&
            chunk(bodyData.slice(0, 4), 4).map((items) => {
              return items.map((el, i) => {
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
          onSwitch={onSwitch}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
        {/* <DataTable data={data} columns={columns} header /> */}
      </AggregatorsContainer>
    </>
  );
};

export default TotalAggregators;
