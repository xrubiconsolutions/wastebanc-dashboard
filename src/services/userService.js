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
}
