import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star, Clock } from 'lucide-react';

interface MathGameProps {
  gameId: string;
  onBack: () => void;
  onGameComplete: (score: number, timeSpent: number) => void;
}

const MathGame = ({ gameId, onBack, onGameComplete }: MathGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const gameData = {
    'counting-mangoes': {
      title: 'Counting Mangoes',
      icon: '🥭',
      description: 'Count the mangoes in each basket!',
      generateQuestion: () => {
        const count = Math.floor(Math.random() * 10) + 1;
        const mangoes = Array.from({ length: count }, (_, i) => i);
        const options = [count, count + 1, count - 1, count + 2].filter(n => n > 0).slice(0, 4).sort(() => Math.random() - 0.5);
        return {
          question: `How many mangoes are in the basket?`,
          visual: mangoes.map(i => '🥭').join(' '),
          answer: count,
          options: options
        };
      }
    },
    'village-market-math': {
      title: 'Village Market Math',
      icon: '🏪',
      description: 'Help with buying and selling at the market!',
      generateQuestion: () => {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = Math.random() > 0.5 ? '+' : '-';
        const answer = operation === '+' ? num1 + num2 : Math.max(num1 - num2, 0);
        const options = [answer, answer + 1, answer - 1, answer + 2].filter(n => n >= 0).slice(0, 4).sort(() => Math.random() - 0.5);
        return {
          question: `${num1} ${operation} ${num2} = ?`,
          visual: `${num1} 🪙 ${operation} ${num2} 🪙`,
          answer: answer,
          options: options
        };
      }
    },
    'shape-builder': {
      title: 'Shape Builder',
      icon: '🏠',
      description: 'Identify shapes to build houses!',
      generateQuestion: () => {
        const shapes = ['🔺', '🟩', '🔴', '🟡'];
        const shapeNames = ['Triangle', 'Square', 'Circle', 'Diamond'];
        const randomIndex = Math.floor(Math.random() * shapes.length);
        const correctShape = shapeNames[randomIndex];
        const options = [...shapeNames].sort(() => Math.random() - 0.5);
        return {
          question: 'What shape is this?',
          visual: shapes[randomIndex].repeat(3),
          answer: correctShape,
          options: options
        };
      }
    },
    'farm-fractions': {
      title: 'Farm Fractions',
      icon: '🌾',
      description: 'Divide crops equally among families!',
      generateQuestion: () => {
        const total = [4, 6, 8, 12][Math.floor(Math.random() * 4)];
        const parts = [2, 3, 4][Math.floor(Math.random() * 3)];
        const answer = total / parts;
        const options = [answer, answer + 1, answer - 1, total - answer].filter(n => n > 0).slice(0, 4).sort(() => Math.random() - 0.5);
        return {
          question: `Divide ${total} crops equally among ${parts} families. How many crops per family?`,
          visual: '🌾'.repeat(total),
          answer: answer,
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
    setTimeLeft(60);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      if (answer === questions[currentQuestion].answer) {
        setScore(prev => prev + 10);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
        onGameComplete(score + (answer === questions[currentQuestion].answer ? 10 : 0), 60 - timeLeft);
      }
    }, 1500);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 relative overflow-hidden">
        {/* Village background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-20">🏠</div>
          <div className="absolute top-20 right-20 text-4xl opacity-20">🌳</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-20">🌻</div>
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
              <Badge className="bg-primary/20 text-primary px-3 py-1">
                <Clock className="w-4 h-4 mr-1" />
                60 seconds
              </Badge>
              <Badge className="bg-success/20 text-success px-3 py-1">
                <Trophy className="w-4 h-4 mr-1" />
                10 points each
              </Badge>
            </div>

            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-dark hover:to-primary-light text-white px-8 py-3"
            >
              Start Adventure!
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 flex items-center justify-center relative overflow-hidden">
        {/* Celebration background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎉</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce">🏆</div>
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
              <p className="text-lg">Score: {score}/{questions.length * 10}</p>
              <p className="text-village-muted">Accuracy: {percentage}%</p>
              <p className="text-village-muted">Time: {60 - timeLeft} seconds</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Games
              </Button>
              <Button onClick={startGame} className="flex-1 bg-gradient-to-r from-primary to-primary-light">
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
        <div className="absolute top-20 right-20 text-3xl opacity-10">🌾</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-10">🚜</div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="bg-white/80 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-4">
          <Badge className="bg-primary/20 text-primary px-3 py-1">
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
            <div className="text-4xl mb-4 p-4 bg-village-light/50 rounded-lg">
              {question.visual}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option: any, index: number) => (
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
                <p className="text-success font-medium">🎉 Correct! Well done!</p>
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

export default MathGame;