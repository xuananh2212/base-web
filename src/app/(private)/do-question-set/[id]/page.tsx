"use client";
import { axiosInstance } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Modal, Progress, Radio, Row, Typography } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const { Title } = Typography;

interface Answer {
  id: string;
  name: string;
  result: boolean;
}

interface Question {
  id: string;
  question: string;
  explain?: string;
  Answers: Answer[];
}

interface QuestionSetResponse {
  id: string;
  title: string;
  description: string;
  thumb: string;
  duration: number;
  total_questions: number;
  Questions: Question[];
}

const ExamPage = () => {
  const params = useParams();
  const questionSetId = params?.id as string;

  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [resultSummary, setResultSummary] = useState({ correct: 0, wrong: 0, score: 0 });
  const [showExplanation, setShowExplanation] = useState(false);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data, isLoading, error, refetch } = useQuery<QuestionSetResponse>({
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

    let correctCount = 0;
    data.Questions.forEach((q) => {
      const correctAnswer = q.Answers.find((a) => a.result);
      if (selectedAnswers[q.id] === correctAnswer?.id) {
        correctCount++;
      }
    });

    const wrongCount = data.Questions.length - correctCount;
    const score = Math.round((correctCount / data.Questions.length) * 10);

    setResultSummary({ correct: correctCount, wrong: wrongCount, score });
    setShowExplanation(true);
    setIsResultVisible(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsResultVisible(false);
    setTimeLeft(data ? data.duration * 60 : 1800);
    refetch();
  };

  if (!questionSetId) return <div>Không tìm thấy ID bộ đề.</div>;
  if (isLoading) return <div>Đang tải đề thi...</div>;
  if (error || !data) return <div>Lỗi tải đề thi.</div>;

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
                Tổng số câu hỏi: <b>{data.Questions.length}</b>
              </div>
            </div>
            <Progress
              percent={((data.duration * 60 - timeLeft) / (data.duration * 60)) * 100}
              showInfo={false}
              status={timeLeft === 0 ? "exception" : "active"}
              className="mt-2"
            />
          </Card>

          {data.Questions.map((q, index) => {
            const correctAnswer = q.Answers.find((a) => a.result);
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === correctAnswer?.id;

            return (
              <Card
                key={q.id}
                ref={(el) => (questionRefs.current[index] = el)}
                className="mb-4"
                title={<b>{`${index + 1}. ${q.question}`}</b>}
              >
                <Radio.Group
                  disabled={showExplanation}
                  onChange={(e) =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [q.id]: e.target.value,
                    }))
                  }
                  value={selectedAnswers[q.id]}
                  style={{ width: "100%" }}
                >
                  {q.Answers.map((ans) => {
                    let borderColor;
                    if (showExplanation) {
                      if (ans.id === correctAnswer?.id) {
                        borderColor = "2px solid green";
                      } else if (ans.id === userAnswer && ans.id !== correctAnswer?.id) {
                        borderColor = "2px solid red";
                      }
                    }

                    return (
                      <Card
                        key={ans.id}
                        style={{
                          marginBottom: 8,
                          cursor: showExplanation ? "default" : "pointer",
                          border: borderColor,
                        }}
                        bodyStyle={{ padding: "8px 12px" }}
                        onClick={() =>
                          !showExplanation &&
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [q.id]: ans.id,
                          }))
                        }
                      >
                        <Radio value={ans.id}>{ans.name}</Radio>
                      </Card>
                    );
                  })}
                </Radio.Group>
                {showExplanation && (
                  <div className="mt-2">
                    <b>Giải thích:</b> {q.explain || "Không có giải thích"}
                  </div>
                )}
              </Card>
            );
          })}
        </Col>

        <Col span={6}>
          <div style={{ position: "sticky", top: 0 }}>
            <Card title="Danh sách câu hỏi">
              <div className="grid grid-cols-5 gap-2">
                {data.Questions.map((q, index) => (
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

            {!showExplanation && (
              <Button type="primary" onClick={handleSubmit} className="w-full mt-4">
                Nộp bài
              </Button>
            )}

            {showExplanation && (
              <Button type="default" onClick={handleRetry} className="w-full mt-4">
                Làm lại
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Modal
        title="Kết quả bài thi"
        open={isResultVisible}
        onCancel={() => setIsResultVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsResultVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <p>Số câu đúng: {resultSummary.correct}</p>
        <p>Số câu sai: {resultSummary.wrong}</p>
        <p>Điểm: {resultSummary.score} / 10</p>
      </Modal>
    </div>
  );
};

export default ExamPage;
