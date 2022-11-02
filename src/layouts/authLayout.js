import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import authRoutes from "../core/routes/auth.routes";
import ProtectedRoute from "../core/routes/ProtectedRoute";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { clearError } from "../store/reducers/appSlice";

const LayoutContainer = styled.div`
  ${tw`
  w-full
  h-screen
  flex
  items-center
  justify-center
`}
`;

const Item = styled.p`
  ${tw`mb-2 text-secondary`}
`;

const AuthLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  return (
    <LayoutContainer>
      <Switch>
        <Route
          exact
          path="/auth"
          render={() => <Redirect to="/auth/login" />}
        />
        {authRoutes.map((route, idx) => (
          <ProtectedRoute
            key={idx}
            path={`/auth/${route.path}`}
            condition={true}
            component={route.component}
            redirectPathname="/admin"
          />
        ))}
      </Switch>
      <div className=" absolute bottom-1 w-full text-center text-secondary">
        <Item className="text-center text-white">
          <span className="inline-block ml-2">
            {/* <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 198.000000 198.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)"
                fill="#a31b1f"
                stroke="none"
              >
                <path
                  d="M1394 1611 c-60 -15 -128 -66 -169 -125 l-40 -58 0 -101 c0 -94 2
-106 29 -150 97 -163 320 -195 455 -65 148 141 110 389 -72 477 -52 25 -150
36 -203 22z"
                />
                <path
                  d="M412 1220 l317 -311 -86 -122 c-123 -174 -268 -380 -277 -394 -6 -10
44 -13 236 -13 l243 0 140 191 c194 264 235 322 235 334 0 6 -138 148 -308
318 l-307 307 -255 0 -255 0 317 -310z"
                />
                <path
                  d="M1247 604 l-145 -219 189 -3 c104 -1 275 -1 380 0 l192 3 -204 189
c-112 104 -218 203 -236 219 l-31 29 -145 -218z"
                />
              </g>
            </svg> */}
          </span>
          <p className="text-secondary font-bold text-base">
            Powered by Pakam Technologies
          </p>
        </Item>
      </div>
    </LayoutContainer>
  );
};

export default AuthLayout;
