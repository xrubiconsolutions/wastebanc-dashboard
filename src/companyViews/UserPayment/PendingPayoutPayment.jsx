import React, { useEffect, useState } from "react";
import { PayoutTable } from "../../components/UI/PayoutTable";
import { Back } from "./Back";

export const PendingPayoutPayment = () => {
  const columns = [
    {
      title: "Date of Payment",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Waste Quantity",
      dataIndex: "waste",
      key: "waste",
    },
    {
      title: "Equivalent Amount (Naira)",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <>
      <div>
        <PayoutTable data={[]} columns={columns} header />
        <Back />
      </div>
    </>
  );
};
