import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Tag, Space } from "antd";
import StyledButton from "../../components/UI/btn";
import DataTable from "../../components/UI/Table";
import UserModal from "../../components/users/userModal";
import { useHistory, useParams } from "react-router";
import UserOptionModal from "../../components/UI/UserOptionModal";
import ModifyUser from "../../components/modifyUser";
import InfoModal from "../../components/UI/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserAgencies, getAllWorldLocations } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     email: "dimeji200@gmail.com",
//     status: "Active",
//     age: 32,
//     roles: "Adminrk",
//     city: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     email: "dimeji200@gmail.com",
//     age: 42,
//     status: "Active",
//     roles: "Admin",
//     city: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     email: "dimeji200@gmail.com",
//     age: 32,
//     status: "Pending",
//     roles: "Admin",
//     city: ["cool", "teacher"],
//   },
// ];

const UserAgenciesContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
`;
const UserAgenciesHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const UserAgencies = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rowInfo, setRowInfo] = useState([]);
  const [agencyData, setAgencyData] = useState([]);

  const [rolesData, setRolesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedAgency, setSelectedAgency] = useState({});
  const { worldLocations } = useSelector((state) => state.location);
  const [isModify, setIsModify] = useState(false);
  const [paginationData, setPaginationData] = useState();
  const [bodyData, setBodyData] = useState();

  const dispatch = useDispatch();
  const {
    agencies: { agencies },
    role: { roles },
    auth: {
      userInfo: { claims },
    },
  } = useSelector((state) => state);

  const agenciesPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.AGENCIES.title
  );

  useEffect(() => {
    if (!agencies) dispatch(getUserAgencies(currentPage));
  }, [dispatch]);

  useEffect(() => {
    setAgencyData(agencies?.agencies);
    setTotalPages(agencies?.totalResult);
  }, [agencies]);

  useEffect(() => {
    setRolesData(roles);
  }, [roles]);

  // const onRefresh = () => {
  // dispatch(getUserAgencies(currentPage));
  // };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getUserAgencies({
        page,
      })
    );
    if (!res.error) {
      const { agencies, ...paginationData } = res.payload.data;
      setRolesData(agencies);
      setPaginationData({ ...paginationData, page });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    dispatch(getUserAgencies(currentPage));
  }, [currentPage]);

  const agency = {
    name: {
      label: "Name",
      value: "",
      placeholder: "Organisation Name",
      rules: [(v) => !!v || "▲ Admin name is required"],
    },

    email: {
      label: "Email Address",
      value: "",
      placeholder: "Admin Email",
      rules: [
        (v) => !!v || "▲ Email is required",
        (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
      ],
    },
    phone: {
      label: "Phone",
      value: "",
      placeholder: "Organisation Phone Number",
      rules: [
        (v) =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
          "▲ contact line is invalid",
      ],
    },

    role: {
      label: "Role",
      type: "select",
      options: [],
      rules: [(v) => !!v || "▲ Admin role is required"],
    },
    countries: {
      label: "Country",
      optionIdxs: null,
      type: "multiselect",
      options:
        worldLocations?.map(({ name }) => ({
          text: name,
          value: name,
        })) || [],
      rules: [(v) => v.length > 0 || "▲ countries are required"],
    },
    states: {
      label: "State/City",
      title: "Select state/city",
      type: "multiselect",
      optionIdxs: null,
      options: null,
      rules: [(v) => v.length > 0 || "▲ states are required"],
    },
  };

  const saveLocation = (location) => {
    const countryIdx = location
      ? location.countries?.map((myCountry) =>
          worldLocations?.findIndex(
            (country) => country.name?.toLowerCase() === myCountry.toLowerCase()
          )
        )
      : null;

    const states =
      countryIdx && countryIdx.length > 0
        ? countryIdx.map((cIdx) =>
            worldLocations[cIdx]?.states?.map((state) => ({
              text: state.name,
              value: state.name,
            }))
          )
        : [];

    const totalStates = [].concat.apply([], states);

    const stateIdxs =
      totalStates?.length > 0
        ? location?.city?.map((selState) =>
            totalStates.findIndex(
              (state) => state.text.toLowerCase() === selState?.toLowerCase()
            )
          )
        : null;

    setSelectedAgency({
      name: {
        label: "Name",
        value: location.name,
        placeholder: "Organisation Name",
      },

      email: {
        label: "Email Address",
        value: location.email,
        placeholder: "Organisation Email",
        rules: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
        ],
      },
      phone: {
        label: "Phone",
        value: location.phone,
        placeholder: "Organisation Phone Number",
      },

      role: {
        label: "Role",
        // optionIdx: 1,
        type: "select",
        options: [
          { text: "All", value: "all" },
          // ...adminPermissions.map((each) => ({ text: each.title, value: each._id })),
        ],
      },
      countries: {
        label: "Country",
        locationId: location.key,
        optionIdxs: countryIdx,
        type: "multiselect",
        title: "Select country",
        options:
          worldLocations?.map(({ name }) => ({
            text: name,
            value: name,
          })) || [],
      },
      states: {
        label: "State/City",
        type: "multiselect",
        title: "Select state/city",
        optionIdxs: stateIdxs,
        options: totalStates,
      },
    });
  };

  useEffect(() => {
    // fetch world locations if it's not yet cached in redux store
    if (!worldLocations) dispatch(getAllWorldLocations());
  }, []);

  const data = agencyData?.map((agency) => ({
    key: agency?._id,
    name: agency?.fullname || agency?.username,
    email: agency?.email,
    status: agency?.status,
    age: agency?.age || 32,
    roles: agency?.displayRole,
    city: agency?.states,
    countries: agency?.countries,
    phone: agency?.phone,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "active" ? "green" : "red";

        return (
          <>
            <Tag color={color}>{status}</Tag>
          </>
        );
      },
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (city) => (
        <span>
          {city?.map((city) => {
            return <Tag key={city}>{city.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <StyledButton
            type=""
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            onClick={() => {
              setIsModify(true);
              saveLocation(record);
              setRowInfo(record);
              setSelectedIndex(index);
              setModalOpen(true);
            }}
          >
            Options
          </StyledButton>

          {modalOpen && selectedIndex === index ? (
            <UserOptionModal
              userData={rowInfo}
              setModalOpen={setModalOpen}
              setShowModal={setShowModal}
              setShowInfoModal={setShowInfoModal}
              onRefresh={onRefresh}
              showModifyButton={agenciesPermissions?.edit}
              showDeleteButton={agenciesPermissions?.delete}
            />
          ) : null}
          {/*  */}
        </Space>
      ),
    },
  ];

  // console.log("Loging the role Data,", rolesData);

  return (
    <>
      <ModifyUser
        showModal={showModal}
        setShowModal={setShowModal}
        rolesData={rolesData}
        selectedAgency={isModify ? selectedAgency : agency}
        onRefresh={onRefresh}
        isModify={isModify}
      />
      <InfoModal
        showModal={showInfoModal}
        setShowModal={setShowInfoModal}
        userData={rowInfo}
        agencies
        user
      />

      <UserAgenciesContainer>
        <UserAgenciesHeader>
          {agenciesPermissions?.create && (
            <StyledButton
              buttonStyle="btn--primary--outline"
              buttonSize="btn--medium"
              className="flex justify-between items-center"
              onClick={() => {
                setIsModify(false);
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
              Add User
            </StyledButton>
          )}
        </UserAgenciesHeader>
        <DataTable
          data={data}
          columns={columns}
          onRefresh={onRefresh}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          paginationData={paginationData}
          // totalPages={paginationData.totalPages}
          onFetch={fetchAll}
        />
      </UserAgenciesContainer>
    </>
  );
};

export default UserAgencies;
