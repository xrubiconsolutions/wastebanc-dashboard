import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Pdf from "react-to-pdf";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import Button from "../../components/UI/button";
import ContentCard from "../../components/UI/ContentCard";
import {
  colors,
  FinancialsCards,
  TotalCardWastePicker,
} from "../../utils/data";
import WastePickerModal from "../../components/wastePicker/wastePickerModal";
import { infoData, truncate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Disable from "../../components/UI/Disable";
import { Link } from "react-router-dom";
import { removeEmptyFields } from "../..//utils/";

import {
  completeFinancialPayment,
  createPicker,
  currentMonthUser,
  downloadInvoice,
  fetchFinancialCompleted,
  fetchFinancialOutstandings,
  fetchFinancialSummary,
  getAllLocations,
  getAllOrganisations,
} from "../../store/actions";
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import StyledButton from "../../components/UI/btn";
import { formatSelectOptions } from "../../utils";
import useForm from "../../hooks/useForm";
import Tabcontent from "../../components/UI/TabContent";
import WastePickerService from "../../services/wastePickerService";
import Modal from "../../components/UI/modal";
import Checkbox from "../../components/UI/Checkbox";
import PromptModal from "../../components/common/PromptModal";
import BillingReciept from "../../companyViews/Billing/BillingReciept";
import Invoice from "../../components/adminFinancials/Invoice";
import { FlexBetween, FlexContainer } from "../../components/styledElements";

const WastePickerContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;

const Financials = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [modalMode, setModalMode] = useState("create");

  const [selectedArea, setSelectedArea] = useState({});
  const [fetchedArea, setFetchedArea] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [bodyData, setBodyData] = useState();

  const [tableBody, setTableBody] = useState([]);
  const [tableBody2, setTableBody2] = useState([]);

  const [outstandingPagination, setOustandingPagination] = useState();
  const [completedPagination, setCompletedPagination] = useState();

  const [organisations, setOrganisatons] = useState();
  const [bankData, setBankData] = useState();

  const [showPostModal, setPostModal] = useState(false);
  const [stateOptions, setStateOptions] = useState();
  const [showPrompt, setPrompt] = useState(false);

  const [summaryData, setSummaryData] = useState();
  const [receiptLink, setReceiptLink] = useState();
  const [showReceiptModal, setReceiptModal] = useState();
  const [currentEntry, setCurrentEntry] = useState();

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
  const {
    area: { allAreas },
    app: { error },
    auth: {
      userInfo: { claims },
    },
    location: { locations },
    financials: { completedPayments, outstandingPayments },
  } = useSelector((state) => state);
  const invoiceRef = useRef();

  /****************************
   *
   * handlers and utils functions
   *
   ****************************/
  // search and filter handler

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const fetchOutstandings = async (page = 1) => {
    const res = await dispatch(
      fetchFinancialOutstandings({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setTableBody(invoices);
      setOustandingPagination({ ...paginationData, date: payload });
    }
  };

  const fetchCompleted = async (page = 1) => {
    const res = await dispatch(
      fetchFinancialCompleted({
        ...payload,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setTableBody2(invoices);
      setCompletedPagination({ ...paginationData, date: payload });
    }
  };

  const handleCompletedFilter = async (date, page = 1) => {
    const res = await dispatch(
      fetchFinancialCompleted({
        ...date,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setTableBody2(invoices);
      setCompletedPagination({ ...paginationData, date });
    }
  };

  const handleOutstandingFilter = async (date, page = 1) => {
    const res = await dispatch(
      fetchFinancialOutstandings({
        ...date,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setTableBody(invoices);
      setOustandingPagination({ ...paginationData, date });
    }
  };
  const handleOutstandingSearch = async (key, page = 1) => {
    const res = await dispatch(
      fetchFinancialOutstandings({
        key,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setTableBody(invoices);
      setOustandingPagination({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };
  const handleCompletedSearch = async (key, page = 1) => {
    const res = await dispatch(
      fetchFinancialCompleted({
        key,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setTableBody2(invoices);
      setCompletedPagination({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchCardData = async () => {
    const data = await dispatch(fetchFinancialSummary(payload));
    setSummaryData(data.payload.data);
  };

  const completePayment = async (invoiceNumber) => {
    const res = await dispatch(completeFinancialPayment(invoiceNumber));
    if (!res.payload.error) onRefresh();
    // console.log("The result: ", res);
  };

  const data = [
    {
      title: "Outstanding",
      link: "Outstanding",
      data: tableBody.map((entry) => ({
        ...entry,
        organisation: entry.company?.companyName,
      })),
      filterHandler: handleOutstandingFilter,
      searchHandler: handleOutstandingSearch,
      fetch: fetchOutstandings,
      totalPages: outstandingPagination?.totalPages,
      paginationData: outstandingPagination,
      columns: [
        {
          title: "Invoice ID",
          dataIndex: "invoiceNumber",
          key: "invoiceNumber",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        {
          title: "Organisation",
          dataIndex: "organisation",
          key: "organisation",
        },
        {
          title: <span>Amount (&#8358;)</span>,
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: <span>Service Charge (&#8358;)</span>,
          dataIndex: "serviceCharge",
          key: "serviceCharge",
        },
        {
          title: "Invoice",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <StyledButton
                  buttonStyle="btn--primary--outline"
                  buttonSize="btn--small"
                  onClick={() => {
                    setCurrentEntry(record);
                    setReceiptModal(true);
                  }}
                >
                  View
                </StyledButton>
              </Space>
            );
          },
        },
        {
          title: "Mark as paid",
          dataIndex: "paid",
          key: "action",
          render: (text, record) => {
            return (
              <>
                <Space size="middle">
                  <StyledButton
                    type=""
                    buttonSize="btn--small"
                    onClick={() => {
                      setCurrentEntry(record);
                      setPrompt(true);
                    }}
                  >
                    Mark
                  </StyledButton>
                </Space>
              </>
            );
          },
        },
      ],
    },

    {
      title: "Completed",
      link: "Completed",
      data: tableBody2.map((entry) => ({
        ...entry,
        organisation: entry.company?.companyName,
      })),
      totalPages: completedPagination?.totalPages,
      paginationData: completedPagination,
      filterHandler: handleCompletedFilter,
      searchHandler: handleCompletedSearch,
      fetch: fetchCompleted,
      columns: [
        {
          title: "Invoice ID",
          dataIndex: "invoiceNumber",
          key: "invoiceNumber",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        {
          title: "Organisation",
          dataIndex: "organisation",
        },
        {
          title: "Amount (N)",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Service Charge (N)",
          dataIndex: "serviceCharge",
          key: "serviceCharge",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <StyledButton
                  buttonStyle="btn--primary--outline"
                  buttonSize="btn--small"
                  onClick={() => {
                    setCurrentEntry(record);
                    setReceiptModal(true);
                  }}
                >
                  View
                </StyledButton>
              </Space>
            );
          },
        },
      ],
    },
  ];

  // const onSwitch = (key) => {
  //   setSelectedKey(key);
  // };

  const thisMonth = useSelector((state) => state?.user);
  const { currentMonthClient } = thisMonth;

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (outstandingPayments) setTableBody(outstandingPayments);
    if (completedPayments) setTableBody2(completedPayments);
  }, [completedPayments, outstandingPayments]);

  const onRefresh = () => {
    fetchCardData();
    fetchCompleted();
    fetchOutstandings();
  };

  const [selectedKey, setSelectedKey] = useState("0");

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  const totalSummaryCards = FinancialsCards.map((el) => {
    return { ...el };
  });
  // console.log("The summary: ", totalSummaryCards);
  totalSummaryCards[0].amount = summaryData?.totalPayment || 0;
  totalSummaryCards[1].amount = summaryData?.totalOutStanding || 0;
  totalSummaryCards[2].amount = summaryData?.totalCompleted || 0;
  totalSummaryCards[3].amount = summaryData?.totalMaintanceFee || 0;

  return (
    <>
      <PromptModal
        handler={() => completePayment(currentEntry.invoiceNumber)}
        showModal={showPrompt}
        setShowModal={setPrompt}
        successMessage="Invoice has been marked as paid!"
        promptMessage="Are you sure you want to mark this invoice as paid?"
        buttonText="Mark"
        title={"Mark as paid"}
      />
      <Modal
        show={showReceiptModal}
        close={() => setReceiptModal(false)}
        width="85em"
      >
        <FlexBetween className="mb-7">
          <p className="text-xl font-semibold">Completed Schedules Invoices</p>

          <StyledButton
            raffle
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            className="text-black"
          >
            <a
              className="text-black"
              href={`https://pakam-staging.herokuapp.com/api/generate/invoicepdf/${currentEntry?.invoiceNumber}`}
            >
              Capture as PDF
            </a>
          </StyledButton>

          {/* <Pdf
            targetRef={invoiceRef}
            filename={`${currentEntry?.company?.companyName}_${currentEntry?.invoiceNumber}.pdf`}
          >
            {({ toPdf }) => (
              <StyledButton
                raffle
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                onClick={toPdf}
              >
                Capture as PDF
              </StyledButton>
            )}
          </Pdf> */}
        </FlexBetween>
        <Invoice invoiceId={currentEntry?._id} ref={invoiceRef} />
      </Modal>

      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Waste Picker assigned successfully" : error}
      </Modal>

      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {totalSummaryCards?.map((el, i) => {
            return (
              <ContentCard
                ImgUrl={el.icon}
                title={el.title}
                // amount={Result[el.key]}
                amount={<span>&#8358;{el.amount}</span>}
                style={{ color: colors[i] }}
                key={i}
              />
            );
          })}
        </div>

        <WastePickerContainer>
          <Tabcontent
            data={data}
            // onSwitch={onSwitch}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            onRefresh={onRefresh}
          />
        </WastePickerContainer>
      </div>
    </>
  );
};

export default Financials;
