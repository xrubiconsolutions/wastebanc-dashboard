import baseAxios from "../core/api/axios/baseAxios";

class AdminWasteStatsService {
  /****************************
   *
   * get compant waste stats
   *
   ****************************/

  static async getAdminWasteStats(data) {
    const res = await baseAxios.get(
      `/v2/waste/chart?start=${data.start}&end=${data.end}`
    );
    return res?.data || res;
  }
  static async AdminWasteStats(page, data) {
    const res = await baseAxios.get(
      `/v2/waste/collection?start=${data.start}&end=${data.end}&page=${page}`
    );
    return res?.data || res;
  }
  static async AdminWasteStatsSearch(searchQuery, page) {
    const res = await baseAxios.get(
      `/v2/waste/collection?key=${searchQuery}&page=${page}`
    );
    return res?.data || res;
  }
  static async AdminWasteStatsFilter(currentMonth, page) {
    const res = await baseAxios.get(
      `/v2/waste/collection?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }
}

export default AdminWasteStatsService;
