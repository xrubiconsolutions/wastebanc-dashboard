import baseAxios from "../core/api/axios/baseAxios";

export default class ScheduleService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getPendingSchedule(date, page = 1) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${date.start}&end=${date.end}&completionStatus=pending`
    );
    return res?.data || res;
  }
  static async getCompanyPendingSchedules() {
    const res = await baseAxios.get(`/v2/collectors/schedules/pending`);

    return res?.data || res;
  }

  static async getAcceptedSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${data.start}&end=${data.end}&completionStatus=accepted&page=${page}`
    );
    return res?.data || res;
  }

  static async getCompanyAcceptedSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${data.start}&end=${data.end}&completionStatus=accepted&page=${page}`
    );
    return res?.data || res;
  }

  static async getCompletedSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${data.start}&end=${data.end}&completionStatus=completed&page=${page}`
    );
    return res?.data || res;
  }

  static async getCompanyCompletedSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${data.start}&end=${data.end}&completionStatus=completed&page=${page}`
    );
    return res?.data || res;
  }

  static async getCancelledSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${data.start}&end=${data.end}&completionStatus=cancelled&page=${page}`
    );
    return res?.data || res;
  }

  static async getCompanyCancelledSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${data.start}&end=${data.end}&completionStatus=cancelled&page=${page}`
    );
    return res?.data || res;
  }

  static async getMissedSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${data.start}&end=${data.end}&completionStatus=missed&page=${page}`
    );
    return res?.data || res;
  }

  static async getCompanyMissedSchedule(page, data) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${data.start}&end=${data.end}&completionStatus=missed&page=${page}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * search services
   *
   ****************************/
  static async searchPendingSchedule(searchQuery, page) {
    const res = await baseAxios.get(
      `/v2/schedules?key=${searchQuery}&completionStatus=pending&page=${page}`
    );

    return res?.data || res;
  }

  static async searchAcceptedSchedule(key, page) {
    const res = await baseAxios.get(
      `/v2/schedules?key=${key}&completionStatus=accepted&page=${page}`
    );

    return res?.data || res;
  }

  static async searchCompanyAcceptedSchedule(page, key) {
    const res = await baseAxios.get(
      `/v2/company-schedules?key=${key}&completionStatus=accepted&page=${page}`
    );

    return res?.data || res;
  }
  // static async searchCompletedSchedule(searchQuery, page) {
  //   const res = await baseAxios.get(
  //     `/v2/schedules?key=${searchQuery}&completionStatus=completed&page=${page}`
  //   );

  //   return res?.data || res;
  // }

  static async searchCompletedSchedule(key, page) {
    const res = await baseAxios.get(
      `/v2/schedules?key=${key}&completionStatus=completed&page=${page}`
    );

    return res?.data || res;
  }

  static async searchCompanyCompletedSchedule(page, key) {
    const res = await baseAxios.get(
      `/v2/company-schedules?key=${key}&completionStatus=completed&page=${page}`
    );

    return res?.data || res;
  }

  // static async searchCancelledSchedule(searchQuery, page) {
  //   const res = await baseAxios.get(
  //     `/v2/schedules?key=${searchQuery}&completionStatus=cancelled&page=${page}`
  //   );
  //   return res?.data || res;
  // }

  static async searchCancelledSchedule(key, page) {
    const res = await baseAxios.get(
      `/v2/schedules?key=${key}&completionStatus=cancelled&page=${page}`
    );
    return res?.data || res;
  }

  static async searchCompanyCancelledSchedule(page, key) {
    const res = await baseAxios.get(
      `/v2/company-schedules?key=${key}&completionStatus=cancelled&page=${page}`
    );
    return res?.data || res;
  }

  static async searchMissedSchedule(key, page) {
    const res = await baseAxios.get(
      `/v2/schedules?key=${key}&completionStatus=missed&page=${page}`
    );
    return res?.data || res;
  }

  static async searchCompanyMissedSchedule(page, key) {
    const res = await baseAxios.get(
      `/v2/company-schedules?key=${key}&completionStatus=missed&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * filter services
   *
   ****************************/
  static async filterPendingSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=pending=${page}`
    );
    return res?.data || res;
  }

  static async filterCompanyPendingSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=pending&page=${page}`
    );
    return res?.data || res;
  }
  static async filterAcceptedSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=accepted&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCompanyAcceptedSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=accepted&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCompletedSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=completed&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCompanyCompletedSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=completed&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCancelledSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=cancelled&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCompanyCancelledSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=cancelled&page=${page}`
    );
    return res?.data || res;
  }

  static async filterMissedSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=missed&page=${page}`
    );
    return res?.data || res;
  }

  static async filterCompanyMissedSchedule(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/company-schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=missed&page=${page}`
    );
    return res?.data || res;
  }
}
