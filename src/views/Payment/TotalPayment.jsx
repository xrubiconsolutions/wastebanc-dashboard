import React, { useState, useEffect } from "react";
import { Tag, Space } from "antd";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  currentMonthCharity,
  currentMonthDirect,
  filterCharity,
  filterDirect,
  searchCharity,
  searchDirect,
} from "../../store/actions";
import TotalPayoutModal from "../../components/UI/TotalPayoutModal";

const TotalPayment = () => {
  const [showPayout, setShowPayout] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [tableBody2, setTableBody2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });
  const [paginationData, setPaginationData] = useState();
  const [paginationData1, setPaginationData1] = useState();
  const [selectedKey, setSelectedKey] = useState("0");
  const [totalPages, setTotalPages] = useState(1);
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const dispatch = useDispatch();
  const { directPayment, charityPayment } = useSelector(
    (state) => state.payments
  );

  const handlePayoutFilter = async (date) => {
    const res = await dispatch(filterDirect(date));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody(res.payload.data.payments);
      setPaginationData1({ ...paginationData });
    }
  };

  const handlePayoutSearch = async (searchQuery) => {
    const payload = {
      page: currentPage,
      searchQuery: searchQuery || "",
    };
    const res = await dispatch(searchDirect(payload));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody(res.payload.data.payments);
      setPaginationData1({ ...paginationData });
    }
  };

  const handleCharityFilter = async (date) => {
    const res = await dispatch(filterCharity(date));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody2(res.payload.data.charities);
      setPaginationData({ ...paginationData });
    }
  };

  const handleCharitySearch = async (searchQuery) => {
    const payload = {
      page: currentPage,
      searchQuery: searchQuery || "",
    };
    const res = await dispatch(searchCharity(payload));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody2(res.payload.data.charities);
      setPaginationData({ ...paginationData });
    }
  };

  const fetchALlCharity = async (date) => {
    const res = await dispatch(currentMonthCharity({ date: payload }));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody2(res.payload.data.charities);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData?.totalPages);
    }
  };

  const fetchAllPayout = async (date) => {
    const res = await dispatch(currentMonthDirect({ date: payload }));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody(res.payload.data.payments);
      setPaginationData1({ ...paginationData });
    }
  };

  const onRefresh = () => {
    fetchALlCharity();
    fetchAllPayout();
  };
  useEffect(() => {
    onRefresh();
  }, []);

  const data = [
    {
      title: "Total Payout",
      link: "Total Payout",
      data: tableBody,
      filterHandler: handlePayoutFilter,
      searchHandler: handlePayoutSearch,
      totalPages: paginationData1?.totalPages,
      paginationData: paginationData1,
      fetch: fetchAllPayout,

      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Quantity Of Waste",
          dataIndex: "quantityOfWaste",
          key: "quantityOfWaste",
        },
        {
          title: "Amout (Naira)",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Status",
          dataIndex: "paid",
          key: "paid",
          render: (paid) => (
            <p className="text-secondary">
              {paid === true ? "Paid" : "Unpaid"}
            </p>
          ),
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <StyledButton
                type=""
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={() => {
                  setRowInfo(record);
                  setShowPayout(true);
                }}
              >
                See More
              </StyledButton>
              {/* <a>See More</a> */}
            </Space>
          ),
        },
        // {
        //   title: "Tags",
        //   key: "tags",
        //   dataIndex: "tags",
        //   render: (tags) => (
        //     <span>
        //       {tags.map((tag) => {
        //         let color = tag.length > 5 ? "geekblue" : "green";
        //         if (tag === "loser") {
        //           color = "volcano";
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         );
        //       })}
        //     </span>
        //   ),
        // },
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (text, record) => (
        //     <Space size="middle">
        //       <a>Invite {record.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
      ],
    },
    {
      title: "Direct to Charity",
      link: "Direct to Charity",
      data: tableBody2,
      filterHandler: handleCharityFilter,
      searchHandler: handleCharitySearch,
      paginationData: paginationData,
      totalPages: paginationData?.totalPages,
      fetch: fetchALlCharity,
      // data: [
      //   {
      //     key: "1",
      //     name: "John Brown",
      //     quantity: "185kg",
      //     amount: 80333227232,
      //     charity_organization: "Mechris Planet",
      //     date: "Jan 15, 2022",
      //   },
      //   {
      //     key: "2",
      //     name: "Jim Green",
      //     quantity: "185kg",
      //     amount: 80333227242,
      //     charity_organization: "Mechris Planet",
      //     date: "Jan 15, 2022",
      //   },
      //   {
      //     key: "3",
      //     name: "Joe Black",
      //     quantity: "185kg",
      //     amount: 80333227232,
      //     charity_organization: "Mechris Planet",
      //     date: "Jan 15, 2022",
      //   },
      //   {
      //     key: "4",
      //     name: "Joe Black",
      //     quantity: "185kg",
      //     amount: 80333227232,
      //     charity_organization: "Mechris Planet",
      //     date: "Jan 15, 2022",
      //   },
      //   {
      //     key: "5",
      //     name: "Joe Black",
      //     quantity: "185kg",
      //     amount: 80333227232,
      //     charity_organization: "Mechris Planet",
      //     date: "Jan 15, 2022",
      //   },
      //   {
      //     key: "6",
      //     name: "Joe Black",
      //     quantity: "185kg",
      //     amount: 80333227232,
      //     charity_organization: "Mechris Planet",
      //     date: "Jan 15, 2022",
      //   },
      // ],
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "Donation Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Estimated Quantity",
          dataIndex: "quantityOfWaste",
          key: "quantityOfWaste",
        },
        {
          title: "Charity Organization",
          dataIndex: "aggregatorOrganisation",
          key: "aggregatorOrganisation",
        },
        {
          title: "Date",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
        },
      ],
    },
  ];

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  // useEffect(() => {
  //   if (!directPayment) dispatch(currentMonthDirect(currentMonth));
  //   if (!charityPayment) dispatch(currentMonthCharity(currentMonth));
  // }, []);

  // useEffect(() => {
  //   setTableBody(directPayment?.payments);
  // }, [directPayment]);

  // useEffect(() => {
  //   setTableBody2(charityPayment?.charities);
  // }, [charityPayment]);

  return (
    <>
      <TotalPayoutModal
        showPayout={showPayout}
        setShowPayout={setShowPayout}
        data={rowInfo}
        userData={rowInfo}
      />
      <div>
        <Tabcontent data={data} onRefresh={onRefresh} onSwitch={onSwitch} />
      </div>
    </>
  );
};

export default TotalPayment;
