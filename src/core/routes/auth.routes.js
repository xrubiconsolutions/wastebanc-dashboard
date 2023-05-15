import ForgotPassword from "../../pages/auth/forgot-password";
import Login from "../../pages/auth/login";
import NewPassword from "../../pages/auth/newPassword";
import PasswordUpdateSuccess from "../../pages/auth/password-success";
import RecoveryCode from "../../pages/auth/recoveryCode";
import UserLogin from "../../pages/auth/userLogin";

const routes = [
  { name: "login", path: "login", component: Login },
  { name: "adminlogin", path: "adminlogin", component: UserLogin },
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
