import getMetadata from "@/configs/site.config";
import "@/styles/globals.scss";
import { Button } from "antd";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata();
  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <header className="shadow-lg bg-white sticky top-0 left-0 z-50 w-full p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link className="flex gap-2 items-center" href="/">
              <Image className="rounded-lg" src="/images/logo.png" width={40} height={40} alt="logo" />
              <span className="hover:underline cursor-pointer">Trang chủ</span>
            </Link>
            <div className="flex gap-2">
              <Link href="/login">
                <Button className="px-4 py-2 rounded border border-color-500 text-color-500 hover:bg-color-500 hover:text-white transition">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button className="px-4 py-2 rounded bg-color-600 text-white hover:bg-color-600 transition">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
