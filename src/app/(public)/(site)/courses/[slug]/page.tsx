"use client";
import CoursesService from "@/services/courses/CoursesService";
import PayOsService from "@/services/payos/PayOs";
import UsersCoursesService from "@/services/user-course/UserCoursesService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Col, Collapse, Popconfirm, Row, Skeleton, Tag, Typography } from "antd";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatVND } from "../components/CourseList";
const ACCESS_TOKEN = "aa29f44dfaf7bcca15d1dceddec343c66bc38924efe1cab7ebc9be6752f60192";
const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function CourseDetailPage() {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      const payload: any = jwt.decode(token, ACCESS_TOKEN as any);
      console.log("payload", payload);
      setUser({
        id: payload?.id,
        avatar: payload?.avatar,
        email: payload?.email,
        fullname: payload?.fullname,
      });
    }
  }, []);
  const { data, isFetching } = useQuery({
    queryKey: ["COURSES", slug],
    queryFn: async () => {
      const response = await CoursesService.getCourseSlug(slug as string);
      return response?.data;
    },
  });
  const handleRegister = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      toast.warning("Bạn cần đăng nhập để đăng ký khoá học!");
      return;
    }
    if (data?.price === 0 || !data?.price) {
      // Khóa học miễn phí, gọi API đăng ký luôn
      try {
        await UsersCoursesService.createUserCourse({
          userId: user?.id,
          courseId: data.id,
        }); // Giả sử API đăng ký có method này, bạn tự tạo trong service
        toast.success("Đăng ký khóa học miễn phí thành công!");
        queryClient.invalidateQueries({
          queryKey: ["categoriesWithCourses"],
        });
        router.push(`/learning/${data.id}`); // Chuyển thẳng vào học
      } catch (error) {
        console.error("Đăng ký khóa học miễn phí lỗi:", error);
        toast.error("Đăng ký khóa học thất bại, vui lòng thử lại!");
      }
    } else {
      // Khóa học mất phí, chuyển đến trang chi tiết hoặc thanh toán
      // router.push(`/learning/${data.id}`);
      const response = await PayOsService.createPaymentLink({
        amount: data.discounted_price,
        userId: user.id,
        courseId: data?.id,
        description: `Khóa học: ${data?.title || ""}`.slice(0, 25),
        returnUrl: `http://localhost:3200//learning/${data.id}`,
        cancelUrl: `http://localhost:3200//payment-failed`,
      });

      if (response?.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        toast.error("Tạo đơn thanh toán thất bại");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Link href="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/courses">Khoá học</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data?.title}</Breadcrumb.Item>
      </Breadcrumb>

      {isFetching ? (
        <Skeleton active />
      ) : (
        <Row gutter={[32, 32]}>
          <Col xs={24} md={16}>
            <Title level={2} className="text-cyan-700">
              {data?.title}
            </Title>

            <div className="prose prose-blue max-w-full" dangerouslySetInnerHTML={{ __html: data?.desc || "" }} />

            <div className="mt-8">
              <Title level={4}>📚 Nội dung khóa học</Title>
              <div className="mt-6 font-normal">
                {data?.Topics?.length || 0} chương • Tổng số bài học:{" "}
                {data?.Topics?.reduce((acc: any, cur: any) => acc + cur.Lessons.length, 0)} bài
              </div>

              <Collapse accordion className="mt-4 bg-white shadow-md rounded-xl" expandIconPosition="end">
                {data?.Topics?.map((section: any, idx: number) => (
                  <Panel className="font-medium text-base" header={`Chương ${idx + 1}. ${section.title}`} key={idx}>
                    <ul className="list-disc list-inside text-gray-700">
                      {section?.Lessons?.map((lesson: any, lidx: number) => (
                        <li key={lidx} className="py-1 hover:text-blue-500 transition-all">
                          Bài {idx + 1}.{lidx + 1} {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <Card
              cover={<img alt="course" src={data?.thumb} className="h-[220px] object-cover rounded-t-lg" />}
              className="sticky top-4 shadow-lg rounded-lg overflow-hidden"
              bordered={false}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  {data?.price ? (
                    <div>
                      <Text delete className="text-gray-400 text-sm">
                        {formatVND(data?.price)}
                      </Text>
                      <br />
                      <Text strong className="text-red-500 text-xl">
                        {formatVND(data?.discounted_price)}
                      </Text>
                    </div>
                  ) : (
                    <Tag color="green" className="text-base">
                      Miễn phí
                    </Tag>
                  )}
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Lượt học</span>
                    <div>
                      <Tag color="blue">{data?.amount_learn || 0}</Tag>
                    </div>
                  </div>
                </div>

                {data?.price ? (
                  <Popconfirm
                    title="Bạn có chắc muốn mua khoá học này?"
                    onConfirm={handleRegister}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <Button type="primary" size="large" block>
                      Mua khoá học
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button type="primary" size="large" block onClick={handleRegister}>
                    Đăng ký học
                  </Button>
                )}

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    <strong>Trình độ:</strong> Cơ bản
                  </p>
                  <p>
                    <strong>Số chương:</strong> {data?.Topics?.length} chương
                  </p>
                  <p>📱 Học mọi lúc, mọi nơi</p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
