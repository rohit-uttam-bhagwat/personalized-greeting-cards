// src/pages/CreateCard.js
import React, { useState } from "react";
import OccasionSelection from "../components/OccasionSelection";
import PersonalizationForm from "../components/PersonalizationForm";
import LoadingScreen from "../components/LoadingScreen";
import GeneratedCard from "../components/GeneratedCard";

export default function CreateCard() {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);

  const handleOccasionSelect = (selectedOccasion) => {
    setOccasion(selectedOccasion);
    setStep(2);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setLoading(true);
    setStep(3);

    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedCard({
        message: `Happy ${occasion}! ${data.name}, you are truly one of a kind. Remember when ${data.memory}? That’s just one reason I’m grateful for you!`,
        image: "/assets/generated/sample-result.png",
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {step === 1 && <OccasionSelection onSelect={handleOccasionSelect} />}
      {step === 2 && <PersonalizationForm onSubmit={handleFormSubmit} />}
      {step === 3 && loading && (
        <LoadingScreen message="We’re wrapping your thoughts into something beautiful…" />
      )}
      {step === 4 && generatedCard && (
        <GeneratedCard
          message={generatedCard.message}
          image={generatedCard.image}
          onRegenerate={() => setStep(2)}
        />
      )}
    </div>
  );
}
