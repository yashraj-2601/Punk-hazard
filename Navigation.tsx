import React from 'react';
import { Recycle } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: { username: string; email: string } | null;
  onSignOut: () => void;
}

export default function Navigation({ activeSection, onSectionChange, user, onSignOut }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'community', label: 'Community & Challenges' },
    { id: 'facts', label: 'Learn' },
    { id: 'videos', label: 'Reels' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-semibold text-gray-900">EcoTrack</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* User Menu */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={onSignOut}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex">
              <button
                onClick={() => onSectionChange('home')}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="bg-transparent border-none text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}