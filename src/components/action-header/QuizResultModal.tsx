"use client";
import { axiosInstance } from "@/configs/axios.config";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";

interface QuizResultModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const QuizResultModal: React.FC<QuizResultModalProps> = ({ open, onClose, userId }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["quizResults", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/quiz-result/v1/${userId}`);
      return res.data?.data || [];
    },
    enabled: open, // chỉ gọi khi modal mở
  });

  const columns = [
    {
      title: "Bộ đề",
      dataIndex: ["QuestionSet", "title"],
      key: "title",
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Đúng",
      dataIndex: "correct_answers",
      key: "correct_answers",
      render: (data: any) => {
        return <span className="text-green-500">{data}</span>;
      },
    },
    {
      title: "Sai",
      dataIndex: "wrong_answers",
      key: "wrong_answers",
      render: (data: any) => {
        return <span className="text-error-500">{data}</span>;
      },
    },
    {
      title: "Tổng câu",
      dataIndex: "total_questions",
      key: "total_questions",
    },
    {
      title: "Ngày làm",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => new Date(text).toLocaleString("vi-VN"),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      title="Kết quả học tập"
      width={800}
      footer={[
        <Button key="close" onClick={onClose} type="primary">
          Thoát
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={data} rowKey="id" loading={isLoading} pagination={false} />
    </Modal>
  );
};

export default QuizResultModal;
