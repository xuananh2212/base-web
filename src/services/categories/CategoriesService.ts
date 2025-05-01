import { axiosInstance } from "@/configs/axios.config";
import { endPointApi } from "@/helpers/endPointApi";
const { CATEGORIES } = endPointApi;
export class CategoriesService {
  static getCategoriesWithCourses() {
    return axiosInstance.get(`/${CATEGORIES}/categories-with-courses`);
  }
}

export default CategoriesService;
