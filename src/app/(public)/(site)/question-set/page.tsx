"use client";
import LoadingOverLay from "@/components/loading-overlay";
import CategoriesService from "@/services/categories/CategoriesService";
import { useQuery } from "@tanstack/react-query";
import QuestionSetList from "./components/QuestionSetList";

export default function QuestionSetPage() {
  const { data, isFetching } = useQuery({
    queryKey: ["categoriesWithQuestionSets"],
    queryFn: async () => {
      const response = await CategoriesService.getCategoriesWithQuestionSet();
      return response?.data;
    },
  });
  console.log("data", data);
  return isFetching ? (
    <LoadingOverLay />
  ) : (
    <div>
      <h1 className="text-center mt-5 text-color-500">Ôn luyên đề thi</h1>
      <div className="container mx-auto p-4">
        {data?.map((item: any) => {
          return <QuestionSetList key={item?.id} title={item?.name} questionSets={item?.QuestionSets} />;
        })}
      </div>
    </div>
  );
}
