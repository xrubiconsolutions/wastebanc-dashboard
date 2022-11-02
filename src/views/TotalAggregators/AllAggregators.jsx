import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import { Link } from "react-router-dom";
import { Breadcrumb, Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import { infoData } from "../../utils/constants";
import Tabcontent from "../../components/UI/TabContent";
import {
  getOrganisationAggregators,
  searchOrganisationAggregators,
} from "../../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import BreadCrumb from "../../components/UI/breadCrumbs";

const NavBarLeft = styled.div`
  ${tw`flex justify-between`}
  .text {
    font-size: 15px;
    color: "#0e0e0e";
  } ;
`;
const OrganizationContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;

const AllAggregators = ({ match }) => {
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [bodyData, setBodyData] = useState([]);

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

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchAll = async (page = 1, currentMonth = payload) => {
    const payload = {
      page,
      id: match?.params?.id,
      currentMonth,
    };
    const res = await dispatch(getOrganisationAggregators(payload));
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setBodyData(collectors);
      setPaginationData(paginationData);
    }
  };

  const onRefresh = async () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onSearch = async (key) => {
    const res = await dispatch(
      searchOrganisationAggregators({
        id: match?.params?.id,
        page: 1,
        key: key || "",
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setBodyData(collectors);
      setPaginationData({ ...paginationData, page });
    }
  };

  const onFilter = async (date) => {
    const res = await dispatch(
      getOrganisationAggregators({
        id: match?.params.id,
        page: 1,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { collectors, ...paginationData } = res.payload.data;
      setBodyData(collectors);
      setPaginationData({ ...paginationData, page });
    }
  };

  const data = bodyData?.map((orgs) => ({
    key: orgs._id,
    name: orgs.fullname,
    phone: orgs.phone,
    organization: orgs.organisation,
    status: orgs.status,
    id: orgs._id,
    date: orgs.createdAt,
  }));

  const columns = [
    {
      title: "Aggregator's Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Aggregator's ID",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
    },
  ];
  const pages = [{ name: "Organization", link: "/admin/total_organizations" }];

  return (
    <OrganizationContainer>
      <NavBarLeft>
        <BreadCrumb pages={pages} current="Aggregators" />

        <Link to="/admin/total_organizations_setup">
          <StyledButton
            buttonStyle="btn--primary--outline"
            buttonSize="btn--medium"
            className="flex justify-between items-center"
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
            Add Organization
          </StyledButton>
        </Link>
      </NavBarLeft>
      <DataTable
        data={data}
        onSearch={onSearch}
        bodyData={bodyData}
        columns={columns}
        setPage={setPage}
        totalPages={paginationData?.totalPages}
        onFilter={onFilter}
        onRefresh={onRefresh}
        onFetch={fetchAll}
        paginationData={paginationData}
        header
      />
    </OrganizationContainer>
  );
};

export default AllAggregators;
