import baseAxios from "../core/api/axios/baseAxios";

export default class RaffleService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getAllClients(page) {
    const res = await baseAxios.get(`/getAllClients?&page=${page}`);
    return res?.data || res;
  }

  /****************************
   *
   * search services
   *
   ****************************/
  static async searchAllClients(searchQuery) {
    const res = await baseAxios.get(`/getAllClients?key=${searchQuery}`);

    return res?.data || res;
  }

  /****************************
   *
   * post services
   *
   ****************************/
  static async postRaffle(data) {
    const res = await baseAxios.post(`/organisation/raffle`, data);
    return res?.data || res;
  }
}
