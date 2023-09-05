import React, { useState, useEffect } from "react";
import DataTable from "../../../../components/UI/Table";
import { UserContainer, NavBarLeft } from "../../UserDetails";
import BreadCrumb from "../../../../components/UI/breadCrumbs";
import {
  userRenewalHistory,
  usersSearchRenewalHistory,
} from "../../../../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";

const RenewalHistory = ({ match }) => {
  const {
    params: { id },
  } = match;

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);

  const fetchAll = async () => {
    const res = await dispatch(
      userRenewalHistory({
        userId: id,
        currentMonth: payload,
        page: 1,
      })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setBodyData(data);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onFilter = async (date) => {
    const res = await dispatch(
      userRenewalHistory({
        userId: id,
        currentMonth: date,
        page: 1,
      })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setBodyData(data);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onSearch = async (key) => {
    const res = await dispatch(
      usersSearchRenewalHistory({
        userId: id,
        key: key || "",
        page: 1,
      })
    );

    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setBodyData(data);
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
      title: "Date of Purchase ",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Insurance Plan",
      dataIndex: "plan_name",
      key: "plan_name",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Start Date",
      dataIndex: "activation_date",
      key: "activation_date",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "End Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Plan Status",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (text) => (
        <p>
          {moment().format("YYYY-MM-DD") >= moment(text).format("YYYY-MM-DD")
            ? "Active"
            : "Expired"}
        </p>
      ),
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
            current="Renewal History"
            previous={previous}
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

export default RenewalHistory;
