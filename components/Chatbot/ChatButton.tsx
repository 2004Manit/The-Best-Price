// components/Chatbot/ChatButton.tsx
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-white/20 hover:bg-white/30
        backdrop-blur-md border border-white/10 p-3 rounded-full
        shadow-md transition-all z-50"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
};
