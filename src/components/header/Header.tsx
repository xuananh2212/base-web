"use client";
import Marquee from "@/app/(public)/(site)/components/marquee/Marquee";
import { Button, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="shadow-lg bg-white sticky top-0 left-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center p-3">
        <div className="text-xl font-bold">
          <Link className="flex gap-2 items-center" href="/">
            <Image className="rounded-lg" src="/images/logo.png" width={40} height={40} alt="logo" />
          </Link>
        </div>
        <div className="flex-grow">
          <Menu mode="horizontal" className="flex justify-center" style={{ borderBottom: "none" }}>
            <Menu.Item key="home">
              <Link href="/" className="font-semibold">
                Trang chủ
              </Link>
            </Menu.Item>
            <Menu.Item key="courses">
              <Link href="/courses" className="font-semibold">
                Khoá học
              </Link>
            </Menu.Item>
            <Menu.Item key="quizzes">
              <Link href="#quizzes" className="font-semibold">
                Bộ đề
              </Link>
            </Menu.Item>
            <Menu.Item key="blogs">
              <Link href="#blogs" className="font-semibold">
                Bài viết
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="flex gap-2">
          <Link href="/login">
            <Button className="px-4 py-2 rounded border border-color-500 text-color-500 hover:bg-color-500 hover:text-white transition">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button className="px-4 py-2 rounded bg-color-600 text-white hover:bg-color-600 transition">Đăng ký</Button>
          </Link>
        </div>
      </div>

      {pathname === "/" && <Marquee />}
    </div>
  );
};

export default Header;
