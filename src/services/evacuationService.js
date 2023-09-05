import baseAxios from "../core/api/axios/baseAxios";

class EvacuationService {
  static async evacuationRequests(status, page) {
    const res = await baseAxios.get(
      `/company/evacuation/all?status=${status}&page=${page}`
    );
    return res.data || res;
  }

  static async adminEvacuationRequests(status, page) {
    const res = await baseAxios.get(
      `/evacuation/all?status=${status}&page=${page}`
    );
    return res.data || res;
  }

  static async companySearchEvacuationRequests(status, key, page) {
    const res = await baseAxios.get(
      `/company/evacuation/all?status=${status}&key=${key}&page=${page}`
    );
    return res.data || res;
  }

  static async adminSearchEvacuationRequests(status, key, page) {
    const res = await baseAxios.get(
      `/evacuation/all?status=${status}&key=${key}&page=${page}`
    );
    return res.data || res;
  }

  static async companyFilterEvacuationRequests(status, currentMonth, page) {
    const res = await baseAxios.get(
      `/company/evacuation/all?status=${status}&start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async adminFilterEvacuationRequests(status, currentMonth, page) {
    const res = await baseAxios.get(
      `/evacuation/all?status=${status}&start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async requestAction(status, id) {
    const res = await baseAxios.get(
      `/company/evacuation/status/${status}/${id}`
    );
    return res?.data || res;
  }

  static async adminRequestAction(status, id) {
    const res = await baseAxios.get(`/evacuation/status/${status}/${id}`);
    return res?.data || res;
  }
}

export default EvacuationService;
