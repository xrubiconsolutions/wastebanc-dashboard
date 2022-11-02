import baseAxios from "../core/api/axios/baseAxios";

class OrgService {
  //=======================================
  //===Create Organization data methods====
  //=======================================
  static async createOrganization(data) {
    const res = await baseAxios.post("/api/create/organisation", data);
    return res?.data || res;
  }

  //=======================================
  //=====Get Organization data methods=====
  //=======================================

  static async getAllOrganizations() {
    const res = await baseAxios.get("/api/get/all/organisations");
    return res?.data || res;
  }

  static async getAllRespondents() {
    const res = await baseAxios.get("/api/get/all/responders");
    return res?.data || res;
  }

  static async getLGA() {
    const res = await baseAxios.get("/api/get/lga");
    return res?.data || res;
  }

  //=======================================
  //===update Organization data methods====
  //=======================================
  static async editCompanyProfile(data) {
    const res = await baseAxios.post("/api/edit/company/profile", data);
    return res?.data || res;
  }

  //=======================================
  //===Delete Organization data methods====
  //=======================================
  static async deleteCompany(data) {
    // axios delete method doesn't support the body data as second argument
    // so data is set using config.data which is the second arg below
    const res = await baseAxios.delete("/api/organisations", { data });
    return res?.data || res;
  }
}

export default OrgService;
