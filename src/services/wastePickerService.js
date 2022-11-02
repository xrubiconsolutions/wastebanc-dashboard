import baseAxios from "../core/api/axios/baseAxios";

export default class WastePickerService {
  static async getPickers(data) {
    const { start, end, isAssigned, page = 1, key } = data;
    let url;
    if (typeof isAssigned === "boolean") {
      url =
        start && end
          ? `/v2/collectors?collectorType=waste-picker&assigned=${isAssigned}&start=${start}&end=${end}&page=${page}`
          : `/v2/collectors?collectorType=waste-picker&assigned=${isAssigned}&page=${page}`;
    } else {
      url =
        start && end
          ? `v2/collectors/map/data?collectorType=waste-picker&start=${start}&end=${end}`
          : `v2/collectors/map/data?collectorType=waste-picker`;
    }
    if (key) {
      url += `&key=${key}`;
    }

    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  static async getPickersWithData(data) {
    const { start, end, key, isAssigned, page = 1 } = data;
    const url = !key
      ? `/v2/collectors?collectorType=waste-picker&assigned=${isAssigned}&start=${start}&end=${end}&page=${page}`
      : `/v2/collectors?collectorType=waste-picker&assigned=${isAssigned}&key=${key}&page=${page}`;
    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  static async createPicker(data) {
    const res = await baseAxios.post("/wastepicker/register", data);
    return res?.data || res;
  }

  static async getBanks() {
    const res = await baseAxios.get(`/all/banks`);
    return res?.data || res;
  }

  static async validateAccount(data) {
    // const sterling_sort_code = "232";
    const res = await baseAxios.get(
      `/admin/resolve/account?account_number=${data.accountNumber}&bank_code=${data.bank_code}`
    );
    return res?.data || res;
  }

  // company waste picker

  static async collectorPickerMap(data) {
    const res = await baseAxios.get(
      `/v2/collectors/map/data?collectorType=waste-picker&start=${data.start}&end=${data.end}`
    );
  }
  static async assignPicker(payload) {
    const res = await baseAxios.post(`/wastepicker/assign`, payload);
    return res?.data || res;
  }

  static async unassignPicker(payload) {
    const res = await baseAxios.post(`/wastepicker/unassign`, payload);
    return res?.data || res;
  }

  static async companyWastePickerStats(data) {
    const res = await baseAxios.get(
      `/v2/company-collectors/stats?collectorType=waste-picker&start=${
        data.start
      }&end=${data.end}&page=${data.page || 1}`
    );
    return res?.data || res;
  }

  static async companyPickerApproved(data) {
    const url = !data?.key
      ? `/v2/company-collectors?companyVerified=true&collectorType=waste-picker&start=${
          data.start
        }&end=${data.end}&page=${data.page || 1}`
      : `/v2/company-collectors?companyVerified=true&collectorType=waste-picker&key=${
          data.key
        }&page=${data.page || 1}`;
    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  static async companyPickerPending(data) {
    let url;
    if (data.key) {
      url = `/v2/company-collectors?companyVerified=false&collectorType=waste-picker&key=${
        data.key
      }&page=${data.page || 1}`;
    } else if (data?.start && data?.end)
      url = `/v2/company-collectors?companyVerified=false&collectorType=waste-picker&start=${
        data.start
      }&end=${data.end}&page=${data.page || 1}`;
    else
      url = `/v2/company-collectors?companyVerified=false&collectorType=waste-picker&page=${
        data.page || 1
      }`;
    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  /****************************
   *
   * update services
   *
   ****************************/
  static async enableCompanyPickerCollector(id) {
    const res = await baseAxios.put(`/v2/company-collectors/enable/${id}`);
    return res?.data || res;
  }
  static async disableCompanyPickerCollector(id) {
    const res = await baseAxios.put(`/v2/company-collectors/disable/${id}`);
    return res?.data || res;
  }
}
