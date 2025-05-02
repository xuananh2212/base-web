"use client";
import { Collapse, Layout, Typography } from "antd";
import { useState } from "react";
import ContentLearningDetail from "./components/content-learning-detail/ContentLearningDetail";
import FooterLearningDetail from "./components/footer-learning-detail/FooterLearningDetail";
import HeaderLearningDetail from "./components/header-learning-detail/HeaderLearningDetail";
import SiderLearningDetail from "./components/sider-learning-detail/SiderLearningDetail";

const { Header, Content, Sider, Footer } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const courseData = {
  title: "Kiến Thức Nhập Môn IT",
  progress: 91,
  chapters: [
    {
      title: "1. Khái niệm kỹ thuật cần biết",
      lessons: [
        { title: "Mô hình Client - Server là gì?", duration: "11:35", done: true },
        { title: "Domain là gì? Tên miền là gì?", duration: "10:34", done: true },
        { title: "Mua áo F8 / Đăng ký học Offline", duration: "01:00", done: false },
      ],
    },
    {
      title: "2. Môi trường, con người IT",
      lessons: [
        { title: "Ứng tuyển xin việc làm", duration: "12:00", done: false },
        { title: "Hoàn thành khóa học", duration: "01:00", done: false },
      ],
    },
  ],
};

export default function CourseWatchPage() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  const handleNext = () => {
    if (currentLesson < courseData.chapters[currentChapter].lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentChapter < courseData.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(0);
    }
  };

  const handlePrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentLesson(courseData.chapters[currentChapter - 1].lessons.length - 1);
    }
  };

  return (
    <Layout>
      {/* Fixed Header */}
      <HeaderLearningDetail courseData={courseData} />

      <Layout style={{ marginTop: 64 }}>
        {/* Sidebar fixed right */}
        <SiderLearningDetail
          progress={courseData.progress}
          chapters={courseData.chapters}
          currentChapter={currentChapter}
          currentLesson={currentLesson}
          onSelectLesson={(cIdx, lIdx) => {
            setCurrentChapter(cIdx);
            setCurrentLesson(lIdx);
          }}
        />

        {/* Main Content */}
        <ContentLearningDetail
          lessonTitle={courseData.chapters[currentChapter].lessons[currentLesson].title}
          lessonDuration={courseData.chapters[currentChapter].lessons[currentLesson].duration}
          videoUrl="https://via.placeholder.com/800x450"
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
