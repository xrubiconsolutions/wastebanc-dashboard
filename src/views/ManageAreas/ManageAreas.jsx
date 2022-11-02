import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Space } from "antd";
import StyledButton from "../../components/UI/btn";
import DataTable from "../../components/UI/Table";
import NewAreaModal from "../../components/areas/newAreaModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getManagedArea,
  getAllAreas,
  searchManagedArea,
  getStateAreas,
  getUserLocations,
} from "../../store/actions";
import moment from "moment";
import { claimPermissions } from "../../utils/constants";
import { info } from "autoprefixer";

const ManageAreaContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;
const ManageAreaHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;

const ManageAreas = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState({});
  const [modalMode, setModalMode] = useState("create");

  const [fetchedArea, setFetchedArea] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [areasss, setAreas] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [stateLga, setStateLga] = useState([]);
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const { getAllLocation } = useSelector((state) => state?.userAgencyLocation);
  const { allAreas } = useSelector((state) => state.area);

  // testing

  const [all, setAll] = useState([]);
  const date = new Date();
  const currentMonth = {
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  };

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const {
    area: { managedArea, searchedArea },
    auth: {
      userInfo: { claims },
    },
  } = useSelector((state) => state);

  const areaPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.MANAGE_AREA.title
  );

  useEffect(() => {
    if (!getAllLocation) dispatch(getUserLocations());
  }, []);

  useEffect(() => {
    if (getAllLocation) {
      const currentVal = getAllLocation.find((el) => el.default).name;
      setValue(currentVal);
    }
  }, [getAllLocation]);

  console.log("Current State Location", value);

  useEffect(() => {
    if (!allAreas) {
      dispatch(getAllAreas({ page: 1 }));
    }
  }, []);

  useEffect(() => {
    if (allAreas) {
      setAll(allAreas);
    }
  }, []);

  // console.log("Getting  Current  State Value", value);

  const fetchState = async (page = 1) => {
    if (value === "All") {
      const res = await dispatch(getAllAreas(page));
      setAreas(res.payload);
    } else {
      const res = await dispatch(getStateAreas(value));
      const { data } = res.payload;
      setAreas(data);
    }
  };

  useEffect(() => {
    fetchState();
  }, [value]);

  // const fetchCurrentUserLocation = async () => {
  //   const res = await dispatch(getUserLocations());
  //   console.log("Getting current Location", res);
  //   if (!res.error) {
  //     const { data } = res.payload;
  //     setCurrentLocation(data.map((d) => d.name));
  //   }
  // };
  // testing....

  // if (!allAreas) {
  // }

  // useEffect(() => {
  //   if (!managedArea) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(getManagedArea(payload));
  //   }

  //   if (managedArea) {
  //     setFetchedArea(managedArea?.areas);
  //     // setTotalPages(managedArea?.totalResult);
  //   }
  // }, [managedArea]);

  // useEffect(() => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(getManagedArea(payload));
  // }, [currentPage]);

  const handleFilter = async (currentMonth) => {
    const payload = { page: currentPage, currentMonth };
    const res = await dispatch(getManagedArea(payload));
    if (!res.error) {
      const { areas, ...paginationData } = res.payload.data;
      setFetchedArea(areas);
      setPaginationData({ ...paginationData, currentMonth });
      // setTotalPages(paginationData.totalPages);s
    }
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchManagedArea({
        page,
        currentMonth,
        key: key || "",
      })
    );

    if (!res.error) {
      const { areas, ...paginationData } = res.payload.data;
      setFetchedArea(areas);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  // useEffect(() => {
  //   if (!allAreas) dispatch(getAllAreas());
  // }, [allAreas, dispatch]);

  // const onRefresh = () => {
  //   dispatch(getAllAreas(currentMonth));
  // };

  // const onRefresh = () => {
  //   fetchAll();
  // };

  // useEffect(() => {
  //   onRefresh();
  // }, []);

  // useEffect(() => {
  //   if (!searchedArea) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(getManagedArea(payload));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (searchedArea) {
  //     setFetchedArea(searchedArea?.areas);
  //     setTotalPages(searchedArea?.totalResult);
  //   }
  // }, [searchedArea]);

  // useEffect(() => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(getManagedArea(payload));
  // }, [currentPage]);

  const fetchAll = async (page = 1) => {
    const res = await dispatch(getManagedArea({ page, currentMonth: payload }));
    if (!res.error) {
      const { areas, ...paginationData } = res.payload.data;
      setFetchedArea(areas);
      setPaginationData({ ...paginationData, page });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  // useEffect(() => {
  //   if (searchedArea) {
  //     setFetchedArea(searchedArea?.areas);
  //     setTotalPages(searchedArea?.totalResult);
  //   }

  // }, [searchedArea]);

  // console.log("allAreas", allAreas);
  // console.log("state areas", stateLga);
  const lgaCoverage = {
    lga: {
      label: "LCDA/LGA",
      optionIdx: null,
      type: "select",
      title: "Select your preferred LGA/LCDA",
      options:
        // allAreas
        //   ?.map((area) => area.lga)
        //   .filter((area, idx, lg) => lg.indexOf(area) === idx)
        //   .map((area) => ({
        //     text: area,
        //     value: area,
        //   })) || [],

        areasss
          ?.map((state) => state.lga)
          .filter((area, idx, lg) => lg.indexOf(area) === idx)
          .map((area) => ({
            text: area,
            value: area,
          })) || [],
    },
    coverageArea: {
      label: "Coverage Area",
      value: "",
      placeholder: "Enter your preferred area",
    },
  };

  const saveLocation = (location) => {
    // const uniqueAreas = allAreas
    //   ?.map((area) => area.lga)
    //   .filter((area, idx, lg) => lg.indexOf(area) === idx)
    //   .map((area) => ({
    //     text: area,
    //     value: area,
    //   }));

    const uniqueAreas = allAreas
      ?.map((area) => area.lga)
      .filter((area, idx, lg) => lg.indexOf(area) === idx)
      .map((area) => ({
        text: area,
        value: area,
      }));

    const lgaIdx = location
      ? uniqueAreas?.findIndex(
          (country) =>
            country.text?.toLowerCase() === location.area?.toLowerCase()
        )
      : null;

    setSelectedArea({
      lga: {
        lgaId: location.key,
        label: "LCDA/LGA",
        optionIdx: lgaIdx,
        type: "select",
        title: "Select your preferred LGA/LCDA",
        options:
          areasss
            ?.map((area) => area.lga)
            .filter((area, idx, lg) => lg.indexOf(area) === idx)
            .map((area) => ({
              text: area,
              value: area,
            })) || [],
      },
      coverageArea: {
        label: "Coverage Area",
        value: "",
        placeholder: "Enter your preferred area",
      },
    });
  };

  const columns = [
    {
      title: "Area ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "LCDA/LGA",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Coverage Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          areaPermissions?.edit && (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  saveLocation(record);
                  setModalMode("update");
                  setShowModal(true);
                }}
              >
                Update
              </StyledButton>
            </Space>
          )
        );
      },
    },
  ];

  const data = fetchedArea?.map((access) => ({
    key: access._id,
    id: access._id.slice(0, 6),
    address: access.lcd,
    area: access.lga,
    date: access.createdAt.slice(0, 10),
  }));

  return (
    <>
      <NewAreaModal
        mode={modalMode}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedArea={selectedArea}
        data={lgaCoverage}
        onRefresh={onRefresh}
      />
      <ManageAreaContainer>
        <ManageAreaHeader>
          {/* {areaPermissions?.create && (
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
              Setup Area
            </StyledButton>
          )} */}

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
            Setup Area
          </StyledButton>
        </ManageAreaHeader>
        <DataTable
          data={data}
          columns={columns}
          onSearch={onSearch}
          onFilter={handleFilter}
          header
          paginationData={paginationData}
          setCurrentPage={setCurrentPage}
          ts
          onFetch={fetchAll}
          onRefresh={onRefresh}
        />
      </ManageAreaContainer>
    </>
  );
};

export default memo(ManageAreas);
