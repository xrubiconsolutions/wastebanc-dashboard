import baseAxios from "../core/api/axios/baseAxios";

export default class ResourceService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getResources() {
    const res = await baseAxios.get("/resources");
    return res?.data || res;
  }
  /****************************
   *
   * creator services
   *
   ****************************/
  static async createResources(data) {
    const res = await baseAxios.post("/resource", data);
    return res?.data || res;
  }

  /****************************
   *
   * update servicesw2
   *
   ****************************/
  static async updateResources(resourceId, data) {
    const res = await baseAxios.put(`/resource/${resourceId}`);

    return res?.data || res;
  }

  /****************************
   *
   * delete services
   *
   ****************************/
  static async deleteResources(resourceId) {
    const res = await baseAxios.delete(`/resource/${resourceId}`);
    return res?.data || res;
  }
}
