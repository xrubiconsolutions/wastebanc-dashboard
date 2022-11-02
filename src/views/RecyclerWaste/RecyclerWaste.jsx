import React, { useEffect, useState } from "react";
import { Tag, Space } from "antd";
import StyledButton from "../../components/UI/btn";
import DataTable from "../../components/UI/Table";
import { truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Collector,
  filterWasteCollector,
  searchWasteCollector,
} from "../../store/actions";
import { current } from "@reduxjs/toolkit";

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
    render: (text) => <p>{truncate(text, 150)}</p>,
  },
  {
    title: "Total Collected",
    dataIndex: "total",
    key: "total",
  },
];

const data = [
  {
    key: "1",
    id: "3c4Statewide Waste and Environmental Education Foundation50",
    collected: 32,
    date: "Jan 15, 2022",
  },
  {
    key: "2",
    id: "Jim Green",
    collected: 42,
    date: "Jan 15, 2022",
  },
  {
    key: "3",
    id: "Joe Black",
    collected: 32,
    date: "Jan 15, 2022",
  },
];

const RecyclerWaste = () => {
  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState();
  const date = new Date();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });
  const [paginationData, setPaginationData] = useState();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  // const onSearch = async (searchQuery) => {
  //   const payload ={
  //     page: currentPage,
  //     searchQuery: searchQuery  || "",
  //   }
  //   const res = await dispatch(searchWasteCollector(payload));
  //   setBodyData(res?.payload?.data?.result);
  // };

  const onSearch = async (searchQuery, page = 1) => {
    const payload = {
      page,
      searchQuery: searchQuery || "",
    };
    const res = await dispatch(searchWasteCollector(payload));
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setBodyData(result);
      setPaginationData({ ...paginationData, payload });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const payload = {
      page,
      date,
    };
    const res = await dispatch(filterWasteCollector(payload));
    const { result, ...paginationData } = res.payload.data;
    setBodyData(result);
    setPaginationData({ ...paginationData, date });
    // setTotalPages(paginationData.totalPages);
  };

  // const onRefresh = () => {
  //   dispatch(Collector(currentMonth));
  // };

  const fetchAll = async (date) => {
    const res = await dispatch(Collector(payload));
    // console.log("All Recycler waste", res);
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setBodyData(result);
      setPaginationData({ ...paginationData });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const thisMonth = useSelector((state) => state?.collector);
  const { wasteCollection } = thisMonth;

  // useEffect(() => {
  //   if (!wasteCollection) {
  //     dispatch(Collector(currentMonth));
  //   } else {
  //     setBodyData(wasteCollection?.result);
  //     setTotalPages(wasteCollection?.totalResult);
  //   }
  // }, []);

  useEffect(() => {
    setBodyData(wasteCollection?.result);
  }, [wasteCollection]);

  return (
    <>
      <DataTable
        data={bodyData}
        columns={columns}
        onFilter={onFilter}
        onSearch={onSearch}
        onRefresh={onRefresh}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        paginationData={paginationData}
        onFetch={fetchAll}
        header
      />
    </>
  );
};

export default RecyclerWaste;
