import { Badge, Button, Card, Col, Divider, Row, Typography } from "antd";

const { Title, Text } = Typography;

interface Course {
  title: string;
  desc: string;
  image: string;
  oldPrice: string;
  newPrice: string;
}

interface CourseListProps {
  title: string;
  badgeText?: string;
  courses: Course[];
}

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
              cover={<img alt={course?.title} src={course?.image} style={{ height: "180px", objectFit: "cover" }} />}
            >
              <Card.Meta title={course?.title} description={course?.desc} />
              <div className="mt-2">
                <Text delete>{course?.oldPrice}</Text> <Text strong>{course?.newPrice}</Text>
              </div>
              <div className="mt-2">
                <Button type="primary">Đăng ký</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseList;
