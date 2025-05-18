import ChatBot from "@/components/chat-bot/ChatBot";
import Header from "@/components/header/Header";
import getMetadata from "@/configs/site.config";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getMetadata();
  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <ChatBot />
    </div>
  );
}
