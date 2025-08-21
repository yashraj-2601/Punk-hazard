import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Camera, Send, MoreHorizontal, Target, Battery, Smartphone, Monitor, Plus } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Emma Chen",
    avatar: "EC",
    timestamp: "2 hours ago",
    content: "Just submitted my old laptop for recycling! 💻♻️ It feels amazing knowing it won't end up in a landfill. The QR code scanning feature made the process so smooth!",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    author: "Marcus Johnson",
    avatar: "MJ",
    timestamp: "4 hours ago",
    content: "Pro tip: Before recycling your phone, make sure to remove all personal data and perform a factory reset. Here's a quick guide I found helpful! 📱🔒",
    likes: 18,
    comments: 5,
    isLiked: true
  },
  {
    id: 3,
    author: "Priya Patel",
    avatar: "PP",
    timestamp: "1 day ago",
    content: "Our school's e-waste collection drive was a huge success! We collected over 200 devices in just one week. Every small action counts towards a greener future! 🌱",
    image: "https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400",
    likes: 42,
    comments: 12,
    isLiked: false
  }
];

const challengesData = [
  {
    id: 1,
    title: "Battery Recycling Week",
    description: "Recycle 5 batteries this week",
    progress: 3,
    target: 5,
    points: 150,
    deadline: "3 days left",
    icon: Battery
  },
  {
    id: 2,
    title: "Phone Collection Drive",
    description: "Submit 2 old smartphones",
    progress: 1,
    target: 2,
    points: 300,
    deadline: "1 week left",
    icon: Smartphone
  },
  {
    id: 3,
    title: "Monitor Recycling Challenge",
    description: "Bring in 1 old computer monitor",
    progress: 0,
    target: 1,
    points: 500,
    deadline: "2 weeks left",
    icon: Monitor
  }
];

interface CommunityPageProps {
  onOpenSubmissionModal: (challenge?: any) => void;
}

export default function CommunityPage({ onOpenSubmissionModal }: CommunityPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('community');

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked
            }
          : post
      )
    );
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      author: "You",
      avatar: "YU",
      timestamp: "Just now",
      content: newPost,
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setSelectedImage(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community & Challenges</h2>
          <p className="text-gray-600">Connect with fellow eco-warriors and take on exciting challenges</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'community'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Community Posts
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'challenges'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              Active Challenges
            </button>
          </div>
        </div>

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="max-w-2xl mx-auto">
        {/* Create Post Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              YU
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your e-waste story, tips, or achievements..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={3}
              />
              
              {selectedImage && (
                <div className="mt-3 relative inline-block">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Camera className="h-5 w-5 text-gray-500" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="px-6 pb-4">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div>
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Active Challenges</h3>
              <p className="text-gray-600">Complete challenges to earn bonus points and badges</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challengesData.map((challenge) => {
                const Icon = challenge.icon;
                const progressPercentage = (challenge.progress / challenge.target) * 100;
                
                return (
                  <div key={challenge.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-600">+{challenge.points} pts</span>
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 mb-6">{challenge.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-600 font-medium">{challenge.deadline}</span>
                      <button 
                        onClick={() => onOpenSubmissionModal(challenge)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                      >
                        {challenge.progress === challenge.target ? 'Completed' : 'Join Challenge'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Submit Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => onOpenSubmissionModal()}
                className="flex items-center space-x-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transform hover:scale-105 transition-all shadow-lg mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span>Submit E-Waste</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}