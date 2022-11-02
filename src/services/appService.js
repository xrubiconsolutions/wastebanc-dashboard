import baseAxios from "../core/api/axios/baseAxios";

class AppService {
  static async uploadFile(base64_data) {
    const fileData = new FormData();
    fileData.append("file", `data:image/png;base64,${base64_data}`);
    fileData.append("upload_preset", "live_report");
    const res = await baseAxios.post(
      "https://api.cloudinary.com/v1_1/dksyt7yvf/upload",
      fileData
    );
    return res?.data || res;
  }

  static async editCompanyProfile(data) {
    const res = await baseAxios.post("/api/admin/login", data);
    return res?.data || res;
  }

  static async getAllAdmins() {
    const res = await baseAxios.get("/api/get/all/admins");
    return res?.data || res;
  }
}

export default AppService;
