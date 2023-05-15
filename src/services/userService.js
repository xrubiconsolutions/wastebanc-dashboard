import baseAxios from "../core/api/axios/baseAxios";

export default class UserService {
  /****************************
   *
   * total-user services
   *
   ****************************/
  static async totalUser() {
    const res = await baseAxios.get(`/user/total`);

    return res?.data || res;
  }
  /****************************
   *
   * currentMonth services
   *
   ****************************/
  static async currentMonthUser(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/clients?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );

    return res?.data || res;
  }
  /****************************
   *
   * search services
   *
   ****************************/
  static async searchUser(page, key) {
    const res = await baseAxios.get(`/v2/clients?key=${key}&page=${page}`);
    // const res = await baseAxios.get(`/v2/clients?key=${searchKey}&page=${page}`);

    return res?.data || res;
  }

  /****************************
   *
   * filter services
   *
   ****************************/
  static async filterUser(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/clients?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  //=======================================
  //===Get all Total User Info ====
  //=======================================
  static async getTotalUserInfo() {
    const res = await baseAxios.get(`/user/total/get`);
    return res?.data || res;
  }

  static async getTottalUssdUSers(currentMonth, page) {
    const res = await baseAxios.get(
      `/v2/clients?start=${currentMonth.start}&end=${currentMonth.end}&channel=ussd&page=${page}`
    );
    return res?.data || res;
  }

  static async searchUssdUsers(key, page) {
    const res = await baseAxios.get(
      `/v2/clients?key=${key}&channel=ussd&page=${page}`
    );
    return res?.data || res;
  }

  static async filterUssdUser(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/clients?start=${currentMonth.start}&end=${currentMonth.end}&channel=ussd&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * getting and filter users schedule services
   *
   ****************************/

  static async userPendingSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=pending&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userAcceptedSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=accepted&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userCancelledSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=cancelled&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userMissedSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=missed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userCompletedSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async totalUsersCompletedPickupSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async totalUsersCompletedDropoffSchedule(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/dropoffs?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userDropoffRequest(page, currentMonth, id) {
    const res = await baseAxios.get(
      `/v2/household/dropoffs?start=${currentMonth.start}&end=${currentMonth.end}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * search schedule services
   *
   ****************************/
  static async userSearchPendingSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?key=${key}&completionStatus=pending&page=${page}&userId=${id}`
    );

    return res?.data || res;
  }

  static async userSearchAcceptedSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?key=${key}&completionStatus=accepted&page=${page}&userId=${id}`
    );

    return res?.data || res;
  }

  static async userSearchCompletedSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?key=${key}&completionStatus=completed&page=${page}&userId=${id}`
    );

    return res?.data || res;
  }

  static async userSearchCancelledSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?key=${key}&completionStatus=cancelled&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userSearchMissedSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?key=${key}&completionStatus=missed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async totalUserPickupSearchSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/schedules?key=${key}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async totalUserDropoffSearchSchedule(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/dropoffs?key=${key}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }

  static async userSearchDropoffRequest(key, page, id) {
    const res = await baseAxios.get(
      `/v2/household/dropoffs?key=${key}&completionStatus=completed&page=${page}&userId=${id}`
    );
    return res?.data || res;
  }
  /****************************
   *
   * user's details by id
   *
   ****************************/
  static async userDetails(id) {
    const res = await baseAxios.get(`/user/details/${id}`);
    return res?.data || res;
  }

  static async insuranceUserDetails(id) {
    const res = await baseAxios.get(`/user/insurance_purchase/details/${id}`);
    return res?.data || res;
  }

  // /user/insurance_purchase/details/63c43583db1b6b01e8ceacc8
  /****************************
   *
   * Insurance users
   *
   ****************************/

  static async insuranceUsers(page, currentMonth) {
    const res = await baseAxios.get(
      `/user/insurance?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async userRenewalHistory(userId, currentMonth, page) {
    const res = await baseAxios.get(
      `/user/insurance_purchase/${userId}?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );

    return res?.data || res;
  }

  static async serachInsuranceUsers(key, page) {
    const res = await baseAxios.get(`/user/insurance?key=${key}&page=${page}`);
    return res?.data || res;
  }

  static async userSearchRenewalHistory(userId, key, page) {
    const res = await baseAxios.get(
      `/user/insurance_purchase/${userId}?key=${key}&page=${page}`
    );

    return res?.data || res;
  }
}
