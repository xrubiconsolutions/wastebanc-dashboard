import baseAxios from "../core/api/axios/baseAxios";

export default class GeoFenceService {
  /****************************
   *
   * get geofence Map
   *
   ****************************/

  static async getGeoFence() {
    const res = await baseAxios.get(`/v2/collectors/geofence`);
    return res?.data || res;
  }
  static async getPendingGeoFence() {
    const res = await baseAxios.get(`/v2/collectors/geofence`);
    return res?.data || res;
  }

  static async createDropOffLocation(data) {
    const res = await baseAxios.post(`/v2/company/dropoffs/location`, data);
    return res?.data || res;
  }
  static async mapDropOffLocation(id) {
    const res = await baseAxios.get(`/organisation/drop?organisationId=${id}`);
    return res?.data || res;
  }
}
