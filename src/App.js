/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "./styles/ant.css";
import "./styles/btn.css";
import "./styles/seachinput.css";
import "./styles/raffle.css";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import AuthLayout from "./layouts/authLayout";
import AdminLayout from "./layouts/adminLayout";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/reducers/authSlice";
import { fetchAdminProfile } from "./store/actions";
import Loader from "./components/UI/loader";
import UserLayout from "./layouts/userLayout";

function App() {
  const dispatch = useDispatch();
  const data = localStorage.getItem("lasepa_admin_token");
  const loginMode = localStorage.getItem("login_mode");

  const {
    auth: { token },
    app: { loading },
  } = useSelector((state) => state);

  if (data && !token) {
    dispatch(checkAuth());
    // dispatch(fetchAdminProfile());
  }

  return (
    <>
      {loading && <Loader />}
      <Router>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <ProtectedRoute
            path="/admin"
            condition={data && loginMode === "super_admin"}
            component={AdminLayout}
            redirectPathname={!!token ? "/user" : "/auth"}
          />

          <ProtectedRoute
            path={`/auth`}
            condition={!token}
            component={AuthLayout}
            redirectPathname="/admin"
          />

          <ProtectedRoute
            path="/user"
            condition={data && loginMode === "user_admin"}
            component={UserLayout}
            redirectPathname={!!token ? "/admin" : "/auth"}
          />
          <Redirect from="*" to="auth" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
