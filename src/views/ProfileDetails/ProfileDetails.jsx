import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FlexContainer } from "../../components/styledElements/index";
import Option from "../../components/UI/Option";
import { useDispatch, useSelector } from "react-redux";
import { findOrganisation } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";
import BreadCrumb from "../../components/UI/breadCrumbs";
import { Tag } from "antd";
import { disableOrganisation, enableOrganisation } from "../../store/actions";
import Modal from "antd/lib/modal/Modal";

const OrganizationContainer = styled.div`
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
  }
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
  ${tw`flex flex-wrap gap-10 gap-x-12 w-11/12`}
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

const ProfileDetails = ({ match }) => {
  const {
    organisation: { selectedOrganisation },
    auth: {
      userInfo: { claims },
    },
  } = useSelector((state) => state);
  const orgPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.ORGANISATION.title
  );

  const { error } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findOrganisation(match?.params?.id));
  }, []);

  const data = [
    {
      title: "Organization Name",
      value: selectedOrganisation?.companyName,
    },
    {
      title: "Contact Address",
      value: selectedOrganisation?.location,
    },
    {
      title: "Contact Line",
      value: selectedOrganisation?.phone,
    },
    {
      title: "Organization Tag",
      value: selectedOrganisation?.companyTag,
    },
    {
      title: "Email",
      value: selectedOrganisation?.email,
    },
    {
      title: "Areas of Access",
      value: selectedOrganisation?.areaOfAccess.map((access) => access),
    },
    {
      title: "Coverage Area Under Selected LCDA",
      value: selectedOrganisation?.streetOfAccess.map((access) => access),
    },
    {
      title: "Prices",
      value: selectedOrganisation?.categories
        ? selectedOrganisation.categories.map(
            (cat) => `${cat.name} #${cat.price}`
          )
        : "No prices available..",
    },
  ];
  const pages = [{ name: "Organization", link: "/admin/total_organizations" }];

  const [message, setMessage] = useState("");
  const [deleteflag, setDeleteModaFlagl] = useState(true);

  const handleDisableOrganisation = async () => {
    try {
      const res = await dispatch(
        disableOrganisation(selectedOrganisation?._id)
      );
      if (!res.error) {
        setMessage(res.payload.message);
        // setPostAction(true);
      }
    } catch (error) {}
  };

  const handleEnableOrganisation = async () => {
    try {
      const res = await dispatch(enableOrganisation(selectedOrganisation?._id));
      if (!res.error) {
        setMessage(res.payload.message);
        // setPostAction(true);
      }
    } catch (error) {}
  };

  const optiondata = [
    {
      pathname: "/admin/total_aggregators_all/",
      title: "See Aggregators",
    },

    {
      pathname: "/admin/total_organizations_wastePicker/",
      title: "Waste Pickers",
      state: selectedOrganisation,
    },

    {
      pathname: "/admin/total_organizations_generated_invoices/",
      title: " Generated Invoices",
    },

    {
      pathname: "/admin/total_organizations_completed_schedules/",
      title: "Completed Schedules",
    },

    {
      pathname: "/admin/total_organizations_modify/",
      title: "Modify Organization",
    },

    {
      title: "Disable Organization",
      handler: handleDisableOrganisation,
    },

    {
      title: "Enable Organization",
      handler: handleEnableOrganisation,
    },

    { title: "Delete Organization", deleteflag: deleteflag },
  ];

  return (
    <>
      <OrganizationContainer>
        <NavBarLeft>
          <BreadCrumb pages={pages} current="Profile Details" />

          {/* {orgPermissions?.create && (
            <Link to="/admin/total_organizations_setup">
              <StyledButton
                buttonStyle="btn--primary--outline"
                buttonSize="btn--medium"
                className="flex justify-between items-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Add Organization
              </StyledButton>
            </Link>
          )} */}
        </NavBarLeft>
      </OrganizationContainer>

      <ModalBackground>
        <OrgainzationTitle>
          Organization Details
          <Option
            selectedOrganisation={selectedOrganisation}
            optiondata={optiondata}
            message={message}
          />
        </OrgainzationTitle>
        <ColumnStyle>
          <InfoWrapper>
            {data.map(({ title, value }) => {
              let color = "";
              if (["status", "missed pickup"].includes(title.toLowerCase()))
                color = "red";
              else if (
                title.toLowerCase() === "status" &&
                value.toLowerCase() !== "pending"
              )
                color = "#295011";

              return (
                <InfoItem>
                  <InfoTitle>{title}:</InfoTitle>
                  {typeof value !== "object" ? (
                    title.toLowerCase() !== "status" ? (
                      <InfoValue color={color}>{value}</InfoValue>
                    ) : (
                      <FlexContainer>
                        <InfoValue color={color}>{value}</InfoValue>:
                      </FlexContainer>
                    )
                  ) : (
                    <FlexContainer>
                      {value.map((v) => (
                        <Tag>{v}</Tag>
                      ))}
                    </FlexContainer>
                  )}
                </InfoItem>
              );
            })}
          </InfoWrapper>
        </ColumnStyle>
      </ModalBackground>
    </>
  );
};

export default ProfileDetails;
