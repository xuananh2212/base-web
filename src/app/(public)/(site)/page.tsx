"use client";
import { Button, Card, Col, Row } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { Award, BarChart2, Book, CheckCircle, Layers, Users } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const features = [
    { title: "Khoá học bám sát SGK", icon: <Book size={48} /> },
    { title: "Bộ đề phong phú", icon: <Layers size={48} /> },
    { title: "Phân tích kết quả", icon: <BarChart2 size={48} /> },
    { title: "Học nhóm cùng bạn bè", icon: <Users size={48} /> },
    { title: "Theo dõi tiến độ học tập", icon: <CheckCircle size={48} /> },
    { title: "Chứng chỉ hoàn thành", icon: <Award size={48} /> },
  ];
  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-gradient-to-r from-color-400 to-color-500 text-white text-center py-20 relative overflow-hidden"
        data-aos="fade-down"
      >
        <h1 className="relative text-4xl font-bold mb-4 z-10">Nền tảng học tập và luyện đề dành cho học sinh cấp 3</h1>
        <p className="relative mb-6 z-10">Ôn luyện hiệu quả, tự tin chinh phục kỳ thi THPT Quốc gia</p>
        <Button type="primary" size="large" className="relative z-10  bg-color-900">
          Bắt đầu học ngay
        </Button>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto py-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center mb-10">Tính năng nổi bật</h2>
        <Row gutter={[16, 16]}>
          {features.map((feature, idx) => (
            <Col xs={24} md={8} key={idx} data-aos="zoom-in">
              <Card hoverable>
                <div className="flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                  <p className="text-center mt-2 text-gray-600">
                    Nắm chắc kiến thức, rèn luyện kỹ năng, nâng cao tự tin.
                  </p>
                </div>
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
            { name: "Toán 12", desc: "Ôn tập kiến thức, luyện đề, bí kíp giải nhanh", img: "/images/image_1.jpg" },
            { name: "Ngữ Văn 12", desc: "Phân tích tác phẩm, luyện viết nghị luận xã hội", img: "/images/image_3.jpg" },
            { name: "Tiếng Anh 12", desc: "Luyện nghe, đọc hiểu, củng cố ngữ pháp", img: "/images/image_4.jpg" },
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
            { title: "Đề thi Toán", questions: 50, img: "/images/image_5.jpeg" },
            { title: "Đề thi Văn", questions: 40, img: "/images/images.jpeg" },
            { title: "Đề thi Anh", questions: 45, img: "/images/ta.jpg" },
          ].map((quiz, idx) => (
            <Col xs={24} md={8} key={idx} data-aos="zoom-in-down">
              <Card hoverable cover={<Image src={quiz.img} alt={quiz.title} width={400} height={250} />}>
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
