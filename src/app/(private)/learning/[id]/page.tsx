"use client";
import CoursesService from "@/services/courses/CoursesService";
import { useQuery } from "@tanstack/react-query";
import { Layout, Skeleton } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ContentLearningDetail from "./components/content-learning-detail/ContentLearningDetail";
import FooterLearningDetail from "./components/footer-learning-detail/FooterLearningDetail";
import HeaderLearningDetail from "./components/header-learning-detail/HeaderLearningDetail";
import SiderLearningDetail from "./components/sider-learning-detail/SiderLearningDetail";

export default function CourseWatchPage() {
  const { id } = useParams<{ id: string }>();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["COURSE_LEARNING_DETAIL", id],
    queryFn: async () => {
      const response = await CoursesService.getCourseLearningDetail(id);
      return response?.data;
    },
    enabled: !!id, // chỉ chạy khi có id
  });

  // Reset lesson index khi data load xong
  useEffect(() => {
    setCurrentChapter(0);
    setCurrentLesson(0);
  }, [data]);
  const handleNext = () => {
    if (!data) return;
    if (currentLesson < data.chapters[currentChapter].lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentChapter < data.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(0);
    }
  };

  const handlePrev = () => {
    if (!data) return;
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentLesson(data.chapters[currentChapter - 1].lessons.length - 1);
    }
  };

  if (isLoading) {
    return <Skeleton active className="p-6" />;
  }

  if (!data) {
    return <div className="p-6 text-red-500">Không tìm thấy dữ liệu khoá học.</div>;
  }

  const currentLessonData = data?.chapters[currentChapter]?.lessons[currentLesson];
  return (
    <Layout>
      {/* Fixed Header */}
      <HeaderLearningDetail courseData={data} />

      <Layout style={{ marginTop: 64 }}>
        {/* Sidebar fixed right */}
        <SiderLearningDetail
          progress={data.progress}
          chapters={data.chapters}
          currentChapter={currentChapter}
          currentLesson={currentLesson}
          onSelectLesson={(cIdx, lIdx) => {
            setCurrentChapter(cIdx);
            setCurrentLesson(lIdx);
          }}
        />

        {/* Main Content */}
        <ContentLearningDetail
          quiz={currentLessonData?.quiz}
          document={currentLessonData?.document}
          lessonTitle={currentLessonData?.title}
          lessonDuration={currentLessonData?.desc}
          videoUrl={currentLessonData?.videoUrl} // Giả lập, sau có thể dùng data.videoUrl
        />
      </Layout>

      {/* Fixed Footer */}
      <FooterLearningDetail
        onPrev={handlePrev}
        onNext={handleNext}
        isPrevDisabled={currentChapter === 0 && currentLesson === 0}
      />
    </Layout>
  );
}
