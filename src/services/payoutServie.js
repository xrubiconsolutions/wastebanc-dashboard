import baseAxios from "../core/api/axios/baseAxios";

export default class PayoutService {
  /****************************
   *
   * payout services
   *
   ****************************/

  static async payoutPending(currentMonth, id, page, status) {
    const res = await baseAxios.get(
      `/user/payout_requests/${id}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}&status=${status}`
    );
    return res?.data || res;
  }

  static async AllPayoutSearch(id, key, page, status) {
    const res = await baseAxios.get(
      `/user/payout_requests/${id}?key=${key}&page=${page}&status=${status}`
    );
    return res?.data || res;
  }

  static async payoutCharity(currentMonth, id, page) {
    const res = await baseAxios.get(
      `/user/charity/payout_requests/${id}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async payoutSearchCharity(id, key, page) {
    const res = await baseAxios.get(
      `/user/charity/payout_requests/${id}?key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  static async insurancePurchases(currentMonth) {
    const res = await baseAxios.get(
      `/user/insurance?start=${currentMonth.start}&end=${currentMonth.end}`
    );
    return res?.data || res;
  }

  static async insuranceSearchPurchases(key, page) {
    const res = await baseAxios.get(`/user/insurance?key=${key}&page=${page}`);
    return res?.data || res;
  }
}
