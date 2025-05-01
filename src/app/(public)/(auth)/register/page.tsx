"use client";
import { Button, Card, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Dữ liệu đăng ký:", values);
      setTimeout(() => {
        setLoading(false);
        alert("Đăng ký thành công!");
      }, 1000);
    } catch (error) {
      console.error("Đăng ký thất bại", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center">
          <Image className="rounded-lg " src="/images/logo.png" width={40} height={40} alt="logo" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            name: "tuananh2",
            email: "xuantuananh22@gmail.com",
            password: "Tuan123a*a",
            passwordRe: "Tuan123a*a",
          }}
        >
          <Form.Item
            className="mt-4"
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên..." />
          </Form.Item>

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

          <Form.Item
            className="mt-4"
            label="Nhập lại mật khẩu"
            name="passwordRe"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu..." />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" block loading={loading} className="bg-blue-color">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <span>Đã có tài khoản? </span>
          <Link href="/login">
            <span className="text-color-500 hover:underline cursor-pointer">Đăng nhập</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
