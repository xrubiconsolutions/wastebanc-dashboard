import baseAxios from "../core/api/axios/baseAxios";

export default class AreaService {
  /****************************
   *
   * get managed access
   *
   ****************************/

  static async getManagedArea(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/areas?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * create managed access
   *
   ****************************/
  static async createManagedArea(data) {
    const res = await baseAxios.post("/v2/area/create", data);
    return res?.data || res;
  }

  /****************************
   *
   * update managed access
   *
   ****************************/
  static async updateManagedArea(id, data) {
    const res = await baseAxios.put(`/v2/area/${id}`, data);
    return res?.data || res;
  }

  /****************************
   *
   * search managed access
   *
   ****************************/

  static async searchManagedArea(key, page, currentMonth) {
    const res = await baseAxios.get(`/v2/areas?key=${key}&page=${page}`);
    return res?.data || res;
  }

  /****************************
   *
   * get all local governments
   *
   ****************************/

  static async getAllAreas(data) {
    const res = await baseAxios.get(`/get/lcd/areas?page=1`);
    return res?.data || res;
  }

  /************************ ****
   *
   * get all local governments
   * in the given state
   *
   ****************************/
  static async getStateAreas(state) {
    const res = await baseAxios.get(`/v2/lga?state=${state}`);
    return res?.data || res;
  }

  /****************************
   *
   * get all areas within an LGA
   *
   ****************************/
  static async getSubAreas(state) {
    const res = await baseAxios.get(`/v2/lcd/accessArea?state=${state}`);
    return res?.data || res;
  }
}
