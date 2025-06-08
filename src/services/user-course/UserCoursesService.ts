import { axiosInstance } from "@/configs/axios.config";
import { endPointApi } from "@/helpers/endPointApi";
const { USERS_COURSE } = endPointApi;
export class UsersCoursesService {
  static getMyUserCoursers(userId: string) {
    return axiosInstance.get(`/${USERS_COURSE}/get-my-course`, {
      params: { userId },
    });
  }
  static createUserCourse(data: any) {
    return axiosInstance.post(`/${USERS_COURSE}/register-free-course`, data);
  }
}

export default UsersCoursesService;
