import React, { useState } from "react";
import { HiUsers } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import styled from "styled-components";
import tw from "twin.macro";

const Flex = styled.div`
  ${tw`flex items-center justify-center`};
`;

export const Card = ({ title, amount }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-5 mt-5">
      <div className="bg-white flex flex-col items-center justify-center rounded-md p-12">
        <Flex className="gap-2">
          <HiUsers size={33} />
          <p className="text-3xl font-black text-card">{title}</p>
        </Flex>

        <Flex className="gap-4 pt-2">
          {show ? (
            <p className={`text-4xl font-black text-amount transit `}>
              {amount}
            </p>
          ) : (
            <p
              className={`text-4xl font-black text-amount transit text-center h-[20px]`}
            >
              *************
            </p>
          )}
          <AiOutlineEyeInvisible
            size={30}
            onClick={() => setShow(!show)}
            className="hover:cursor-pointer"
          />
        </Flex>
      </div>
    </div>
  );
};
