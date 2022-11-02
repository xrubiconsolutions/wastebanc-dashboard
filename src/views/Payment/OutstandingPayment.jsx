import React, { useState, useEffect } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import StyledButton from "../../components/UI/btn";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import store from "../../store/store";
import {
  currentMonthOutstanding,
  filterOutstanding,
  searchOutstanding,
} from "../../store/actions";

const OutstandingPayment = () => {
  const [bodyData, setBodyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
  const storeData = store.getState();

  const { outstandingPayment } = useSelector((state) => state.payments);

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const [paginationData, setPaginationData] = useState();

  // useEffect(() => {
  //   if (!outstandingPayment) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(currentMonthOutstanding(payload));
  //   } else {
  //     setBodyData(outstandingPayment?.payments);
  //   }
  // }, []);

  const onSearch = async (searchQuery, page = 1) => {
    const res = await dispatch(
      searchOutstanding({
        searchQuery: searchQuery || "",
        page,
      })
    );
    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setBodyData(payments);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterOutstanding({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setBodyData(payments);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      currentMonthOutstanding({
        page,
        currentMonth: payload,
      })
    );
    if (!res.error) {
      const { payments, ...paginationData } = res.payload.data;
      setBodyData(payments);
      setPaginationData({ ...paginationData });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  // useEffect(() => {
  //   setBodyData(outstandingPayment?.payments);
  //   setTotalPages(outstandingPayment?.totalPages);
  // }, [outstandingPayment]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Phone",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "Amount (naira)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "paid",
      key: "paid",
      render: (text) => (
        <p
          className={`${
            text === "true" ? "text-secondary" : "text-red-400"
          } font-bold`}
        >
          {text === "true" ? "paid" : "pending"}
        </p>
      ),
    },
    // {
    //   title: "Charity Organization",
    //   dataIndex: "charity_organization",
    //   key: "charity_organization",
    // },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },
  ];

  return (
    <div>
      {" "}
      <DataTable
        data={bodyData}
        columns={columns}
        header
        onFilter={onFilter}
        onSearch={onSearch}
        onRefresh={onRefresh}
        setCurrentPage={setCurrentPage}
        totalPages={paginationData?.totalPages}
        paginationData={paginationData}
      />
    </div>
  );
};

export default OutstandingPayment;
