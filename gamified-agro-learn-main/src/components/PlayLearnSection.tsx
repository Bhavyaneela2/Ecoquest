import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Star, Clock, Trophy } from 'lucide-react';
import MathGame from './games/MathGame';
import EnglishGame from './games/EnglishGame';
import ScienceGame from './games/ScienceGame';

interface Game {
  id: string;
  title: string;
  subject: string;
  grade: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  icon: string;
  playTime: string;
  rating: number;
  rewards: number;
}

interface PlayLearnSectionProps {
  onBack: () => void;
  userGrade: string;
}

const games: Game[] = [
  // Math Games
  {
    id: 'counting-mangoes',
    title: 'Counting Mangoes',
    subject: 'Math',
    grade: ['1st Grade', '2nd Grade'],
    difficulty: 'Easy',
    description: 'Count delicious mangoes and learn numbers 1-10!',
    icon: '🥭',
    playTime: '10 min',
    rating: 4.8,
    rewards: 20
  },
  {
    id: 'village-market-math',
    title: 'Village Market Math',
    subject: 'Math',
    grade: ['2nd Grade', '3rd Grade'],
    difficulty: 'Medium',
    description: 'Help farmers with addition and subtraction at the market!',
    icon: '🏪',
    playTime: '15 min',
    rating: 4.7,
    rewards: 30
  },
  {
    id: 'shape-builder',
    title: 'Shape Builder',
    subject: 'Math',
    grade: ['1st Grade', '2nd Grade', '3rd Grade'],
    difficulty: 'Easy',
    description: 'Build houses using different shapes!',
    icon: '🏠',
    playTime: '12 min',
    rating: 4.9,
    rewards: 25
  },
  {
    id: 'farm-fractions',
    title: 'Farm Fractions',
    subject: 'Math',
    grade: ['3rd Grade', '4th Grade', '5th Grade'],
    difficulty: 'Hard',
    description: 'Divide crops equally among village families!',
    icon: '🌾',
    playTime: '20 min',
    rating: 4.5,
    rewards: 40
  },

  // English Games
  {
    id: 'letter-garden',
    title: 'Letter Garden',
    subject: 'English',
    grade: ['1st Grade', '2nd Grade'],
    difficulty: 'Easy',
    description: 'Plant alphabet seeds and grow beautiful letters!',
    icon: '🌱',
    playTime: '8 min',
    rating: 4.9,
    rewards: 18
  },
  {
    id: 'word-builder',
    title: 'Word Builder',
    subject: 'English',
    grade: ['2nd Grade', '3rd Grade', '4th Grade'],
    difficulty: 'Medium',
    description: 'Combine letters to build words for the village library!',
    icon: '📝',
    playTime: '15 min',
    rating: 4.6,
    rewards: 35
  },
  {
    id: 'story-maker',
    title: 'Story Maker',
    subject: 'English',
    grade: ['3rd Grade', '4th Grade', '5th Grade'],
    difficulty: 'Hard',
    description: 'Create amazing stories about village adventures!',
    icon: '📖',
    playTime: '25 min',
    rating: 4.8,
    rewards: 45
  },

  // Science Games
  {
    id: 'animal-friends',
    title: 'Animal Friends',
    subject: 'Science',
    grade: ['1st Grade', '2nd Grade'],
    difficulty: 'Easy',
    description: 'Meet and learn about animals living in the village!',
    icon: '🐄',
    playTime: '12 min',
    rating: 4.9,
    rewards: 22
  },
  {
    id: 'water-cycle-adventure',
    title: 'Water Cycle Adventure',
    subject: 'Science',
    grade: ['3rd Grade', '4th Grade'],
    difficulty: 'Medium',
    description: 'Follow water on its amazing journey through nature!',
    icon: '💧',
    playTime: '18 min',
    rating: 4.7,
    rewards: 38
  },
  {
    id: 'plant-life',
    title: 'Plant Life Cycle',
    subject: 'Science',
    grade: ['2nd Grade', '3rd Grade', '4th Grade'],
    difficulty: 'Medium',
    description: 'Watch seeds grow into beautiful plants!',
    icon: '🌻',
    playTime: '16 min',
    rating: 4.8,
    rewards: 32
  }
];

const PlayLearnSection = ({ onBack, userGrade }: PlayLearnSectionProps) => {
  const subjects = ['All', 'Math', 'English', 'Science'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Filter games based on user grade and selections
  const filteredGames = games.filter(game => {
    const gradeMatch = game.grade.includes(userGrade);
    const subjectMatch = selectedSubject === 'All' || game.subject === selectedSubject;
    const difficultyMatch = selectedDifficulty === 'All' || game.difficulty === selectedDifficulty;
    return gradeMatch && subjectMatch && difficultyMatch;
  });

  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const playGame = (game: Game) => {
    setCurrentGame(game.id);
  };

  const handleGameComplete = (score: number, timeSpent: number) => {
    // Save game results to localStorage
    const gameResults = JSON.parse(localStorage.getItem('ecoquest-game-results') || '[]');
    gameResults.push({
      gameId: currentGame,
      score,
      timeSpent,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('ecoquest-game-results', JSON.stringify(gameResults));
    setCurrentGame(null);
  };

  // Show game if one is selected
  if (currentGame) {
    const game = games.find(g => g.id === currentGame);
    if (game?.subject === 'Math') {
      return <MathGame gameId={currentGame} onBack={() => setCurrentGame(null)} onGameComplete={handleGameComplete} />;
    } else if (game?.subject === 'English') {
      return <EnglishGame gameId={currentGame} onBack={() => setCurrentGame(null)} onGameComplete={handleGameComplete} />;
    } else if (game?.subject === 'Science') {
      return <ScienceGame gameId={currentGame} onBack={() => setCurrentGame(null)} onGameComplete={handleGameComplete} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 relative overflow-hidden">
      {/* Village background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10">🏘️</div>
        <div className="absolute top-20 right-20 text-4xl opacity-10">🌳</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10">🎮</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-10">🌻</div>
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        
        <div className="village-card px-4 py-2 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold font-fredoka text-village-dark">🎮 Play & Learn</h1>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="village-card p-4 mb-6 bg-white/80 backdrop-blur-sm"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <div className="flex flex-wrap gap-2">
              {subjects.map(subject => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                  className="text-xs"
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className="text-xs"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Games Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="village-card overflow-hidden cursor-pointer group bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all">
              <div className="relative">
                <div className={`h-32 bg-gradient-to-br ${
                  game.subject === 'Math' ? 'from-primary to-primary-light' :
                  game.subject === 'English' ? 'from-accent to-accent-light' :
                  'from-success to-success-light'
                } flex items-center justify-center text-6xl`}>
                  {game.icon}
                </div>
                <Badge 
                  className={`absolute top-2 right-2 ${
                    game.difficulty === 'Easy' ? 'bg-success' :
                    game.difficulty === 'Medium' ? 'bg-warning' :
                    'bg-error'
                  } text-white`}
                >
                  {game.difficulty}
                </Badge>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{game.subject}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning" />
                    <span className="text-xs">{game.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-bold font-fredoka mb-2">{game.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {game.playTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-secondary" />
                    {game.rewards} coins
                  </div>
                </div>
                
                <Button 
                  onClick={() => playGame(game)}
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Game
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredGames.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold font-fredoka mb-2">No games found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more games!</p>
        </motion.div>
      )}
    </div>
  );
};

export default PlayLearnSection;