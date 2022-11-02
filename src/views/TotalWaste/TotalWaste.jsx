import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BarChart from "../../components/UI/BarChart";
import DataTable from "../../components/UI/Table";
import { Tag, Space, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  filterAdminWaste,
  getAdminWaste,
  getAdminWasteStats,
  searchAdminWaste,
} from "../../store/actions";
import moment from "moment";
import { formatValue } from "../../utils";

const TotalWasteContainer = styled.div`
  ${tw`flex flex-col space-y-6 `}
`;
const BarChartHeader = styled.div`
  ${tw`flex items-center justify-between py-3`}
  border-bottom: 1px solid rgba(194, 194, 194, 0.4);
`;
const BarChartTitle = styled.h3`
  ${tw`text-xl font-extrabold`}
  letter-spacing:2;
`;
const BarChartContainer = styled.div`
  ${tw`bg-white `}
  padding: 3rem 1rem 0;
`;
const StatsBody = styled.div`
  ${tw`bg-white text-center text-secondary text-lg`}
  padding: 4rem 1rem;
`;

const TotalWaste = () => {
  const [paginationData, setPaginationData] = useState();
  const [fetchedAdminWaste, setFetchedAdminWaste] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bodyData, setBodyData] = useState();
  const date = new Date();
  const current = moment(new Date()).format("MMMM");

  const [currentMonth, setcurrentMonth] = useState({
    // start: moment(new Date(date.getFullYear(), date.getMonth() - 2, 1)).format(
    //   "YYYY-MM-DD"
    // ),
    // end: moment(new Date(date.getFullYear(), date.getMonth() + 3, 1)).format(
    //   "YYYY-MM-DD"
    // ),
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(moment()).endOf("month"),
  });

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const columns = [
    {
      title: "Schedule ID",
      dataIndex: "_id",
      searchQuery: "_id",
    },

    {
      title: "Size in Kg",
      dataIndex: "total",
      searchQuery: "total",
      render: (total) => (
        <p>
          {formatValue(total)}
          <span>kg</span>
        </p>
      ),
    },
    // {
    //   title: "Tags",
    //   searchQuery: "tags",
    //   dataIndex: "tags",
    //   render: (tags) => (
    //     <span>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} searchQuery={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Action",
    //   searchQuery: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const dispatch = useDispatch();
  const { adminWasteStats, adminWaste } = useSelector(
    (state) => state.adminWaste
  );

  // const onSearch = async (searchQuery) => {
  //   const payload = {
  //     page: currentPage,
  //     searchQuery: searchQuery || "",
  //   };
  //   const res = await dispatch(searchAdminWaste(payload));
  //   setBodyData(res?.payload?.data?.result);
  // };

  // const onFilter = async (date) => {
  //   const payload = {
  //     page: currentPage,
  //     date,
  //   };
  //   const res = await dispatch(filterAdminWaste(payload));
  //   setBodyData(res?.payload?.data?.result);
  //   setTotalPages(res?.payload?.data?.totalResult);
  // };

  const onSearch = async (searchQuery, page = 1) => {
    const res = await dispatch(
      searchAdminWaste({
        searchQuery: searchQuery || "",
        page,
      })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setBodyData(result);
      setPaginationData({ ...paginationData });
    }
  };

  const { RangePicker } = DatePicker;

  // useEffect(() => {
  //   if (!adminWaste) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(getAdminWaste(payload));
  //   } else {
  //     setBodyData(adminWaste?.result);
  //   }
  // }, []);

  // useEffect(() => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(getAdminWaste(payload));
  // }, [currentPage]);

  useEffect(() => {
    if (!adminWasteStats) dispatch(getAdminWasteStats(currentMonth));
    if (adminWasteStats) setFetchedAdminWaste(adminWasteStats?.wasteStats);
  }, [dispatch, adminWasteStats]);

  // const onRefresh = () => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(getAdminWaste(payload));
  // };

  useEffect(() => {
    setBodyData(adminWaste?.result);
    setTotalPages(adminWaste?.totalResult);
  }, [adminWaste]);

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getAdminWaste({
        currentMonth: payload,
        page,
      })
    );
    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setBodyData(result);
      setPaginationData({ ...paginationData, date: payload });
    }
  };
  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onFilter = async (date) => {
    const res = await dispatch(
      filterAdminWaste({
        currentMonth: date,
        page: 1,
      })
    );

    if (!res.error) {
      const { result, ...paginationData } = res.payload.data;
      setBodyData(result);
      setPaginationData(paginationData);
    }
  };

  return (
    <TotalWasteContainer>
      <BarChartContainer>
        <BarChartHeader>
          <BarChartTitle>{current}'s Waste Materials</BarChartTitle>
          {/* <RangePicker
            dateRender={(current) => {
              const style = {};
              if (current.date() === 1) {
                style.border = "1px solid #1890ff";
                style.borderRadius = "50%";
              }
              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          /> */}
        </BarChartHeader>
        <hr className="py-4" />
        {fetchedAdminWaste.length === 0 ? (
          <StatsBody>
            No Statistics Available for the month of {current}
          </StatsBody>
        ) : (
          <BarChart data={fetchedAdminWaste} />
        )}
      </BarChartContainer>

      <DataTable
        data={bodyData || []}
        columns={columns}
        header
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onSearch={onSearch}
        onFilter={onFilter}
        onFetch={fetchAll}
        onRefresh={onRefresh}
        paginationData={paginationData}
      />
    </TotalWasteContainer>
  );
};

export default TotalWaste;
