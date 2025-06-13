import { CheckCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Collapse, Layout, List, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

interface Lesson {
  title: string;
  duration: string;
  done: boolean;
  [key: string]: any; // Thêm key để có thể truyền thêm các thuộc tính khác
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface SiderLearningDetailProps {
  progress: number;
  chapters: Chapter[];
  currentChapter: number;
  currentLesson: number;
  onSelectLesson: (chapterIndex: number, lessonIndex: number) => void;
}

const SiderLearningDetail = ({
  progress,
  chapters,
  currentChapter,
  currentLesson,
  onSelectLesson,
}: SiderLearningDetailProps) => {
  return (
    <Sider
      width={350}
      theme="light"
      style={{
        position: "fixed",
        right: 0,
        top: 64,
        height: "calc(100vh - 64px - 60px)", // trừ thêm footer cao 60px
        overflowY: "auto",
        borderLeft: "1px solid #f0f0f0",
      }}
    >
      <div className="p-4">
        <Title level={5}>Nội dung khóa học</Title>
        {/* <Progress percent={progress} className="mb-4 text-color-500" /> */}
        <Collapse>
          {chapters.map((chapter, cIdx) => (
            <Panel header={chapter.title} key={cIdx}>
              <List
                itemLayout="horizontal"
                dataSource={chapter.lessons}
                renderItem={(lesson, lIdx) => (
                  <List.Item
                    onClick={() => onSelectLesson(cIdx, lIdx)}
                    className={`cursor-pointer ${
                      cIdx === currentChapter && lIdx === currentLesson ? "bg-gray-100" : ""
                    }`}
                  >
                    <List.Item.Meta
                      avatar={
                        lesson.done ? (
                          <CheckCircleOutlined style={{ color: "green" }} />
                        ) : (
                          <PlayCircleOutlined style={{ color: "gray" }} />
                        )
                      }
                      title={lesson.title}
                      description={
                        lesson.videoUrl ? `Dạng video` : lesson.document ? "Dạng tài liệu" : "Dạng Trắc nghiệm"
                      }
                    />
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    </Sider>
  );
};

export default SiderLearningDetail;
