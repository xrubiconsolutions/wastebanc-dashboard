import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StyledButton from "../../components/UI/btn";
import { Tag } from "antd";
import { FlexContainer } from "../../components/styledElements/index";
import Option from "../../components/UI/Option";
import { useDispatch, useSelector } from "react-redux";
import { findOrganisation } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import WastePickerModal from "../../components/wastePicker/wastePickerModal";
import WastePickerOptions from "../../components/UI/WastePickerOption";
import BreadCrumb from "../../components/UI/breadCrumbs";

const MainContainer = styled.div`
  //   display: grid;
  //   grid-template-coloumns: auto 1fr;
  margin-bottom: 20px;
  display: grid;
`;

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

const InfoWrapper = styled.div`
  ${tw`flex flex-wrap gap-16 gap-x-12 w-11/12`}
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
`;

const WastePickerProfile = ({ match }) => {
  const {
    auth: {
      userInfo: { claims },
    },
  } = useSelector((state) => state);

  const pickerPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.WASTE_PICKER.title
  );
  const history = useHistory();
  const location = useLocation();
  if (!location.state) history.goBack();
  const {
    state: { record },
  } = location;
  // console.log(record);

  const dispatch = useDispatch();

  let data = [
    {
      title: "User ID",
      value: record?._id.slice(0, 6),
    },
    {
      title: "Full name",
      value: record?.fullname,
    },
    {
      title: "Phone number",
      value: record?.phone,
    },
    {
      title: "Gender",
      value: record?.gender,
    },
    {
      title: "Email",
      value: record?.email,
    },
    {
      title: "Account Number",
      value: record?.account?.accountNo?.slice(0, 5)?.concat("*****") || "N/A",
    },
    {
      title: "Account Name",
      value: record?.account?.accountName || "N/A",
    },
    {
      title: "Location/address",
      value: record?.address,
    },
    {
      title: "Date Created",
      value: record?.createdAt.slice(0, 10),
    },
    {
      title: "Organisation Name",
      value: record?.organisation,
    },
    {
      title: "Completed Pickup",
      value: record?.numberOfTripsCompleted,
    },
    {
      title: "Wallet balance",
      value: record?.pointGained,
    },
    {
      title: "Waste Collected(KG)",
      value: record?.totalCollected,
    },
    {
      title: "Status",
      value: record?.status,
    },
  ];

  const isAssigned = !!record.organisation;
  if (!isAssigned) data = data.slice(0, 8).concat(data.slice(9));

  const pages = [{ name: "Total waste pickers", link: "/admin/waste_picker" }];

  return (
    <>
      <MainContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current={`${
              isAssigned ? "Assigned" : "Unassigned"
            } waste picker profile`}
          />
          {/* <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/admin/waste_picker">Total waste pickers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="#">
                {" "}
                
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb> */}
        </NavBarLeft>
      </MainContainer>

      <ModalBackground>
        <OrgainzationTitle>
          Waste Picker Details
          <WastePickerOptions pickerData={record} isAssigned={isAssigned} />
        </OrgainzationTitle>
        <ColumnStyle>
          <InfoWrapper>
            {data.map(({ title, value }) => {
              return (
                <InfoItem>
                  <InfoTitle>{title}:</InfoTitle>
                  <InfoValue>{value}</InfoValue>
                </InfoItem>
              );
            })}
          </InfoWrapper>
        </ColumnStyle>
      </ModalBackground>
    </>
  );
};

export default WastePickerProfile;
