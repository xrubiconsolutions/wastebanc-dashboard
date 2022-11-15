import Login from "../../pages/auth/login";
import ForgotPassword from "../../pages/auth/forgot-password";
import RecoveryCode from "../../pages/auth/recoveryCode";
import NewPassword from "../../pages/auth/newPassword";
import PasswordUpdateSuccess from "../../pages/auth/password-success";

const routes = [
  { name: "login", path: "login", component: Login },
  {
    name: "forgot-password",
    path: "forgot-password",
    component: ForgotPassword,
  },
  {
    name: "recovery-code",
    path: "recovery-code",
    component: RecoveryCode,
  },
  {
    name: "create-new-password",
    path: "create-new-password",
    component: NewPassword,
  },
  {
    name: "password-update-success",
    path: "password-update-success",
    component: PasswordUpdateSuccess,
  },
];
export default routes;
