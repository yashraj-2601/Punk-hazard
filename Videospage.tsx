import React, { useState, useRef } from 'react';
import { Play, ChevronDown, TrendingUp, Recycle } from 'lucide-react';

const videosData = [
  {
    id: 1,
    title: "Turn Old Phones into Security Cameras",
    thumbnail: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    duration: "2:34",
    views: "12K"
  },
  {
    id: 2,
    title: "DIY Speaker from Old Monitor",
    thumbnail: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    duration: "3:21",
    views: "8.5K"
  },
  {
    id: 3,
    title: "Laptop Battery to Power Bank",
    thumbnail: "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    duration: "4:15",
    views: "15K"
  },
  {
    id: 4,
    title: "Old Circuit Board Art",
    thumbnail: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300&h=400",
    duration: "1:58",
    views: "6.2K"
  }
];

export default function VideosPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleVideoScroll = (direction: 'up' | 'down') => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (direction === 'down' && currentVideoIndex < videosData.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      container.scrollBy({ top: container.clientHeight, behavior: 'smooth' });
    } else if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
      container.scrollBy({ top: -container.clientHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Play className="h-16 w-16 text-white mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Upcycling Reels</h2>
          <p className="text-xl text-gray-300">Creative ways to give your e-waste a second life</p>
        </div>

        <div className="relative">
          <div 
            ref={videoContainerRef}
            className="h-[600px] overflow-hidden rounded-2xl bg-gray-900"
          >
            {videosData.map((video, index) => (
              <div
                key={video.id}
                className={`relative h-full w-full transition-transform duration-500 ${
                  index === currentVideoIndex ? 'transform translate-y-0' : 'transform translate-y-full'
                }`}
                style={{
                  backgroundImage: `url(${video.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <div className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                      {video.duration}
                    </div>
                    <div className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                      {video.views} views
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <button className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{video.title}</h3>
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-1 text-white">
                        <TrendingUp className="h-5 w-5" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-1 text-white">
                        <Recycle className="h-5 w-5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Video Navigation */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
            <button
              onClick={() => handleVideoScroll('up')}
              disabled={currentVideoIndex === 0}
              className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white disabled:opacity-30 hover:bg-opacity-30 transition-all"
            >
              <ChevronDown className="h-6 w-6 transform rotate-180" />
            </button>
            <button
              onClick={() => handleVideoScroll('down')}
              disabled={currentVideoIndex === videosData.length - 1}
              className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white disabled:opacity-30 hover:bg-opacity-30 transition-all"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>

          {/* Video Indicators */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
            {videosData.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 rounded-full transition-all ${
                  index === currentVideoIndex ? 'bg-white' : 'bg-white bg-opacity-30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}