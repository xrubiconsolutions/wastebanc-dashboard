import { Table } from "antd";
import moment from "moment";
import { useState } from "react";

const BreakdownTable = ({ state }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "location",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Waste Quantity (kg)",
      dataIndex: "weight",
      key: "weight",
    },
  ];

  const [top, setTop] = useState("topRight");

  return (
    <Table
      columns={columns}
      dataSource={state?.transactions}
      pagination={{
        position: [top],
        defaultCurrent: 1,
        defaultPageSize: 20,
      }}
    />
  );
};
export default BreakdownTable;
