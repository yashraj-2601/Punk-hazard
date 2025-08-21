import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Recycle, Award } from 'lucide-react';

const eWasteData = [
  { type: 'Smartphones', count: 245, percentage: 35, impact: '12.3 kg CO₂ saved' },
  { type: 'Laptops', count: 89, percentage: 25, impact: '45.2 kg CO₂ saved' },
  { type: 'Batteries', count: 156, percentage: 20, impact: '8.7 kg CO₂ saved' },
  { type: 'Cables', count: 98, percentage: 12, impact: '3.4 kg CO₂ saved' },
  { type: 'Monitors', count: 34, percentage: 8, impact: '28.9 kg CO₂ saved' }
];

const branchData = [
  { branch: 'Computer Science', students: 156, items: 342, points: 8450, rank: 1 },
  { branch: 'Electronics', students: 134, items: 298, points: 7230, rank: 2 },
  { branch: 'Mechanical', students: 142, items: 267, points: 6890, rank: 3 },
  { branch: 'Civil', students: 128, items: 234, points: 5670, rank: 4 },
  { branch: 'Chemical', students: 98, items: 189, points: 4320, rank: 5 }
];

const impactMetrics = [
  { label: 'Total E-Waste Collected', value: '1,330', unit: 'items', icon: Recycle, color: 'emerald' },
  { label: 'CO₂ Emissions Prevented', value: '98.5', unit: 'kg', icon: TrendingUp, color: 'blue' },
  { label: 'Active Students', value: '658', unit: 'students', icon: Users, color: 'purple' },
  { label: 'Points Distributed', value: '32,560', unit: 'points', icon: Award, color: 'yellow' }
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getColorClass = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <BarChart3 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
          <p className="text-xl text-gray-600">Comprehensive insights into e-waste management across all branches</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'ewaste', label: 'E-Waste Types' },
              { id: 'branches', label: 'Branch Performance' },
              { id: 'impact', label: 'Environmental Impact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getColorClass(metric.color)} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-500 mb-2">{metric.unit}</div>
                    <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">89%</div>
                  <div className="text-gray-600">Student Participation Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2.3x</div>
                  <div className="text-gray-600">Growth vs Last Month</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
                  <div className="text-gray-600">Trees Equivalent Saved</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* E-Waste Types Tab */}
        {activeTab === 'ewaste' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">E-Waste Distribution by Type</h3>
              <div className="space-y-6">
                {eWasteData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{item.type}</span>
                        <span className="text-sm text-gray-600">{item.count} items</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{item.percentage}% of total</span>
                        <span className="text-emerald-600 font-medium">{item.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Branch Performance Tab */}
        {activeTab === 'branches' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Branch Performance Leaderboard</h3>
              <div className="space-y-4">
                {branchData.map((branch, index) => (
                  <div key={index} className={`flex items-center p-6 rounded-2xl transition-all hover:transform hover:scale-105 ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 shadow-lg'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 shadow-md'
                      : index === 2
                      ? 'bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300 shadow-md'
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`text-2xl font-bold ${
                        index === 0 ? 'text-yellow-600' :
                        index === 1 ? 'text-gray-600' :
                        index === 2 ? 'text-amber-600' :
                        'text-gray-500'
                      }`}>
                        #{branch.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{branch.branch}</h4>
                        <p className="text-sm text-gray-600">{branch.students} active students</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-center">
                      <div>
                        <div className="font-bold text-xl text-gray-900">{branch.items}</div>
                        <div className="text-sm text-gray-600">Items</div>
                      </div>
                      <div>
                        <div className="font-bold text-xl text-emerald-600">{branch.points}</div>
                        <div className="text-sm text-gray-600">Points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Environmental Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Carbon Footprint Reduction</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-bold text-emerald-600">98.5 kg CO₂</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Year</span>
                    <span className="font-bold text-emerald-600">1,247 kg CO₂</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">All Time</span>
                    <span className="font-bold text-emerald-600">3,892 kg CO₂</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Resource Conservation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Saved</span>
                    <span className="font-bold text-blue-600">15,420 L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Energy Saved</span>
                    <span className="font-bold text-purple-600">2,340 kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Materials Recovered</span>
                    <span className="font-bold text-yellow-600">$1,890</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Environmental Achievement</h3>
              <p className="text-emerald-100 mb-6">
                Your collective efforts have made a significant impact on environmental conservation. 
                Together, we've prevented the equivalent of 156 trees from being cut down and saved 
                enough energy to power 78 homes for a month!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">156</div>
                  <div className="text-emerald-200">Trees Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">78</div>
                  <div className="text-emerald-200">Homes Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">2.1</div>
                  <div className="text-emerald-200">Tons CO₂ Prevented</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}