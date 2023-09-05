import React, { useState, useEffect } from "react";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { UserContainer, NavBarLeft } from "../UserDetails";
import {
  insurancePurchases,
  InsuranceSearchPurchases,
} from "../../../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";

const InsurancePurchase = ({ match }) => {
  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  const [bodyData, setBodyData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState();
  const dispatch = useDispatch();
  const d = new Date();

  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchInsurancePurchases = async (page = 1) => {
    const res = await dispatch(
      insurancePurchases({
        currentMonth: payload,
        page,
      })
    );

    if (!res.error) {
      console.log(res.payload);
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const filterInsurancePurchases = async (date, page = 1) => {
    const res = await dispatch(
      insurancePurchases({
        currentMonth: date,
        page,
      })
    );

    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchInsurance = async (key, page = 1) => {
    const res = await dispatch(
      InsuranceSearchPurchases({
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

  const columns = [
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      key: "createdAt",
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
    // {
    //   title: "Purchase Status",
    //   dataIndex: "expiration_date",
    //   key: "expiration_date",

    //   render: (text) => (
    //     <p>
    //       {moment().format("YYYY-MM-DD") >= moment(text).format("YYYY-MM-DD")
    //         ? "Active"
    //         : "Expired"}
    //     </p>
    //   ),
    // },
  ];

  const onRefresh = () => {
    fetchInsurancePurchases();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Insurance Purchase"
            previous={previous}
          />
        </NavBarLeft>
      </UserContainer>
      <DataTable
        data={bodyData}
        onSearch={searchInsurance}
        columns={columns}
        setCurrentPage={setTotalPages}
        totalPages={totalPages}
        onFilter={filterInsurancePurchases}
        onRefresh={onRefresh}
        onFetch={fetchInsurancePurchases}
        paginationData={paginationData}
        header
      />
    </div>
  );
};

export default InsurancePurchase;
