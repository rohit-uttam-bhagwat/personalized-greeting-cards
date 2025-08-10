import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="bg-gradient-to-b from-pink-100 via-white to-purple-100 min-h-screen flex flex-col">
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Turn Your Feelings into Art — Instantly
        </h1>
        <p className="text-lg text-gray-600">
          AI-crafted messages + beautiful cards in seconds.
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Link to="/occasion">
            <button className="px-8 py-4 bg-coral-500 text-white rounded-xl shadow-lg text-lg font-semibold hover:bg-coral-600">
              Start Now
            </button>
          </Link>
          <div className="flex gap-4 overflow-x-auto py-4">
            {["/sample1.png", "/sample2.png", "/sample3.png"].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Sample ${i + 1}`}
                className="w-64 h-40 object-cover rounded-lg shadow-md flex-shrink-0"
              />
            ))}
          </div>
        </motion.div>
      </main>
    </section>
  );
}

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
