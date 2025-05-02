import getMetadata from "@/configs/site.config";
import "@/styles/globals.scss";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";
import { Metadata } from "next";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement);
export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata("Trang chủ");
  return metadata;
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-color-50 min-h-[calc(100vh-48px)]">{children}</div>;
};

export default Layout;
