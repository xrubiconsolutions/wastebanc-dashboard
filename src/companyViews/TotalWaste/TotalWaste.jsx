import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BarChart from "../../components/UI/BarChart";
import DataTable from "../../components/UI/Table";
import { Tag, Space, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyWasteStats,
  getCompanyWaste,
  filterCompanyWaste,
  searchCompanyWaste,
} from "../../store/actions";

import moment from "moment";
import { formatValue } from "../../utils";

// const columns = [
//   {
//     title: "Schedule ID",
//     dataIndex: "aggregatorId",
//      : "aggregatorId",
//   },

//   {
//     title: "Waste Category",
//     dataIndex: "wastes",
//     key: "wastes",
//     render: (wastes) => (
//       <span>
//         {wastes.map((waste) => {
//           return <Tag key={waste}>{waste.toUpperCase()}</Tag>;
//         })}
//       </span>
//     ),
//   },
//   {
//     title: "Size in Kg",
//     dataIndex: "size",
//     key: "size",
//   },

//   {
//     title: "Date",
//     dataIndex: "date",
//     key: "date",
//   },
// ];

const columns = [
  {
    title: "Aggregator ID",
    dataIndex: "aggregatorId",
    key: "aggregatorId",
  },
  {
    title: "Full Name",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Category",
    dataIndex: "categories",
    key: "categories",
    render: (wastes) => (
      <span>
        {(wastes.slice(0, 3) || []).map((waste) => {
          return <Tag key={waste}>{waste?.name || waste}</Tag>;
        })}
      </span>
    ),
  },
  {
    title: "Recycler",
    dataIndex: "recycler",
    key: "recycler",
  },
  {
    title: "Organization",
    dataIndex: "organisation",
    key: "organisation",
  },
];

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
  const { RangePicker } = DatePicker;
  const [bodyData, setBodyData] = useState();
  const [statsBodyData, setStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    // end: moment(new Date(date.getFullYear(), date.getMonth() + 1)).format(
    //   "YYYY-MM-DD"
    // ),
    end: moment(moment()).endOf("month"),
  });
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const [paginationData, setPaginationData] = useState();
  const dispatch = useDispatch();
  const { companyWasteStats, companyWaste } = useSelector(
    (state) => state.companyWaste
  );

  const onSearch = async (searchQuery, page = 1) => {
    const res = await dispatch(
      searchCompanyWaste({
        searchQuery: searchQuery || "",
        page,
      })
    );
    if (!res.error) {
      const { wasteTransactions, ...paginationData } = res.payload.data;
      console.log(wasteTransactions, "search results");
      setBodyData(wasteTransactions);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };
  const onFilter = async (date) => {
    const res = await dispatch(
      filterCompanyWaste({
        date,
      })
    );
    if (!res.error) {
      const { wasteTransactions, ...paginationData } = res.payload.data;

      setBodyData(wasteTransactions);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async () => {
    const res = await dispatch(
      getCompanyWaste({
        date: payload,
      })
    );
    if (!res.error) {
      const { wasteStats, ...paginationData } = res.payload.data;
      setBodyData(wasteStats);
      setPaginationData({ ...paginationData });
    }
  };
  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (!companyWaste) {
      const payload = {
        page: currentPage,
        currentMonth,
      };
      dispatch(getCompanyWaste(payload));
    } else {
      setBodyData(companyWaste?.wasteTransactions);
    }
  }, []);

  useEffect(() => {
    const payload = {
      page: currentPage,
      currentMonth,
    };
    dispatch(getCompanyWaste(payload));
  }, [currentPage]);

  useEffect(() => {
    if (!companyWasteStats) dispatch(getCompanyWasteStats(currentMonth));
    if (companyWasteStats) setStats(companyWasteStats?.wasteStats);
  }, [dispatch, companyWasteStats]);

  useEffect(() => {
    setBodyData(companyWaste?.wasteTransactions);
    setTotalPages(companyWaste?.totalResult);
  }, [companyWaste]);
  console.log(statsBodyData, "statsBodyDatastatsBodyData");
  const current = moment(new Date()).format("MMMM");

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
        {statsBodyData.length === 0 ? (
          <StatsBody>
            No Statistics Available for the month of {current}
          </StatsBody>
        ) : (
          <BarChart data={statsBodyData} />
        )}
      </BarChartContainer>
      <DataTable
        data={bodyData || []}
        date="welcome"
        setCurrentPage={setCurrentPage}
        onSearch={onSearch}
        onFilter={onFilter}
        onRefresh={onRefresh}
        columns={columns}
        refreshUrl="drop-off"
        header
        paginationData={paginationData}
        totalPages={paginationData?.totalPages}
      />
    </TotalWasteContainer>
  );
};

export default TotalWaste;
