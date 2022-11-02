import baseAxios from "../core/api/axios/baseAxios";

export default class DropoffLocationsService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getDropoffLocations(page, data) {
    const res = await baseAxios.get(
      `/v2/organisation/dropoff/locations?start=${data.start}&end=${data.end}&page=${page}`
    );
    return res?.data || res;
  }

  static async filterDropoffLocations(page, currentMonth) {
    const res = await baseAxios.get(
      `/v2/organisation/dropoff/locations?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * search dropoff locations
   *
   ****************************/

  static async searchDropoffLocations(page, key) {
    const res = await baseAxios.get(
      `/v2/organisation/dropoff/locations?key=${key}&page=${page}`
    );
    return res?.data || res;
  }
}
