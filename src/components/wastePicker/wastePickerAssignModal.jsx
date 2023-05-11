import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import Modal from "../../components/UI/modal";
import { assignPicker } from "../../store/actions";

import StyledButton from "../UI/btn";

const ResourcesItem = styled.div`
  ${tw`bg-white px-8 py-4 gap-8 border-b-2 border-gray-200 px-4 py-4`}
  display:grid;
  grid-template-columns: 1fr auto;
`;
const ResourcesItemTitle = styled.div`
  ${tw`flex items-center gap-2`}
`;
const ResourcesItemTitleBullet = styled.div`
  ${tw`bg-secondary h-5 w-5 rounded-sm`}
`;
const ResourcesItemTitleText = styled.div`
  ${tw`capitalize text-base`}
`;
const ResourcesItemImg = styled.img`
  ${tw`cursor-pointer`}
`;

const ResourceButtons = styled.div`
  ${tw`flex items-center gap-2`}
`;

const WastePickerAssignModal = ({
  fullname = "",
  pickerId = "",
  organisationId = "",
  refresh = () => null,
}) => {
  const [showPostModal, setPostModal] = useState(false);
  const {
    app: { error },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const assignHandler = async () => {
    if (!organisationId) return;
    const payload = {
      organisationId,
      pickerId,
    };
    const res = await dispatch(assignPicker(payload));
    if (!res.error) {
      refresh();
      setTimeout(() => history.push("/admin/waste_picker"), 2000);
    }
    setPostModal(true);
  };

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

      <ResourcesItem>
        <ResourcesItemTitle>
          <ResourcesItemTitleBullet />
          <ResourcesItemTitleText>{fullname}</ResourcesItemTitleText>
        </ResourcesItemTitle>
        <ResourceButtons>
          <StyledButton
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            onClick={assignHandler}
          >
            Assign
          </StyledButton>
        </ResourceButtons>
      </ResourcesItem>
    </>
  );
};

export default WastePickerAssignModal;
