import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AI Greeting Card Generator — Single-file React component (TailwindCSS + Framer Motion)
 *
 * Notes for dev:
 * - This file is intentionally self-contained to be dropped into a React + Tailwind app.
 * - Replace mockAI() with your real OpenAI / server endpoint.
 * - For more polished components, replace the simple inputs/buttons with shadcn/ui components.
 * - To export the card as an image, integrate html2canvas or dom-to-image and call downloadImage().
 */

/**
 * @typedef {Object} Occasion
 * @property {string} id
 * @property {string} title
 * @property {string} emoji
 * @property {string} color
 */

const OCCASIONS = [
  { id: "birthday", title: "Birthday", emoji: "🎂", color: "bg-pink-100" },
  { id: "anniv", title: "Anniversary", emoji: "💍", color: "bg-amber-100" },
  { id: "grad", title: "Graduation", emoji: "🎓", color: "bg-green-100" },
  { id: "baby", title: "New Baby", emoji: "🍼", color: "bg-purple-100" },
  { id: "congrats", title: "Congrats", emoji: "🎉", color: "bg-blue-100" },
  { id: "thanks", title: "Thank You", emoji: "🙏", color: "bg-rose-100" },
];

// Mock AI generator — replace with real API call.
function mockAI(params) {
  const { name, memory, tone, personality, occasion } = params;
  const short = `Dear ${name},\n\n${memory ? memory.slice(0, 80) + (memory.length > 80 ? "..." : "") : "Thinking of you today"}. Sending love and bright smiles!`;
  const long = `Dear ${name},\n\nI still remember ${memory || "the time we shared a laugh"}. Your ${personality || "kind"} nature lights up every room. On this ${occasion} — may you get all the joy you give to others.\n\n${tone === "funny" ? "P.S. Keep the cake away from strangers." : tone === "poetic" ? "May your day bloom like quiet starlight." : "Love always."}`;
  return new Promise((resolve) => {
    setTimeout(() => resolve({ short, long }), 1200 + Math.random() * 800);
  });
}

export default function AIGreetingCardApp() {
  const [stage, setStage] = useState(0); // 0: landing, 1: occasion, 2: form, 3: loading, 4: result
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);
  const [name, setName] = useState("");
  const [memory, setMemory] = useState("");
  const [personality, setPersonality] = useState("");
  const [tone, setTone] = useState("heartfelt");
  const [aiResult, setAiResult] = useState(null);
  const [isConfetti, setIsConfetti] = useState(false);
  const [showLong, setShowLong] = useState(false);
  const cardRef = useRef(null);

  async function handleGenerate() {
    setStage(3);
    setIsConfetti(false);
    try {
      const res = await mockAI({ name, memory, tone, personality, occasion: selectedOccasion?.title });
      setAiResult(res);
      setStage(4);
      // tiny confetti effect trigger
      setTimeout(() => setIsConfetti(true), 150);
    } catch (err) {
      console.error(err);
      setStage(2);
      alert("Something went wrong. Please try again.");
    }
  }

  function resetToLanding() {
    setStage(0);
    setAiResult(null);
    setIsConfetti(false);
  }

  async function handleShare() {
    const text = showLong ? aiResult?.long : aiResult?.short;
    if (!text) return;

    if (navigator.canShare && navigator.share) {
      try {
        await navigator.share({ title: `${selectedOccasion?.title} greeting for ${name}`, text });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      // fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        alert("Greeting copied to clipboard — paste it anywhere to share!");
      } catch (err) {
        alert("Unable to share — try copying the text manually.");
      }
    }
  }

  function downloadText() {
    const text = showLong ? aiResult?.long : aiResult?.short;
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedOccasion?.id || "greeting"}_${name || "friend"}.txt"`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Turn Your Feelings into Art — Instantly
          </h1>
          <button
            onClick={resetToLanding}
            className="text-sm px-3 py-1 rounded-full bg-white/60 shadow-sm"
          >
            Reset
          </button>
        </div>

        {/* Main card container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {/* left column: flow */}
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="landing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <p className="text-lg text-gray-600">AI-crafted messages + beautiful cards in seconds.</p>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStage(1)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8A80] text-white font-semibold shadow-md"
                    >
                      Start Now
                    </button>
                    <button
                      onClick={() => setStage(1)}
                      className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm"
                    >
                      Explore Samples
                    </button>
                  </div>

                  {/* sample carousel */}
                  <div className="mt-8">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="min-w-[210px] bg-gradient-to-br from-white to-white/90 rounded-xl p-4 shadow-inner">
                          <div className="text-3xl">🎨</div>
                          <p className="mt-4 font-semibold">Sample Card #{i}</p>
                          <p className="mt-2 text-sm text-gray-500">Short preview of a friendly message.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 1 && (
                <motion.div
                  key="occasion"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-semibold mb-4">Pick an Occasion</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {OCCASIONS.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => { setSelectedOccasion(o); setStage(2); }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transform transition hover:scale-105 ${o.color} shadow-sm`}
                      >
                        <div className="text-3xl">{o.emoji}</div>
                        <div className="font-medium">{o.title}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {stage === 2 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Personalize</h2>
                    <div className="text-sm text-gray-500">Step 2 of 3</div>
                  </div>

                  <div className="space-y-4">
                    <label className="block">
                      <div className="text-sm text-gray-600">What’s their name?</div>
                      <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2" placeholder="e.g. Aisha" />
                    </label>

                    <label className="block">
                      <div className="text-sm text-gray-600">What’s one memory that makes you smile?</div>
                      <textarea value={memory} onChange={(e) => setMemory(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2" rows={3} placeholder="A silly trip, a quiet evening..." />
                    </label>

                    <label className="block">
                      <div className="text-sm text-gray-600">What’s their personality in one word?</div>
                      <div className="mt-2 flex gap-2">
                        {["warm", "quirky", "bold", "gentle"].map((p) => (
                          <button key={p} onClick={() => setPersonality(p)} className={`px-3 py-1 rounded-full border ${personality === p ? "bg-amber-200" : "bg-white"}`}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </label>

                    <label className="block">
                      <div className="text-sm text-gray-600">Tone</div>
                      <div className="mt-2 flex gap-2">
                        {["funny", "heartfelt", "poetic"].map((t) => (
                          <button key={t} onClick={() => setTone(t)} className={`px-3 py-1 rounded-lg ${tone === t ? "bg-gradient-to-r from-[#00C9A7] to-[#66D4B1] text-white" : "bg-white border"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </label>

                    <div className="mt-3 flex gap-3">
                      <button onClick={handleGenerate} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8A80] text-white font-semibold shadow-md">Make My Card</button>
                      <button onClick={() => setStage(1)} className="px-4 py-3 rounded-xl bg-white border">Back</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 3 && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg flex items-center gap-4"
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.6 }} className="p-4 bg-white rounded-full shadow">
                    ✨
                  </motion.div>
                  <div>
                    <div className="font-medium">We’re wrapping your thoughts into something beautiful…</div>
                    <div className="text-sm text-gray-500 mt-1">This usually takes a second — adding sprinkles of personality.</div>
                  </div>
                </motion.div>
              )}

              {stage === 4 && aiResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Here’s your card — ready to share!</h3>
                      <p className="text-sm text-gray-500">Toggle the length and try sharing or downloading.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowLong(false)} className={`px-3 py-1 rounded-lg ${!showLong ? "bg-amber-100" : "bg-white border"}`}>Short</button>
                      <button onClick={() => setShowLong(true)} className={`px-3 py-1 rounded-lg ${showLong ? "bg-amber-100" : "bg-white border"}`}>Long</button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div ref={cardRef} className="mx-auto max-w-md border rounded-2xl p-6 shadow-2xl bg-gradient-to-br from-white to-white/90">
                      <div className="text-sm text-gray-400">{selectedOccasion?.emoji} {selectedOccasion?.title}</div>
                      <div className="mt-3 text-xl font-bold" style={{ fontFamily: "'Baloo 2', cursive" }}>{`For ${name || "someone special"}`}</div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-4 text-gray-700 whitespace-pre-line">
                        {showLong ? aiResult.long : aiResult.short}
                      </motion.div>

                      <div className="mt-6 text-xs text-gray-400">Made with ♥ by AI Greeting Card Generator</div>
                    </div>

                    <div className="mt-4 flex gap-3 justify-center">
                      <button onClick={handleShare} className="px-4 py-2 rounded-full bg-teal-400 text-white">Share</button>
                      <button onClick={downloadText} className="px-4 py-2 rounded-full bg-[#FF6B6B] text-white">Download</button>
                      <button onClick={() => { setStage(2); setAiResult(null); }} className="px-3 py-2 rounded-full bg-white border">Edit</button>
                    </div>

                    {/* gift suggestions */}
                    <div className="mt-6">
                      <h4 className="font-medium">Gift suggestions</h4>
                      <div className="mt-3 flex gap-3 overflow-x-auto">
                        {[
                          { title: "Bouquet", note: "Fresh flowers" },
                          { title: "Custom Mug", note: "Photo + text" },
                          { title: "E-Gift Card", note: "Instant delivery" },
                        ].map((g) => (
                          <div key={g.title} className="min-w-[160px] bg-white rounded-xl p-3 shadow-sm">
                            <div className="font-semibold">{g.title}</div>
                            <div className="text-xs text-gray-500">{g.note}</div>
                            <div className="mt-3 text-sm text-teal-600">Shop →</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            {/* Right column: persistent preview and mobile considerations */}
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-sm text-gray-500">Live Preview</div>
                <div className="mt-4 mx-auto max-w-xs border rounded-xl p-4 bg-gradient-to-br from-white to-white/95 shadow-inner">
                  <div className="text-3xl">{selectedOccasion?.emoji}</div>
                  <div className="mt-2 font-semibold">{selectedOccasion?.title}</div>
                  <div className="mt-4 text-sm text-gray-600 whitespace-pre-line">{aiResult ? (showLong ? aiResult.long : aiResult.short) : `A heartfelt greeting will appear here once generated.`}</div>
                </div>

                <div className="mt-4 text-xs text-gray-400">Mobile friendly • Big tap targets • Share-ready</div>
              </div>

              <div className="mt-6 hidden sm:block bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-sm font-medium mb-2">Micro interactions</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Confetti on card ready</li>
                  <li>• Typing reveal for generated text</li>
                  <li>• Bounce on occasion hover</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* confetti simple visual */}
        <AnimatePresence>
          {isConfetti && (
            <motion.div key="confetti" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 flex items-start justify-center p-6">
              <div className="w-full max-w-4xl flex justify-center gap-2">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.div key={i} animate={{ y: [0, 80] }} transition={{ duration: 1.2, delay: i * 0.04 }} className={`w-2 h-4 rounded-sm ${["bg-pink-400","bg-amber-400","bg-teal-300","bg-purple-300"][i % 4]}`} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
