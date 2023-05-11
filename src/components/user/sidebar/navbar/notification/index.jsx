import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import vector from "../../../assets/images/vector1.png";
import Notifications from "./notifications";

const Wrapper = styled.div`
  position: relative;
`;

const Bell = styled.img`
  height: 17px;
  width: 16px;
`;

function IncomingCall() {
  /**
   * here i am using useState to toggle the dropdown
   */
  const [toggle, setToggle] = useState(false);
  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        return setToggle(false);
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Wrapper className="flex justify-center align-center" ref={wrapperRef}>
      <Bell
        src={vector}
        alt={"incomingCalls"}
        className="mr-8 cursor-pointer"
        onClick={() => setToggle(!toggle)}
      />
      {toggle ? <Notifications closeModal={() => setToggle(false)} /> : null}
    </Wrapper>
  );
}

export default IncomingCall;
