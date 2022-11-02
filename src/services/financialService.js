import baseAxios from "../core/api/axios/baseAxios";

class FinancialService {
  static async getFinancialSummary() {
    const res = await baseAxios.get(`/invoice/summary`);
    return res.data || res;
  }

  static async getOutstandingFinancials(data) {
    const { start, end, key, page = 1 } = data;
    const url = !key
      ? `/invoice/outstanding/payment?start=${start}&end=${end}&page=${page}`
      : `/invoice/outstanding/payment?key=${key}&page=${page}`;
    const res = await baseAxios.get(url);
    // const res = await baseAxios.get(`/invoice/outstanding/payment`);
    return res.data || res;
  }

  static async getCompletedFinancials(data) {
    const { start, end, key, page = 1 } = data;
    const url = !key
      ? `/invoice/completed/payment?start=${start}&end=${end}&page=${page}`
      : `/invoice/completed/payment?key=${key}&page=${page}`;
    const res = await baseAxios.get(url);
    // const res = await baseAxios.get(`/invoice/completed/payment`);
    return res.data || res;
  }

  static async completePayment(invoiceNumber) {
    const res = await baseAxios.get(`/invoice/${invoiceNumber}/markAsPaid`);
    return res.data || res;
  }

  static async getInvoice(invoiceNumber) {
    const res = await baseAxios.get(`/invoice/${invoiceNumber}`);
    return res.data || res;
  }
  static async downloadInvoice(invoiceNumber) {
    const res = await baseAxios.get(`/generate/invoicepdf/${invoiceNumber}`);
    return res.data || res;
  }
}

export default FinancialService;
