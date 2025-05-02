"use client";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const res = await axios.post("http://localhost:3000/api/auth/v1/login", values);
      return res.data;
    },
    onSuccess: (data) => {
      Cookies.set("access_token", data.access_token, { expires: 7 });
      Cookies.set("refresh_token", data.refresh_token, { expires: 7 });
      toast.success("Đăng nhập thành công!");
      router.push(redirect);
    },
    onError: (error: any) => {
      const errMsg = error.response?.data?.message || "Đăng nhập thất bại";
      toast.error(errMsg);
    },
  });

  const handleFinish = (values: any) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-4">
          <Image className="rounded-lg" src="/images/logo.png" width={40} height={40} alt="logo" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <Form form={form} name="login" layout="vertical" initialValues={{}} onFinish={handleFinish}>
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
            <Button type="primary" htmlType="submit" block loading={isPending} className="bg-color-500">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <span>Bạn chưa có tài khoản? </span>
          <Link href="/register">
            <span className="text-color-500 hover:underline cursor-pointer">Đăng ký ngay</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
