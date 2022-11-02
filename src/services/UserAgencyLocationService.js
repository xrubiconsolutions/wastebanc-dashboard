import baseAxios from "../core/api/axios/baseAxios";

export default class UserAgencyLocationService {
  /****************************
   *
   * get user-agencyLocation services
   *
   ****************************/

  static async getUserAgencyLocation() {
    const res = await baseAxios.get(`/user/agencies/location-scope`);
    return res?.data || res;
  }
  /****************************
   *
   * update services
   *
   ****************************/
  static async updateUserAgencyLocation(location) {
    const res = await baseAxios.put(
      `/user/agencies/location-scope?scope=${location}`
    );

    return res?.data || res;
  }
}
