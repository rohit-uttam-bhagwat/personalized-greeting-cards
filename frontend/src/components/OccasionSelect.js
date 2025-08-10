
import { motion } from "framer-motion";

const occasions = [
  { id: "birthday", label: "Birthday", emoji: "🎂" },
  { id: "anniversary", label: "Anniversary", emoji: "💖" },
  { id: "thankyou", label: "Thank You", emoji: "🙏" },
  { id: "getwell", label: "Get Well Soon", emoji: "🌼" },
  { id: "congrats", label: "Congratulations", emoji: "🎉" },
  { id: "custom", label: "Custom", emoji: "✨" },
];

export default function OccasionGrid({ onSelect }) {
  return (
    <section className="py-10 bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Choose the Occasion
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
        {occasions.map((o, idx) => (
          <motion.button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow hover:shadow-md transition flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <span className="text-4xl mb-2">{o.emoji}</span>
            <span className="text-lg text-gray-700 font-medium">{o.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}