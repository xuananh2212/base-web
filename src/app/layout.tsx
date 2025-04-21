import Providers from "@/components/providers";
import RegisterChartJS from "@/components/RegisterChartJS/RegisterChartJS ";
import { fontSans } from "@/configs/font.config";
import getMetadata from "@/configs/site.config";
import "@/styles/globals.scss";
import clsx from "clsx";
import type { Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata("Trang chủ");
  return metadata;
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={clsx("body", fontSans.className)}>
        <RegisterChartJS />
        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
};

export default Layout;
