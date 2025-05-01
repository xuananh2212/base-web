"use client";
import { Menu } from "antd";
import Link from "next/link";

const Header = () => (
  <div className="shadow-lg bg-white sticky top-0 left-0 z-50 w-full">
    <div className="container mx-auto flex justify-between items-center p-4">
      <div className="text-xl font-bold">
        <Link href="/">🎓 KMA E-Learning</Link>
      </div>
      <div className="flex-grow">
        <Menu mode="horizontal" className="flex justify-center" style={{ borderBottom: "none" }}>
          <Menu.Item key="home">
            <Link href="#home">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="courses">
            <Link href="#courses">Khoá học</Link>
          </Menu.Item>
          <Menu.Item key="quizzes">
            <Link href="#quizzes">Bộ đề</Link>
          </Menu.Item>
          <Menu.Item key="blogs">
            <Link href="#blogs">Bài viết</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  </div>
);

export default Header;
