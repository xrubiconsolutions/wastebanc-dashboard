import React, { useState, useEffect } from "react";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { UserContainer, NavBarLeft } from "../UserDetails";
import { payoutCharity, payoutSearchCharity } from "../../../store/actions";
import { useDispatch } from "react-redux";
import moment from "moment";

const CharityPayout = ({ match }) => {
  const [bodyData, setBodyData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState();

  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];
  const dispatch = useDispatch();
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchCharity = async (page = 1) => {
    const res = await dispatch(
      payoutCharity({
        currentMonth: payload,
        page,
        id,
      })
    );

    if (!res.error) {
      const { charityPayouts, ...paginationData } = res.payload.data;
      setBodyData(charityPayouts);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const filterCharity = async (page = 1) => {
    const res = await dispatch(
      payoutCharity({
        currentMonth: payload,
        page,
        id,
      })
    );

    if (!res.error) {
      const { charityPayouts, ...paginationData } = res.payload.data;
      setBodyData(charityPayouts);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchCharity = async (key, page = 1) => {
    const res = await dispatch(
      payoutSearchCharity({
        id,
        key: key || "",
        page,
      })
    );

    if (!res.error) {
      const { charityPayouts, ...paginationData } = res.payload.data;
      setBodyData(charityPayouts);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onRefresh = () => {
    fetchCharity();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <p>{_id.slice(0, 7)}</p>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

    {
      title: "Amount Paid Out",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Charity Organization",
      dataIndex: "charityOrganisation",
      key: "charityOrganisation",
      render: (charityOrganisation) => <p>{charityOrganisation["name"]}</p>,
    },
  ];

  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Payout to Charity"
            previous={previous}
          />
        </NavBarLeft>
      </UserContainer>
      <DataTable
        data={bodyData}
        onSearch={searchCharity}
        columns={columns}
        setCurrentPage={setTotalPages}
        totalPages={totalPages}
        onFilter={filterCharity}
        onRefresh={onRefresh}
        onFetch={fetchCharity}
        paginationData={paginationData}
        header
      />
    </div>
  );
};

export default CharityPayout;
