"use client";
import { axiosInstance } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Modal, Progress, Radio, Row, Typography } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const { Title } = Typography;

interface Question {
  id: string;
  question: string;
  explain?: string;
  answers: string[]; // giả lập trên FE
}

interface QuestionSetResponse {
  id: string;
  title: string;
  description: string;
  thumb: string;
  duration: number;
  total_questions: number;
  Questions: Omit<Question, "answers">[];
}

const ExamPage = () => {
  const params = useParams();
  const questionSetId = params?.id as string;

  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0, score: 0 });
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data, isLoading, error } = useQuery<QuestionSetResponse>({
    queryKey: ["questionSet", questionSetId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/question-set/v1/${questionSetId}`);
      return res.data.data;
    },
    enabled: !!questionSetId,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleScrollToQuestion = (index: number) => {
    questionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSubmit = () => {
    Modal.confirm({
      title: "Xác nhận nộp bài",
      content: "Bạn có chắc chắn muốn nộp bài không?",
      onOk: calculateResult,
    });
  };

  const calculateResult = () => {
    if (!data) return;

    const questionsWithMockAnswers: Question[] = data.Questions.map((q) => ({
      ...q,
      answers: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    }));

    // Giả lập đáp án đúng ngẫu nhiên
    let correctCount = 0;
    questionsWithMockAnswers.forEach((q) => {
      const randomCorrectAnswer = q.answers[Math.floor(Math.random() * q.answers.length)];
      if (selectedAnswers[q.id] === randomCorrectAnswer) {
        correctCount++;
      }
    });

    const wrongCount = questionsWithMockAnswers.length - correctCount;
    const score = Math.round((correctCount / questionsWithMockAnswers.length) * 10);

    setResult({ correct: correctCount, wrong: wrongCount, score });
    setIsResultModalVisible(true);
  };

  if (!questionSetId) return <div>Không tìm thấy ID bộ đề.</div>;
  if (isLoading) return <div>Đang tải đề thi...</div>;
  if (error || !data) return <div>Lỗi tải đề thi.</div>;

  const questionsWithMockAnswers: Question[] = data.Questions.map((q) => ({
    ...q,
    answers: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], // FE mock tạm
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Row gutter={16}>
        <Col span={18}>
          <Card className="mb-4 sticky top-0 z-10">
            <Title level={4}>{data.title}</Title>
            <div className="flex justify-between">
              <div>
                Thời gian còn lại: <b>{formatTime(timeLeft)}</b>
              </div>
              <div>
                Tổng số câu hỏi: <b>{questionsWithMockAnswers.length}</b>
              </div>
            </div>
            <Progress
              percent={((data.duration * 60 - timeLeft) / (data.duration * 60)) * 100}
              showInfo={false}
              status={timeLeft === 0 ? "exception" : "active"}
              className="mt-2"
            />
          </Card>

          {questionsWithMockAnswers.map((q, index) => {
            console.log("q", q);
            return (
              <Card
                key={q.id}
                ref={(el) => (questionRefs.current[index] = el)}
                className="mb-4"
                title={<b>{`${index + 1}. ${q.question}`}</b>}
              >
                <Radio.Group
                  onChange={(e) =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [q.id]: e.target.value,
                    }))
                  }
                  value={selectedAnswers[q.id]}
                  style={{ width: "100%" }}
                >
                  {q.answers.map((ans, i) => (
                    <Card
                      key={i}
                      style={{ marginBottom: 8, cursor: "pointer" }}
                      bodyStyle={{ padding: "8px 12px" }}
                      onClick={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [q.id]: ans,
                        }))
                      }
                    >
                      <Radio value={ans}>{ans}</Radio>
                    </Card>
                  ))}
                </Radio.Group>
              </Card>
            );
          })}
        </Col>

        <Col span={6}>
          <div style={{ position: "sticky", top: 0 }}>
            <Card title="Danh sách câu hỏi">
              <div className="grid grid-cols-5 gap-2">
                {questionsWithMockAnswers.map((q, index) => (
                  <Button
                    key={q.id}
                    onClick={() => handleScrollToQuestion(index)}
                    style={{
                      backgroundColor: selectedAnswers[q.id] ? "#d9f7be" : undefined,
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </Card>

            <Button type="primary" onClick={handleSubmit} className="w-full mt-4">
              Nộp bài
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        title="Kết quả bài thi"
        open={isResultModalVisible}
        onCancel={() => setIsResultModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsResultModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <p>Số câu đúng: {result.correct}</p>
        <p>Số câu sai: {result.wrong}</p>
        <p>Điểm: {result.score} / 10</p>
      </Modal>
    </div>
  );
};

export default ExamPage;
