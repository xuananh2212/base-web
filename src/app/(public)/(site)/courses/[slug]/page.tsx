"use client";
import CoursesService from "@/services/courses/CoursesService";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Col, Collapse, Row, Skeleton, Tag, Typography } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatVND } from "../components/CourseList";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const pathname = usePathname();

  const { data, isFetching } = useQuery({
    queryKey: ["COURSES", slug],
    queryFn: async () => {
      const response = await CoursesService.getCourseSlug(slug as string);
      return response?.data;
    },
  });
  const handleRegister = () => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      toast.warning("Bạn cần đăng nhập để đăng ký khoá học!");
      return;
    }
    // TODO: Gọi API đăng ký học nếu có
    router.push(`/learning/${data?.id || ""}`);
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

                <Button type="primary" size="large" block onClick={handleRegister}>
                  Đăng ký học ngay
                </Button>

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
