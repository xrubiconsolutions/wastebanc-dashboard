import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FlexBetween, FlexContainer } from "../styledElements";
import Logo from "../../assets/images/logo.png";
import { fetchTransactionInvoice } from "../../store/actions";
import { useDispatch } from "react-redux";

// updates
const Wrapper = styled.div`
  ${tw``}
`;
const SummarySection = styled.div`
  ${tw`mt-8 pr-3`};

  > p:first-of-type {
    ${tw`font-bold text-[rgba(0, 0, 0, 0.5)] text-lg`}
  }
  > div:first-of-type {
    ${tw`border-t border-b py-2`}
  }

  > div:first-of-type > p {
    ${tw`text-base`};
    font-weight: lighter;
  }

  > div:nth-child(3) {
    ${tw`mt-4`}
  }

  > div:nth-child(3) > p {
    ${tw`font-bold text-base`}
  }
`;

const SummaryTable = styled.div`
  ${tw`mt-5`};

  > div:first-of-type {
    ${tw`border-b text-lg font-bold mb-2`}
  }
  > div:nth-child(n + 2) {
    ${tw`mb-5`}
  }

  > div:nth-child(n + 2) {
    ${tw`font-light text-base`}
  }

  > div > p {
    ${tw`w-1/5`}
  }
`;

const Invoice = ({ invoiceId }, ref) => {
  console.log("refff", ref);
  console.log("invoiceId", invoiceId);
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [invoice, setInvoice] = useState();
  const dispatch = useDispatch();
  const entries = [
    {
      ref: "5373748",
      description: "Payment to someone",
      category: "Can, plastic, nylons",
      weight: "10kg",
      amount: "23000",
    },
    {
      ref: "5373748",
      description: "Payment to someone",
      category: "Can, plastic, nylons",
      weight: "10kg",
      amount: "23000",
    },
    {
      ref: "5373748",
      description: "Payment to someone",
      category: "Can, plastic, nylons",
      weight: "10kg",
      amount: "23000",
    },
  ];

  const fetchInvoice = async () => {
    const response = await dispatch(fetchTransactionInvoice(invoiceId));
    if (!response.payload.error) setInvoice(response.payload.data);
    // console.log("The response: ", response);
  };

  useEffect(() => {
    if (invoiceId) fetchInvoice();
  }, [invoiceId]);

  // console.log("nvoice", invoice.from);

  return (
    <Wrapper ref={ref}>
      <FlexContainer className="gap-2 mb-2">
        <img src={Logo} className="h-[25px] w-[23px]" />
        <span className="text-[18px] font-bold text-secondary">Pakam</span>
      </FlexContainer>
      <div>
        <p className="font-medium text-base">
          Final invoice from{" "}
          <span className="w-2/3">{invoice?.startDate.slice(0, 10)}</span> to
          <span className="w-2/3"> {invoice?.endDate.slice(0, 10)}</span>{" "}
          billing period
        </p>
        <FlexBetween className="mt-5">
          <div>
            <p className="font-bold">From</p>
            <p>
              {invoice?.from.name},
              <br /> {invoice?.from.address},
              <br />
              {invoice?.from.country}.
            </p>
          </div>
          <div>
            <p className="font-bold">To</p>
            <p>
              {invoice?.company?.companyName},
              <br /> {invoice?.company?.companyTag}.
              <br /> {invoice?.company?.email}.
              <br /> {invoice?.company?.phone}.
            </p>
          </div>
          <div>
            <p className="font-bold">Details</p>
            <p className="w-full">{invoice?.invoiceNumber},</p>
            <FlexContainer className="w-[150px]">
              <span className="w-1/3">Start:</span>
              <span className="w-2/3">{invoice?.startDate.slice(0, 10)}</span>
            </FlexContainer>
            <FlexContainer className="w-[150px]">
              <span className="w-1/3">End:</span>
              <span className="w-2/3">{invoice?.endDate.slice(0, 10)}</span>
            </FlexContainer>
          </div>
        </FlexBetween>
      </div>
      <SummarySection>
        <p>Summary</p>
        <FlexBetween>
          <p>Total usage charges</p>
          <p>
            <span className="mt-1">&#8358;</span>
            {invoice?.serviceCharge}
          </p>
        </FlexBetween>
        <FlexBetween>
          <p>Total due</p>
          <p>
            <span className="mt-1">&#8358;</span>
            {invoice?.amount}
          </p>
        </FlexBetween>
        <p className="text-base text-black font-light">
          If you have a credit card on file, it will be automatically charged
          within 24 hours
        </p>
        <SummaryTable>
          <FlexContainer className="font-bold">
            <p>Ref No</p>
            <p>Description</p>
            <p>Waste category</p>
            <p>Kg</p>
            <p>Amount (&#8358;)</p>
          </FlexContainer>
          {invoice?.transactions.map((entry) => {
            const categories = entry.categories
              .map((cat) => cat.name)
              .join(", ");
            return (
              <FlexContainer className="font-bold">
                <p>{entry._id.slice(0, 6)}</p>
                <p>{entry.type}</p>
                <p>{categories}</p>
                <p>{entry.weight}</p>
                <p>{entry.coin}</p>
              </FlexContainer>
            );
          })}
        </SummaryTable>
      </SummarySection>
    </Wrapper>
  );
};

export default forwardRef(Invoice);
