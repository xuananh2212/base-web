"use client";
import LoadingOverLay from "@/components/loading-overlay";
import CategoriesService from "@/services/categories/CategoriesService";
import { useQuery } from "@tanstack/react-query";
import CourseList from "./components/CourseList";

export default function CoursesPage() {
  const { data, isFetching } = useQuery({
    queryKey: ["categoriesWithCourses"],
    queryFn: async () => {
      const response = await CategoriesService.getCategoriesWithCourses();
      return response?.data?.data;
    },
  });
  return isFetching ? (
    <LoadingOverLay />
  ) : (
    <div className="container mx-auto p-4">
      {data?.map((item: any) => {
        return <CourseList key={item?.id} title={item?.name} courses={item?.Courses} />;
      })}
    </div>
  );
}
