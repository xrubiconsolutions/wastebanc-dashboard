import React, { useEffect, useState } from "react";
import DataTable from "../../../components/UI/Table";
import { UserContainer, NavBarLeft } from "../UserDetails";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { useDispatch } from "react-redux";
import { insuranceUsers, serachInsuranceUsers } from "../../../store/actions";
import { Space } from "antd";
import StyledButton from "../../../components/UI/btn";
import { Link } from "react-router-dom";
import moment from "moment";

const TotalInsuranceUser = ({ match }) => {
  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [rowInfo, setRowInfo] = useState([]);
  const dispatch = useDispatch();
  const [renewal, setRenewal] = useState(true);

  const {
    params: { id },
  } = match;

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      insuranceUsers({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      insuranceUsers({
        currentMonth: date,
        page,
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);

      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      serachInsuranceUsers({
        key: key || "",
        page,
      })
    );

    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "fullName",
      key: "fullName",
    },

    // {
    //   title: "Date of Purchase ",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    // },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Insurance Plan",
      dataIndex: "plan_name",
      key: "plan_name",
    },
    {
      title: "Last Purchase",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
    },

    // {
    //   title: "Start Date",
    //   dataIndex: "plan_name",
    //   key: "plan_name",
    // },
    // {
    //   title: "End Date",
    //   dataIndex: "plan_name",
    //   key: "plan_name",
    // },

    // {
    //   title: "Date Joined",
    //   dataIndex: "plan_name",
    //   key: "plan_name",
    // },

    {
      title: "Status",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (text) => (
        <p>
          {moment().format("YYYY-MM-DD") >=
          moment(text).format("YYYY-MM-DD") ? (
            <span className="text-green-400">Active</span>
          ) : (
            <span className="text-red-400"> Expired</span>
          )}
        </p>
      ),
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
                pathname: `/admin/insurance_details/${record.userId}`,
                state: record,
              }}
            >
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  setRowInfo(record);
                }}
              >
                See More
              </StyledButton>
            </Link>
          </Space>
        );
      },
    },
  ];

  const pages = [{ name: "Dashboard", link: "/admin/dashboard" }];

  const previous = [
    { name: "User Details", link: `/admin/insurance_details/${id}` },
  ];

  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Total Insurance Users"
            // previous={previous}
          />
        </NavBarLeft>
      </UserContainer>

      <DataTable
        data={bodyData}
        onSearch={onSearch}
        columns={columns}
        totalPages={paginationData?.totalPages}
        onFilter={onFilter}
        onRefresh={onRefresh}
        onFetch={fetchAll}
        paginationData={paginationData}
        header
      />
    </div>
  );
};

export default TotalInsuranceUser;

// the renewal history you asked about this the endpoint - /api/user/insurance_purchase/:userId
