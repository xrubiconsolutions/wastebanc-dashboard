import React, { useState } from "react";
import { Breadcrumb, Space } from "antd";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import DataTable from "../../components/UI/Table";
import StyledButton from "../../components/UI/btn";
import Modal from "../../components/UI/modal";
import { useDispatch, useSelector } from "react-redux";
import WastePickerAssignModal from "../../components/wastePicker/wastePickerAssignModal";
import { useParams } from "react-router-dom";

const BreadcrumbLink = styled.div`
  ${tw`mb-2`}
`;
const ResourceList = styled.div`
  ${tw`bg-white`}
`;
const WastePickerAssign = () => {
  const [showPostModal, setPostModal] = useState(false);

  const {
    app: { error },
  } = useSelector((state) => state);

  const data = [
    {
      key: "1",
      fullname: "Escobar Ventures Limited",
      lcd: "Alimosho",
      phone: 8134028453,
      gender: "male",
    },
    {
      key: "2",
      fullname: "Taladal Global Services",
      lcd: "Alimosho",
      phone: 8134028453,
      gender: "male",
    },
    {
      key: "3",
      fullname: "Procycle Cleaning Services",
      lcd: "Alimosho",
      phone: 8134028453,
      gender: "male",
    },
  ];

  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Waste Picker assigned successfully" : error}
      </Modal>

      <BreadcrumbLink>
        <Breadcrumb separator="<">
          <Breadcrumb.Item>
            <Link to="/user/waste_picker">Total Waste Pickers</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="#"> Assign</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </BreadcrumbLink>
      <ResourceList>
        {data.map(({ fullname }, i) => {
          return <WastePickerAssignModal fullname={fullname} />;
        })}
      </ResourceList>
    </>
  );
};

export default WastePickerAssign;
