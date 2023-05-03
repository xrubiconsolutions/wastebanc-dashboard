import React from "react";
import { useDispatch } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { loginAdmin, loginUser } from "../../store/reducers/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const entries = {
    email: {
      name: "email",
      value: "",
      label: "Email",
      placeholder: "Input your email address",
      rules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
      ],
    },
    password: {
      name: "password",
      placeholder: "Input your password",
      type: "password",
      label: "Password",
      value: "",
      required: true,
      rules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 6 || "Password must not be less than 6 characters",
      ],
    },
  };

  const handler = async (data, signRoute) => {
    console.log("data", data);
    try {
      const res =
        signRoute === "user_admin"
          ? await dispatch(loginAdmin(data))
          : await dispatch(loginUser(data));
      if (!res.error) {
        localStorage.setItem("firstLogin", res.payload.firstLogin);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <AuthForm
      submitHandler={handler}
      formEntries={entries}
      title="Dashboard Login"
      type="login"
    />
  );
};

export default Login;
