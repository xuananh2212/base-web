"use client";
import { Button, Card, Col, Row } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-20 relative overflow-hidden"
        data-aos="fade-down"
      >
        <h1 className="relative text-4xl font-bold mb-4 z-10">Nền tảng học tập và luyện đề dành cho học sinh cấp 3</h1>
        <p className="relative mb-6 z-10">Ôn luyện hiệu quả, tự tin chinh phục kỳ thi THPT Quốc gia</p>
        <Button type="primary" size="large" className="relative z-10">
          Bắt đầu học ngay
        </Button>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto py-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center mb-10">Tính năng nổi bật</h2>
        <Row gutter={[16, 16]}>
          {[
            { title: "Khoá học bám sát SGK", img: "/feature1.png" },
            { title: "Bộ đề phong phú", img: "/feature2.png" },
            { title: "Phân tích kết quả", img: "/feature3.png" },
          ].map((feature, idx) => (
            <Col xs={24} md={8} key={idx} data-aos="zoom-in">
              <Card hoverable cover={<Image src={feature.img} alt={feature.title} width={400} height={250} />}>
                <Card.Meta
                  title={feature.title}
                  description="Nắm chắc kiến thức, rèn luyện kỹ năng, nâng cao tự tin."
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Course Section */}
      <div id="courses" className="container mx-auto py-16 bg-gray-50" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center mb-10">Khoá học nổi bật</h2>
        <Row gutter={[16, 16]}>
          {[
            { name: "Toán 12", desc: "Ôn tập kiến thức, luyện đề, bí kíp giải nhanh", img: "/math.png" },
            { name: "Ngữ Văn 12", desc: "Phân tích tác phẩm, luyện viết nghị luận xã hội", img: "/literature.png" },
            { name: "Tiếng Anh 12", desc: "Luyện nghe, đọc hiểu, củng cố ngữ pháp", img: "/english.png" },
          ].map((course, idx) => (
            <Col xs={24} md={8} key={idx} data-aos="zoom-in-up">
              <Card hoverable cover={<Image src={course.img} alt={course.name} width={400} height={250} />}>
                <Card.Meta title={course.name} description={course.desc} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Quiz Section */}
      <div id="quizzes" className="container mx-auto py-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center mb-10">Bộ đề luyện tập</h2>
        <Row gutter={[16, 16]}>
          {[
            { title: "Đề thi Toán", questions: 50, img: "/quiz-math.png" },
            { title: "Đề thi Văn", questions: 40, img: "/quiz-literature.png" },
            { title: "Đề thi Anh", questions: 45, img: "/quiz-english.png" },
          ].map((quiz, idx) => (
            <Col xs={24} md={8} key={idx} data-aos="zoom-in-down">
              <Card
                hoverable
                cover={<Image src={quiz.img} alt={quiz.title} width={400} height={250} />}
                actions={[<Button>Làm ngay</Button>]}
              >
                <Card.Meta title={quiz.title} description={`${quiz.questions} câu hỏi, bám sát đề thi thật`} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto py-16" data-aos="fade-right">
        <h2 className="text-2xl font-bold text-center mb-10">Về E-Learning Cấp 3</h2>
        <p className="max-w-2xl mx-auto text-center">
          Chúng tôi là nền tảng học tập trực tuyến dành riêng cho học sinh cấp 3, cung cấp khoá học chất lượng cao, bộ
          đề luyện thi bám sát thực tế, giúp học sinh nâng cao kiến thức, rèn luyện kỹ năng và đạt kết quả tốt nhất
          trong các kỳ thi.
        </p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="container mx-auto py-16 bg-gray-50" data-aos="fade-left">
        <h2 className="text-2xl font-bold text-center mb-10">Liên hệ với chúng tôi</h2>
        <div className="max-w-xl mx-auto text-center">
          <p>Email: support@elearningcap3.vn</p>
          <p>Hotline: 0123 456 789</p>
          <Button type="primary" className="mt-4">
            Gửi tin nhắn
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white text-center p-6" data-aos="fade-up">
        <p>© 2025 E-Learning Cấp 3. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  );
}
