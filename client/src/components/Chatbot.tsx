"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { env } from "@/env";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya Xandy, asisten UploadXam yang siap bantu menjawab pertanyaan seputar platform ini. Ada yang bisa saya bantu?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // PERUBAHAN UTAMA: Kirim data ke backend Express Anda, bukan panggil LLM di klien
      // Susun ulang format agar siap dipakai oleh backend
      const contents = messages
        .filter((msg) => msg.id !== "1")
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));
      contents.push({ role: "user", parts: [{ text: userText }] });

      // Sesuaikan URL backend API Anda (contoh: http://localhost:5000/api/chat)
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });

      if (!res.ok) throw new Error("Gagal mengambil respon dari server");
      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Maaf, terjadi kesalahan.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf, sistem chatbot sedang mengalami gangguan. Silakan coba lagi nanti.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105 hover:bg-red-600 ${isOpen ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"} z-50`}
        aria-label="Buka Chatbot"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed right-6 bottom-6 z-50 flex h-[500px] max-h-[calc(100vh-6rem)] w-[calc(100vw-3rem)] origin-bottom-right flex-col border border-[#5C1A1A] bg-[#1A0505] shadow-2xl transition-all duration-300 sm:w-[380px] ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#5C1A1A] bg-[#240A0A] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white shadow-inner">
              <Bot />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base leading-tight font-bold text-white">
                Xandy Assistant
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
                <span className="font-sans text-[9px] tracking-widest text-[#F87171] uppercase">
                  Online
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-[#F5C6C6] transition-colors hover:text-[#EF4444]"
            aria-label="Tutup Chatbot"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="scrollbar-thin scrollbar-thumb-[#5C1A1A] scrollbar-track-transparent min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 font-sans text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "rounded-2xl rounded-tr-sm bg-[#DC2626] text-white"
                    : "rounded-2xl rounded-tl-sm border border-[#5C1A1A] bg-[#240A0A] text-[#FECACA]"
                }`}
              >
                {/* PERUBAHAN DI SINI: Gunakan ReactMarkdown untuk sender "bot" */}
                {msg.sender === "bot" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    // className="prose prose-invert prose-sm max-w-none break-words"
                    components={{
                      // Kustomisasi agar list dan paragraf tidak memiliki margin berlebih
                      p: ({ children }) => (
                        <p className="mb-1 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="ml-4 list-disc space-y-1">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="ml-4 list-decimal space-y-1">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="marker:text-red-400">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-white">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  /* User message biasanya teks biasa tanpa markdown kompleks */
                  <span className="whitespace-pre-wrap">{msg.text}</span>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-[#5C1A1A] bg-[#240A0A] px-4 py-4 text-[#FECACA] shadow-sm">
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F87171]"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F87171]"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F87171]"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="border-t border-[#5C1A1A] bg-[#240A0A] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 rounded-full border border-[#5C1A1A] bg-[#1A0505] p-1 pl-4 transition-colors focus-within:border-[#EF4444]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan..."
              className="flex-1 bg-transparent font-sans text-sm text-[#FECACA] placeholder-[#7F1D1D] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-white transition-colors hover:bg-[#EF4444] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Kirim Pesan"
            >
              <Send size={16} className="-ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
