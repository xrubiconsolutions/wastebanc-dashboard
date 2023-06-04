import React from "react";
import { useSelector } from "react-redux";
import Modal from "./modal";

export const DisplayModal = ({ showModal, setShowModal, message }) => {
  const {
    app: { error },
  } = useSelector((state) => state);

  return (
    <>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        type="postAction"
        color={error && "#F5000F"}
      >
        <p>{`${error ? error : message}`}</p>
      </Modal>
    </>
  );
};
