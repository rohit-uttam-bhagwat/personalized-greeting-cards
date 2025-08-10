// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import sampleCards from "../assets/sample-cards/sampleCards";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center p-6">
      <header className="text-center mt-12">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-sm">
          AI Greeting Card Generator
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Create hyper-personalized, beautifully designed greeting cards for any
          occasion — powered by AI.
        </p>
        <button
          onClick={() => navigate("/create")}
          className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-2xl text-lg shadow-lg hover:bg-purple-700 transition"
        >
          Start Now
        </button>
      </header>

      <section className="mt-16 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Sample Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sampleCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img src={card.src} alt={card.alt} className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="text-gray-700 text-sm">{card.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}