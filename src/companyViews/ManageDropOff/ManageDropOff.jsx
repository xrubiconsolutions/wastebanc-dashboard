import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import StyledButton from "../../components/UI/btn";
import Map from "../../components/map/map";
import DataTable from "../../components/UI/Table";
import { Space } from "antd";
import NewDropModal from "./newDropModal";
// import DeleteModal from "../../components/common/DeleteModal";
import { MapWrapper } from "./GoogleMap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompanyDropoff,
  filterCollectorDropoff,
  getCollectorDropoff,
  mapDropOffLocation,
  SearchCollectorDropoff,
} from "../../store/actions";
import moment from "moment";
import baseAxios from "../../core/api/axios/baseAxios";
import Modal from "../../components/UI/modal";
import DeleteModal from "./DeleteModal";

const ManageDropOffContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;
const ManageDropOffHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;

const ManageDropOff = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [collectors, setCollectors] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [bodyData, setBodyData] = useState();
  const [showPostModal, setPostModal] = useState(false);

  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const {
    app: { error },
  } = useSelector((state) => state);

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      SearchCollectorDropoff({
        key,
        page,
      })
    );
    if (!res.error) {
      const { locations, ...paginationData } = res.payload.data;
      setBodyData(locations);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterCollectorDropoff({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { locations, ...paginationData } = res.payload.data;
      setBodyData(locations);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const { collectorDropOff } = useSelector((state) => state?.dropOff);
  const columns = [
    // {
    //   title: "Organization Name",
    //   dataIndex: "organisation",
    //   key: "organisation",
    // },
    {
      title: "Drop-off location",
      dataIndex: "location",
      key: "location",
      render: (location) => <p>{location.address}</p>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Space size="middle">
              <ManageDropOffContainer>
                <ManageDropOffHeader>
                  <StyledButton
                    type=""
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    onClick={() => {
                      setDeleteModal(true);
                      setId(record._id);
                    }}
                  >
                    Delete
                  </StyledButton>
                </ManageDropOffHeader>
              </ManageDropOffContainer>
            </Space>
          </>
        );
      },
    },
  ];

  const userData = localStorage.getItem("current_company");
  const companyId = JSON.parse(userData)?._id;
  const mapData = useSelector((state) => state?.geoFence);
  const { mapDropOff } = mapData;
  // console.log(mapDropOff, "mapDropOffmapDropOff");
  useEffect(() => {
    if (!mapDropOff) dispatch(mapDropOffLocation(companyId));
  }, []);
  useEffect(() => {
    setCollectors(mapDropOff);
  }, [mapDropOff]);

  // useEffect(() => {
  //   if (!collectorDropOff) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(getCollectorDropoff(payload));
  //   } else {
  //     setBodyData(collectorDropOff?.locations);
  //   }
  // }, []);

  const deleteHandler = async () => {
    const data = {
      dropOffId: id,
    };
    const res = await dispatch(deleteCompanyDropoff(data));
    if (!res.error) console.log(res.error);
    fetchAll();
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getCollectorDropoff({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      const { locations, ...paginationData } = res.payload.data;
      setBodyData(locations);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  // const onRefresh = () => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(getCollectorDropoff(payload));
  // };

  // useEffect(() => {
  //   setBodyData(collectorDropOff?.locations);
  //   setTotalPages(collectorDropOff?.totalResult);
  // }, [collectorDropOff]);

  // useEffect(() => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(getCollectorDropoff(payload));
  // }, [currentPage]);

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        handleDelete={deleteHandler}
        type="drop"
        id={id}
      />

      <ManageDropOffContainer>
        <ManageDropOffHeader>
          <StyledButton
            buttonStyle="btn--primary--outline"
            buttonSize="btn--medium"
            className="flex justify-between items-center"
            onClick={() => {
              setModalMode("create");
              setShowModal(true);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Drop-off Location
          </StyledButton>
        </ManageDropOffHeader>
        <MapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{ height: `600px` }}
              className="map-canvas"
              id="map-canvas"
            />
          }
          dropOffLocation={collectors}
          mapElement={
            <div style={{ height: `100%`, borderRadius: "inherit" }} />
          }
        />
        <DataTable
          data={bodyData || []}
          columns={columns}
          header
          onSearch={onSearch}
          onFilter={onFilter}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          paginationData={paginationData}
          totalPages={paginationData?.totalPages}
          onFetch={fetchAll}
        />
      </ManageDropOffContainer>
    </>
  );
};

export default ManageDropOff;
