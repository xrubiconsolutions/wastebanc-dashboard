import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import vector from "../../../../assets/images/vector1.png";
import Notification from "./notify";

const Wrapper = styled.div`
  position: relative;
`;

const Bell = styled.img`
  height: 17px;
  width: 16px;
`;

function IncomingCall() {
  const [toggle, setToggle] = useState(false);

  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        return setToggle(false);
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
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
      {toggle ? <Notification closeModal={() => setToggle(false)} /> : null}
    </Wrapper>
  );
}

export default IncomingCall;
