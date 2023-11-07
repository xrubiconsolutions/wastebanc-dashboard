import { Col, DatePicker, Radio, Row, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const SpaceStyle = styled.div`
  margin-left: 8px;
  font-size: 20px;

  .group {
    ${tw`min-h-[40vh]`}
  }
`;

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

const dateFormat = "YYYY-MM-DD";

const FilterOptions = {
  all: {
    label: "All",
    date: { start: "2010-01-01", end: moment().format(dateFormat) },
  },
  yesterday: {
    label: "Yesterday",
    date: {
      start: moment().subtract(1, "days").format(dateFormat),
      end: moment().subtract(1, "days").format(dateFormat),
    },
  },
  lastWeek: {
    label: "Last Week",
    date: {
      start: moment().startOf("week").subtract(7, "days").format(dateFormat),
      end: moment().endOf("week").subtract(7, "days").format(dateFormat),
    },
  },
  lastMonth: {
    label: "Last Month",
    date: {
      start: moment().subtract(1, "months").date(1).format(dateFormat),
      end: moment().subtract(1, "months").endOf("month").format(dateFormat),
    },
  },
  thirtyDays: {
    label: "This Month",
    date: {
      start: moment().startOf("month").format(dateFormat),
      end: moment().endOf("month").format(dateFormat),
    },
  },
};

const RadioButton = ({ onFilter }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [value, setValue] = useState("all");

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    const date = FilterOptions[selectedValue]?.date;

    if (selectedValue === "dateRange") {
      setValue(selectedValue);
    } else {
      setValue(selectedValue);
      onFilter(date);
    }
  };

  const handleDateRange = (type, dateString) => {
    const formattedDate = moment(dateString).format(dateFormat);
    if (type === "start") {
      setFrom(formattedDate);
    } else {
      setTo(formattedDate);
    }
    if (!from || !to) return;
    else {
      onFilter({ start: from, end: to });
    }
  };

  useEffect(() => {
    handleDateRange("start", `${from}`);
  }, [from, to]);

  return (
    <div className="group">
      <Radio.Group onChange={handleRadioChange} value={value}>
        <SpaceStyle>
          <Space direction="vertical">
            {Object.keys(FilterOptions).map((key) => {
              const { label } = FilterOptions[key];
              return (
                <Radio
                  key={label}
                  value={key}
                  className="capitalize mb-2 text-sm font-medium"
                >
                  {label}
                </Radio>
              );
            })}

            <Radio value="dateRange">
              Specific date range
              {value === "dateRange" && (
                <>
                  <Row>
                    <Col span={12}>
                      <Space direction="vertical" size={6}>
                        <FromStyle>From</FromStyle>

                        <DatePicker
                          format={dateFormat}
                          onChange={(_, dateString) => {
                            handleDateRange("start", dateString);
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
                            onChange={(_, dateString) => {
                              handleDateRange("end", dateString);
                            }}
                          />
                        </DateStyle>
                      </Space>
                    </Col>
                  </Row>
                </>
              )}
            </Radio>
          </Space>
        </SpaceStyle>
      </Radio.Group>
    </div>
  );
};

export default RadioButton;
