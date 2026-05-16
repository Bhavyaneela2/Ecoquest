import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star, Clock } from 'lucide-react';

interface EnglishGameProps {
  gameId: string;
  onBack: () => void;
  onGameComplete: (score: number, timeSpent: number) => void;
}

const EnglishGame = ({ gameId, onBack, onGameComplete }: EnglishGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const gameData = {
    'letter-garden': {
      title: 'Letter Garden',
      icon: '🌱',
      description: 'Plant alphabet seeds and grow beautiful letters!',
      generateQuestion: () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const options = [
          randomLetter,
          letters[Math.floor(Math.random() * letters.length)],
          letters[Math.floor(Math.random() * letters.length)],
          letters[Math.floor(Math.random() * letters.length)]
        ].filter((letter, index, arr) => arr.indexOf(letter) === index);
        
        while (options.length < 4) {
          const newLetter = letters[Math.floor(Math.random() * letters.length)];
          if (!options.includes(newLetter)) {
            options.push(newLetter);
          }
        }
        
        return {
          question: `Which letter comes after ${String.fromCharCode(randomLetter.charCodeAt(0) - 1)}?`,
          visual: `🌱 ${String.fromCharCode(randomLetter.charCodeAt(0) - 1)} → ?`,
          answer: randomLetter,
          options: options.sort(() => Math.random() - 0.5)
        };
      }
    },
    'word-builder': {
      title: 'Word Builder',
      icon: '📝',
      description: 'Combine letters to build words for the village library!',
      generateQuestion: () => {
        const words = ['CAT', 'DOG', 'SUN', 'TREE', 'BOOK', 'BIRD', 'FISH', 'MOON'];
        const word = words[Math.floor(Math.random() * words.length)];
        const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        const options = [
          word,
          word.split('').reverse().join(''),
          word.split('').sort(() => Math.random() - 0.5).join(''),
          word.split('').sort(() => Math.random() - 0.5).join('')
        ].filter((w, index, arr) => arr.indexOf(w) === index);
        
        while (options.length < 4) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          if (!options.includes(randomWord)) {
            options.push(randomWord);
          }
        }

        return {
          question: 'Unscramble the letters to make a word:',
          visual: `📚 ${scrambled} → ?`,
          answer: word,
          options: options.sort(() => Math.random() - 0.5)
        };
      }
    },
    'story-maker': {
      title: 'Story Maker',
      icon: '📖',
      description: 'Create amazing stories about village adventures!',
      generateQuestion: () => {
        const stories = [
          { sentence: 'The little bird ___ in the tree.', answer: 'sings', options: ['sings', 'runs', 'swims', 'flies'] },
          { sentence: 'Children ___ to school every day.', answer: 'walk', options: ['walk', 'sleep', 'eat', 'cry'] },
          { sentence: 'The farmer ___ vegetables in the field.', answer: 'grows', options: ['grows', 'eats', 'reads', 'dances'] },
          { sentence: 'At night, we can see the ___ in the sky.', answer: 'stars', options: ['stars', 'books', 'trees', 'water'] }
        ];
        const story = stories[Math.floor(Math.random() * stories.length)];
        return {
          question: 'Complete the sentence:',
          visual: `📖 "${story.sentence}"`,
          answer: story.answer,
          options: story.options.sort(() => Math.random() - 0.5)
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
      const newQuestions = Array.from({ length: 8 }, () => currentGameData.generateQuestion());
      setQuestions(newQuestions);
    }
  }, [gameId]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(90);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      if (answer === questions[currentQuestion].answer) {
        setScore(prev => prev + 15);
      }
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
        onGameComplete(score + (answer === questions[currentQuestion].answer ? 15 : 0), 90 - timeLeft);
      }
    }, 1500);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 relative overflow-hidden">
        {/* Village background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-20">📚</div>
          <div className="absolute top-20 right-20 text-4xl opacity-20">🌳</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-20">✏️</div>
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
              <Badge className="bg-accent/20 text-accent px-3 py-1">
                <Clock className="w-4 h-4 mr-1" />
                90 seconds
              </Badge>
              <Badge className="bg-success/20 text-success px-3 py-1">
                <Trophy className="w-4 h-4 mr-1" />
                15 points each
              </Badge>
            </div>

            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-accent via-accent-light to-accent hover:from-accent-dark hover:to-accent-light text-white px-8 py-3"
            >
              Start Learning!
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / (questions.length * 15)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 flex items-center justify-center relative overflow-hidden">
        {/* Celebration background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎉</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce">📖</div>
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
              <p className="text-lg">Score: {score}/{questions.length * 15}</p>
              <p className="text-village-muted">Accuracy: {percentage}%</p>
              <p className="text-village-muted">Time: {90 - timeLeft} seconds</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Games
              </Button>
              <Button onClick={startGame} className="flex-1 bg-gradient-to-r from-accent to-accent-light">
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
        <div className="absolute top-20 right-20 text-3xl opacity-10">📖</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-10">✏️</div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="bg-white/80 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-4">
          <Badge className="bg-accent/20 text-accent px-3 py-1">
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
            <div className="text-2xl mb-4 p-4 bg-village-light/50 rounded-lg font-mono">
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

export default EnglishGame;