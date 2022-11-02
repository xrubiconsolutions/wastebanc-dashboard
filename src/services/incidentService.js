import baseAxios from "../core/api/axios/baseAxios";
import AppService from "./appService";

class IncidentService {
  //=======================================
  //=====Create incident data methods======
  //=======================================
  static async create(data) {
    // upload the base64 format screenshots to cloudinary
    const { mediaUrls: screenshots } = data;
    const multipleUploads = screenshots.map((ss) => AppService.uploadFile(ss));
    const results = await Promise.all(multipleUploads);

    // include the returned img urls to request body
    // and move on to create incident
    data.mediaUrls = results.map((e) => e.secure_url);
    const res = await baseAxios.post("api/incident/create", data);
    return res?.data || res;
  }

  //========================================
  //=======Get incidents data methods=======
  //========================================
  static async getAll() {
    const res = await baseAxios.get("api/incident/get/all");
    return res?.data || res;
  }

  static async getPending() {
    const res = await baseAxios.get("api/incident/get/pending");
    return res?.data || res;
  }
  static async getAssigned() {
    const res = await baseAxios.get("api/incident/get/assigned");
    return res?.data || res;
  }

  static async getCompleted() {
    const res = await baseAxios.get("api/incident/get/completed");
    return res?.data || res;
  }

  static async getLiveReports() {
    const res = await baseAxios.get("/api/all/report");
    return res?.data || res;
  }

  //========================================
  //=====Delete incidents data methods======
  //========================================
  static async deleteIncidents(data) {
    // axios delete method doesn't support the body data as second argument
    // so data is set using config.data which is the second arg below
    const res = await baseAxios.delete("/api/incidents", { data });
    return res?.data || res;
  }

  //========================================
  //=====Update incidents data methods======
  //========================================
}

export default IncidentService;
