import baseAxios from "../core/api/axios/baseAxios";

export default class RoleService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getRoles() {
    const res = await baseAxios.get("/roles");
    return res?.data || res;
  }
  static async getClaims(type) {
    const res = await baseAxios.get(`/claims?filter=${type}`);
    return res?.data || res;
  }

  /****************************
   *
   * creator services
   *
   ****************************/
  static async createRole(data) {
    const res = await baseAxios.post("/roles/create", data);
    return res?.data || res;
  }

  /****************************
   *
   * update services
   *
   ****************************/
  static async updateRole({ data, roleId }) {
    const res = await baseAxios.put(`/roles/${roleId}`, data);
    return res?.data || res;
  }
  /****************************
   *
   * delete services
   *
   ****************************/
  static async deleteRole(roleId) {
    const res = await baseAxios.delete(`/roles/${roleId}`);
    return res?.data || res;
  }
}
