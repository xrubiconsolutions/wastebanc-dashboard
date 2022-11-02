import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useDispatch } from "react-redux";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { getGeneratedInvoice } from "../../store/actions";
import { useHistory } from "react-router-dom";
import GeneratedInvoices from "../../views/TotalOrganization/InvoiceGenerate";

const ModalBackground = styled.div`
  width: 390px;
  height: auto;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: absolute;
  border-radius: 10px;
  right: 20px;
  margin-top: 55px;
  padding-bottom: 10px;
  z-index: 999;

  a:hover {
    color: green;
  }
  modalContainer {
    position: fixed;
  }
  h6 {
    margin-top: 15px;
  }
  .iconStyle {
    display: inline-block;
    margin-left: 190px;
  }
`;

const OverlayBackground = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
  opacity: 0.7;
  z-index: 10;
  transition: all 200ms ease-in-out;
`;

const Text = styled.p`
  ${tw`text-gray-500 pb-2`}
  font-size:15px
`;

const Br = styled.div`
  margin-top: 60px;
`;

const DivWrapper = styled.div`
  ${tw`flex justify-around gap-7 mt-5 mb-5`}
  max-width:80%;
`;

function InvoiceModal({ setShowModal, id }) {
  const dispatch = useDispatch();
  const dateFormat = "YYYY-MM-DD";
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const [show, setShow] = useState(false);

  const history = useHistory();

  const [date, setDate] = useState(false);
  const [date1, setDate1] = useState(false);

  function onSelectDate(date, dateString) {
    setDate(dateString);
  }

  function onSelectDate1(date, dateString) {
    setDate1(dateString);
  }

  const body = {
    // start: "2022-04-01",
    // end: "2022-08-31",
    // companyId: "630cac53ee707f0023b302fd",
    start: date,
    end: date1,
    companyId: id,
  };

  const invoiceHandler = async () => {
    setShowModal(false);
    history.push(`invoice_details/${id}`);
  };

  useEffect(() => {
    if (date !== false && date1 !== false) dispatch(getGeneratedInvoice(body));
  }, [date, date1]);

  return (
    <>
      <ModalBackground>
        <DivWrapper style={{ margin: "50px auto 40px auto" }}>
          <div>
            <Text>From</Text>
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={moment("2022-01-01", dateFormat)}
                format={dateFormat}
                style={{
                  background: "rgb((238, 238, 238)",
                  borderRadius: "5px",
                  color: "gray",
                  padding: "0.5rem ",
                }}
                onChange={onSelectDate}
              />
            </Space>
            <Br />
            <button
              className="text-gray-600 text-center p-1.5 ml-8"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>

          <div>
            <Text>To</Text>
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={moment("2022-01-01", dateFormat)}
                format={dateFormat}
                style={{
                  background: "rgb((238, 238, 238)",
                  borderRadius: "5px",
                  color: "gray",
                  padding: "0.5rem ",
                }}
                onChange={onSelectDate1}
              />
            </Space>
            <Br />

            <button
              className="bg-green-800 text-white rounded-lg p-1.5 px-7 ml-4"
              disabled={!date || !date1 === true}
              onClick={invoiceHandler}
            >
              Confirm
            </button>
            {/* </a> */}
          </div>
        </DivWrapper>
      </ModalBackground>
      <OverlayBackground
        onClick={() => {
          setShowModal(false);
          setShow(false);
        }}
      >
        {show && <GeneratedInvoices show={show} setShow={setShow} />}
      </OverlayBackground>
    </>
  );
}

export default InvoiceModal;
