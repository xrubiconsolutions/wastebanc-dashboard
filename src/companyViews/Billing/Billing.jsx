import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import Button from "../../components/UI/button";
import DataTable from "../../components/UI/Table";
import {
  estimatedCost,
  ongoingCost,
  billingHistory,
  searchBillingHistory,
  filterBillingHistory,
  AccountDetails,
} from "../../store/actions";
import { capitalize, formatValue } from "../../utils";
import { PageTitle } from "../utils/data";
import BillingReciept from "./BillingReciept";
import Tabcontent from "../../components/UI/TabContent";
import moment from "moment";

// const BillingContainer = styled.div`
//   ${tw`mb-14`}
// `;

const CardContainer = styled.div`
  ${tw`bg-white px-8 py-4 mb-14 space-y-2`}
  display:grid;
  //   grid-template-columns: 1fr auto;
`;
const TitleContainer = styled.div`
  ${tw`bg-white px-8 py-8 flex items-center justify-between -mb-4`}
`;
const CardNotice = styled.div`
  //   ${tw`mb-7`}
`;
const CardAccountInfo = styled.div`
  ${tw`flex gap-14`}
`;
const CardAccountInfoContainer = styled.div`
  ${tw`flex flex-col`}
`;
const CardAccountInfoTitle = styled.p`
  //   ${tw`flex gap-14`};
  font-size: 18px;
`;
const CardAccountInfoBody = styled.p`
  ${tw`text-secondary`}
  font-size: 20px;
`;
const CardNoticeCaption = styled.p`
  font-size: 20px;
`;
const CardAccount = styled.p`
  ${tw`text-secondary mt-10`}
  font-size: 30px;
`;

const BrBottom = styled.div`
  ${tw` mb-10`}
  margin-bottom:50px;
`;

const Billing = () => {
  const [allTransaction, setAllTransaction] = useState();
  const dispatch = useDispatch();
  const [paginationData, setPaginationData] = useState();
  const [billingData, setBillngData] = useState([]);
  const date = new Date();
  const [currentPage, setCurrentPage] = useState(1);

  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const fetchAll = async () => {
    const res = await dispatch(billingHistory({ currentMonth: payload }));
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setBillngData(invoices);
      setPaginationData({ ...paginationData });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onSearch = async (key) => {
    const res = await dispatch(
      searchBillingHistory({
        key: key || "",
        page: 1,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setBillngData(invoices);
      setPaginationData({ ...paginationData });
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterBillingHistory({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setBillngData(invoices);
      setPaginationData({ ...paginationData });
    }
  };

  // const columns = [
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     key: "date",
  //   },

  //   {
  //     title: "Description",
  //     dataIndex: "Description",
  //     key: "Description",
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "Amount",
  //     key: "Amount",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <Button
  //           type=""
  //           onClick={() => {
  //             //   setRowInfo(record);
  //             //   setShowModal(true);
  //           }}
  //         >
  //           Download
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];

  const data = [
    {
      data: billingData?.map((billing) => ({
        key: billing._id,
        date: moment(billing.endDate).format("YYYY-MM-DD"),
        Amount: billing.amount,
        invoiceNumber: billing.invoiceNumber,
      })),
      paginationData: paginationData,
      searchHandler: onSearch,
      filterHandler: onFilter,

      columns: [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },

        // {
        //   title: "Description",
        //   dataIndex: "Description",
        //   key: "Description",
        // },
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount",
        },
        {
          title: "invoiceNumber",
          dataIndex: "invoiceNumber",
          key: "invoiceNumber",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            console.log(record);
            return (
              <Space size="middle">
                <a
                  href={`https://pakam-staging.herokuapp.com/api/generate/invoicepdf/${record?.invoiceNumber}`}
                  className="text-white hover:text-white"
                >
                  <Button type="">Download</Button>
                </a>
              </Space>
            );
          },
        },
      ],
    },
  ];

  const { estimate, ongiong, account } = useSelector((state) => state.billing);

  useEffect(() => {
    if (!estimate) {
      dispatch(estimatedCost());
    }
    if (!ongiong) {
      dispatch(ongoingCost());
    }
    // else {
    //   setAllTransaction(ongiong);
    // }
    if (!account) {
      dispatch(AccountDetails());
    }
  }, []);

  return (
    <>
      <CardContainer>
        <CardNotice>Note: This information is updated daily</CardNotice>
        {/* <div className="gap-14 mb-10 items-center "></div> */}
        <CardAccountInfo>
          <CardAccountInfoContainer>
            <CardAccountInfoTitle>Account Name:</CardAccountInfoTitle>
            <CardAccountInfoBody>{account?.name}</CardAccountInfoBody>
          </CardAccountInfoContainer>
          <CardAccountInfoContainer>
            <CardAccountInfoTitle>Bank Name:</CardAccountInfoTitle>
            <CardAccountInfoBody>{account?.bank}</CardAccountInfoBody>
          </CardAccountInfoContainer>
          <CardAccountInfoContainer>
            <CardAccountInfoTitle>Account Number:</CardAccountInfoTitle>
            <CardAccountInfoBody> {account?.acnumber}</CardAccountInfoBody>
          </CardAccountInfoContainer>
        </CardAccountInfo>
      </CardContainer>
      <CardContainer>
        <CardNoticeCaption>
          Estimated cost for this billing period
        </CardNoticeCaption>
        <CardNotice>
          This is the current cost for your usage this billing period. The
          breakdown of your cost is available below
        </CardNotice>
        <CardAccount>{<span>&#8358;{formatValue(estimate)}</span>}</CardAccount>
      </CardContainer>

      <BillingReciept allTransaction={ongiong} />
      <br />
      <>
        <TitleContainer>
          <CardAccountInfoTitle>Billing History</CardAccountInfoTitle>
        </TitleContainer>
        {/* <hr /> */}
        {/* <DataTable data={data} columns={columns} header /> */}
        <Tabcontent
          data={data}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
        />
        <BrBottom />
      </>
    </>
  );
};

export default Billing;

// const res = await baseAxios.get(
//   `/invoice/${"62e26dbee85edc0023573fa9"}/history?start=${
//     currentMonth.start
//   }&end=${currentMonth.end}&paid=true`
// );
