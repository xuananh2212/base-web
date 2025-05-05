"use client";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const response = await axios.post("http://localhost:3000/api/auth/v1/resgiter", values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error("Đăng ký thất bại: " + error?.response?.data?.errors?.email || "");
    },
  });

  const handleFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center">
          <Image className="rounded-lg" src="/images/logo.png" width={40} height={40} alt="logo" />
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
            <Button type="primary" htmlType="submit" block loading={mutation.isPending} className="bg-blue-color">
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
