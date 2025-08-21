import React from 'react';
import { Trophy, Award } from 'lucide-react';

const leaderboardData = [
  { id: 1, name: "Emma Chen", points: 2450, items: 89, avatar: "EC", rank: 1 },
  { id: 2, name: "Marcus Johnson", points: 2310, items: 76, avatar: "MJ", rank: 2 },
  { id: 3, name: "Priya Patel", points: 2180, items: 71, avatar: "PP", rank: 3 },
  { id: 4, name: "Alex Rivera", points: 1950, items: 65, avatar: "AR", rank: 4 },
  { id: 5, name: "Sofia Khan", points: 1820, items: 58, avatar: "SK", rank: 5 },
];

export default function LeaderboardPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Leaderboard</h2>
          <p className="text-xl text-gray-600">Compete with your peers and climb the ranks</p>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((student, index) => (
            <div
              key={student.id}
              className={`flex items-center p-6 rounded-2xl transition-all hover:transform hover:scale-105 ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 shadow-lg'
                  : index === 1
                  ? 'bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 shadow-md'
                  : index === 2
                  ? 'bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300 shadow-md'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className={`relative ${
                  index < 3 ? 'transform scale-110' : ''
                }`}>
                  {index === 0 && <Award className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}>
                    {student.avatar}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.items} items submitted</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="font-bold text-xl text-gray-900">{student.points}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
                <div className={`text-2xl font-bold ${
                  index === 0 ? 'text-yellow-600' :
                  index === 1 ? 'text-gray-600' :
                  index === 2 ? 'text-amber-600' :
                  'text-gray-500'
                }`}>
                  #{student.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}