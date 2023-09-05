import React, { useState } from "react";
import Modal from "../UI/modal";
import { PageTitle, ModalText } from "../styledElements";
import CustomButton from "../UI/button";
import { RejectModal } from "./RejectModal";

export const AlertModal = ({
  showModal,
  setShowModal,
  type = "",
  text,
  handler,
  id,
  btn,
  refresh = () => {},
  handleDelete = () => null,
  setTextArea = () => {},
}) => {
  const deleteText = {
    role: "Once this action is done, it cannot be reverted",
  }[type];

  return (
    <>
      {/* <RejectModal/> */}
      <Modal show={showModal} close={() => setShowModal(false)}>
        {/* <PageTitle>Once this action is done, it cannot be reverted</PageTitle> */}
        <ModalText>{deleteText}</ModalText>
        <div className="flex space-x-8 mt-4">
          <CustomButton
            text="Cancel"
            type={btn ? "outline" : ""}
            onClick={() => setShowModal(false)}
          />
          <CustomButton
            text={text}
            // type={!btn && "outline"}
            color={btn && "red"}
            onClick={() => {
              handler(id);
              setShowModal(!showModal);
              setTextArea("");
              refresh();
            }}
          />
        </div>
      </Modal>
    </>
  );
};
