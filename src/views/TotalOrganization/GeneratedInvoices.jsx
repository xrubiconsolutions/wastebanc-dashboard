import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { truncate } from "../../utils/constants";
import { Link } from "react-router-dom";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { Space } from "antd";
import {
  getOutstandingInvoice,
  searchOutstandingInvoice,
  filterOutstandingInvoice,
  getCompletedInvoice,
  searchCompletedInvoice,
  filterCompletedInvoice,
  completeFinancialPayment,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import PromptModal from "../../components/common/PromptModal";
import Modal from "../../components/UI/modal";
import { FlexBetween } from "../../components/styledElements";
import Invoice from "../../components/adminFinancials/Invoice";
import BreadCrumb from "../../components/UI/breadCrumbs";

const GeneratedInvoiceContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;

const GeneratedInvoices = ({ match }) => {
  const [outstanding, setOutstanding] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [paginationData1, setPaginationData1] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKey, setSelectedKey] = useState("0");
  // const [showPrompt, setShowPrompt] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setPostModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState();
  const [showReceiptModal, setReceiptModal] = useState();
  const invoiceRef = useRef();

  const d = new Date();

  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onRefresh = () => {
    fetchOutstandingInvoices();
    fetchCompletedInvoices();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const dispatch = useDispatch();
  const {
    app: { error },
  } = useSelector((state) => state);

  // const invoiceRef = useRef();

  const id = match?.params?.id;

  const fetchOutstandingInvoices = async (currentMonth = payload) => {
    const payload = {
      id: id,
      currentMonth,
      page: 1,
    };
    const res = await dispatch(getOutstandingInvoice(payload));
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setOutstanding(invoices);
      setPaginationData({ ...paginationData });
    }
  };

  console.log("outstanding....", outstanding);

  const fetchCompletedInvoices = async () => {
    const res = await dispatch(
      getCompletedInvoice({ id: id, currentMonth: payload, page: 1 })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setCompleted(invoices);
      setPaginationData1({ ...paginationData });
    }
  };

  const searchOutstandingInvoices = async (key, page = 1) => {
    const res = await dispatch(
      searchOutstandingInvoice({
        id: id,
        key: key || "",
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setOutstanding(invoices);
      setPaginationData({ ...paginationData });
    }
  };

  const searchCompletedInvoices = async (key, page = 1) => {
    const res = await dispatch(
      searchCompletedInvoice({
        id,
        key: key || "",
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setCompleted(invoices);
      setPaginationData1({ ...paginationData });
    }
  };

  const filterOutstandingInvoices = async (date, page = 1) => {
    const res = await dispatch(
      filterOutstandingInvoice({
        currentMonth: date,
        page,
        id: id,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setOutstanding(invoices);
      setPaginationData({ ...paginationData });
    }
  };

  const filterCompletedInvoices = async (date, page = 1) => {
    const res = await dispatch(
      filterCompletedInvoice({
        id: id,
        currentMonth: date,
        page,
      })
    );
    if (!res.error) {
      const { invoices, ...paginationData } = res.payload.data;
      setCompleted(invoices);
      setPaginationData1({ ...paginationData });
    }
  };

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  const completePayment = async (invoiceNumber) => {
    const res = await dispatch(completeFinancialPayment(invoiceNumber));
    if (!res.payload.error) onRefresh();
  };

  /****************************
   *
   * handlers and utils functions
   *
   ****************************/

  const data = [
    {
      title: "Outstanding",
      link: "Outstanding",
      data: outstanding?.map((data) => ({
        invoiceNumber: data.invoiceNumber,
        amount: data.amount,
        serviceCharge: data.serviceCharge,
        id: data._id,
      })),
      paginationData: paginationData,
      searchHandler: searchOutstandingInvoices,
      filterHandler: filterOutstandingInvoices,

      // data: [""],
      columns: [
        {
          title: "Invoice ID",
          dataIndex: "invoiceNumber",
          key: "invoiceNumber",
          render: (text) => <p>{truncate(text, 30)}</p>,
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
        // {
        //   title: "Invoice",
        //   dataIndex: "Invoice",
        //   key: "Invoice",
        // },
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
                      setShowModal(true);
                      setCurrentEntry(record);
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
      data: completed?.map((data) => ({
        invoiceNumber: data.invoiceNumber,
        amount: data.amount,
        serviceCharge: data.serviceCharge,
        id: data._id,
      })),

      paginationData: paginationData1,
      searchHandler: searchCompletedInvoices,
      filterHandler: filterCompletedInvoices,

      columns: [
        {
          title: "Invoice ID",
          dataIndex: "invoiceNumber",
          key: "invoiceNumber",
          render: (text) => <p>{truncate(text, 30)}</p>,
        },
        // {
        //   title: "paidStatus",
        //   dataIndex: "paidStatus",
        // },
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
        // {
        //   title: "Invoice",
        //   dataIndex: "Invoice",
        //   key: "Invoice",
        // },
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

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/

  const pages = [{ name: "Organization", link: "/admin/total_organizations" }];
  return (
    <>
      <PromptModal
        handler={() => completePayment(currentEntry.invoiceNumber)}
        showModal={showModal}
        setShowModal={setShowModal}
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
        <Invoice invoiceId={currentEntry?.id} ref={invoiceRef} />
      </Modal>

      <GeneratedInvoiceContainer>
        <BreadCrumb pages={pages} current="Generated-Invoices" />
        <Tabcontent
          data={data}
          onSwitch={onSwitch}
          setCurrentPage={setCurrentPage}
          onRefresh={onRefresh}
        />
      </GeneratedInvoiceContainer>
    </>
  );
};

export default GeneratedInvoices;
