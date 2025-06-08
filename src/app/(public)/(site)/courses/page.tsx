"use client";
import LoadingOverLay from "@/components/loading-overlay";
import CategoriesService from "@/services/categories/CategoriesService";
import UsersCoursesService from "@/services/user-course/UserCoursesService";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
const ACCESS_TOKEN = "aa29f44dfaf7bcca15d1dceddec343c66bc38924efe1cab7ebc9be6752f60192";

export default function CoursesPage() {
  const [user, setUser] = useState<any>(null);
  const { data, isFetching } = useQuery({
    queryKey: ["categoriesWithCourses"],
    queryFn: async () => {
      const response = await CategoriesService.getCategoriesWithCourses();
      return response?.data?.data;
    },
  });
  // Gọi API lấy khóa học đã đăng ký của user
  const { data: myCoursesData, isFetching: isFetchingMyCourses } = useQuery({
    queryKey: ["myCourses", user?.id],
    queryFn: async () => {
      const response = await UsersCoursesService.getMyUserCoursers(user?.id);
      return response?.data?.data; // giả sử trả về mảng courses user đã đăng ký
    },
    enabled: !!user?.id,
  });
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      const payload: any = jwt.decode(token, ACCESS_TOKEN as any);
      setUser({
        id: payload?.id,
        avatar: payload?.avatar,
        email: payload?.email,
        fullname: payload?.fullname,
      });
    }
  }, []);
  return isFetching || isFetchingMyCourses ? (
    <LoadingOverLay />
  ) : (
    <div className="container mx-auto p-4">
      {data?.map((item: any) => {
        return <CourseList key={item?.id} title={item?.name} courses={item?.Courses} myCourses={myCoursesData} />;
      })}
    </div>
  );
}
