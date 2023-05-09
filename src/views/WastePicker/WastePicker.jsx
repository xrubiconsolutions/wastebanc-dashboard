import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import Button from "../../components/UI/button";
import ContentCard from "../../components/UI/ContentCard";
import { colors, TotalCardWastePicker } from "../../utils/data";
import WastePickerModal from "../../components/wastePicker/wastePickerModal";
import { infoData, truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Disable from "../../components/UI/Disable";
import { Link } from "react-router-dom";
import { removeEmptyFields } from "../..//utils/";

import {
  createPicker,
  currentMonthUser,
  filterUser,
  getAllLocations,
  getAllOrganisations,
  getAssignedPickers,
  getBank,
  getPickers,
  getPickersWithData,
  getUnassignedPickers,
  // getOrganisations,
  searchUser,
  totalUser,
  unassignPicker,
  validateAccount,
} from "../../store/actions";
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import StyledButton from "../../components/UI/btn";
import { formatSelectOptions } from "../../utils";
import useForm from "../../hooks/useForm";
import Tabcontent from "../../components/UI/TabContent";
import WastePickerService from "../../services/wastePickerService";
import Modal from "../../components/UI/modal";

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

let wastePickerEntries = {
  fullname: {
    label: "Full Name",
    value: "",
    placeholder: "John Doe",
    rule: [(v) => !!v || "Fullname is required"],
  },
  phone: {
    label: "Contact Line",
    value: "",
    placeholder: "0800000000",
    rules: [
      (v) => !!v || "Contact Line is required",
      (v) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
        "contact line is invalid",
    ],
  },
  email: {
    label: "Email Address (Optional)",
    value: "",
    placeholder: "cycle@inc.com",
    laxRules: true, //laxRules tells the form validity system about the flexxibility of then rules in this entry
    rules: [
      (v) => {
        if (!v) return true;
        else return /.+@.+\..+/.test(v) || "▲ E-mail must be valid";
      },
    ],
  },
  address: {
    label: "Address",
    value: "",
    placeholder: "Lagos, Nigeria",
    rules: [(v) => !!v || "Address is required"],
  },
  country: {
    label: "Country",
    optionIdx: null,
    type: "select",
    options: [],
    rules: [(v) => !!v || "Country is required"],
  },
  state: {
    label: "State",
    optionIdxs: [],
    type: "select",
    options: [],
    rules: [(v) => !!v || "State is required"],
  },
  gender: {
    label: "Gender",
    value: "",
    type: "select",
    options: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
      { text: "Prefer not to say", value: "N/A" },
    ],
  },
  organisation: {
    label: "Organization (Optional)",
    options: [],
    value: "",
    type: "select",
  },
  bank: {
    label: "Bank",
    optionIdxs: null,
    type: "select",
    options: [],
    rules: [(v) => !!v || "select a bank"],
  },
  accountNumber: {
    label: "Account Number",
    value: "",
    placeholder: "0123456789",
    // extraDetail: "Only sterling account",
    laxRules: true,
    rules: [
      (v) => {
        if (!v) return true;
        else
          return (
            (v.length > 4 && v.length < 18) || "Enter a valid account number"
          );
      },
    ],
  },
  accountName: {
    label: "Account Name",
    value: "",
    placeholder: "John Doe",
    rules: [(v) => !!v || "Account data not found"],
    disabled: true,
  },
};

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
  const [fetchedArea, setFetchedArea] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [bodyData, setBodyData] = useState();

  const [tableBody, setTableBody] = useState([]);
  const [tableBody2, setTableBody2] = useState([]);

  const [assignedPagination, setAssignedPagination] = useState();
  const [unassignedPagination, setUnassignedPagination] = useState();

  const [organisations, setOrganisatons] = useState();
  const [bankData, setBankData] = useState();

  const [showPostModal, setPostModal] = useState(false);
  const [stateOptions, setStateOptions] = useState();
  let bankName;
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });

  const dispatch = useDispatch();
  const {
    area: { allAreas },
    app: { error },
    auth: {
      userInfo: { claims },
    },
    location: { locations },
    pickers: { pickers, assignedPickers, unassignedPickers, allBanks },
  } = useSelector((state) => state);

  const { clearForm, ...formState } = useForm(wastePickerEntries);
  // override the clearform in useFom, to clear actual entries values on inputs
  const _clearForm = () => {
    const defaultEntries = {};
    Object.entries(wastePickerEntries).forEach(([key, val]) => {
      if (val.optionIdx) val.optionIdx = null;
      defaultEntries[key] = { ...val, value: "" };
    });
    wastePickerEntries = defaultEntries;
    clearForm();
  };
  formState.clearForm = _clearForm;

  const submitHandler = async (_data) => {
    let { accountName, accountNumber, ...data } = removeEmptyFields(_data);
    const finalData = { ...data, ...bankData };
    const res = await dispatch(createPicker(finalData));
    if (!res.error) {
      fetchAssigned(assignedPagination?.page);
      fetchUnassigned(unassignedPagination?.page);
    }
    return res;
  };

  const saveLocation = (location) => {
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
          allAreas
            ?.map((area) => area.lga)
            .filter((area, idx, lg) => lg.indexOf(area) === idx)
            .map((area) => ({
              text: area,
              value: area,
            })) || [],
      },
      fullName: {
        label: "Coverage Area",
        value: "",
        placeholder: "Enter your preferred area",
      },
    });
  };

  // search and filter handler

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const fetchUnassigned = async (page = 1) => {
    const res = await dispatch(
      getUnassignedPickers({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody2(collectors);
      setUnassignedPagination({ ...paginationData, date: payload });
    }
  };
  const fetchAssigned = async (page = 1) => {
    const res = await dispatch(
      getAssignedPickers({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody(collectors);
      setAssignedPagination({ ...paginationData, date: payload });
    }
  };

  const handleUnassignedFilter = async (date, page = 1) => {
    const res = await dispatch(
      getPickersWithData({
        ...date,
        isAssigned: false,
        page,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody2(collectors);
      setUnassignedPagination({ ...paginationData, date });
    }
  };

  const handleAssignedFilter = async (date, page = 1) => {
    const res = await dispatch(
      getPickersWithData({
        ...date,
        page,
        isAssigned: true,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody(collectors);
      setAssignedPagination({ ...paginationData, date });
    }
  };
  const handleAssignedSearch = async (key, page = 1) => {
    const res = await dispatch(
      getPickersWithData({
        key,
        page,
        isAssigned: true,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody(collectors);
      setAssignedPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };
  const handleUnssignedSearch = async (key, page = 1) => {
    const res = await dispatch(
      getPickersWithData({
        key,
        page,
        isAssigned: false,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setTableBody2(collectors);
      setUnassignedPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchCardData = async () => {
    await dispatch(getPickers(payload));
  };

  const data = [
    {
      title: "Assigned",
      link: "Assigned",
      data: tableBody,
      filterHandler: handleAssignedFilter,
      searchHandler: handleAssignedSearch,
      fetch: fetchAssigned,
      totalPages: assignedPagination?.totalPages,
      paginationData: assignedPagination,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        {
          title: "Customer Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Organisation",
          dataIndex: "organisation",
          key: "phone",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "Status",
          dataIndex: "companyVerified",
          key: "status",
          render(value, record) {
            return <p>{value ? "Approved" : "Awaiting approval"}</p>;
          },
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/waste_picker_profile/${record._id}`,
                    state: { record },
                  }}
                >
                  <StyledButton
                    type=""
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                  >
                    See More
                  </StyledButton>
                </Link>
              </Space>
            );
          },
        },
      ],
    },

    {
      title: "Unassigned",
      link: "Unassigned",
      data: tableBody2,
      totalPages: unassignedPagination?.totalPages,
      paginationData: unassignedPagination,
      filterHandler: handleUnassignedFilter,
      searchHandler: handleUnssignedSearch,
      fetch: fetchUnassigned,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        {
          title: "Address",
          dataIndex: "address",
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
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/waste_picker_profile/${record._id}`,
                    state: { record },
                  }}
                >
                  <StyledButton
                    type=""
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                  >
                    See More
                  </StyledButton>
                </Link>
              </Space>
            );
          },
        },
      ],
    },
  ];

  // const onSwitch = (key) => {
  //   setSelectedKey(key);
  // };

  const thisMonth = useSelector((state) => state?.user);
  const { currentMonthClient } = thisMonth;

  useEffect(() => {
    onRefresh();
    // fetch all organisations and format to select options format
    const fetchOrgs = async () => {
      const res = await dispatch(getAllOrganisations());
      if (!res.error) {
        const orgOptions = formatSelectOptions(
          res.payload.data.organisations,
          "companyName",
          "_id"
        );
        wastePickerEntries.organisation.options = orgOptions;
        setOrganisatons(orgOptions);
      }
    };

    if (!locations) dispatch(getAllLocations());
    if (!organisations) fetchOrgs();
    if (!allBanks) dispatch(getBank());
    if (!currentMonthClient) {
      const payload = {
        page: currentPage,
        currentMonth,
      };
      dispatch(currentMonthUser(payload));
    } else {
      setBodyData(currentMonthClient?.users);
    }
  }, []);

  useEffect(() => {
    if (assignedPickers) setTableBody(assignedPickers);
    if (unassignedPickers) setTableBody2(unassignedPickers);
  }, [assignedPickers, unassignedPickers]);

  useEffect(() => {
    //fills country select with available countries in locations state
    if (!locations) return;
    const countries = formatSelectOptions(locations, "country");
    wastePickerEntries.country.options = countries;
  }, [locations]);

  useEffect(() => {
    // return if there's no selected country or locations available
    if (!formState.formValues.country || !locations) return;

    //get the array of states for the selected country
    const availableStates =
      locations.find(
        (location) => location.country === formState.formValues.country
      ).states || [];

    // format the states into the select component options format
    const stateOptions = formatSelectOptions(availableStates);

    // set the state options into the state select component
    wastePickerEntries.state.options = stateOptions;
    setStateOptions(stateOptions);
  }, [formState.formValues.country, locations]);

  useEffect(() => {
    if (!allBanks) return;
    const banks = formatSelectOptions(allBanks, "name", "value");
    wastePickerEntries.bank.options = banks;
    // ban = allBanks.find((bank) => bank.value === );
  }, [allBanks]);

  const onRefresh = () => {
    fetchCardData();
    fetchAssigned();
    fetchUnassigned();
  };

  useEffect(() => {
    // handles validating account number and fill into account name input field
    const resolveAccount = async (accountNumber) => {
      const bank_code = formState.formValues.bank;
      bankName = allBanks.find(
        (bank) => bank.value === formState.formValues.bank
      );
      const data = {
        accountNumber,
        bank_code,
      };
      const res = await dispatch(validateAccount(data));
      if (res.payload.account_name) {
        formState.setValue("accountName", res.payload.account_name);
        const accountInfo = {
          accountName: res.payload.account_name,
          accountNo: res.payload.account_number,
          bankName: bankName.name,
          sortCode: formState.formValues.bank,
        };

        setBankData(accountInfo);
      } else formState.setValue("accountName", "");
    };

    const accountNum = formState.formValues.accountNumber;
    if (accountNum.length === 10) {
      resolveAccount(accountNum);
    } else if (accountNum === "") formState.setValue("accountName", "none");
  }, [formState.formValues.accountNumber]);

  const totalWastePickerCopy = TotalCardWastePicker.map((el) => {
    return { ...el };
  });
  totalWastePickerCopy[0].user = pickers?.totalMale || 0;
  totalWastePickerCopy[1].user = pickers?.totalFemale || 0;
  totalWastePickerCopy[2].user = pickers?.totalCollectors || 0;
  totalWastePickerCopy[3].user = pickers?.totalVerified || 0;
  const tableList = totalWastePickerCopy.slice(0, -1);
  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Waste Picker assigned successfully" : error}
      </Modal>

      <WastePickerModal
        mode={modalMode}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedArea={selectedArea}
        data={{ ...wastePickerEntries }}
        // data={rowInfo}
        userData={rowInfo}
        formState={formState}
        actionHandler={submitHandler}
      />

      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {tableList?.map((el, i) => {
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
          })}
        </div>

        <WastePickerContainer>
          <WastePickerHeader>
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
              Add Waste Picker
            </StyledButton>
          </WastePickerHeader>
          <Tabcontent
            data={data}
            // onSwitch={onSwitch}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            onRefresh={onRefresh}
          />
        </WastePickerContainer>
      </div>
    </>
  );
};

export default WastePicker;
