// components/ChatPopup.tsx
// components/ChatPopup.tsx
import { X, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type ChatPopupProps = {
  onClose: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatPopup = ({
  onClose,
  messages,
  setMessages,
  input,
  setInput,
}: ChatPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const reply = data.reply || "Hmm, no response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 right-4 w-80 rounded-2xl shadow-xl border bg-white dark:bg-gray-900 z-50"
    >
      <div ref={popupRef} className="p-4 flex flex-col h-96">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Cookie Assistant</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-800 dark:hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto text-sm space-y-2 pr-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me something..."
            className="flex-1 rounded-xl border px-3 py-1.5 text-sm focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          <button onClick={handleSend} disabled={loading}>
            <Send className="w-5 h-5 text-blue-500 hover:text-blue-700" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
