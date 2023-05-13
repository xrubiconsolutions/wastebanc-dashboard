import baseAxios from "../core/api/axios/baseAxios";

class EvacuationService {
  static async evacuationRequests(status, page) {
    const res = await baseAxios.get(
      `/company/evacuation/all?status=${status}&page=${page}`
    );
    return res.data || res;
  }

  static async companySearchEvacuationRequests(status, key, page) {
    const res = await baseAxios.get(
      `/company/evacuation/all?status=${status}&key=${key}&page=${page}`
    );
    return res.data || res;
  }

  static async companyFilterEvacuationRequests(status, currentMonth, page) {
    const res = await baseAxios.get(
      `/company/evacuation/all?status=${status}&start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async approveRequests(id) {
    const res = await baseAxios.get(
      `/company/apievacuation/status/approve/64551af4e6b4df6121ea0614`
    );
    return res?.data || res;
  }
}

export default EvacuationService;
