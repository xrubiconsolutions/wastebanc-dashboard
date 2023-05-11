import React, { useEffect, useState } from "react";
import { Back } from "./Back";
import { useDispatch } from "react-redux";
import DataTable from "../../components/UI/Table";
import moment from "moment";
import { Tag } from "antd";
import { getpendingPayoutRequest } from "../../store/actions";

export const PendingPayoutPayment = () => {
  const [fetchPendingPayoutData, setFetchedPendingPayoutData] = useState([]);
  const dispatch = useDispatch();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const fetchPendingPayoutRequest = async (date = payload) => {
    const res = await dispatch(getpendingPayoutRequest(date));
    if (!res.error) {
      const { result } = res.payload.data;
      setFetchedPendingPayoutData(result);
    }
  };

  useEffect(() => {
    fetchPendingPayoutRequest();
  }, []);

  const onRefresh = () => {
    fetchPendingPayoutRequest();
  };
  const columns = [
    {
      title: "Date of Payment",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },

    {
      title: "Waste Quantity (Kg)",
      dataIndex: "trans",
      key: "trans",

      render: (wastes) => (
        <span>
          {(wastes.slice(0, 3) || []).map((waste) => {
            return <Tag key={waste}>{waste.weight || waste}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Equivalent Amount (Naira)",
      dataIndex: "withdrawalAmount",
      key: "withdrawalAmount",
    },
  ];

  return (
    <>
      <div>
        <DataTable
          data={fetchPendingPayoutData}
          columns={columns}
          onRefresh={onRefresh}
          nopagination
        />
        <Back />
      </div>
    </>
  );
};
