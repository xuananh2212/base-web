import { ArrowLeftOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";

interface HeaderLearningDetailProps {
  courseData: any;
}
export default function HeaderLearningDetail({ courseData }: HeaderLearningDetailProps) {
  const router = useRouter();

  return (
    <Header className="fixed top-0 w-full z-[1000] bg-color-500 flex items-center px-4">
      <ArrowLeftOutlined onClick={() => router.back()} className="text-white text-lg mr-4 cursor-pointer" />
      <div className="text-white text-lg font-semibold">
        <span> {courseData.title}</span>
      </div>
    </Header>
  );
}
