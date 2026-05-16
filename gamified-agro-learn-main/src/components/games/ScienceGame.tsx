import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star, Clock } from 'lucide-react';

interface ScienceGameProps {
  gameId: string;
  onBack: () => void;
  onGameComplete: (score: number, timeSpent: number) => void;
}

const ScienceGame = ({ gameId, onBack, onGameComplete }: ScienceGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const gameData = {
    'animal-friends': {
      title: 'Animal Friends',
      icon: '🐄',
      description: 'Meet and learn about animals living in the village!',
      generateQuestion: () => {
        const animals = [
          { name: 'Cow', sound: 'Moo', emoji: '🐄', home: 'Farm' },
          { name: 'Bird', sound: 'Tweet', emoji: '🐦', home: 'Tree' },
          { name: 'Dog', sound: 'Woof', emoji: '🐕', home: 'House' },
          { name: 'Cat', sound: 'Meow', emoji: '🐱', home: 'House' },
          { name: 'Duck', sound: 'Quack', emoji: '🦆', home: 'Pond' },
          { name: 'Goat', sound: 'Bleat', emoji: '🐐', home: 'Farm' }
        ];
        
        const animal = animals[Math.floor(Math.random() * animals.length)];
        const questionTypes = ['sound', 'home'];
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        if (questionType === 'sound') {
          const options = [animal.sound, ...animals.filter(a => a.name !== animal.name).slice(0, 3).map(a => a.sound)];
          return {
            question: `What sound does a ${animal.name.toLowerCase()} make?`,
            visual: `${animal.emoji} ${animal.name} says...?`,
            answer: animal.sound,
            options: options.sort(() => Math.random() - 0.5)
          };
        } else {
          const options = [animal.home, ...animals.filter(a => a.name !== animal.name).slice(0, 3).map(a => a.home)];
          return {
            question: `Where does a ${animal.name.toLowerCase()} live?`,
            visual: `${animal.emoji} ${animal.name} lives in...?`,
            answer: animal.home,
            options: [...new Set(options)].sort(() => Math.random() - 0.5).slice(0, 4)
          };
        }
      }
    },
    'water-cycle-adventure': {
      title: 'Water Cycle Adventure',
      icon: '💧',
      description: 'Follow water on its amazing journey through nature!',
      generateQuestion: () => {
        const waterCycle = [
          { stage: 'Evaporation', description: 'Water turns into vapor from heat', emoji: '☀️💧' },
          { stage: 'Condensation', description: 'Water vapor forms clouds', emoji: '☁️' },
          { stage: 'Precipitation', description: 'Water falls as rain or snow', emoji: '🌧️' },
          { stage: 'Collection', description: 'Water gathers in rivers and lakes', emoji: '🌊' }
        ];
        
        const stage = waterCycle[Math.floor(Math.random() * waterCycle.length)];
        const options = waterCycle.map(s => s.stage).sort(() => Math.random() - 0.5);
        
        return {
          question: 'What happens when ' + stage.description.toLowerCase() + '?',
          visual: `${stage.emoji} This is called...?`,
          answer: stage.stage,
          options: options
        };
      }
    },
    'plant-life': {
      title: 'Plant Life Cycle',
      icon: '🌻',
      description: 'Watch seeds grow into beautiful plants!',
      generateQuestion: () => {
        const plantStages = [
          { stage: 'Seed', description: 'The beginning of plant life', emoji: '🌰', next: 'Sprout' },
          { stage: 'Sprout', description: 'Small plant emerges from soil', emoji: '🌱', next: 'Sapling' },
          { stage: 'Sapling', description: 'Young plant with leaves', emoji: '🌿', next: 'Adult Plant' },
          { stage: 'Adult Plant', description: 'Fully grown plant with flowers', emoji: '🌻', next: 'Seed' }
        ];
        
        const currentStage = plantStages[Math.floor(Math.random() * plantStages.length)];
        const options = plantStages.map(s => s.stage).sort(() => Math.random() - 0.5);
        
        return {
          question: `What comes after the ${currentStage.stage.toLowerCase()} stage?`,
          visual: `${currentStage.emoji} ${currentStage.stage} → ?`,
          answer: currentStage.next,
          options: options
        };
      }
    }
  };

  const currentGameData = gameData[gameId as keyof typeof gameData];

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (currentGameData) {
      const newQuestions = Array.from({ length: 10 }, () => currentGameData.generateQuestion());
      setQuestions(newQuestions);
    }
  }, [gameId]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(120);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      if (answer === questions[currentQuestion].answer) {
        setScore(prev => prev + 12);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
        onGameComplete(score + (answer === questions[currentQuestion].answer ? 12 : 0), 120 - timeLeft);
      }
    }, 1500);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 relative overflow-hidden">
        {/* Village background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-20">🔬</div>
          <div className="absolute top-20 right-20 text-4xl opacity-20">🌳</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-20">🌿</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-20">🦋</div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto mt-20"
        >
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6 bg-white/80 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>

          <Card className="village-card p-8 text-center bg-white/90 backdrop-blur-sm">
            <div className="text-8xl mb-4">{currentGameData?.icon}</div>
            <h1 className="text-3xl font-bold font-fredoka mb-4 text-village-dark">
              {currentGameData?.title}
            </h1>
            <p className="text-village-muted mb-6 text-lg">
              {currentGameData?.description}
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Badge className="bg-success/20 text-success px-3 py-1">
                <Clock className="w-4 h-4 mr-1" />
                2 minutes
              </Badge>
              <Badge className="bg-success/20 text-success px-3 py-1">
                <Trophy className="w-4 h-4 mr-1" />
                12 points each
              </Badge>
            </div>

            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-success via-success-light to-success hover:from-success-dark hover:to-success-light text-white px-8 py-3"
            >
              Start Discovery!
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / (questions.length * 12)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 flex items-center justify-center relative overflow-hidden">
        {/* Celebration background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎉</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce">🔬</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-pulse">🎊</div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="village-card p-8 text-center bg-white/90 backdrop-blur-sm">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
            </div>
            <h2 className="text-2xl font-bold font-fredoka mb-4">
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h2>
            <div className="space-y-2 mb-6">
              <p className="text-lg">Score: {score}/{questions.length * 12}</p>
              <p className="text-village-muted">Accuracy: {percentage}%</p>
              <p className="text-village-muted">Time: {120 - timeLeft} seconds</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Games
              </Button>
              <Button onClick={startGame} className="flex-1 bg-gradient-to-r from-success to-success-light">
                Play Again
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 relative overflow-hidden">
      {/* Village background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-10">🏘️</div>
        <div className="absolute top-20 right-20 text-3xl opacity-10">🌿</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-10">🔬</div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="bg-white/80 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-4">
          <Badge className="bg-success/20 text-success px-3 py-1">
            <Clock className="w-4 h-4 mr-1" />
            {timeLeft}s
          </Badge>
          <Badge className="bg-success/20 text-success px-3 py-1">
            <Star className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-between text-sm text-village-muted mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="village-progress h-2">
          <div 
            className="village-progress-bar transition-all duration-300"
            style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="village-card p-8 bg-white/90 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-fredoka mb-4 text-village-dark">
              {question.question}
            </h2>
            <div className="text-3xl mb-4 p-4 bg-village-light/50 rounded-lg">
              {question.visual}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option: string, index: number) => (
              <Button
                key={index}
                variant={
                  showResult
                    ? option === question.answer
                      ? "default"
                      : selectedAnswer === option
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`h-16 text-lg font-fredoka ${
                  showResult && option === question.answer
                    ? "bg-success hover:bg-success text-white"
                    : ""
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              {selectedAnswer === question.answer ? (
                <p className="text-success font-medium">🎉 Correct! Amazing discovery!</p>
              ) : (
                <p className="text-error font-medium">
                  ❌ The correct answer was {question.answer}
                </p>
              )}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ScienceGame;