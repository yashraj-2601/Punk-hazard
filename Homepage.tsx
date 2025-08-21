import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HomePageProps {
  onNavigate: (section: string) => void;
  onGetStarted: () => void;
}

export default function HomePage({ onNavigate, onGetStarted }: HomePageProps) {
  return (
    <div className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transforming
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              E-Waste
            </span>
            <br />
            Into Impact
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students making a difference. Track your e-waste contributions, 
            compete with peers, and learn how your actions save our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate('leaderboard')}
              className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-medium hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg border border-emerald-200"
            >
              View Leaderboard
            </button>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <button 
            onClick={onGetStarted}
            className="animate-bounce"
          >
            <ChevronDown className="h-8 w-8 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
}