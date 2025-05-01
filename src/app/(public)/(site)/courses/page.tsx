"use client";
import LoadingOverLay from "@/components/loading-overlay";
import CategoriesService from "@/services/categories/CategoriesService";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import CourseList from "./components/CourseList";

const { Title, Text } = Typography;

const proCourses = [
  {
    title: "HTML CSS Pro",
    desc: "Cho người mới bắt đầu",
    oldPrice: "2.500.000đ",
    newPrice: "1.299.000đ",
    image: "/images/html-css-pro.jpg",
  },
  {
    title: "JavaScript Pro",
    desc: "Cho người mới bắt đầu",
    oldPrice: "3.299.000đ",
    newPrice: "1.399.000đ",
    image: "/images/js-pro.jpg",
  },
  {
    title: "Ngôn ngữ Sass",
    desc: "Cho Frontend Developer",
    oldPrice: "400.000đ",
    newPrice: "299.000đ",
    image: "/images/sass-pro.jpg",
  },
];

const freeCourses = [
  { title: "Kiến Thức Nhập Môn IT", image: "/images/it-intro.jpg" },
  { title: "Lập trình C++ cơ bản, nâng cao", image: "/images/cpp.jpg" },
  { title: "HTML CSS từ Zero đến Hero", image: "/images/html-css-hero.jpg" },
  { title: "Responsive Với Grid System", image: "/images/grid-system.jpg" },
  { title: "Lập Trình JavaScript Cơ Bản", image: "/images/js-basic.jpg" },
];

export default function CoursesPage() {
  const { data, isFetching } = useQuery({
    queryKey: ["categoriesWithCourses"],
    queryFn: async () => {
      const response = await CategoriesService.getCategoriesWithCourses();
      return response?.data?.data;
    },
  });
  console.log("data", data, isFetching);
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
