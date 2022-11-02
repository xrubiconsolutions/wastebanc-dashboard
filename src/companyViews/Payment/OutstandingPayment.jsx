import React, { useState, useEffect } from "react";
import { Tag, Space } from "antd";
import DataTable from "../../components/UI/Table";
import StyledButton from "../../components/UI/btn";
import { infoData } from "../../utils/constants";
import InfoModal from "../../components/UI/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  companyOutstanding,
  filterCompanyOutstanding,
  searchCompanyOutstanding,
} from "../../store/actions";

const OutstandingPayment = () => {
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [bodyData, setBodyData] = useState([]);
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
  const { companyoutstandingPayment } = useSelector((state) => state.payments);
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   if (!companyoutstandingPayment) {
  //     dispatch(companyOutstanding(currentMonth));
  //   } else {
  //     setBodyData(companyoutstandingPayment?.payments);
  //   }
  // }, []);

  // const onSearch = async (searchQuery) => {
  //   const res = await dispatch(searchCompanyOutstanding(searchQuery));
  //   setBodyData(res?.payload?.data?.dropoffs);
  // };

  const onSearch = async (searchQuery) => {
    const res = await dispatch(
      searchCompanyOutstanding({
        searchQuery: searchQuery || "",
      })
    );

    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setBodyData(data);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date) => {
    const res = await dispatch(
      filterCompanyOutstanding({
        date,
      })
    );
    if (!res.error) {
      const { date, ...paginationData } = res.payload.data;
      setBodyData(date);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (date) => {
    const res = await dispatch(
      companyOutstanding({
        date: payload,
      })
    );
    if (!res.error) {
      const { data, ...paginationData } = res.payload.data;
      setBodyData(data);
      setPaginationData({ ...paginationData });
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
      title: "Amount(Naira)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Waste Quantity",
      dataIndex: "quantityOfWaste",
      key: "quantityOfWaste",
      // render: (text) => <p style={{ color: "red" }}>{text}</p>,
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
              setRowInfo(record.info);
              setShowModal(true);
            }}
          >
            See More
          </StyledButton>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      number: "08181715531",
      amount: "5000",
      status: "pending",
      info: infoData.newOutstanding,
    },
    {
      key: "1",
      name: "John Brown",
      number: "08181715531",
      amount: "5000",
      status: "pending",
      info: infoData.newOutstanding,
    },
    {
      key: "1",
      name: "John Brown",
      number: "08181715531",
      amount: "5000",
      status: "pending",
      info: infoData.newOutstanding,
    },
  ];
  useEffect(() => {
    setBodyData(companyoutstandingPayment?.payments);
  }, [companyoutstandingPayment]);
  return (
    <>
      <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
      />
      <div>
        <DataTable
          data={bodyData}
          columns={columns}
          header
          onRefresh={onRefresh}
          onSearch={onSearch}
          onFilter={onFilter}
          onFetch={fetchAll}
          paginationData={paginationData}
          totalPages={paginationData?.totalPages}
        />
      </div>
    </>
  );
};

export default OutstandingPayment;
