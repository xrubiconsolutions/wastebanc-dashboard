import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StyledButton from "../../components/UI/btn";
import { Breadcrumb, Tag } from "antd";
import { FlexContainer } from "../../components/styledElements/index";
import Option from "../../components/UI/Option";
import DataTable from "../../components/UI/Table";
import { useDispatch, useSelector } from "react-redux";
import { ReportLog } from "../../store/actions";
import moment from "moment";
import { Space } from "antd";

const NavBarLeft = styled.div`
  ${tw`flex justify-between`}

  .text {
    font-size: 15px;
    color: "#0e0e0e";
  } ;
`;
const ModalBackground = styled.div`
  ${tw`p-3 mt-4`}
  background-color: white!important;
`;

const OrgainzationTitle = styled.div`
  font-size: 20px;
  margin-left: 20px;
  margin-top: 30px;
`;

const ColumnStyle = styled.div`
  letter-spacing: 1px;
  margin-top: 30px;
  margin-left: 30px;
  justify-content: space-between;
  color: green;
  font-size: 17px;
`;

const IncidentDetails = () => {
  const [bodyData, setBodyData] = useState();
  const dispatch = useDispatch();
  const date = new Date();
  const [currentMonth, setcurrentMonth] = useState({
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  });
  const { incidentLog } = useSelector((state) => state?.report);
  //  console.log(incidentLog, 'incident')

  useEffect(() => {
    if (!incidentLog) {
      dispatch(ReportLog(currentMonth));
    } else {
      setBodyData(incidentLog);
    }
  }, []);

  useEffect(() => {
    setBodyData(incidentLog);
  }, [incidentLog]);
  // console.log(bodyData, "bodyLog");

  const data =
    bodyData &&
    bodyData.length > 0 &&
    bodyData[0].incidents.map((orgs) => ({
      key: orgs._id,
      name: orgs.caller.firstName,
      description: orgs.description,
      address: orgs.address,
      userPhoneNo: orgs.userPhoneNo,
      localArea: orgs.localArea,
      responseType: orgs.responseType,
      //   commitantGender: orgs.commitantGender
    }));
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Customer Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "localArea",
      key: "localArea",
    },
    {
      title: "Response Type",
      dataIndex: "responseType",
      key: "responseType",
    },
    //   {
    //     title: "Gender",
    //     dataIndex: "commitantGender",
    //     key: "commitantGender",
    //   },
  ];
  // {
  //   title: "Areas of Access",
  //   value: incidentLog?.caller?.map((access) => access)
  // },
  // {
  //   title: "Coverage Area Under Selected LCDA",
  //   value:  incidentLog?.streetOfAccess?.map((access) => access),
  // },

  return (
    <>
      <ModalBackground>
        <OrgainzationTitle>Incident Log Details</OrgainzationTitle>
        <ColumnStyle></ColumnStyle>
        <DataTable data={data} columns={columns} />
      </ModalBackground>
    </>
  );
};

export default IncidentDetails;
