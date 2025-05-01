import { axiosInstance } from "@/configs/axios.config";
import { endPointApi } from "@/helpers/endPointApi";
const { COURSES } = endPointApi;
export class CoursesService {
  static getCourseSlug(slug: string) {
    return axiosInstance.get(`/${COURSES}/view/${slug}`);
  }
}

export default CoursesService;
