import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import styled from "styled-components";
import tw from "twin.macro";

const SearchForm = styled.div`
   
    :where(.search-icon, span) {
      position: absolute;
      top: 50%;
      color: red;
      transform: translateY(-50%);
    }
    &-icon {
      left: 18px;
      pointer-events: none;
      font-size: 16px;
    }

    span {
      right: 15px;
      cursor: pointer;
      font-size: 18px;
      display: none;
    }
    input:valid ~ span {
      display: block;
    }
  }
`;

const Searchwrapper = styled.div`
  background: transparent;
  //   padding: 0px 28px 0px;
  align-items: center;
  justify-content: center;

  .search {
    position: relative;
    // margin: 0px 0 18px;
    @media (min-width: 720px) {
      // margin: 35px 0 18px;
    }
  }
`;
//   .wrapper .search {
//     position: relative;
//     margin: 0px 0 18px;
//     @media (min-width: 720px) {
//       margin: 35px 0 18px;
//     }
//   }

const Searchinput = styled.input`
   {
    background-color: transparent;
    border: 1px solid #00966d;
  }
  :focus {
    border: 2.5px solid;
  }
  :-ms-input-placeholder {
    color: black;
  }
  ::placeholder {
    // color: $primary-color;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const clearSearchInputToggle = () => {
    setSearchInput("");
  };

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    // onSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchInput(value);
    onSearch(searchInput);
    setSearchInput("");
  };

  return (
    <Searchwrapper className="wrapper">
      <form onSubmit={handleSubmit}>
        <SearchForm className="search">
          <input
            type="text"
            placeholder=" Search data table"
            required
            spellCheck="false"
            value={searchInput}
            onChange={handleSearchInput}
            className="md:h-8 w-52 outline-none lg:text-sm  lg:px-10 md:px-10 px-9 text-xs h-8 text-black"
          />
          <FiSearch className="search-icon cursor-pointer" onClick={onSearch} />
          <span className="material-icons" onClick={clearSearchInputToggle}>
            <RiCloseFill />
          </span>
        </SearchForm>
      </form>
    </Searchwrapper>
  );
};

export default SearchBar;
