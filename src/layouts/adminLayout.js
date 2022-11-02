import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProtectedRoute from "../core/routes/ProtectedRoute";
import { Redirect, Route, Switch } from "react-router";
import { Navbar, Sidebar } from "../components";
import adminRoutes, { filterRoutes } from "../core/routes/admin.routes";
import { useSelector } from "react-redux";
import FirstPasswordReset from "../pages/auth/firstPasswordReset";
import tw from "twin.macro";

const LayoutContainer = styled.section`
  // ${tw`h-full`};
  .children {
    height: calc(100% - 70px);
    width: calc(100% - 253px);
    margin-left: auto;
    margin-top: 80px;
    padding: 10px 1rem;
  } // position: relative;
`;

const Item = styled.p`
  ${tw`mb-2 text-secondary mt-4`}
`;

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [routes, setRoutes] = useState(adminRoutes);

  useEffect(() => {
    // get the permitted routes from admin routes
    if (userInfo.claims?.claims) {
      const routes = filterRoutes(userInfo.claims.claims);
      setRoutes(routes);
    }
  }, [userInfo]);

  const firstLogin =
    localStorage.getItem("firstLogin") === "true" ? true : false;
  if (firstLogin) {
    return <Route render={FirstPasswordReset} />;
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
              path="/admin"
              render={() => <Redirect to="/admin/dashboard" />}
            />

            {routes.map((route, idx) => (
              <ProtectedRoute
                firstLogin={firstLogin}
                key={`${idx}${route.path}`}
                path={`/admin/${route.path}`}
                exact
                condition={true}
                component={route.component}
                name={route.name}
                redirectPathname="/admin"
              />
            ))}
          </Switch>
        </div>
      </LayoutContainer>
    </>
  );
};

export default AdminLayout;
