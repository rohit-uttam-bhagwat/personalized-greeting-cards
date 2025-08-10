import { useState } from "react";
import { motion } from "framer-motion";

export default function PersonalizationForm({ occasion, onSubmit }) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [interests, setInterests] = useState("");
  const [tone, setTone] = useState("warm");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, relationship, interests, tone, occasion });
  };

  return (
    <section className="py-10 bg-gray-50">
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white rounded-2xl shadow p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Personalize Your Message
        </h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Recipient's Name</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Your Relationship</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Friend, Colleague, Sibling, etc."
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Recipient's Interests</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Hobbies, likes, favorites"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tone</label>
          <select
            className="w-full border rounded-lg p-3"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="warm">Warm</option>
            <option value="funny">Funny</option>
            <option value="formal">Formal</option>
            <option value="poetic">Poetic</option>
          </select>
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate Message
        </motion.button>
      </motion.form>
    </section>
  );
}