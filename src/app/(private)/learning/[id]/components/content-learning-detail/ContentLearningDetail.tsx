import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

interface ContentLearningDetailProps {
  lessonTitle: string;
  lessonDuration: string;
  videoUrl: string;
}

const ContentLearningDetail = ({ lessonTitle, lessonDuration, videoUrl }: ContentLearningDetailProps) => {
  return (
    <Content
      style={{
        marginRight: 350,
        padding: "24px",
        minHeight: "calc(100vh - 64px - 60px)", // trừ thêm footer cao 60px
        background: "#f9f9f9",
      }}
    >
      <div className="bg-white p-4 rounded shadow">
        <img src={videoUrl} alt="Video" className="rounded mb-4 w-full object-cover w-96 h-96" />
        <Title level={5}>{lessonTitle}</Title>
        <Text>Thời lượng: {lessonDuration}</Text>
      </div>
    </Content>
  );
};

export default ContentLearningDetail;
