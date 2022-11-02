import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import DataTable from "../../components/UI/Table";
import StyledButton from "../../components/UI/btn";
import Modal from "../../components/UI/modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrganisations, getResources } from "../../store/actions";
import WastePickerAssignModal from "../../components/wastePicker/wastePickerAssignModal";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../../components/UI/breadCrumbs";

const BreadcrumbLink = styled.div`
  ${tw`mb-2`}
`;

const ResourceList = styled.div`
  ${tw`bg-white`}
`;

const WastePickerAssign = () => {
  const [showPostModal, setPostModal] = useState(false);
  const [organisations, setOrganisatons] = useState();
  const { pathname } = useLocation();

  // retrives the id i.e the last element of the list returned by the split
  const path = pathname.split("/");
  const pickerId = path.slice(-1).join();

  const dispatch = useDispatch();
  const {
    app: { error },
  } = useSelector((state) => state);

  useEffect(() => {
    // fetch all organisations and format to select options format
    const fetchOrgs = async () => {
      const res = await dispatch(getAllOrganisations());
      if (!res.error) {
        const formattedData = res.payload.data.organisations.map((entry) => ({
          key: entry._id,
          fullname: entry.companyName,
          phone: entry.phone,
          email: entry.email,
        }));
        setOrganisatons(formattedData);
      }
    };

    if (!organisations) fetchOrgs();
  }, [organisations]);

  useEffect(() => {
    // fetch all organisations and format to select options format
    const fetchOrgs = async () => {
      const res = await dispatch(getAllOrganisations());
      if (!res.error) {
        const formattedData = res.payload.data.organisations.map((entry) => ({
          id: entry._id,
          fullname: entry.companyName,
          phone: entry.phone,
          email: entry.email,
        }));
        setOrganisatons(formattedData);
      }
    };

    if (!organisations) fetchOrgs();
  }, [organisations]);
  // console.log("The organisations: ", organisations);
  const pages = [{ name: "Total Waste Pickers", link: "/admin/waste_picker" }];

  return (
    <>
      <BreadCrumb pages={pages} current="Assign" />
      <ResourceList>
        {organisations?.map(({ fullname, key, id }, i) => {
          return (
            <WastePickerAssignModal
              key={key}
              fullname={fullname}
              organisationId={key || id}
              pickerId={pickerId}
            />
          );
        })}
      </ResourceList>
    </>
  );
};

export default WastePickerAssign;
