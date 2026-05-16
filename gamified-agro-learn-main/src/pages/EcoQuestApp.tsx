import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LanguageSelection from '@/components/onboarding/LanguageSelection';
import AvatarCreation from '@/components/onboarding/AvatarCreation';
import BasicInfo from '@/components/onboarding/BasicInfo';
import Dashboard from '@/components/Dashboard';
import VillageMap from '@/components/VillageMap';
import PlayLearnSection from '@/components/PlayLearnSection';
import LibrarySection from '@/components/LibrarySection';
import LeaderboardSection from '@/components/LeaderboardSection';
import RewardsSection from '@/components/RewardsSection';

type AppState = 
  | 'splash' 
  | 'language' 
  | 'avatar' 
  | 'info' 
  | 'dashboard' 
  | 'village-map' 
  | 'play-learn'
  | 'library'
  | 'leaderboard'
  | 'rewards';

interface Avatar {
  gender: 'boy' | 'girl';
  skinTone: string;
  hairColor: string;
  shirtColor: string;
}

interface UserInfo {
  name: string;
  grade: string;
  schoolCode: string;
}

const EcoQuestApp = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Load saved data on app start
  useEffect(() => {
    const savedData = localStorage.getItem('ecoquest-user-data');
    if (savedData) {
      try {
        const { language, avatar: savedAvatar, userInfo: savedUserInfo } = JSON.parse(savedData);
        setSelectedLanguage(language);
        setAvatar(savedAvatar);
        setUserInfo(savedUserInfo);
        
        // Skip to dashboard if user data exists
        if (language && savedAvatar && savedUserInfo) {
          setTimeout(() => setAppState('dashboard'), 3000);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Save user data
  const saveUserData = () => {
    const userData = {
      language: selectedLanguage,
      avatar,
      userInfo
    };
    localStorage.setItem('ecoquest-user-data', JSON.stringify(userData));
  };

  // Navigation handlers
  const handleSplashComplete = () => {
    setAppState('language');
  };

  const handleLanguageContinue = () => {
    setAppState('avatar');
  };

  const handleAvatarContinue = () => {
    setAppState('info');
  };

  const handleInfoComplete = () => {
    saveUserData();
    setAppState('dashboard');
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'village-map':
        setAppState('village-map');
        break;
      case 'play-learn':
        setAppState('play-learn');
        break;
      case 'library':
        setAppState('library');
        break;
      case 'leaderboard':
        setAppState('leaderboard');
        break;
      case 'rewards':
        setAppState('rewards');
        break;
      default:
        setAppState('dashboard');
    }
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  // Render current state
  switch (appState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'language':
      return (
        <LanguageSelection
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
          onContinue={handleLanguageContinue}
        />
      );
    
    case 'avatar':
      return (
        <AvatarCreation
          avatar={avatar}
          onAvatarChange={setAvatar}
          onContinue={handleAvatarContinue}
        />
      );
    
    case 'info':
      return (
        <BasicInfo
          userInfo={userInfo}
          onInfoChange={setUserInfo}
          onComplete={handleInfoComplete}
        />
      );
    
    case 'dashboard':
      return (
        <Dashboard
          userInfo={userInfo}
          avatar={avatar}
          onNavigate={handleNavigate}
        />
      );
    
    case 'village-map':
      return (
        <VillageMap
          onBack={handleBackToDashboard}
          onPlayGame={(milestone) => {
            console.log('Playing game:', milestone);
            // TODO: Navigate to specific game
          }}
          userProgress={3}
        />
      );
    
    case 'play-learn':
      return (
        <PlayLearnSection
          onBack={handleBackToDashboard}
          userGrade={userInfo?.grade || '1st Grade'}
        />
      );
    
    case 'library':
      return (
        <LibrarySection
          onBack={handleBackToDashboard}
          userGrade={userInfo?.grade || '1st Grade'}
        />
      );
    
    case 'leaderboard':
      return (
        <LeaderboardSection
          onBack={handleBackToDashboard}
          currentUser={userInfo}
        />
      );
    
    case 'rewards':
      return (
        <RewardsSection
          onBack={handleBackToDashboard}
          userInfo={userInfo}
        />
      );
    
    default:
      return <Dashboard userInfo={userInfo} avatar={avatar} onNavigate={handleNavigate} />;
  }
};

export default EcoQuestApp;