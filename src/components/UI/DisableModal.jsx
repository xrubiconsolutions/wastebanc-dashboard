import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleStatusAggregator, deleteAggregator } from "../../store/actions";
import modal from "../UI/modal";

const ModalBackground = styled.div`
  width: 90px;
  background: #fff;
  position: absolute;
  border-radius: 10px;
  z-index: 999;
  // right: 0px;
  .menu:hover {
    color: green;
  }
  .modalContainer {
    position: relative;
  }
`;

function DisableModal({ setModalOpen, data, onRefresh }) {
  const [currentStatus, setCurrentStatus] = useState("Disable");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status === "active") setCurrentStatus("Disable");

    if (data?.status === "disable") setCurrentStatus("Enable");
  }, [data?.status]);

  const deleteHandler = async () => {
    const payload = {
      collectorId: data.key,
    };
    const res = await dispatch(deleteAggregator(payload));
    if (!res.error) onRefresh();
  };

  const handleDisable = (selStatus) => {
    const payload = {
      id: data.key,
      status: selStatus === "active" ? "disable" : "enable",
    };

    switch (selStatus) {
      case "active":
        dispatch(toggleStatusAggregator(payload))
          .unwrap()
          .then(() => {
            onRefresh();
          });
        break;
      case "disable":
        dispatch(toggleStatusAggregator(payload))
          .unwrap()
          .then(() => {
            onRefresh();
          });
        break;
      default:
    }
  };

  const handleDelete = () => {
    return;
  };

  return (
    <>
      <div className="modalContainer">
        <ModalBackground>
          <Menu>
            <Menu.Item key="0">
              <Link
                to="#"
                className="menu"
                onClick={() => handleDisable(data?.status)}
              >
                {currentStatus}
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
              <Link to="#" className="menu" onClick={handleDelete}>
                Delete
              </Link>
            </Menu.Item>
          </Menu>
        </ModalBackground>
      </div>
    </>
  );
}

export default DisableModal;
