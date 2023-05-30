import styled from "styled-components";
import tw from "twin.macro";

export const UserContainer = styled.div`
  margin-bottom: 20px;
  display: grid;
`;

export const GridContainer = styled.div`
  ${tw`pt-10 grid grid-cols-4 gap-5`}
`;

export const NavBarLeft = styled.div`
  ${tw`flex justify-between`}

  .text {
    font-size: 15px;
    color: "#0e0e0e";
  }
`;
export const ModalBackground = styled.div`
  ${tw`pt-5`}
`;

export const UserTitle = styled.div`
  ${tw`text-xl font-medium`}
`;

export const InfoItem = styled.div`
  ${tw`flex flex-col space-y-2`}
`;

export const InfoTitle = styled.p`
  ${tw`font-semibold text-sm leading-[22px] text-secondary`}
`;
export const InfoValue = styled.p`
  ${tw`font-bold text-base leading-[28px]`};
  color: ${(props) => (props.color ? props.color : "#464F54")};
`;

export const BreakDownContainer = styled.div`s
  ${tw`flex flex-col`}
`;

export const ButtonContainer = styled.div`
  ${tw`flex justify-end gap-4`}
  > button {
    ${tw`text-sm px-6 py-2 rounded-md transition-all ease-in-out duration-500`}
  }
  > button:first-child {
    ${tw`bg-secondary text-white  border-2 border-secondary `}
  }

  > button:last-child {
    ${tw`bg-transparent text-red-400 border-[2px] border-red-400`}
  }
`;
