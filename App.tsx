import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SubmissionModal from './components/SubmissionModal';
import SignInModal from './components/SignInModal';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ChallengesPage from './pages/ChallengesPage';
import CommunityPage from './pages/CommunityPage';
import FactsPage from './pages/FactsPage';
import VideosPage from './pages/VideosPage';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const handleSubmission = (data: any) => {
    console.log('Submission data:', data);
    // Here you would typically send the data to your backend
    alert('E-waste submitted successfully! Points will be added to your account.');
  };

  const handleSignIn = (userData: { username: string; email: string }) => {
    setUser(userData);
    setActiveSection('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setActiveSection('home');
  };

  const handleGetStarted = () => {
    if (user) {
      setActiveSection('dashboard');
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const openSubmissionModal = (challenge?: any) => {
    if (!user) {
      setIsSignInModalOpen(true);
      return;
    }
    setSelectedChallenge(challenge);
    setIsSubmissionModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage onNavigate={setActiveSection} onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return user ? <DashboardPage onOpenSubmissionModal={() => openSubmissionModal()} /> : <HomePage onNavigate={setActiveSection} onGetStarted={handleGetStarted} />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'challenges':
        return user ? <ChallengesPage onOpenSubmissionModal={openSubmissionModal} /> : <HomePage onNavigate={setActiveSection} onGetStarted={handleGetStarted} />;
      case 'community':
        return user ? <CommunityPage /> : <HomePage onNavigate={setActiveSection} onGetStarted={handleGetStarted} />;
      case 'facts':
        return <FactsPage />;
      case 'videos':
        return <VideosPage />;
      default:
        return <HomePage onNavigate={setActiveSection} onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        user={user}
        onSignOut={handleSignOut}
      />
      
      <main>
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onSubmit={handleSubmission}
        challengeTitle={selectedChallenge?.title}
        pointsReward={selectedChallenge?.points}
      />
    </div>
  );
}

export default App;