import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { condition, component, redirectPathname, location, computedMatch } =
    props;
  const Component = component;

  return condition ? (
    <Route render={() => <Component match={computedMatch} {...props} />} />
  ) : (
    <Redirect to={redirectPathname || location} />
  );
};

export default ProtectedRoute;
