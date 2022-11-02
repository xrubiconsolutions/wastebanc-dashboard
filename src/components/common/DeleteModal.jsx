import React, { useState } from "react";
import Modal from "../UI/modal";
import { PageTitle, ModalText } from "../styledElements";
import CustomButton from "../UI/button";
import { capitalize } from "../../utils";
import { useSelector } from "react-redux";

const DeleteModal = ({
  showModal,
  setShowModal,
  type = "",
  name = "",
  handleDelete = () => null,
}) => {
  const deleteText = {
    role: "Are you sure you want to delete this role?",
    drop: "Are you sure you want to delete this drop-off location? You'll permanently lose all the data ",
    category: "Are you sure you want to delete this waste category",
    account: `Are you sure you want to delete ${name}? You'll permanently lose all the data `,
    aggregator: "Are you sure you want to decline this approval",
    resource: "Are you sure you want delete this Resource",
    enable: "Are you sure you want to delete this aggregator",
  }[type];

  const [showPostAction, setPostAction] = useState(false);

  const deleteHandler = async () => {
    setShowModal(false);
    await handleDelete();
    setPostAction(true);
  };

  const { error } = useSelector((state) => state.app);

  return (
    <>
      <Modal
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
        type="postAction"
        color={error && "#F5000F"}
      >
        <p>{!error ? `You have successfully deleted this ${type}` : error}</p>
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <PageTitle>Delete {capitalize(type)}</PageTitle>
        <ModalText>{deleteText}</ModalText>
        <div className="flex space-x-8 mt-4">
          <CustomButton
            text="Cancel"
            type="outlined"
            onClick={() => setShowModal(false)}
          />
          <CustomButton
            text={`Delete ${type}`}
            color="red"
            onClick={deleteHandler}
          />
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
