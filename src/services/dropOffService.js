import baseAxios from "../core/api/axios/baseAxios";

export default class DropOffService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getTotalDropoff(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/dropoffs?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }
  static async getCompanyTotalDropoff(currentMonth, page) {
    const res = await baseAxios.get(
      `/v2/company/dropoffs?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }
  static async getCollectorTotalDropoff(page, data) {
    const res = await baseAxios.get(
      `/v2/collector/dropoff-locations?start=${data.start}&end=${data.end}&page=${page}`
    );
    return res?.data || res;
  }
  static async filterCollectorTotalDropoff(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/collector/dropoff-locations?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * search services
   *
   ****************************/
  static async searchTotalDropoff(key, page) {
    const res = await baseAxios.get(`/v2/dropoffs?key=${key}&page=${page}`);

    return res?.data || res;
  }
  static async searchCompanyTotalDropoff(key, page) {
    const res = await baseAxios.get(
      `/v2/company/dropoffs?key=${key}&page=${page}`
    );

    return res?.data || res;
  }
  static async SearchCollectorTotalDropoff(page, key) {
    const res = await baseAxios.get(
      `/v2/collector/dropoff-locations?key=${key}&page=${page}`
    );

    return res?.data || res;
  }
  /****************************
   *
   * filter services
   *
   ****************************/
  static async filterTotalDropoff(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/dropoffs?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * delete services
   *
   ****************************/
  static async deleteDropoff(data) {
    const res = await baseAxios.delete(`/v2/company/dropoffs/location`, {
      data,
    });
    return res?.data || res;
  }
}
