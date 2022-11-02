import React, { useState } from "react";
import Backdrop from "./backdrop";
import styled from "styled-components";
import tw from "twin.macro";
import Modal from "./modal";
import { FlexContainer } from "../styledElements";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ModalContainer = styled.div`
  ${tw`bg-white rounded-md h-auto mx-auto md:m-auto p-10 pr-6`}
  padding-right: ${(props) => props.equalPad && "40px"};
  width: ${(props) => props.width || "33rem"};
  max-height: 85%;
  overflow-y: scroll;
`;

const CarouselContainer = styled(FlexContainer)`
  ${tw`my-0 -ml-3 bg-gray-500 relative w-full`}
  > img {
    ${tw`mx-auto object-contain`}
  }
`;

const PrevButtonContainer = styled.span`
  ${tw`absolute -left-2 border z-20 bg-secondary border-secondary px-2`}
`;

const NextButtonContainer = styled.span`
  ${tw`absolute -right-2 border z-20 bg-secondary border-secondary px-2`}
`;

const ImagePreview = ({ images = [], close = () => null }) => {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Modal show={true} width="65vw" close={close}>
        <CarouselContainer>
          <PrevButtonContainer
            className="bg-red-600 absolute"
            onClick={() => {
              let _current = current - 1 >= 0 ? current - 1 : images.length - 1;
              setCurrent(_current);
            }}
          >
            <FaAngleLeft size="40" className="text-white" />
          </PrevButtonContainer>
          <NextButtonContainer
            className="bg-red-600 absolute"
            onClick={() => {
              setCurrent((current + 1) % images.length);
            }}
          >
            <FaAngleRight size="40" className="text-white" />
          </NextButtonContainer>
          {images.length > 0 && (
            <img
              src={`data:image/png;base64,${images[current]}`}
              alt="screenshot"
            />
          )}
        </CarouselContainer>
      </Modal>
    </>
  );
};

export default ImagePreview;
