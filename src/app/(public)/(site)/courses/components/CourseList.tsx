import { Course } from "@/services/categories/type";
import { Badge, Button, Card, Col, Divider, Row, Tag, Typography } from "antd";
import Link from "next/link";

const { Title, Text } = Typography;

interface CourseListProps {
  title: string;
  badgeText?: string;
  courses: Course[];
}
export const formatVND = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

const CourseList = ({ title, badgeText = "Mới", courses }: CourseListProps) => {
  return (
    <div>
      <Title level={3}>
        {title} {badgeText && <Badge count={badgeText} style={{ backgroundColor: "#52c41a" }} />}
      </Title>
      <Divider />
      <Row gutter={[16, 16]} className="mb-6">
        {courses?.map((course, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt={course?.title} src={course?.thumb} style={{ height: "180px", objectFit: "cover" }} />}
            >
              <div className="mt-2 flex items-center justify-between">
                <div>
                  {course?.price ? (
                    <>
                      <Text delete className="text-red-500">
                        Giá gốc: {formatVND(course?.price)}
                      </Text>
                      <Text strong> {formatVND(course?.discounted_price)}</Text>
                    </>
                  ) : (
                    <Tag color="#87d068">Miễn phí</Tag>
                  )}
                </div>
                <div>
                  <span>
                    Số lượt học: <Tag color="#87d068">{course?.amount_learn || 0}</Tag>
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <Link href={`/courses/${course?.slug}`}>
                  <Button type="primary">Xem khóa học</Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseList;
