import baseAxios from "../core/api/axios/baseAxios";

class ResponderService {
  //========================================
  //=======Get Responders data methods=======
  //========================================
  static async getAllResponders() {
    const res = await baseAxios.get("/api/get/all/responders");
    return res?.data || res;
  }

  //========================================
  //=======Update Responders data methods=======
  //========================================
  static async approveResponder(data) {
    const res = await baseAxios.post("/api/respondent/approve", data);
    return res?.data || res;
  }

  static async declineResponder(data) {
    const res = await baseAxios.post("/api/respondent/decline", data);
    return res?.data || res;
  }

  //========================================
  //=====Delete Responders data methods=====
  //========================================
  static async deleteResponders(data) {
    const res = await baseAxios.delete("/api/respondents", { data });
    return res?.data || res;
  }
}

export default ResponderService;
