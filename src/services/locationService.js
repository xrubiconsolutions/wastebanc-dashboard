import baseAxios from "../core/api/axios/baseAxios";

class LocationService {
  //=======================================
  //===Get all Location ====
  //=======================================
  static async getLocations() {
    const res = await baseAxios.get("/locations");
    return res?.data || res;
  }

  //=======================================
  //===Create new Location ====
  //=======================================
  static async createLocation(data) {
    const res = await baseAxios.post("/location/create", data);
    return res?.data || res;
  }

  //=======================================
  //===Modify Location ====
  //=======================================
  static async modifyLocation(id, data) {
    const res = await baseAxios.put(`/location/${id}`, data);
    return res?.data || res;
  }

  //=======================================
  //===Delete Location ====
  //=======================================
  static async deleteLocation(id) {
    const res = await baseAxios.delete(`/location/${id}`);
    return res?.data || res;
  }

  //=======================================
  //===Get World Locations ====
  //=======================================
  static async getWorldLocations() {
    const res = await baseAxios.get("/world/locations");
    return res?.data || res;
  }
}

export default LocationService;
