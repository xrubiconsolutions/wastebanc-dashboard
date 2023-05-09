import React, { useState } from "react";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setModalOpening } from "../../store/reducers/appSlice";

const ModalBackground = styled.div`
  width: 200px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: absolute;
  border-radius: 10px;
  right: 200px;
  margin-top: 8px;
  padding-bottom: 10px;
  z-index: 999;
  top: 260px;

  a:hover {
    color: green;
  }
  modalContainer {
    position: fixed;
  }
  h6 {
    margin-top: 15px;
  }
  .iconStyle {
    display: inline-block;
    margin-left: 190px;
  }
  hr {
    margin-top: 5px;
    background: red;
    color: red;
  }

  span {
    color: red;
    background: red;
  }

  @media (max-width: 500px) {
    right: 100px;
    top: 300px;
  }
`;

export const PayoutOptionModal = ({ selectedOrganisation }) => {
  const { error, modal, payout } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <>
      {modal && (
        <div className="modalContainer relative">
          <ModalBackground>
            <Menu>
              {payout?.map((pay, index) => {
                return (
                  <Menu.Item key={index}>
                    <Link
                      to={{
                        pathname: `${pay.pathname}${selectedOrganisation}`,
                      }}
                      onClick={() => {
                        dispatch(setModalOpening(false));
                      }}
                      style={{ display: "block" }}
                    >
                      {pay.title}
                    </Link>
                  </Menu.Item>
                );
              })}
              <Menu.Divider />
            </Menu>
          </ModalBackground>
        </div>
      )}
    </>
  );
};
