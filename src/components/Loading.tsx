"use client";
import { Spin, Typography } from "antd";

const Loading = ({ message, description }: { message: string; description: string }) => {
  return (
    <>
      <Spin size="large" className="!mb-4" />
      <Typography.Title level={2}>{message}</Typography.Title>
      <Typography.Title level={4} italic>
        {description}
      </Typography.Title>
    </>
  );
};

export default Loading;
