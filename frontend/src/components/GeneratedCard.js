import { motion } from "framer-motion";

export default function GeneratedCard({ message, imageUrl, onRegenerate, onDownload }) {
  return (
    <section className="py-10 bg-gray-50">
      <motion.div
        className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {imageUrl && (
          <img src={imageUrl} alt="Generated Greeting" className="w-full object-cover h-64" />
        )}
        <div className="p-6 space-y-4">
          <p className="text-lg text-gray-800 whitespace-pre-line">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onRegenerate}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
            >
              Regenerate
            </button>
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}