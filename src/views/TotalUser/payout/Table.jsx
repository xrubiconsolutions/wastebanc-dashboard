import { Table } from "antd";
import { useState } from "react";
import { Tag, Popover } from "antd";
import { truncate } from "../../../utils/constants";
import moment from "moment";

const columns = [
  {
    title: "Date Of Completion",
    dataIndex: "date",
    key: "date",
    render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
  },

  {
    title: "Organization",
    dataIndex: "organisation",
    key: "organisation",
  },

  {
    title: "Waste Category",
    dataIndex: "categories",
    key: "categories",
    render: (categories) => (
      <span>
        {(categories.slice(0, 3) || []).map((waste) => {
          return (
            <Tag key={waste}>
              <Popover content={waste?.name || waste}>
                {truncate(waste?.name, 10)}
              </Popover>
            </Tag>
          );
        })}
      </span>
    ),
  },

  {
    title: "Waste Quantity",
    dataIndex: "weight",
    key: "weight",
  },

  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const TransactionTable = ({ state }) => {
  const [top, setTop] = useState("topRight");

  return (
    <div>
      {state.state?.transactions?.map((item, index) => {
        const data = [
          {
            key: index,
            date: item["date"],
            organisation: item["organisation"],
            amount: item["amountTobePaid"],
            weight: item["weight"],
            categories: item["categories"],
          },
        ];

        return (
          <div className="bg-white relative">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                position: [top],
                defaultCurrent: 1,
                defaultPageSize: 20,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
export default TransactionTable;
