import React from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/UI/modal";

export const EvacuationModal = ({ showModal, setShowModal }) => {
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
        <p>{`${error}`}</p>
      </Modal>
    </>
  );
};
