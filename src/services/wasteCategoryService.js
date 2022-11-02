import baseAxios from "../core/api/axios/baseAxios";

export default class WasteCategoryService {
  /****************************
   *
   * getter services
   *
   ****************************/
  static async getCategory() {
    const res = await baseAxios.get("/category/all");
    return res?.data || res;
  }

  /****************************
   *
   * creator services
   *
   ****************************/
  static async createCategory(data) {
    // console.log(data, "add");
    const res = await baseAxios.post("/category/add", data);
    return res?.data || res;
  }

  /****************************
   *
   * update servicesw2
   *
   ****************************/
  static async updateCategory(catId, data) {
    const res = await baseAxios.put(`/category/${catId}`, data);
    return res?.data || res;
  }

  /****************************
   *
   * delete services
   *
   ****************************/
  static async deleteCategory(categoryId) {
    const res = await baseAxios.delete(`/category/${categoryId}`);
    return res?.data || res;
  }
}
