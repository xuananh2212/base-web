"use client";
import { Button, Card, Radio, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const quizData = [
  {
    question: "Đoạn code cần được khai báo đầu tiên trong mọi file HTML?",
    options: ["<!DOCTYPE html>", "<head></head>", "<html></html>"],
    correct: "<!DOCTYPE html>",
  },
  {
    question: "Phần tử nào chứa tiêu đề trang web?",
    options: ["<title>", "<head>", "<body>"],
    correct: "<title>",
  },
];

export default function QuizList() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (qIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {quizData.map((q, idx) => (
        <Card key={idx} className="mb-4">
          <Title level={5}>
            {idx + 1}. {q.question}
          </Title>
          <Radio.Group
            onChange={(e) => handleSelect(idx, e.target.value)}
            value={answers[idx]}
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            {q.options.map((opt, optIdx) => (
              <Radio
                key={optIdx}
                value={opt}
                style={{
                  padding: "10px 16px",
                  background:
                    showAnswer && opt === q.correct
                      ? "#dfffdc"
                      : showAnswer && answers[idx] === opt && opt !== q.correct
                        ? "#ffdcdc"
                        : "#f0f2f5",
                  borderRadius: 8,
                }}
              >
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        </Card>
      ))}
      <div className="flex justify-end gap-2">
        <Button onClick={() => setShowAnswer(true)}>Xem đáp án</Button>
        <Button type="primary" onClick={() => alert("Đã nộp bài!")}>
          Trả lời
        </Button>
      </div>
    </div>
  );
}
