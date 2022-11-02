import baseAxios from "../core/api/axios/baseAxios";

class AgenciesService {
  //=======================================
  //===Get all User Agencies ====
  //=======================================
  static async getUserAgencies(page) {
    const res = await baseAxios.get(`/user/agencies/get?page=${page}`);
    return res?.data || res;
  }

  //=======================================
  //===Create a User Agency ====
  //=======================================
  static async createUserAgencies(data) {
    const res = await baseAxios.post("/user/agencies/create", data);
    return res?.data || res;
  }

  //=======================================
  //===Update a User Agency ====
  //=======================================
  static async updateUserAgencies(id, data) {
    const res = await baseAxios.put(`/user/agencies/update/${id}`, data);
    return res?.data || res;
  }

  //=======================================
  //===Delete a User Agency ====
  //=======================================
  static async deleteUserAgencies(id) {
    const res = await baseAxios.delete(`/user/agencies/remove/${id}`);
    return res?.data || res;
  }
}

export default AgenciesService;
