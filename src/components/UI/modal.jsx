import React from "react";
import { animated, useSpring, config } from "@react-spring/web";
import BackDrop from "./backdrop.jsx";
import styled from "styled-components";
import tw from "twin.macro";
import { FaTimes } from "react-icons/fa";

const ModalContainer = styled.div`
  ${tw`bg-white rounded-[15px] h-auto mx-auto md:m-auto p-10 pt-7 pr-6 `}
  padding-right: ${(props) => props.equalPad && "40px"};
  width: ${(props) => props.width || "33rem"};
  max-height: 88%;
  overflow-y: scroll;
`;
const RaffleModalContainer = styled.div`
  ${tw`bg-white rounded-[15px] h-auto mx-auto md:m-auto p-10 pt-7 pr-6`}
  padding-right: ${(props) => props.equalPad && "40px"};
  width: ${(props) => props.width || "33rem"};
  max-height: 8%;
  overflow-y: scroll;
`;

const ListItemModal = styled.div`
  ${tw`absolute bg-white border border-gray-100 p-3 rounded-md flex flex-col w-40 z-30`}
  display: ${(props) => (props.show ? "block" : "none")};
  left: ${(props) => props.left || "-5rem"};
  width: ${(props) => props.width || "10rem"};
  padding: ${(props) => props.noPad && "0"};
  border-width: ${(props) => props.noPad && "0"};
`;

const PostActionWrapper = styled.div`
  ${tw`h-8 w-2/5 relative flex justify-center items-center px-4 text-center text-gray-300 z-30`}
  background-color: ${(props) => props.color || "#009E52"}
`;

const DropdownContainer = styled.div`
  ${tw`relative w-max`}
`;

const Modal = ({
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
            <ModalContainer {...props} onClick={(e) => e.stopPropagation()}>
              {children}
            </ModalContainer>
          </animated.div>
        </>
      );

    case "dropdown":
      return (
        <>
          <BackDrop show={show} close={close} />
          <DropdownContainer {...props}>
            <ListItemModal {...props} show={show}>
              {children}
            </ListItemModal>
          </DropdownContainer>
        </>
      );

    case "postAction":
      return (
        <>
          <BackDrop show={show} close={close} />
          <animated.div
            style={animationProps}
            className="absolute left-0 w-full h-full overflow-hidden flex justify-center top-0 z-20"
            onClick={close}
          >
            <PostActionWrapper {...props} onClick={(e) => e.stopPropagation()}>
              {children}
              <FaTimes
                onClick={close}
                size="15"
                className="cursor-pointer right-4 absolute"
              />
            </PostActionWrapper>
          </animated.div>
        </>
      );
    default:
      return (
        <>
          <BackDrop show={show} close={close} />
          <div className="relative">
            <ListItemModal show={show}>{children}</ListItemModal>
          </div>
        </>
      );
  }
};

export default Modal;
