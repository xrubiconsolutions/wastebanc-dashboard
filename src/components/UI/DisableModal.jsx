import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleStatusAggregator, deleteAggregator } from "../../store/actions";
import Modal from "./modal";
import { useSelector } from "react-redux";

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

function DisableModal({
  setModalOpen,
  data,
  onRefresh,
  deletehandler = () => {},
  enabled,
}) {
  const [currentStatus, setCurrentStatus] = useState("Disable");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status === "active") setCurrentStatus("Disable");

    if (data?.status === "disable") setCurrentStatus("Enable");
  }, [data?.status]);

  // const handleDisable = (selStatus) => {
  //   console.log("Trying to toggle disable....");
  //   console.log("data: ", data);

  //   const payload = {
  //     id: data?.id,
  //     status: selStatus === "active" ? "disable" : "enable",
  //   };

  //   switch (selStatus) {
  //     case "active":
  //       dispatch(toggleStatusAggregator(payload))
  //         .unwrap()
  //         .then(() => {
  //           onRefresh();
  //         });
  //       break;
  //     case "disable":
  //       dispatch(toggleStatusAggregator(payload))
  //         .unwrap()
  //         .then(() => {
  //           onRefresh();
  //         });
  //       break;
  //     default:
  //   }
  // };

  const disableHandler = () => {
    if (enabled) {
      const payload = {
        id: data?.id,
        status: "enable",
      };
      dispatch(toggleStatusAggregator(payload))
        .unwrap()
        .then(() => {
          onRefresh();
        });
    } else {
      const payload = {
        id: data?.id,
        status: "disable",
      };
      dispatch(toggleStatusAggregator(payload))
        .unwrap()
        .then(() => {
          onRefresh();
        });
    }
  };

  return (
    <>
      <div className="modalContainer">
        <ModalBackground>
          <Menu>
            <Menu.Item key="0">
              <Link to="#" className="menu" onClick={disableHandler}>
                {/* {currentStatus} */}
                {enabled ? "Enabled" : "Disabled"}
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
              <Link to="#" className="menu" onClick={deletehandler}>
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
