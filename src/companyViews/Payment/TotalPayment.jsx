import { Tag, Space } from "antd";
import React, { useState, useEffect } from "react";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import InfoModal from "../../components/UI/InfoModal";
import { infoData } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  companyCharity,
  companyDirect,
  filterCompanyCharity,
  filterCompanyDirect,
  searchCompanyCharity,
  searchCompanyDirect,
} from "../../store/actions";
import moment from "moment";

const TotalPayment = () => {
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [tableBody2, setTableBody2] = useState([]);
  const date = new Date();
  // const [currentMonth, setcurrentMonth] = useState({
  //   start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
  //     "YYYY-MM-DD"
  //   ),
  //   end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
  //     "YYYY-MM-DD"
  //   ),
  // });

  const [paginationData, setPaginationData] = useState();
  const [paginationData1, setPaginationData1] = useState();
  const [selectedKey, setSelectedKey] = useState("0");

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const dispatch = useDispatch();

  const { companydirectPayment, companycharityPayment } = useSelector(
    (state) => state.payments
  );

  const handlePayoutFilter = async (date) => {
    // const res = await dispatch(filterCompanyDirect(date));
    // if (!res.error) setTableBody(res.payload.data.payments);

    const res = await dispatch(filterCompanyDirect(date));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody(res.payload.data.payments);
      setPaginationData1({ ...paginationData });
    }
  };

  const handlePayoutSearch = async (searchQuery) => {
    // const res = await dispatch(searchCompanyDirect(searchKey));
    // if (!res.error) setTableBody(res.payload.data.payments);

    const res = await dispatch(
      searchCompanyDirect({
        searchQuery: searchQuery || "",
        page: 1,
      })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody(res.payload.data.payments);
      setPaginationData1({ ...paginationData });
    }
  };

  const handleCharityFilter = async (date) => {
    // const res = await dispatch(filterCompanyCharity(date));
    // if (!res.error) setTableBody2(res.payload.data.charities);

    const res = await dispatch(filterCompanyCharity(date));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody2(res.payload.data.charities);
      setPaginationData({ ...paginationData });
    }
  };

  const handleCharitySearch = async (searchQuery) => {
    // const res = await dispatch(searchCompanyCharity(searchKey));
    // if (!res.error) setTableBody2(res.payload.data.charities);
    const res = await dispatch(
      searchCompanyCharity({
        searchQuery: searchQuery || "",
        page: 1,
      })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody2(res.payload.data.charities);
      setPaginationData({ ...paginationData });
    }
  };

  const fetchALlCharity = async (date) => {
    const res = await dispatch(companyCharity({ date: payload }));
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setTableBody2(res.payload.data.charities);
      setPaginationData({ ...paginationData });
    }
  };

  const fetchAllPayout = async (date) => {
    const res = await dispatch(companyDirect({ date: payload }));
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
                }}
              >
                See More
              </StyledButton>
            </Space>
          ),
        },
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
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Charity Organization",
          dataIndex: "charity_organization",
          key: "charity_organization",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
      ],
    },
  ];

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  // const onRefresh = () => {
  //   dispatch(companyDirect(currentMonth));
  //   dispatch(companyCharity(currentMonth));
  // };

  // useEffect(() => {
  //   if (!companydirectPayment) dispatch(companyDirect(currentMonth));
  //   if (!companycharityPayment) dispatch(companyCharity(currentMonth));
  // }, []);
  // useEffect(() => {
  //   setTableBody(companydirectPayment?.payments);
  // }, [companydirectPayment]);
  // useEffect(() => {
  //   setTableBody2(companycharityPayment?.charities);
  // }, [companycharityPayment]);

  return (
    <>
      <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
      />
      <div>
        <Tabcontent data={data} onRefresh={onRefresh} onSwitch={onSwitch} />
      </div>
    </>
  );
};

export default TotalPayment;
