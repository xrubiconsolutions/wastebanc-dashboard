import React from "react";
import styled from "styled-components";
import ProtectedRoute from "../core/routes/ProtectedRoute";
import { Redirect, Route, Switch } from "react-router";
import { Navbar, Sidebar } from "../components/user/index";
import userRoutes from "../core/routes/user.routes";
import firstPasswordReset from "../pages/auth/firstPasswordReset";
import tw from "twin.macro";
import { TwakReact } from "../components/Chat/index";

const LayoutContainer = styled.section`
  ${tw`h-full`};
  .children {
    ${tw``};
    height: calc(100% - 70px);
    width: 100%;
    /* width: calc(100% - 253px); */
    margin-left: 0;
    margin-top: 80px;
    padding: 10px 1rem;
    @media (min-width: 920px) {
      margin-top: 80px;
      margin-left: auto;
      padding: 10px 1rem;
      width: calc(100% - 253px);
    }
    /* position: relative; */
  }
`;

const Item = styled.p`
  ${tw`mb-2 text-secondary mt-4`}
`;

const UserLayout = () => {
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
      <TwakReact />
    </>
  );
};
export default UserLayout;
