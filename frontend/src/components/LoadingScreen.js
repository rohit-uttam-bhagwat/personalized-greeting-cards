// src/components/LoadingScreen.js
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingScreen({ message = "Generating your masterpiece..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={48} className="text-coral-500" />
      </motion.div>
      <p className="mt-4 text-lg text-gray-700 font-medium">{message}</p>
    </div>
  );
}
