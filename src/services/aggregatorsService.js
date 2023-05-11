import baseAxios from "../core/api/axios/baseAxios";

export default class AggregatorService {
  /****************************
   *
   * getter service
   *
   ****************************/

  // for admin
  static async collectorFilter(page, currentMonth, enabled) {
    if (enabled === true) {
      const res = await baseAxios.get(
        `/v2/collectors?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}&enabled=true`
      );
      return res?.data || res;
    } else if (enabled === false) {
      const res = await baseAxios.get(
        `/v2/collectors?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}&enabled=false`
      );
      return res?.data || res;
    } else {
      const res = await baseAxios.get(
        `/v2/collectors?start=${currentMonth.start}&end=${currentMonth.end}&page=${page}`
      );
      return res?.data || res;
    }
  }

  /****************************
   *
   * search services
   *   ****************************/
  // for admin
  static async collectorSearch(page, key, enabled) {
    if (enabled === true) {
      const res = await baseAxios.get(
        `/v2/collectors?page=${page}&key=${key}&enabled=true`
      );
      return res?.data || res;
    } else if (enabled === false) {
      const res = await baseAxios.get(
        `/v2/collectors?page=${page}&key=${key}&enabled=false`
      );
      return res?.data || res;
    } else {
      const res = await baseAxios.get(`/v2/collectors?page=${page}&key=${key}`);
      return res?.data || res;
    }
  }

  // for company
  static async companyCollector(data) {
    const url = !data?.key
      ? `/v2/company-collectors?companyVerified=true&start=${data.start}&end=${
          data.end
        }&page=${data.page || 1}`
      : `/v2/company-collectors?companyVerified=true&key=${data.key}&page=${
          data.page || 1
        }`;
    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  // search for collector
  static async companyCollectorSearch(page, key) {
    const res = await baseAxios.get(
      `/v2/company-collectors?companyVerified=true&page=${page}&key=${key}`
    );
    return res?.data || res;
  }

  static async companyCollectorStats(data) {
    const res = await baseAxios.get(
      `/v2/company-collectors/stats?start=${data.start}&end=${data.end}&page=${
        data.page || 1
      }`
    );
    return res?.data || res;
  }

  static async companyPending(data) {
    let url;
    // data?.start && data?.end
    //   ? `/v2/company-collectors?verified=false&start=${data.start}&end=${
    //       data.end
    //     }&page=${data.page || 1}`
    //   : `/v2/company-collectors?verified=false&page=${data.page || 1}`;
    if (data.key) {
      url = `/v2/company-collectors?companyVerified=false&key=${
        data.key
      }&page=${data.page || 1}`;
    } else if (data?.start && data?.end)
      url = `/v2/company-collectors?companyVerified=false&start=${
        data.start
      }&end=${data.end}&page=${data.page || 1}`;
    else
      url = `/v2/company-collectors?companyVerified=false&page=${
        data.page || 1
      }`;
    const res = await baseAxios.get(url);
    return res?.data || res;
  }

  /****************************
   *
   * currentMonthmap&card services
   *
   ****************************/
  static async collectorMap(data) {
    const res = await baseAxios.get(
      `/v2/collectors/map/data?start=${data.start}&end=${data.end}`
    );
    return res?.data || res;
  }

  /****************************
   *
   * Disable Aggregators
   *
   ****************************/
  static async toggleStatusAggregator(id, status) {
    const res = await baseAxios.put(`/v2/collector/${status}/${id}`);
    return res?.data || res;
  }

  /****************************
   *
   * Delete Aggregators
   *
   ****************************/
  static async deleteAggregator(id) {
    // console.log(id, "id");
    const res = await baseAxios.delete(`/collector/remove/${id}`);
    return res?.data || res;
  }

  /****************************
   *
   * update services
   *
   ****************************/
  static async approveCompanyCollector(data) {
    const res = await baseAxios.put("/v2/company-collectors/approve", data);
    return res?.data || res;
  }

  static async declineCompanyCollector(data) {
    const res = await baseAxios.put("/v2/company-collectors/decline", data);
    return res?.data || res;
  }
}
