import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StyledButton from "../../components/UI/btn";
import tw from "twin.macro";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/logo.png";
import {
  FlexBetween,
  FlexContainer,
} from "../../components/styledElements/index";
import moment from "moment";
import { useDispatch } from "react-redux";
import { downloadInvoices } from "../../store/actions";
import Modal from "../../components/UI/modal";
import BreadCrumb from "../../components/UI/breadCrumbs";

const GeneratedInvoiceContainer = styled.div``;

const FlexContainers = styled.div`
  ${tw` flex justify-between items-center pb-10 pt-10`}
`;

const BtnContainer = styled.div`
  ${tw` flex justify-end items-end gap-7`}
`;

const StyledLink = styled(Link)`
  font-size: 17px;
`;

const Wrapper = styled.div`
  ${tw`bg-white  pl-20 pr-20 pt-20`}
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
    ${tw`border-b text-base font-bold mb-2`}
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

const TextBold = styled.p`
  ${tw`font-bold`}
`;

const Text = styled.p`
  ${tw`text-sm `}
`;

const GeneratedInvoices = ({ match }, props) => {
  const [showPostModal, setPostModal] = useState(false);
  const dispatch = useDispatch();
  const {
    app: { error },
  } = useSelector((state) => state);
  const { generatedInvoice } = useSelector((store) => store.organisation);
  const year = new Date().getFullYear();
  const date = new Date();
  var monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
  var longName = monthName(date);
  console.log("generated invoice", generatedInvoice);

  // const set_invoice = localStorage.setItem(
  //   "generated_invoice",
  //   JSON.stringify(generatedInvoice)
  // );

  // const get_invoice = localStorage.getItem("generated_invoice");

  // const handleSendInvoice = async (invoiceNum) => {
  //   // await dispatch(downloadInvoices(invoiceNum));
  // };

  const handleSendInvoice = async (invoiceNum) => {
    const res = await dispatch(downloadInvoices(invoiceNum));
    if (!res.error) console.log(res.error);
    setPostModal(true);
  };

  const pages = [
    {
      name: " Completed Schedule",
      link: `/admin/total_organizations_completed_schedules/${match?.params?.id}`,
    },
  ];

  return (
    <>
      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "E-mail sent successfully" : error}
      </Modal>
      {!generatedInvoice || !generatedInvoice?.invoiceNumber ? (
        <GeneratedInvoiceContainer>
          <FlexContainers>
            <BreadCrumb pages={pages} current="Invoice" />
          </FlexContainers>

          <div className="bg-white p-20 ">
            <h1 className="text-xl font-extrabold text-gray-500 text-center ">
              No generated Invoice for this billing period.
            </h1>
          </div>
        </GeneratedInvoiceContainer>
      ) : (
        <GeneratedInvoiceContainer>
          <FlexContainers>
            <BreadCrumb pages={pages} current="Invoice" />

            <BtnContainer>
              <StyledButton
                buttonStyle="btn----outline"
                buttonSize="btn--medium"
                className="flex justify-between items-center"
                // style={{ marginLeft: "-4rem !important" }}
                onClick={() =>
                  handleSendInvoice(generatedInvoice?.invoiceNumber)
                }
              >
                Send as mail
              </StyledButton>
              <StyledButton
                buttonStyle="btn----outline"
                buttonSize="btn--medium"
                className="flex justify-between items-center"
                // style={{ marginLeft: "-4rem !important" }}
              >
                <a
                  className="text-white hover:text-white"
                  href={`https://pakam-staging.herokuapp.com/api/generate/invoicepdf/${generatedInvoice?.invoiceNumber}`}
                >
                  Download as Pdf
                </a>
              </StyledButton>
            </BtnContainer>
          </FlexContainers>

          <Wrapper style={{ paddingBottom: "7rem" }}>
            <FlexContainer className="gap-2 mb-2">
              <img src={Logo} className="h-[25px] w-[23px]" />
              <span className="text-[18px] font-bold text-secondary">
                Pakam
              </span>
            </FlexContainer>

            <div>
              <Text className="font-medium text-base">
                invoice for the {longName} {year} billing period
              </Text>
              <FlexBetween className="mt-5">
                <div>
                  <TextBold>From</TextBold>
                  <Text>
                    {generatedInvoice?.from?.name}
                    <br /> {generatedInvoice?.from?.address}
                    <br /> {generatedInvoice?.from?.country}
                  </Text>
                </div>

                <div>
                  {/* <p className="font-bold">To</p> */}

                  <TextBold>To</TextBold>

                  <Text>
                    {generatedInvoice?.company?.companyName},
                    <br /> {generatedInvoice?.company?.companyTag}
                    <br />
                    {generatedInvoice?.company?.email}
                    <br /> {generatedInvoice?.company?.phone}.
                  </Text>
                </div>

                <div>
                  <TextBold>Details</TextBold>
                  <Text className="w-full">
                    {generatedInvoice?.invoiceNumber},
                  </Text>
                  <FlexContainer className="w-[150px]">
                    <span className="mr-2">Start: </span>
                    <span className="">
                      {moment(generatedInvoice?.start).format("YYYY-MM-DD")}
                    </span>
                  </FlexContainer>
                  <FlexContainer className="w-[150px]">
                    <span className="mr-3">End:</span>
                    <span className="">
                      {moment(generatedInvoice?.end).format("YYYY-MM-DD")}
                    </span>
                  </FlexContainer>
                </div>
              </FlexBetween>
            </div>
            <SummarySection>
              <Text>Summary</Text>
              <FlexBetween>
                <Text>Total service charges</Text>
                <Text>
                  <span className="mt-1">&#8358;</span>
                  {generatedInvoice?.sumPercentage}
                </Text>
              </FlexBetween>
              <FlexBetween>
                <Text>Collection Amount</Text>
                <Text>
                  <span className="mt-1">&#8358;</span>

                  {generatedInvoice?.amountWithoutServiceCharge}
                </Text>
              </FlexBetween>

              <FlexBetween>
                <Text className="font-bold">Total Bill</Text>
                <Text>
                  <span className="mt-1">&#8358;</span>
                  {generatedInvoice?.totalValue}
                </Text>
              </FlexBetween>
              {/* <Text className="text-base text-black font-light">
                If you have a credit card on file, it will be automatically
                charged within 24 hours
              </Text> */}
              <SummaryTable>
                <FlexContainer className="font-bold">
                  <Text>Ref No</Text>
                  <Text className="">Pickup address</Text>
                  <Text>Customer's No</Text>
                  <Text>Waste Qty (Kg)</Text>
                  <Text className="">Amount (&#8358;)</Text>
                </FlexContainer>
                {generatedInvoice?.result?.map((entry) => {
                  const categories = entry.categories
                    .map((cat) => cat.name)
                    .join(", ");
                  return (
                    <FlexContainer className="font-bold">
                      <Text>{entry._id.slice(0, 7)}</Text>
                      <Text className="">{entry.address}</Text>
                      <Text>{entry.phone}</Text>
                      <Text>{entry.weight.toFixed()}</Text>
                      <Text>{entry.amountTobePaid}</Text>
                    </FlexContainer>
                  );
                })}
              </SummaryTable>
            </SummarySection>
          </Wrapper>
        </GeneratedInvoiceContainer>
      )}
    </>
  );
};

export default GeneratedInvoices;
