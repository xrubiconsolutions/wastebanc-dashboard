import baseAxios from "../core/api/axios/baseAxios";

export default class OrganisationService {
  /****************************
   *
   * get organizations profile
   *
   ****************************/

  static async getOrganisationProfile() {
    const res = await baseAxios.get(`/organisation/profile`);
    return res?.data || res;
  }

  /****************************
   *
   * get organizations
   *
   ****************************/

  static async getOrganisations(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/organisations?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async getAllOrganisations({ allowPickers = true }) {
    const res = await baseAxios.get(
      `/v2/organisations?allowPickers=${allowPickers}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * create organizations
   *
   ****************************/

  static async createOrganisation(data) {
    const res = await baseAxios.post("/v2/organisation/create", data);
    return res?.data || res;
  }

  /****************************
   *
   * update organization
   *
   ****************************/

  static async updateOrganisation(id, data) {
    const res = await baseAxios.put(`/v2/organisation/${id}`, data);
    return res?.data || res;
  }

  static async updateOrganisationCompany(data) {
    const res = await baseAxios.put(`/v2/company/update`, data);
    return res?.data || res;
  }
  /****************************
   *
   * find organization
   *
   ****************************/

  static async findOrganisation(id) {
    const res = await baseAxios.get(`/v2/organisation/${id}`);
    return res?.data || res;
  }

  /****************************
   *
   * search organizations
   *
   ****************************/

  static async searchOrganisations(page, key) {
    const res = await baseAxios.get(
      `/v2/organisations?key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * delete organization
   *
   ****************************/

  static async deleteOrganisation(id) {
    const res = await baseAxios.delete(`/v2/organisation/remove/${id}`);
    return res?.data || res;
  }

  /****************************
   *
   * see all aggregators
   *
   ****************************/

  static async getOrganisationAggregators(page, id, currentMonth) {
    const res = await baseAxios.get(
      `/v2/organisation/aggregators/${id}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * search all aggregators
   *
   ****************************/

  static async searchOrganisationAggregators(page, id, key) {
    const res = await baseAxios.get(
      `/v2/organisation/aggregators/${id}?page=${page}&key=${key}`
    );
    return res?.data || res;
  }

  static async getOutstandingInvoice(id, currentMonth, page) {
    const res = await baseAxios.get(
      `invoice/${id}/history?start=${currentMonth.start}&end=${currentMonth.end}&paid=false&page=${page}`
    );
    return res?.data || res;
  }

  static async getCompletedInvoice(id, currentMonth, page) {
    const res = await baseAxios.get(
      `invoice/${id}/history?start=${currentMonth.start}&end=${currentMonth.end}&paid=true&page=${page}`
    );
    return res?.data || res;
  }

  static async getGeneratedInvoice(data) {
    const res = await baseAxios.post("invoice/generate", data);
    return res?.data || res;
  }

  static async searchOutstandingInvoice(id, key, page) {
    const res = await baseAxios.get(
      `invoice/${id}/history?paid=false&key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  // static async getCompletedSchedules(currentMonth) {
  //   const res = await baseAxios.get(
  //     `/v2/schedules/625ec5872995f00023516971?start=${currentMonth.start}&end=${currentMonth.end}`
  //   );
  //   return res?.data || res;
  // }

  static async getCompletedSchedules(id, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules/${id}?start=${currentMonth.start}&end=${currentMonth.end}&type=dropoff`
    );
    return res?.data || res;
  }

  static async searchCompletedDropOffSchedules(id, key, page) {
    const res = await baseAxios.get(
      `/v2/schedules/${id}?key=${key}&page=${page}&type=dropoff`
    );
    return res?.data || res;
  }

  static async filterCompletedDropOffSchedules(id, currentMonth, page) {
    const res = await baseAxios.get(
      `/v2/schedules/${id}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}&type=dropoff`
    );
    return res?.data || res;
  }

  static async getCompletedPickupSchedules(id, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules/${id}?start=${currentMonth.start}&end=${currentMonth.end}&type=pickup`
    );
    return res?.data || res;
  }

  static async searchCompletedPickupSchedules(id, key, page) {
    const res = await baseAxios.get(
      `/v2/schedules/${id}?key=${key}&page=${page}&type=pickup`
    );
    return res?.data || res;
  }

  // static async filterCompletedPickupSchedules(id, page, currentMonth) {
  //   const res = await baseAxios.get(
  //     `/v2/schedules/${id}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}&type=pickup`
  //   );
  //   return res?.data || res;
  // }

  static async filterCompletedPickupSchedules(id, currentMonth, page) {
    const res = await baseAxios.get(
      `/v2/schedules/${id}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}&type=pickup`
    );
    return res?.data || res;
  }

  // static async searchCompletedPickupSchedules(key, page) {
  //   const res = await baseAxios.get(
  //     `/v2/schedules/625ec5872995f00023516971?key=${key}&page=${page}&type=pickup`
  //   );
  //   return res?.data || res;
  // }

  // /v2/schedules/625ec5872995f00023516971?key=Daniel

  static async searchCompletedInvoice(id, key, page) {
    const res = await baseAxios.get(
      `invoice/${id}/history?paid=true&key=${key}&page=${page}`
    );
    return res?.data || res;
  }

  static async filterOutstandingInvoice(currentMonth, page, id) {
    const res = await baseAxios.get(
      `invoice/${id}/history?start=${currentMonth.start}&end=${currentMonth.end}&paid=false&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCompletedInvoice(currentMonth, page, id) {
    const res = await baseAxios.get(
      `invoice/${id}/history?start=${currentMonth.start}&end=${currentMonth.end}&paid=true&page=${page}`
    );
    return res?.data || res;
  }

  static async downloadInvoice(data) {
    const res = await baseAxios.get(`invoice/send/${data}`);
    return res?.data || res;
  }
}

// send invoice - {{localURL}}invoice/send/530208216
