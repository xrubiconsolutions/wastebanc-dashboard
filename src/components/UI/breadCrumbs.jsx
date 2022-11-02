import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Breadcrumbs = styled.ul`
  list-style: none;
  padding: 0;
  & > li:after {
    content: "${(props) => props.separator || "/"}";
    padding: 0 8px;
  }
`;

const Crumb = styled.li`
  display: inline-block;

  &:last-of-type:after {
    content: "";
    padding: 0;
  }

  a {
    color: green;
    text-decoration: none;
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;

const BreadCrumb = ({ pages, current }) => {
  return (
    <Breadcrumbs>
      {pages.map((el, i) => {
        return (
          <Crumb key={i}>
            <Link to={el.link}>{el?.name}</Link>
          </Crumb>
        );
      })}
      <Crumb>{current}</Crumb>
    </Breadcrumbs>
  );
};

export default BreadCrumb;
