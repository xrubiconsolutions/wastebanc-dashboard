import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
// import { GrAddCircle } from "react-icons/gr";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrganisations, searchOrganisations } from "../../store/actions";
import moment from "moment";
import { claimPermissions } from "../../utils/constants";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const OrganizationContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;

const OrganizationHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const TotalOrganization = () => {
  const [fetchedOrgs, setFetchedOrgs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const filterVal = query.get("start");

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

  const dispatch = useDispatch();
  const {
    organisation: { organisations, searchOrg },
    auth: {
      userInfo: { claims },
    },
  } = useSelector((state) => state);
  const orgPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.ORGANISATION.title
  );
  const [paginationData, setPaginationData] = useState();

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate());
    const payload = {
      start: "2010-01-01",
      end: d,
    };
    dispatch(getOrganisations({ currentMonth: payload, page: 1 }))
      .unwrap()
      .then((res) => {
        const { organisations, ...paginationData } = res.data;
        setPaginationData(paginationData);
        setFetchedOrgs(organisations);
      });
    setFetchedOrgs(organisations?.organisations);
  }, []);

  const onRefresh = () => {
    fetchAll();
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      getOrganisations({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { organisations, ...paginationData } = res.payload.data;
      setFetchedOrgs(organisations);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchOrganisations({
        key,
        page,
      })
    );
    if (!res.error) {
      const { organisations, ...paginationData } = res.payload.data;
      setFetchedOrgs(organisations);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  // fetch all for default

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getOrganisations({
        currentMonth: payload,
        page,
      })
    );
    if (!res.error) {
      const { organisations, ...paginationData } = res.payload.data;
      setFetchedOrgs(organisations);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const data = fetchedOrgs?.map((orgs) => ({
    key: orgs._id,
    name: orgs.companyName,
    areas: orgs.areaOfAccess,
    phone: orgs.phone,
    address: orgs.location,
    tag: orgs.companyTag,
  }));

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Area of Access",
      dataIndex: "areas",
      key: "areas",
      render: (areas) => (
        <span>
          {(areas.slice(0, 3) || []).map((area) => {
            return <Tag key={area}>{area.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Contact Line",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Organization Tag",
      dataIndex: "tag",
      key: "tag",
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
                pathname: `/admin/profile_details/${record.key}`,
                // id: record.key
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
  ];

  return (
    <OrganizationContainer>
      <OrganizationHeader>
        {/* {orgPermissions?.create && ( */}
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
            Add Organizations
          </StyledButton>
        </Link>
        {/* )} */}
      </OrganizationHeader>
      <DataTable
        data={data}
        onSearch={onSearch}
        columns={columns}
        setCurrentPage={setCurrentPage}
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

export default TotalOrganization;
