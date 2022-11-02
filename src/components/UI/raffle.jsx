import React from "react";
import { animated, useSpring, config } from "@react-spring/web";
import BackDrop from "./backdrop.jsx";
import styled from "styled-components";
import tw from "twin.macro";


const RaffleModalContainer = styled.div`
${tw`bg-white rounded-[10px] h-auto mx-auto md:m-auto p-10 pt-7 pr-6`}
padding-right: ${(props) => props.equalPad && "40px"};
width: ${(props) => props.width || "33rem"};
max-height: 60%;
overflow-y: scroll;
`;

const RaffleM = ({
  show = false,
  close = () => null,
  type = "dialog",
  children,
  ...props
}) => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: show ? "translateY(-1200px)" : "translateY(0)",
    },
    to: {
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(-1200px)",
    },
    config: config.default,
    delay: show ? 50 : 0,
  });

  switch (type) {
    case "dialog":
      return (
        <>
          <BackDrop show={show} close={close} />
          <animated.div
            style={animationProps}
            className="absolute left-0 w-full h-full overflow-hidden flex justify-center top-0 items-center z-20"
            onClick={close}
          >
            <RaffleModalContainer {...props} onClick={(e) => e.stopPropagation()}>
              {children}
            </RaffleModalContainer>
          </animated.div>
          
         
        </>
      );
  }
};

export default RaffleM;
