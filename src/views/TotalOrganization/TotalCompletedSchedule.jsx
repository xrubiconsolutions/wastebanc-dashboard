import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { Space, Tag } from "antd";
import DataTable from "../../components/UI/Table";
import moment from "moment";
import { truncate } from "../../utils/constants";
import {
  getCompletedSchedules,
  searchCompletedDropffSchedules,
  filterCompletedDropffSchedules,
  getCompletedPickupSchedules,
  filterCompletedPickupSchedules,
  searchCompletedPickupSchedules,
  s,
} from "../../store/actions";
import { useDispatch } from "react-redux";
import InvoiceModal from "../../components/invoice/InvoiceModal";
import BreadCrumb from "../../components/UI/breadCrumbs";

const FlexContainer = styled.div`
  ${tw` flex justify-between items-center`}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  color: #000;
`;

const TotalCompleted = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;

const GenerateInvoice = styled.div`
  margin-left: -10px !important;
  color: red;
`;

const TotalCompletedSchedule = ({ match }) => {
  const id = match?.params?.id;
  // const id = "625ec5872995f00023516971";
  const dispatch = useDispatch();

  const [paginationData, setPaginationData] = useState();
  const [bodyData, setBodyData] = useState([]);
  const [dropoffData, setDropoffData] = useState([]);
  const [paginationData1, setPaginationData1] = useState();

  const d = new Date();
  d.setDate(d.getDate());

  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchDropoffSchedules = async () => {
    const res = await dispatch(
      getCompletedSchedules({ id: id, currentMonth: payload })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload;
      setDropoffData(data);
      setPaginationData({ ...paginationData });
    }
  };

  const fetchPickupSchedules = async () => {
    const res = await dispatch(
      getCompletedPickupSchedules({ id: id, currentMonth: payload })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload;
      setBodyData(data);
      setPaginationData1({ ...paginationData });
    }
  };

  const searchDropoffSchedules = async (key, page = 1) => {
    const res = await dispatch(
      searchCompletedDropffSchedules({
        id: id,
        key: key || "",
        page,
      })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload;
      setDropoffData(data);
      setPaginationData({ ...paginationData });
    }
  };

  const filterDropoffSchedules = async (date, page = 1) => {
    const res = await dispatch(
      filterCompletedDropffSchedules({
        id: id,
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { data, ...paginationData } = res.payload;
      setDropoffData(data);
      setPaginationData({ ...paginationData });
    }
  };

  const filterPickupSchedules = async (date, page = 1) => {
    const res = await dispatch(
      filterCompletedPickupSchedules({
        id: id,
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { data, ...paginationData } = res.payload;
      setBodyData(data);
      setPaginationData1({ ...paginationData });
    }
  };

  const searchPickupSchedules = async (key, page = 1) => {
    const res = await dispatch(
      searchCompletedPickupSchedules({
        id: id,
        key: key || "",
        page,
      })
    );

    if (!res.error) {
      const { data, ...paginationData } = res.payload;
      setBodyData(data);
      setPaginationData1({ ...paginationData });
    }
  };

  const onRefresh = () => {
    fetchDropoffSchedules();
    fetchPickupSchedules();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      title: "Pickup",
      link: "Pickup",
      data: bodyData?.map((data) => ({
        key: data._id,
        date: moment(data.dropOffDate).format("YYYY-MM-DD"),
        ref_id: data.ref_id,
        coin: data.coin,
        recycler: data.recycler,
        address: data.address,
        fullname: data.fullname,
        state: data.state,
        waste: data.categories.map((item) => item.name),
        quantity: data.categories.map((item) => item.quantity),
        weight: data.weight,
      })),

      paginationData: paginationData1,
      filterHandler: filterPickupSchedules,
      searchHandler: searchPickupSchedules,
      fetch: fetchPickupSchedules,

      columns: [
        {
          title: "Transaction ID",
          dataIndex: "ref_id",
          key: "ref_id",
        },

        {
          title: "Location",
          dataIndex: "address",
          key: "address",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },

        // {
        //   title: <span>Recycler </span>,
        //   dataIndex: "recycler",
        //   key: "recycler",
        // },
        {
          title: "Customer Name",
          dataIndex: "fullname",
          key: "fullname",
        },

        {
          title: "Waste Categories",
          dataIndex: "waste",
          key: "waste",
          render: (waste) => (
            <span>
              {(waste.slice(0, 5) || []).map((waste) => {
                return <Tag key={waste}>{waste?.name || waste}</Tag>;
              })}
            </span>
          ),
        },

        {
          title: "Amount(N)",
          dataIndex: "coin",
          key: "coin",
        },

        {
          title: <span>Weight</span>,
          dataIndex: "weight",
          key: "weight",
        },
      ],
    },

    {
      title: "Drop off",
      link: "Drop off",
      data: dropoffData?.map((data) => ({
        key: data._id,
        date: moment(data.dropOffDate).format("YYYY MM DD"),
        recycler: data.recycler,
        ref_id: data.ref_id,
        coin: data.coin,
        address: data.address,
        fullname: data.fullname,
        state: data.state,
        waste: data.categories.map((item) => item.name),
        quantity: data.categories.map((item) => item.quantity),
        weight: data.weight,
      })),

      paginationData: paginationData,
      searchHandler: searchDropoffSchedules,
      filterHandler: filterDropoffSchedules,
      fetch: fetchDropoffSchedules,
      columns: [
        {
          title: "Transaction ID",
          dataIndex: "ref_id",
          key: "ref_id",
        },

        {
          title: "Location",
          dataIndex: "address",
          key: "address",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },

        // {
        //   title: <span>Recycler </span>,
        //   dataIndex: "recycler",
        //   key: "recycler",
        // },
        {
          title: "Customer Name",
          dataIndex: "fullname",
          key: "fullname",
        },

        {
          title: "Waste Categories",
          dataIndex: "waste",
          key: "waste",
          render: (waste) => (
            <span>
              {(waste.slice(0, 3) || []).map((waste) => {
                return <Tag key={waste}>{waste?.name || waste}</Tag>;
              })}
            </span>
          ),
        },

        {
          title: "Amount(N)",
          dataIndex: "coin",
          key: "coin",
        },

        {
          title: <span>Weight</span>,
          dataIndex: "weight",
          key: "weight",
        },
      ],
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const pages = [
    { name: "Profile Details", link: "/admin/profile_details/${id}" },
  ];

  return (
    <>
      {showModal && (
        <InvoiceModal
          showModal={showModal}
          setShowModal={setShowModal}
          id={id}
        />
      )}
      <TotalCompleted>
        <FlexContainer>
          <BreadCrumb pages={pages} current="Generated-Invoices" />
          {/* <Breadcrumb separator="<">
            <Breadcrumb.Item>
              <StyledLink>
                <Link to={`/admin/profile_details/${id}`}>Profile Details</Link>
              </StyledLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <StyledLink>
                <Link to="#">Completed Schedules</Link>
              </StyledLink>
            </Breadcrumb.Item>
          </Breadcrumb> */}

          <GenerateInvoice>
            <StyledButton
              buttonStyle="btn----outline"
              buttonSize="btn--medium"
              className="flex justify-between items-center"
              onClick={() => setShowModal(true)}
            >
              Generate Invoice
            </StyledButton>
          </GenerateInvoice>
        </FlexContainer>
        <Tabcontent data={data} onRefresh={onRefresh} />
      </TotalCompleted>
    </>
  );
};

export default TotalCompletedSchedule;
