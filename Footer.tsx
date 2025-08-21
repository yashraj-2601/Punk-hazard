import React from 'react';
import { Recycle } from 'lucide-react';

// Inside your component's return statement, where the `Recycle` icon is used:


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Recycle className="h-8 w-8 text-white md:h-10 md:w-10" />
            <a href="https://ecomtrack.vercel.app">
            <span className="text-xl font-semibold">Ecotrack</span>
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-2">
              Making e-waste management engaging for students worldwide
            </p>
            <p className="text-sm text-gray-500">
              © 2025 EcoTrack. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}