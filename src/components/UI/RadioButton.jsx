import React, { useState, useEffect } from "react";
import { Radio, Space } from "antd";
import styled from "styled-components";
import RadioDate from "./RadioDate";
import moment from "moment";
import tw from "twin.macro";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SpaceStyle = styled.div`
  margin-left: 8px;
  font-size: 20px;

  .group {
    ${tw`min-h-[40vh]`}
  }
`;

const RadioButton = ({ onFilter }) => {
  const date = new Date();
  const [value, setValue] = useState("all");
  const [isCustomDate, setIsCustomDate] = useState(false);
  // const [generalValue, setGeneralValue] = useState();
  const [after, setAfter] = useState();
  const [before, setBefore] = useState();
  const [requestDate, setRequestDate] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
    filterByDate(e.target.value);
  };

  useEffect(() => {
    // console.log({
    //   value,
    // });
  }, [value]);

  useEffect(() => {
    // console.log("On mount: ", value);
  }, []);

  function filterByDate(filterRequest) {
    if (filterRequest === "all") {
      let newdate = new Date();
      const start = "2001-01-01";
      // upperbound should be tomorrow
      newdate.setDate(newdate.getDate());
      const end = moment(newdate).format("YYYY-MM-DD");
      setRequestDate({
        start,
        end,
      });
    }

    if (filterRequest === "yesterday") {
      // let newdate = new Date();
      // newdate.setDate(newdate.getDate() - 1);

      // requestDate.start = formatDate(newdate, 'yyyy-MM-dd', 'en-US');  // "2019-03-26",
      const start = moment().subtract(1, "days"); // "2019-03-26",
      const end = moment().subtract(1, "days"); // "2019-03-26",
      // const end = formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // "2019-03-28",
      setRequestDate({
        start,
        end,
      });
    }
    if (filterRequest === "lastWeek") {
      const start = moment().startOf("week").subtract(7, "days");
      const end = moment().endOf("week").subtract(7, "days");
      // let newdate = new Date();
      // newdate.setDate(newdate.getDate() - 7);
      // const start = moment(newdate).format("YYYY-MM-DD"); // "2019-03-26",
      // const end = moment(new Date()).format("YYYY-MM-DD"); // "2019-03-28",
      setRequestDate({
        start,
        end,
      });
    }
    if (filterRequest === "thirtyDays") {
      // let newdate = new Date();
      // newdate.setDate(newdate.getDate() - 30);
      // const start = moment(
      //   new Date(date.getFullYear(), date.getMonth(), 1)
      // ).format("YYYY-MM-DD"); // "2019-03-26",
      // const end = moment(
      //   new Date(date.getFullYear(), date.getMonth() + 1, 1)
      // ).format("YYYY-MM-DD"); // "2019-03-28",
      let thisMoment = moment();
      // let newdate = new Date();
      // newdate.setDate(newdate.getDate() - 30);
      let start = moment(thisMoment).startOf("month");
      let end = moment(thisMoment).endOf("month");
      // console.log(end, "enddddddddd");
      setRequestDate({
        start,
        end,
      });
    }
    if (filterRequest === "lastMonth") {
      // let newdate = new Date();
      // newdate.setDate(newdate.getDate() - 30);
      // const start = moment(newdate).format("YYYY-MM-DD"); // "2019-03-26",
      // const end = moment(new Date()).format("YYYY-MM-DD"); // "2019-03-28",
      let thisMoment = moment();
      let start = new moment().subtract(1, "months").date(1);
      let end = new moment().subtract(1, "months").date(1).endOf("month");
      // console.log(end, "enddddddddd");
      setRequestDate({
        start,
        end,
      });
    }
    if (filterRequest === "dateRange") {
      // console.log("B and A: ", before, after);
      if (!before && !after) return;
      const start = moment(before).format("YYYY-MM-DD"); // "2019-03-26",
      const end = moment(after).format("YYYY-MM-DD"); // "2019-03-28",
      setRequestDate({
        start,
        end,
      });
    }
  }
  useEffect(() => {
    if (requestDate) onFilter(requestDate);
  }, [requestDate]);

  return (
    <div className="group">
      <Radio.Group onChange={onChange} value={value}>
        <SpaceStyle>
          <Space direction="vertical">
            <Radio value="all">All</Radio>
            <Radio value="thirtyDays">This Month</Radio>
            <Radio value="yesterday">Yesterday</Radio>
            <Radio value="lastWeek">Last Week</Radio>
            <Radio value="lastMonth">Last Month</Radio>
            <Radio value="dateRange">
              Specific date range
              {value === "dateRange" ? (
                <RadioDate
                  setRequestDate={setRequestDate}
                  setAfter={setAfter}
                  setBefore={setBefore}
                  changeHandler={() => {
                    filterByDate("dateRange");
                  }}
                />
              ) : null}
            </Radio>
          </Space>
        </SpaceStyle>
      </Radio.Group>
    </div>
  );
};

export default RadioButton;
