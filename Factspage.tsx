import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const factsData = [
  {
    id: 1,
    fact: "Every year, the world generates over 50 million tons of electronic waste.",
    impact: "That's equivalent to throwing away 1,000 laptops every second!"
  },
  {
    id: 2,
    fact: "Only 12.5% of e-waste is currently recycled worldwide.",
    impact: "We could recover $62.5 billion worth of materials annually with proper recycling."
  },
  {
    id: 3,
    fact: "One smartphone contains over 60 different elements from the periodic table.",
    impact: "Including gold, silver, copper, and rare earth elements worth about $13."
  },
  {
    id: 4,
    fact: "Recycling one laptop can save enough energy to power a home for 3.5 days.",
    impact: "And prevents 300kg of CO2 emissions!"
  }
];

export default function FactsPage() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Auto-rotate facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % factsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Lightbulb className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Did You Know?</h2>
          <p className="text-xl text-gray-600">Fascinating facts about e-waste and its environmental impact</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-indigo-100">
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-2 mb-6">
              {factsData.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentFactIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            
            <div className="min-h-[200px] flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                {factsData[currentFactIndex].fact}
              </h3>
              <p className="text-lg text-indigo-600 font-medium">
                {factsData[currentFactIndex].impact}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentFactIndex((prev) => (prev - 1 + factsData.length) % factsData.length)}
              className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentFactIndex((prev) => (prev + 1) % factsData.length)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Next Fact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}