"use client";
import { Button, Card, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Dữ liệu đăng nhập:", values);
      // ⚡ Ở đây bạn gọi API đăng nhập, ví dụ:
      // await AuthService.login(values);
      setTimeout(() => {
        setLoading(false);
        alert("Đăng nhập thành công!");
      }, 1000);
    } catch (error) {
      console.error("Đăng nhập thất bại", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center">
          <Image className="rounded-lg " src="/images/logo.png" width={40} height={40} alt="logo" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ email: "xuantuananh2212@gmail.com", password: "Tuan123a*a" }}
          onFinish={handleFinish}
        >
          <Form.Item
            className="mt-4"
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email..." />
          </Form.Item>

          <Form.Item
            className="mt-4"
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu..." />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" block loading={loading} className="bg-color-500">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <span>Bạn chưa có tài khoản?</span>
          <Link href="/register">
            <span className="text-color-500 hover:underline cursor-pointer">Đăng ký ngay</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
