import baseAxios from "../core/api/axios/baseAxios";

class AuthService {
  //company|| recycler
  static async login(data) {
    if (!localStorage.getItem("login_mode"))
      localStorage.setItem("login_mode", "super_admin");
    const res = await baseAxios.post("/login/organisation", data);
    return res?.data || res;
  }

  //admin||
  static async loginUser(data) {
    if (!localStorage.getItem("login_mode"))
      localStorage.setItem("login_mode", "super_admin");
    const res = await baseAxios.post("/v2/admin/login", data);
    localStorage.current_user = JSON.stringify(res.data.data);
    return res?.data.data || res;
  }

  static async getAdminProfile() {
    const url =
      localStorage.getItem("login_mode") !== "user_admin"
        ? "/user/agency-profile"
        : "/user/company/agency-profile";
    const res = await baseAxios.get(url);
    return res?.data || res;
  }
  static async editAdminProfile(data) {
    const res = await baseAxios.post("/api/admin/edit/profile", data);
    return res?.data || res;
  }

  static async updatePassword(data) {
    const res = await baseAxios.post("/v2/user/password/reset", data);
    return res?.data || res;
  }

  static async updateUserPassword(data) {
    const url =
      localStorage.getItem("login_mode") !== "user_admin"
        ? "/user/agencies/update-password"
        : "/v2/organisation/update-password";
    const res = await baseAxios.put(url, data);
    return res?.data || res;
  }

  // for password reset
  static async changePassword(data) {
    const role =
      localStorage.getItem("login_mode") === "super_admin"
        ? "ADMIN"
        : "COMPANY";
    // const res = await baseAxios.post("/v2/user/password/reset", {
    const res = await baseAxios.put("/v2/password-reset", {
      ...data,
      role,
    });
    return res?.data || res;
  }

  static async resetPassword(data) {
    const role =
      localStorage.getItem("login_mode") === "super_admin"
        ? "ADMIN"
        : "COMPANY";
    // const res = await baseAxios.post("/v2/user/send/reset/token", {
    const res = await baseAxios.post("/v2/auth-token", {
      ...data,
      role,
    });
    return res?.data || res;
  }

  static async createAdmin(data) {
    const res = await baseAxios.post("/api/admin/register", data);
    return res?.data || res;
  }

  static async validateToken(data) {
    const role =
      localStorage.getItem("login_mode") === "super_admin"
        ? "ADMIN"
        : "COMPANY";
    // const res = await baseAxios.post("/v2/user/confirm/token", {
    const res = await baseAxios.put("/v2/auth-token-verify", {
      ...data,
      verificationType: "AUTH",
      role,
    });
    return res?.data || res;
  }
}

export default AuthService;
