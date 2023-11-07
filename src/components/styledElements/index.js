import styled from "styled-components";
import tw from "twin.macro";
import SearchInput from "../UI/searchInput";

export const PageContainer = styled.div`
  ${tw`p-8 m-5 shadow-lg`}
`;
export const PageTitle = styled.p`
  ${tw`text-secondary text-lg`}
`;

export const FlexContainer = styled.div`
  padding: ${({ userAgencies }) => (userAgencies ? "4px 8px" : "")};
  background: ${({ color }) => (color ? color : "")};
  border-radius: ${({ userAgencies }) => (userAgencies ? "4px" : "")};
  ${tw`flex flex-wrap items-center`}
`;

export const FlexBetween = styled.div`
  ${tw`flex justify-between`}
`;

export const CountIndicator = styled.span`
  ${tw`rounded-full text-sm text-white font-light flex box-border justify-center items-center p-4`}
  background-color: ${(props) => props.color || "#295011"};
  height: ${(props) => props.size || "20px"};
  width: ${(props) => props.size || "20px"};
  > * {
    margin-top: 2px;
  }
`;

export const PaginationTab = styled.div`
  ${tw`p-3 relative`}
  background-color: #8a99a8;
  opacity: ${(props) => (props.fade ? "0.25" : "0.7")};
  border-radius: 2px;
  cursor: ${(props) => (props.fade ? "disabled" : "pointer")};
`;

export const ModalText = styled.p`
  ${tw`text-base text-body my-4`}
`;

export const ModalListItem = styled.p`
  ${tw`text-secondary text-sm py-2 cursor-pointer border-b
   border-gray-300 items-center`}
  background-color: ${(props) => props.bgColor || "initial"};
  color: ${(props) => (props.bgColor ? "white" : "#295011")};
  &:last-child {
    color: red;
  }
`;

export const CountText = styled.p`
  ${tw`text-secondary`}
  font-size: 36px;
  font-weight: 700;
`;

export const InfoContainer = styled.div`
  ${tw`border p-8 pb-4 my-5`}
  background-color: #fcfcfc
`;

export const InfoTitle = styled.p`
  ${tw`text-title-active text-base font-medium`}
`;
export const SmallText = styled.span`
  ${tw`text-sm text-secondary font-light inline ml-4`}
  > sup {
    top: -0.2rem;
  }
`;

export const SubText = styled.p`
  ${tw``}
  font-size: 12px;
  color: #a3a3a3;
`;

export const FormContainer = styled.div`
  ${tw`w-full md:w-[85%] mt-4 p-0 flex flex-wrap justify-between`}
`;

export const PageTab = styled.div`
  ${tw`py-4 cursor-pointer relative`}
  border-bottom-width: 2px;
  border-color: ${(props) => (props.active ? "#295011" : "")};
`;

export const MidText = styled.p`
  ${tw`text-secondary text-base`}
`;
export const TextTab = styled.div`
  ${tw`bg-gray-100 text-sm rounded-xl mr-3 p-1 mb-3`}
`;

export const MessageContainer = styled.div`
  ${tw`border shadow-md text-red-500 border-red-500 text-center p-5 w-full mb-5`}
`;
export const SuccessContainer = styled.div`
  ${tw`border shadow-md text-green-500 border-green-500 text-center p-5 w-full mb-5`}
`;

export const DropdownContainer = styled.div`
  ${tw`rounded-lg z-10 overflow-y-scroll shadow-xl p-5 pl-1 space-y-3 absolute bg-white`}
  max-height: 20rem;
  width: ${(props) => props.width || "auto"};
  ::-webkit-scrollbar {
    width: 0.2rem;
  }
  ::-webkit-scrollbar-track {
    // box-shadow: -2px 2px 2px, 2px -2px 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #eeeeee;
    border: 2px solid grey;
  }
`;

export const OptionItem = styled.p`
  ${tw`text-sm text-body cursor-pointer hover:bg-gray-200 py-1 pl-2`}
`;
export const OptionTitle = styled.p`
  ${tw`text-base text-body pl-2 whitespace-nowrap overflow-hidden`}
`;

export const SelectSearch = styled(SearchInput)`
  ${tw`w-full border-transparent`}
`;

export const ModalTitle = styled.div`
  ${tw`flex items-center justify-between mb-4`}
`;

export const TitleText = styled.h3`
  ${tw`leading-[34px] text-lg font-semibold`}
`;
