import baseAxios from "../core/api/axios/baseAxios";

export default class BillingService {
  static async AccountPaymentDetails() {
    const res = await baseAxios.get(`/organisation/account/details`);
    return res?.data || res;
  }
  static async EstimatedCost() {
    const res = await baseAxios.get(`/v2/organisation/estimated/cost`);
    return res?.data || res;
  }
  static async OngoingBiling() {
    const res = await baseAxios.get(`/organisation/outstandingbilling`);
    return res?.data || res;
  }

  static async BilingHistory(currentMonth) {
    const res = await baseAxios.get(
      `/invoice/company/history?start=${currentMonth.start}&end=${currentMonth.end}`
    );
    return res?.data || res;
  }

  static async SearchBilingHistory(key, page) {
    const res = await baseAxios.get(
      `/invoice/company/history?key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  static async FilterBillingHistory(currentMonth, page) {
    const res = await baseAxios.get(
      `/invoice/company/history?page=${page}&start=${currentMonth.start}&end=${currentMonth.end}`
    );
    return res?.data || res;
  }
}
