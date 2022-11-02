import React from "react";
import styled from "styled-components";
import ProtectedRoute from "../core/routes/ProtectedRoute";
import { Redirect, Route, Switch } from "react-router";
import { Navbar, Sidebar } from "../components/user/index";
import userRoutes from "../core/routes/user.routes";
import firstPasswordReset from "../pages/auth/firstPasswordReset";
import tw from "twin.macro";

const LayoutContainer = styled.section`
  ${tw`h-full`};
  .children {
    height: calc(100% - 70px);
    width: calc(100% - 253px);
    margin-left: auto;
    margin-top: 80px;
    padding: 10px 1rem;
    /* position: relative; */
  }
`;

const Item = styled.p`
  ${tw`mb-2 text-secondary mt-4`}
`;

const UserLayout = () => {
  // console.log("For User resetting functionality!!!");
  const firstLogin =
    localStorage.getItem("firstLogin") === "true" ? true : false;
  if (firstLogin) {
    return <Route render={firstPasswordReset} />;
  }
  return (
    <>
      <LayoutContainer>
        <Navbar />
        <Sidebar />
        <div className="children">
          <Switch>
            <Route
              exact
              path="/user"
              render={() => <Redirect to="/user/dashboard" />}
            />
            {userRoutes.map((route, idx) => (
              <ProtectedRoute
                key={`${idx}${route.path}`}
                path={`/user/${route.path}`}
                condition={true}
                component={route.component}
                redirectPathname="/user"
              />
            ))}
          </Switch>
        </div>
      </LayoutContainer>
    </>
  );
};
export default UserLayout;
