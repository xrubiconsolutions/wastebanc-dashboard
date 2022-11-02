import baseAxios from "../core/api/axios/baseAxios";

class CompanyWasteStatsService {
  /****************************
   *
   * get compant waste stats
   *
   ****************************/

  static async getCompanyWasteStats(date) {
    const res = await baseAxios.get(
      `/v2/company-waste/stats?start=${date.start}&end=${date.end}`
    );
    return res?.data || res;
  }

  static async CompanyWasteStats(date) {
    // const res = await baseAxios.get(
    //   `v2/company-waste/history?start=2022-03-01&end=2022-04-01`
    // );

    const res = await baseAxios.get(
      `v2/company-waste/history?start=${date.start}&end=${date.end}`
    );
    return res?.data || res;
  }

  static async CompanyWasteStatsSearch(searchQuery) {
    const res = await baseAxios.get(
      `/v2/company-waste/history?key=${searchQuery}`
    );
    return res?.data || res;
  }
  static async CompanyWasteStatsFilter(date) {
    const res = await baseAxios.get(
      `/v2/company-waste/history?start=${date.start}&end=${date.end}`
    );

    // const res = await baseAxios.get(
    //   `/v2/company-waste/history?key=owolabi${date.start}&end=${date.end}`
    // );
    return res?.data || res;
  }
}

export default CompanyWasteStatsService;
