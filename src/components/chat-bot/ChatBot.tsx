"use client";
import clsx from "clsx";
import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { GrLinkPrevious } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import styles from "./chatbot.module.scss";

const apiKey1 = `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`;

export default function ChatBot() {
  const [isSubmit, setIsSubmit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Chào bạn! Mình có thể hỗ trợ gì cho bạn hôm nay?" },
  ]);
  const [value, setValue] = useState("");

  async function generateCompletion(prompt: string) {
    const response = await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey1}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: "Bạn là một trợ lý thân thiện." },
          { role: "user", content: prompt },
        ],
        max_tokens: 200,
      }),
    });
    const data = await response.json();
    return data;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!value.trim()) return;

    const userMessage = { role: "user", content: value };
    setMessages((prev) => [...prev, userMessage, { role: "bot", content: "..." }]);
    setValue("");
    setIsSubmit(false);

    try {
      const data = await generateCompletion(value);
      const botReply = data?.choices?.[0]?.message?.content || "Bot không phản hồi.";
      setMessages((prev) => [
        ...prev.slice(0, -1), // xóa "...", thay bằng bot real response
        { role: "bot", content: botReply },
      ]);
    } catch (err) {
      setMessages((prev) => [...prev.slice(0, -1), { role: "bot", content: "Có lỗi xảy ra khi xử lý yêu cầu." }]);
    } finally {
      setIsSubmit(true);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {!isOpen && (
        <button className={styles.chatToggleIcon} onClick={() => setIsOpen(true)} aria-label="Open ChatBot">
          <FiMessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className={clsx(styles.chatGpt)}>
          <button onClick={() => setIsOpen(false)} className={clsx(styles.btnToggle)} aria-label="Close ChatBot">
            <GrLinkPrevious className={clsx(styles.icon)} />
          </button>

          <div className={clsx(styles.listQuestions)}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? styles.user : styles.bot}>
                <div className={clsx(styles.chatResponse)}>
                  <span className={clsx(styles.message)}>{msg.content}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={clsx(styles.fromWrap)}>
            <form onSubmit={isSubmit ? handleSubmit : (e) => e.preventDefault()} className={clsx(styles.btnSumbit)}>
              <div className={clsx(styles.fromGroup)}>
                <input
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  type="text"
                  placeholder="Nhấn Enter để gửi..."
                />
                <button type="submit">
                  <IoSend />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
