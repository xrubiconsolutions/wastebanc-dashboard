import baseAxios from "../core/api/axios/baseAxios";

export default class ReportService {
  /****************************
   *
   * Report services
   *
   ****************************/
  static async getReport(date,page) {
    const res = await baseAxios.get(
      `/v2/reportlogs?start=${date.start}&end=${date.end}&page=1`
    );

    return res?.data || res;
  }

  /****************************
   *
   * search services
   *
   ****************************/
  static async searchReport(searchQuery,page) {
    const res = await baseAxios.get(`/v2/reportlogs?key=${searchQuery}page=${page}`);

    return res?.data || res;
  }

   /****************************
   *
   * find report
   *
   ****************************/

    static async findReportLog(id) {
      const res = await baseAxios.get(`/v2/reportlogs/${id}`);
      return res?.data || res;
    }
  }
    /****************************
   *
   * find report
   *
   ****************************/
 
     