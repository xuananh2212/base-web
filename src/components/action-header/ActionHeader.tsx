"use client";
import { Button } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
const ActionHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    !isLoggedIn && (
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
    )
  );
};

export default ActionHeader;
