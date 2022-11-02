import React,{ useEffect, useState}from "react";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "./btn";
import Modal from "./modal";
import {ModalTitle, TitleText } from "../styledElements";
import DataTable from "../../components/UI/Table";
import {useDispatch ,useSelector } from "react-redux";
import {
    filterReportLog,
    ReportLog,
    searchReportLog,
  } from "../../store/actions";
import moment from "moment";

const InfoWrapper = styled.div`
  ${tw`flex flex-wrap gap-10 gap-x-12 w-11/12`}
`;

const InfoUserWrapper = styled.div`
  ${tw`flex flex-wrap gap-10 gap-x-16 w-11/12`}
`;

const InfoItem = styled.div`
  ${tw`flex flex-col space-y-2`}
`;

const InfoTitle = styled.p`
  ${tw`font-semibold text-sm leading-[22px] text-secondary`}
`;
const InfoValue = styled.p`
  ${tw`font-bold text-base leading-[28px]`};
  color: ${(props) => (props.color ? props.color : "#464F54")};
  font-size: ${(props) => (props.userAgencies ? "smaller" : "")};
`;



const Pointer = styled.div`
  ${tw`h-1 w-1 rounded-full bg-red-500 mr-2`};
  /* box-shadow: 0 0 0 3px rgb(217 144 144); */
  box-shadow: ${(props) =>
    props.color ? props.color : "0 0 0 3px rgb(217 144 144)"};
  background-color: ${(props) => (props.color ? props.color : "red")};
`;

const  IncidentModal = ({
//   data = initData,
  showModal = false,
  setShowModal = {},
  userData,
}) => {
    const [bodyData, setBodyData] = useState();
    const dispatch = useDispatch();
    const date = new Date();
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMonth, setcurrentMonth] = useState({
 start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
          "YYYY-MM-DD"
        ),
  end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
          "YYYY-MM-DD"
        ),
      });

      const onSearch = async (searchQuery) => {
        const res = await dispatch(searchReportLog(searchQuery));
        setBodyData(res?.payload?.data?.incidents);
      };
    
      const onFilter = async (date,page) => {
        const res = await dispatch(filterReportLog(date));
        setBodyData(res?.payload?.data?.incidents);
      };  
      
      const onRefresh = () => {
        dispatch(ReportLog(currentMonth));
      };
      
      const thisMonth = useSelector((state) => state?.report);
      const {incidentLog} = thisMonth;
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

  
  const data = bodyData && bodyData.length >0 && bodyData[0].incidents.map((orgs) => (
    {
      key: orgs._id,
      name: orgs.caller.firstName,
      description: orgs.description,
      address: orgs.address,
      userPhoneNo: orgs.userPhoneNo,
      localArea: orgs.localArea,
      responseType: orgs.responseType, 
    }
  ));
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
  ];
  return (
    <Modal show={showModal} close={() => setShowModal(false)} width="48rem">
      <ModalTitle>
        <TitleText className="">Incident Log Details </TitleText>
        <StyledButton
          buttonSize="btn--medium"
          onClick={() => setShowModal(false)}
        >
          Close
        </StyledButton>
      </ModalTitle>
      <DataTable
       data={data}
       columns={columns}
       onRefresh={onRefresh}
       onSearch={onSearch}
       onFilter={onFilter}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages} 
       header
      /> 
    </Modal>
  );
};

export default IncidentModal;
