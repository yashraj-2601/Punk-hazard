import React from 'react';
import { TreePine, Droplets, Recycle, Plus } from 'lucide-react';

interface DashboardPageProps {
  onOpenSubmissionModal: () => void;
}

export default function DashboardPage({ onOpenSubmissionModal }: DashboardPageProps) {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Dashboard</h2>
          <p className="text-xl text-gray-600">See the real environmental difference you're making</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between mb-6">
              <TreePine className="h-12 w-12 text-emerald-600" />
              <span className="text-3xl font-bold text-emerald-800">127</span>
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">Trees Saved</h3>
            <p className="text-emerald-700">Your e-waste recycling efforts have saved the equivalent of 127 trees from being cut down.</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <Droplets className="h-12 w-12 text-blue-600" />
              <span className="text-3xl font-bold text-blue-800">3,240L</span>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Water Conserved</h3>
            <p className="text-blue-700">Manufacturing new electronics requires massive amounts of water. You've saved 3,240 liters!</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <Recycle className="h-12 w-12 text-purple-600" />
              <span className="text-3xl font-bold text-purple-800">89</span>
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Items Recycled</h3>
            <p className="text-purple-700">From smartphones to batteries, every item you've submitted makes a difference.</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <button
              onClick={onOpenSubmissionModal}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Submit E-Waste</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,450</div>
              <div className="text-gray-400">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">#1</div>
              <div className="text-gray-400">Current Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15kg</div>
              <div className="text-gray-400">CO₂ Prevented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">$47</div>
              <div className="text-gray-400">Materials Recovered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}