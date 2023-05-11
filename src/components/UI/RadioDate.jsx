import React, { useState } from "react";
import { DatePicker, Space, Row, Col } from "antd";
import moment from "moment";
import styled from "styled-components";
import tw from "twin.macro";

const ToStyle = styled.div`
  ${tw`ml-3`}
  font-size: 10px;
`;
const FromStyle = styled.div`
  font-size: 10px;
`;
const DateStyle = styled.div`
  ${tw`ml-3`}
`;

function RadioDate({ setAfter, setBefore, changeHandler }) {
  const date = moment();
  const [valueFrom, setValueFrom] = useState(date);
  const [valueto, setValueto] = useState(date);
  const dateFormat = "YYYY-MM-DD";

  const handleDate = (rangeSide, { dateObj, dateStr }) => {
    if (!["start", "end"].includes(rangeSide)) return;
    rangeSide === "start" ? setBefore(dateObj) : setAfter(dateObj);
    rangeSide === "start" ? setValueFrom(dateObj) : setValueto(dateObj);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Space direction="vertical" size={6}>
            <FromStyle>From</FromStyle>

            <DatePicker
              format={dateFormat}
              value={valueFrom}
              onChange={(dateObj, dateStr) => {
                handleDate("start", { dateObj, dateStr });
                changeHandler();
              }}
            />
          </Space>
        </Col>
        <Col span={12}>
          <Space direction="vertical" size={6}>
            <ToStyle>To</ToStyle>
            <DateStyle>
              <DatePicker
                format={dateFormat}
                value={valueto}
                onChange={(dateObj, dateStr) => {
                  handleDate("end", { dateObj, dateStr });
                  changeHandler();
                }}
              />
            </DateStyle>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default RadioDate;
