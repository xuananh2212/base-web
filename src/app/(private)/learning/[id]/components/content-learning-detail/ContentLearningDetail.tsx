import { Layout, Typography } from "antd";
import ReactPlayer from "react-player";
import QuizList from "../quiz-list/QuizList";

const { Content } = Layout;
const { Title, Text } = Typography;

interface ContentLearningDetailProps {
  lessonTitle: string;
  lessonDuration: string;
  videoUrl: string;
  document: string;
  quiz: any;
}

const ContentLearningDetail = ({
  lessonTitle,
  lessonDuration,
  videoUrl,
  document,
  quiz,
}: ContentLearningDetailProps) => {
  if (videoUrl) {
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
          <div className="w-full mb-4 aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="100%"
              style={{ borderRadius: "8px", overflow: "hidden" }}
            />
          </div>
          <Title level={5}>{lessonTitle}</Title>
          <Text>Thời lượng: {lessonDuration}</Text>
        </div>
      </Content>
    );
  }
  if (document) {
    return <div className="mt-4 p-6" dangerouslySetInnerHTML={{ __html: document }} />;
  }
  if (quiz) {
    return <QuizList />;
  }
};

export default ContentLearningDetail;
