import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import tw from "twin.macro";
import styled from "styled-components";
import DataTable from "../../components/UI/Table";
import StyledButton from "../../components/UI/btn";
import { Space } from "antd";
import { MapWrapper } from "./GeoMap";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCompanyAggregator,
  getCompanyAggregator,
  getMapGeoFence,
} from "../../store/actions";
import baseAxios from "../../core/api/axios/baseAxios";
import moment from "moment";
import ApprovedModal from "../../components/UI/ApprovedModal";

const GeoFencingContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;
const GeoFencingHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const userData = localStorage.getItem("current_company");
const areaOfAccess = JSON.parse(userData)?.["areaOfAccess"];

const GeoFencing = () => {
  const [collectors, setCollectors] = useState([]);
  const [rowInfo, setRowInfo] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [firstLGA] = useState(areaOfAccess?.[0]);
  const [sLGA] = useState(areaOfAccess?.[1]);
  const [tLGA] = useState(areaOfAccess?.[2]);
  const [fLGA] = useState(areaOfAccess?.[3]);
  const [ffLGA] = useState(areaOfAccess?.[4]);
  const [coords, setCoords] = useState([]);
  const [firstPath, setFirstPath] = useState(null);
  const [secondPath, setSecondPath] = React.useState(null);
  const [thirdPath, setThirdPath] = React.useState(null);
  const [fourthPath, setFourthPath] = React.useState(null);
  const [fifthPath, setFifthPath] = React.useState(null);
  const [companyId] = React.useState(JSON.parse(userData)?._id);
  const [markerId, setMarkerId] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  // const [bodyData, setBodyData] = useState(false);
  const [paginationData, setPaginationData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchedAggregators, setFetchedAggregators] = useState([]);
  const dispatch = useDispatch();
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const openInfo = (mark, markId) => {
    setMarkerId(markId);
    setIsOpen(mark);
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
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const searchApprovedCollector = async (key, page) => {
    const res = await dispatch(
      filterCompanyAggregator({
        key,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedAggregators(collectors);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <StyledButton
    //         type=""
    //         buttonStyle="btn--primary--outline"
    //         buttonSize="btn--small"
    //         onClick={() => {
    //           setRowInfo(record);
    //           setShowPending(true);
    //         }}
    //       >
    //         See More
    //       </StyledButton>
    //     </Space>
    //   ),
    // },
  ];

  // const filteredData =
  //   fetchedAggregators?.collectors?.length > 0 &&
  //   fetchedAggregators?.collectors?.filter((collector) => collector.verified);

  const data =
    // filteredData &&
    // filteredData.length > 0 &&
    fetchedAggregators?.map((collect) => ({
      key: collect._id,
      name: collect.fullname,
      address: collect.address,
      phone: collect.phone,
      gender: collect.gender,
      quantity: collect.totalCollected,
      organisation: collect.organisation,
      email: collect.email,
      trips: collect.numberOfTripsCompleted,
    }));

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      filterCompanyAggregator({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setFetchedAggregators(collectors);
      setPaginationData({ ...paginationData });
    }
  };

  useEffect(() => {
    const getFirstPath = () => {
      Geocode.fromAddress(
        firstLGA,
        "AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8"
      ).then(
        (response) => {
          // console.log(response);
          setFirstPath(response.results[0].geometry.location || []);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const secondPath = () => {
      Geocode.fromAddress(sLGA, "AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8").then(
        (response) => {
          // console.log(response);
          setSecondPath(response.results[0].geometry.location || []);
        },
        (error) => {
          // console.error(error);
        }
      );
    };
    const thirdPath = () => {
      Geocode.fromAddress(tLGA, "AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8").then(
        (response) => {
          // console.log(response);
          setThirdPath(response.results[0].geometry.location || []);
        },
        (error) => {
          // console.error(error);
        }
      );
    };
    const fourthPath = () => {
      Geocode.fromAddress(fLGA, "AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8").then(
        (response) => {
          // console.log(response);
          setFourthPath(response.results[0].geometry.location || []);
        },
        (error) => {
          // console.error(error);
        }
      );
    };
    const fifthPath = () => {
      Geocode.fromAddress(
        ffLGA,
        "AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8"
      ).then(
        (response) => {
          setFifthPath(response.results[0].geometry.location || []);
        },
        (error) => {
          // console.error(error);
        }
      );
    };
    getFirstPath();
    secondPath();
    thirdPath();
    fourthPath();
    fifthPath();
  }, [firstLGA, sLGA, tLGA, fLGA, ffLGA]);

  const mapData = useSelector((state) => state?.geoFence);
  const { companyAggregator } = useSelector((state) => state?.aggregators);
  const { mapGeoFence } = mapData;

  useEffect(() => {
    let allLocation = [];
    mapGeoFence &&
      mapGeoFence.map((loc) => {
        return allLocation.push(loc["data"]?.[0]?.["geometry"]?.["location"]);
      });

    setCoords(allLocation);
  }, [mapGeoFence]);

  // useEffect(() => {
  //   if (!companyAggregator) dispatch(getCompanyAggregator(currentMonth));
  // }, []);

  useEffect(() => {
    if (!mapGeoFence) dispatch(getMapGeoFence());
  }, []);
  useEffect(() => {
    if (companyAggregator) {
      setFetchedAggregators(companyAggregator);
    }
  }, [companyAggregator]);

  const onRefresh = async () => {
    fetchAll();
  };
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <ApprovedModal
        showPending={showPending}
        setShowPending={setShowPending}
        data={rowInfo}
        userData={rowInfo}
      />
      <GeoFencingContainer>
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
          collectorsLocation={collectors}
          isOpen={isOpen}
          markerId={markerId}
          openInfo={openInfo}
          // paths={paths}
          coords={coords}
          firstPath={firstPath}
          secondPath={secondPath}
          thirdPath={thirdPath}
          fourthPath={fourthPath}
          fifthPath={fifthPath}
          mapElement={
            <div style={{ height: `100%`, borderRadius: "inherit" }} />
          }
        />
        <DataTable
          data={data}
          columns={columns}
          header
          onSearch={searchApprovedCollector}
          onFilter={filterApprovedCollector}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          totalPages={paginationData?.totalPages}
          paginationData={paginationData}
          onFetch={fetchAll}
        />
      </GeoFencingContainer>
    </>
  );
};

export default GeoFencing;
