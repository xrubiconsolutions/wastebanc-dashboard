import React, { useEffect, useState } from "react";
import { Back } from "./Back";
import { useDispatch } from "react-redux";
import { getcompletedPayoutRequest } from "../../store/actions";
import DataTable from "../../components/UI/Table";
import moment from "moment";
import { Tag } from "antd";

export const CompletedPayoutPayment = () => {
  const [fetchCompletedPayoutData, setFetchedCompletedPayoutData] = useState(
    []
  );
  const dispatch = useDispatch();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const fetchCompletedPayoutRequest = async (date = payload) => {
    const res = await dispatch(getcompletedPayoutRequest(date));
    if (!res.error) {
      const { result } = res.payload.data;
      setFetchedCompletedPayoutData(result);
    }
  };

  useEffect(() => {
    fetchCompletedPayoutRequest();
  }, []);

  const onRefresh = () => {
    fetchCompletedPayoutRequest();
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
          data={fetchCompletedPayoutData}
          columns={columns}
          onRefresh={onRefresh}
          nopagination
        />
        <Back />
      </div>
    </>
  );
};
