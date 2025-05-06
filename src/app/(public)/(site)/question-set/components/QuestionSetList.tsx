"use client";
import { Badge, Button, Card, Col, Divider, Modal, Row, Tag, Typography } from "antd";
import Cookies from "js-cookie";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const { Title, Text, Paragraph } = Typography;

interface QuestionSetListProps {
  title: string;
  badgeText?: string;
  questionSets: any[];
}

const QuestionSetList = ({ title, badgeText = "Mới", questionSets }: QuestionSetListProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleConfirm = (id: string) => {
    Modal.confirm({
      title: "Xác nhận bắt đầu làm đề",
      content: "Bạn có chắc chắn muốn bắt đầu làm đề này không? Khi bắt đầu, thời gian sẽ được tính!",
      okText: "Bắt đầu",
      cancelText: "Huỷ",
      onOk: () => {
        router.push(`/do-question-set/${id || ""}`);
      },
    });
  };

  const handleClick = (id: string) => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      toast.warning("Bạn cần đăng nhập để làm bài!");
      return;
    }
    handleConfirm(id);
  };

  return (
    <div>
      <Title level={3}>
        {title} {badgeText && <Badge count={badgeText} style={{ backgroundColor: "#52c41a" }} />}
      </Title>
      <Divider />
      <Row gutter={[16, 16]} className="mb-6">
        {questionSets?.map((set, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt={set?.title} src={set?.thumb} style={{ height: "180px", objectFit: "cover" }} />}
            >
              <div className="text-lg font-semibold mb-2">{set?.title}</div>
              <Paragraph ellipsis={{ rows: 2 }}>{set?.description}</Paragraph>

              <div className="mt-2">
                <Tag color="blue">Thời lượng: {set?.duration} phút</Tag>
                <Tag color="purple">Số câu hỏi: {set?.total_questions}</Tag>
              </div>

              <div className="mt-3 flex items-center justify-center">
                <Button onClick={() => handleClick(set?.id)} type="primary">
                  Làm bài
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuestionSetList;
