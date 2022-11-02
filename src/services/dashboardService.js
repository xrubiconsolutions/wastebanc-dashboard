import baseAxios from "../core/api/axios/baseAxios";

export default class DashboardService {
  /****************************
   *
   * currentMonth services
   *
   ****************************/
  static async currentMonthMarix(date) {
    const res = await baseAxios.get(
      `/v2/dashboard/matrix?start=${date.start}&end=${date.end}`
    );

    return res?.data || res;
  }

  static async companyMatrix({ start, end }) {
    let url = `/v2/dashboard/company/matrix?start=${start}&end=${end}`;
    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  /****************************
   *
   * filter services
   *
   ****************************/
  static async filterMatrix(date) {
    const res = await baseAxios.get(
      `/v2/dashboard/matrix?start=${date.start}&end=${date.end}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * recent-pickup services
   *
   ****************************/
  static async RecentPickup(data) {
    const res = await baseAxios.get(
      `/v2/dashboard/recentpickup?start=${data.start}&end=${data.end}&page=${data.page}`
    );
    return res?.data || res;
  }

  static async filterRecentPickup(page, data) {
    const res = await baseAxios.get(
      `/v2/dashboard/recentpickup?start=${data.start}&end=${data.end}&page=${page}`
    );
    return res?.data || res;
  }
  static async recentPickupSearch(key, page) {
    const res = await baseAxios.get(
      `/v2/dashboard/recentpickup?key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  static async getcompanyRecentPickup(data) {
    const res = await baseAxios.get(
      `/v2/company-schedules?completionStatus=completed&start=${data.start}&end=${data.end}&page=${data.page}`
    );
    return res?.data || res;
  }
  static async companyRecentPickup(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/company-schedules?completionStatus=completed&start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async companyPickupSearch(key, page) {
    const res = await baseAxios.get(
      `/v2/company-schedules?completionStatus=completed&key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * new-users services
   *
   ****************************/
  static async NewUsers(data) {
    const res = await baseAxios.get(
      `/v2/dashboard/newusers?start=${data.start}&end=${data.end}&page=${data.page}`
    );
    return res?.data || res;
  }
  static async NewUsersSearch(key, page) {
    const res = await baseAxios.get(
      `/v2/dashboard/newusers?key=${key}&page=${page}`
    );
    return res?.data || res;
  }
  static async filterNewUsers(page, data) {
    const res = await baseAxios.get(
      `/v2/dashboard/newusers?start=${data.start}&end=${data.end}&page=${page}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * new-aggregators services
   *
   ****************************/
  static async NewAggregators(data) {
    const res = await baseAxios.get(
      `/v2/dashboard/newAggregators?start=${data.start}&end=${data.end}&page=${data.page}`
    );
    return res?.data || res;
  }
  static async NewAggregatorsSearch(key, page) {
    const res = await baseAxios.get(
      `/v2/dashboard/newAggregators?key=${key}&page=${page}`
    );
    return res?.data || res;
  }
  static async filterNewAggregators(page, data) {
    const res = await baseAxios.get(
      `/v2/dashboard/newAggregators?start=${data.start}&end=${data.end}&page=${page}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * new-waste pickers services
   *
   ****************************/

  static async NewWastePickers(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/dashboard/newusers?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }
  static async NewWastePickersSearch(key) {
    const res = await baseAxios.get(`/v2/dashboard/newusers?key=${key}`);
    return res?.data || res;
  }
}
