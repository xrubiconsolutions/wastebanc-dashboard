import baseAxios from "../core/api/axios/baseAxios";

export default class WasteCollectionService {
  /****************************
   *
   * collector services
   *
   ****************************/
  static async getCollector(date) {
    const res = await baseAxios.get(
      `/v2/waste/collection?start=${date.start}&end=${date.end}`
    );

    return res?.data || res;
  }

  /****************************
   *
   * search services
   *
   ****************************/
  static async searchCollector(searchQuery,page) {
    const res = await baseAxios.get(`/v2/waste/collection?key=${searchQuery}&page=${page}`);

    return res?.data || res;
  }

  static async filterCollector(page, date) {
    const res = await baseAxios.get(
      `/v2/waste/collection?start=${date.start}&end=${date.end}&page=${page}`
    );

    return res?.data || res;
  }
}
