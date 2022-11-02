import baseAxios from "../core/api/axios/baseAxios";

export default class PaymentService {
  /****************************
   *
   * search services
   *
   ****************************/
  static async searchDirectPayment(searchQuery, page) {
    const res = await baseAxios.get(
      `/v2/payment/history?key=${searchQuery}&paid=true&page=${page}`
    );
    return res?.data || res;
  }
  static async searchCompanyDirectPayment(searchQuery, page) {
    const res = await baseAxios.get(
      `/v2/company-payment/history?key=${searchQuery}&paid=true&page=${page}`
    );

    return res?.data || res;
  }
  static async searchCharityPayment(searchQuery) {
    const res = await baseAxios.get(`/v2/charity/history?key=${searchQuery}`);

    return res?.data || res;
  }
  static async searchCompanyCharityPayment(searchQuery, page) {
    const res = await baseAxios.get(
      `/v2/company-charity/history?key=${searchQuery}&page=${page}`
    );

    return res?.data || res;
  }
  static async searchOutstandingPayment(searchQuery, page) {
    const res = await baseAxios.get(
      `/v2/payment/history?key=${searchQuery}&paid=false&page=${page}`
    );

    return res?.data || res;
  }
  static async searchCompanyOutstandingPayment(searchQuery) {
    const res = await baseAxios.get(
      `/v2/company-payment/history?key=${searchQuery}&paid=false`
    );

    return res?.data || res;
  }
  /****************************
   *
   * filter services
   *
   ****************************/
  static async filterDirectPayment(date) {
    const res = await baseAxios.get(
      `/v2/payment/history?start=${date.start}&end=${date.end}&paid=true`
    );
    return res?.data || res;
  }
  static async filterCharityPayment(date) {
    const res = await baseAxios.get(
      `/v2/charity/history?start=${date.start}&end=${date.end}`
    );
    return res?.data || res;
  }
  static async filterOutstandingPayment(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/payment/history?start=${currentMonth.start}&end=${currentMonth.end}&paid=false&page=${page}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * direct-payout services
   *
   ****************************/
  static async DirectPayment(date) {
    const res = await baseAxios.get(
      `/v2/payment/history?start=${date.start}&end=${date.end}&paid=true`
    );
    return res?.data || res;
  }
  static async CollectorDirectPayment(date) {
    const res = await baseAxios.get(
      `/v2/company-payment/history?start=${date.start}&end=${date.end}&paid=true`
    );
    return res?.data || res;
  }
  /****************************
   *
   * charity services
   *
   ****************************/
  static async CharityPayment(date) {
    const res = await baseAxios.get(
      `/v2/charity/history?start=${date.start}&end=${date.end}`
    );
    return res?.data || res;
  }
  static async CollectorCharityPayment(date) {
    const res = await baseAxios.get(
      `/v2/company-charity/history?start=${date.start}&end=${date.end}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * outstanding services
   *
   ****************************/
  static async OutstandingPayment(page, data) {
    const res = await baseAxios.get(
      `/v2/payment/history?start=${data.start}&end=${data.end}&paid=false&page=${page}`
    );
    return res?.data || res;
  }
  static async CollectorOutstandingPayment(date) {
    const res = await baseAxios.get(
      `/v2/company-payment/history?start=${date.start}&end=${date.end}&paid=false`
    );
    return res?.data || res;
  }
}
