import React, { useState } from "react";
import Modal from "../UI/modal";
import { PageTitle, ModalText } from "../styledElements";
import CustomButton from "../UI/button";
import { capitalize } from "../../utils";
import { useSelector } from "react-redux";
import { Input } from "antd";
import tw from "twin.macro";
import styled from "styled-components";
import { rejectCompletedSchedules } from "../../store/actions";
import { useDispatch } from "react-redux";
import { AlertModal } from "./AlertModal";

const BreakLine = styled.div`
  ${tw`pt-4`}
`;

export const RejectModal = ({
  showModal,
  setShowModal,
  type = "",
  id,
  handleDelete = () => null,
  fetchedApprovedCollectors = () => {},
  fetchAll = () => {},
  fetchRejected = () => {},
  onRefresh,
}) => {
  const deleteText = {
    reason: "Reason?",
  }[type];

  const [showPostAction, setPostAction] = useState(false);
  const { TextArea } = Input;
  const [alertModal, setAlertModal] = useState(false);
  const [btn, setBtn] = useState(true);

  const alertHandler = async () => {
    setAlertModal(!alertModal);
    setShowModal(!showModal);
  };

  const { error } = useSelector((state) => state.app);
  const [textArea, setTextArea] = useState("");
  const dispatch = useDispatch();

  const refresh = async () => {
    fetchedApprovedCollectors();
    fetchAll();
    fetchRejected();
  };

  const rejectHandler = async (scheduleId) => {
    const res = await dispatch(
      rejectCompletedSchedules({
        scheduleId: scheduleId,
        reason: textArea,
      })
    );
    setShowModal(false);
    setPostAction(true);
  };

  return (
    <>
      <AlertModal
        showModal={alertModal}
        setShowModal={setAlertModal}
        type="role"
        text="Reject"
        handler={rejectHandler}
        id={id}
        btn={btn}
        setTextArea={setTextArea}
        refresh={refresh}
      />
      <Modal
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
        type="postAction"
        color={error && "#F5000F"}
      >
        <p>{!error ? `Schedule rejected successfully` : error}</p>
      </Modal>

      <Modal show={showModal} close={() => setShowModal(false)}>
        <PageTitle> {capitalize(type)}?</PageTitle>
        <BreakLine />
        <TextArea
          rows={4}
          placeholder="Reason..."
          onChange={(e) => setTextArea(e.target.value)}
          value={textArea}
        />
        <BreakLine />
        <div className="flex space-x-8 mt-4">
          <CustomButton
            text="Cancel"
            color="red"
            onClick={() => {
              setShowModal(false);
            }}
          />
          <CustomButton
            text={`Continue`}
            type="outline"
            onClick={() => {
              alertHandler();
              onRefresh();
              // setTextArea("");
            }}
            disabled={textArea.length < 5}
          />
        </div>
      </Modal>
    </>
  );
};
