"use client";
import { Button, Card, Popconfirm, Radio, Typography } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Title, Paragraph } = Typography;

export default function QuizList({ quizData }: { quizData: any[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (qId: string, value: string) => {
    if (!showAnswer) {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    }
  };

  const handleSubmit = () => {
    setShowAnswer(true);
    toast.success("Đã nộp bài!");
  };

  const handleReset = () => {
    setShowAnswer(false);
    setAnswers({});
    toast.info("Bạn có thể làm lại bài.");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {quizData.map((q, idx) => {
        const correctAnswer = q.answers.find((a: any) => a.result)?.id;

        return (
          <Card key={q.id} className="mb-4">
            <Title level={5}>
              {idx + 1}. {q.question}
            </Title>
            <Radio.Group
              onChange={(e) => handleSelect(q.id, e.target.value)}
              value={answers[q.id]}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {q.answers.map((opt: any) => {
                const isCorrect = opt.id === correctAnswer;
                const isSelected = answers[q.id] === opt.id;

                let background = "#f0f2f5";
                if (showAnswer) {
                  if (isCorrect) background = "#dfffdc";
                  else if (isSelected && !isCorrect) background = "#ffdcdc";
                }

                return (
                  <Radio
                    key={opt.id}
                    value={opt.id}
                    disabled={showAnswer} // ✅ disable khi đã nộp bài
                    style={{
                      padding: "10px 16px",
                      background,
                      borderRadius: 8,
                      border: showAnswer && isCorrect ? "1px solid #52c41a" : "1px solid transparent",
                    }}
                  >
                    {opt.name}
                  </Radio>
                );
              })}
            </Radio.Group>

            {showAnswer && q.explain && (
              <Paragraph className="mt-2 text-sm text-gray-600">
                <strong>Giải thích:</strong> {q.explain}
              </Paragraph>
            )}
          </Card>
        );
      })}

      <div className="flex justify-end gap-2 mt-4">
        {showAnswer && (
          <Button onClick={handleReset} danger>
            Quay lại làm
          </Button>
        )}
        {!showAnswer && (
          <Popconfirm title="Bạn chắc chắn muốn nộp bài?" onConfirm={handleSubmit} okText="Đồng ý" cancelText="Hủy">
            <Button type="primary">Trả lời</Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
}
