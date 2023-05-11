import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
// import { GrAddCircle } from "react-icons/gr";
import DataTable from "../../components/UI/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createPicker,
  getBank,
  getOrganisations,
  getPickersWithData,
  searchOrganisations,
  validateAccount,
} from "../../store/actions";
import moment from "moment";
import WastePickerModal from "../../components/wastePicker/wastePickerModal";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useForm from "../../hooks/useForm";
import { formatSelectOptions, removeEmptyFields } from "../../utils";
import BreadCrumb from "../../components/UI/breadCrumbs";

const OrganizationContainer = styled.div`
  margin-bottom: 20px;
  display: grid;
`;

const NavBarLeft = styled.div`
  ${tw`flex justify-between`}

  .text {
    font-size: 15px;
    color: "#0e0e0e";
  } ;
`;

// const OrganizationHeader = styled.div`
//   ${tw`flex self-end justify-self-end`}
// `;

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
    strictRules: false, //strictrules tells the form validity system about the flexxibility of then rules in this entry
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
  bank: {
    label: "Bank",
    optionIdxs: null,
    type: "select",
    options: [],
    rules: [(v) => !!v || "select a bank"],
  },
  accountNumber: {
    label: "Account Number ",
    value: "",
    placeholder: "0123456789",
    // extraDetail: "Only sterling account",
    strictRules: false,
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

const WasteOrganization = ({ match }) => {
  const history = useHistory();
  let bankName;
  const { pathname, state } = useLocation();

  const getIdInfo = pathname.split("/");
  let getId = getIdInfo[getIdInfo.length - 1];

  const {
    params: { id },
  } = match;

  if (!state) history.goBack();

  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [modalMode, setModalMode] = useState("create");

  const [tableBody, setTableBody] = useState();
  const [paginationData, setPaginationData] = useState();

  const [bankData, setBankData] = useState();
  const [stateOptions, setStateOptions] = useState();

  const date = new Date();
  const currentMonth = {
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  };

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
    const finalData = {
      ...data,
      ...bankData,
      organisation: state.selectedOrganisation._id,
    };

    const res = await dispatch(createPicker(finalData));
    if (!res.error) {
      fetchPickers();
    }
    return res;
  };

  const dispatch = useDispatch();
  const {
    auth: {
      userInfo: { claims },
    },
    location: { locations },
    pickers: { allBanks },
  } = useSelector((state) => state);

  const fetchPickers = async (page = 1) => {
    const payload = {
      key: state.selectedOrganisation.companyName,
      isAssigned: true,
      page,
    };
    const res = await dispatch(getPickersWithData(payload));
    if (!res.error) {
      const { collectors, ...pageData } = res.payload.data;
      setTableBody(collectors);
      setPaginationData(pageData);
    }
  };

  const handleFilter = async (date, page = 1) => {
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
      setPaginationData({ ...paginationData, date });
    }
  };
  const handleSearch = async (key, page = 1) => {
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
      setPaginationData({ ...paginationData, key });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Waste Collected",
      dataIndex: "wastecollected",
      key: "wastecollected",
    },
    {
      title: "Valuation(#)",
      dataIndex: "valuation",
      key: "valuation",
    },
  ];

  const data = tableBody?.map((picker) => ({
    name: picker.fullname,
    userId: picker._id.slice(0, 6),
    number: picker.phone,
    status: picker.status,
    wastecollected: picker.totalCollected,
    valuation: picker.pointGained,
  }));

  useEffect(() => {
    fetchPickers();
  }, [pathname]);
  useEffect(() => {
    if (!allBanks) dispatch(getBank());
  }, []);
  useEffect(() => {
    if (!allBanks) return;
    const banks = formatSelectOptions(allBanks, "name", "value");
    wastePickerEntries.bank.options = banks;
    // ban = allBanks.find((bank) => bank.value === );
  }, [allBanks]);
  useEffect(() => {}, [tableBody, paginationData]);

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

  const pages = [
    { name: "Profile Details", link: `/admin/profile_details/${id}` },
  ];
  return (
    <>
      <OrganizationContainer>
        {/* <OrganizationHeader> */}
        <NavBarLeft>
          <BreadCrumb pages={pages} current="Waste Picker" />

          {/* <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to={`/admin/profile_details/${getId}`}>
                Profile Details
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="#"> Waste Picker</Link>
            </Breadcrumb.Item>
          </Breadcrumb> */}
          {/* <Link to="/admin/total_organizations_setup"> */}
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
          {/* </Link> */}
        </NavBarLeft>
        {/* </OrganizationHeader> */}
      </OrganizationContainer>
      <WastePickerModal
        mode={modalMode}
        showModal={showModal}
        setShowModal={setShowModal}
        data={wastePickerEntries}
        formState={formState}
        actionHandler={submitHandler}
        userData={rowInfo}
      />
      <DataTable
        data={data}
        columns={columns}
        onFilter={handleFilter}
        onRefresh={fetchPickers}
        onSearch={handleSearch}
        onFetch={fetchPickers}
        paginationData={paginationData}
        header
      />
    </>
  );
};

export default WasteOrganization;
