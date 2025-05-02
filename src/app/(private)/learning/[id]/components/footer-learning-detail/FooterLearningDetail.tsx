"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

const { Footer } = Layout;

interface CourseFooterProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
}

export default function FooterLearningDetail({ onPrev, onNext, isPrevDisabled = false }: CourseFooterProps) {
  return (
    <Footer className="fixed bottom-0 w-full h-[60px] bg-white border-t border-gray-200 flex justify-between items-center px-6 z-[1000]">
      <Button icon={<LeftOutlined />} onClick={onPrev} disabled={isPrevDisabled}>
        Bài trước
      </Button>
      <Button type="primary" icon={<RightOutlined />} onClick={onNext}>
        Bài tiếp theo
      </Button>
    </Footer>
  );
}
