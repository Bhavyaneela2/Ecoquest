import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Star, Gift, Lock, CheckCircle, Crown, Medal, Award } from 'lucide-react';

interface RewardsSectionProps {
  onBack: () => void;
  userInfo: any;
}

interface Badge_ {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  requirement: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
}

const badges: Badge_[] = [
  {
    id: 'first-game',
    name: 'First Steps',
    description: 'Complete your first game',
    icon: '👶',
    earned: true,
    earnedDate: '2024-01-15',
    requirement: 'Play 1 game',
    rarity: 'common'
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Score 90% or higher in 5 math games',
    icon: '🧮',
    earned: true,
    earnedDate: '2024-01-20',
    requirement: 'Excel in math games',
    rarity: 'rare'
  },
  {
    id: 'reading-hero',
    name: 'Reading Hero',
    description: 'Read 10 stories in the library',
    icon: '📚',
    earned: false,
    requirement: 'Read stories',
    progress: 7,
    maxProgress: 10,
    rarity: 'rare'
  },
  {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    description: 'Maintain a 15-day learning streak',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-01-25',
    requirement: 'Daily consistency',
    rarity: 'epic'
  },
  {
    id: 'science-explorer',
    name: 'Science Explorer',
    description: 'Complete all science experiments',
    icon: '🔬',
    earned: false,
    requirement: 'Master science',
    progress: 3,
    maxProgress: 8,
    rarity: 'epic'
  },
  {
    id: 'village-champion',
    name: 'Village Champion',
    description: 'Reach #1 on the leaderboard',
    icon: '👑',
    earned: false,
    requirement: 'Top performer',
    progress: 0,
    maxProgress: 1,
    rarity: 'legendary'
  },
  {
    id: 'coin-collector',
    name: 'Coin Collector',
    description: 'Earn 1000 coins total',
    icon: '🪙',
    earned: false,
    requirement: 'Collect coins',
    progress: 650,
    maxProgress: 1000,
    rarity: 'common'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Scholar',
    description: 'Get 100% in any game',
    icon: '⭐',
    earned: true,
    earnedDate: '2024-01-18',
    requirement: 'Perfect performance',
    rarity: 'rare'
  }
];

const achievements: Achievement[] = [
  {
    id: 'weekly-warrior',
    name: 'Weekly Warrior',
    description: 'Play games for 7 days this week',
    points: 100,
    completed: false,
    progress: 5,
    maxProgress: 7,
    reward: '+50 coins'
  },
  {
    id: 'subject-master',
    name: 'Subject Master',
    description: 'Complete 5 games in each subject',
    points: 200,
    completed: false,
    progress: 12,
    maxProgress: 15,
    reward: 'Special badge + 100 coins'
  },
  {
    id: 'library-lover',
    name: 'Library Lover',
    description: 'Spend 2 hours in the library this month',
    points: 150,
    completed: true,
    progress: 120,
    maxProgress: 120,
    reward: 'Reading badge + 75 coins'
  }
];

const RewardsSection = ({ onBack, userInfo }: RewardsSectionProps) => {
  const currentCoins = 650;
  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-3 h-3" />;
      case 'rare': return <Medal className="w-3 h-3" />;
      case 'epic': return <Award className="w-3 h-3" />;
      case 'legendary': return <Crown className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
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
        
        <div className="village-card px-4 py-2">
          <h1 className="text-2xl font-bold font-fredoka text-warning">🎁 Rewards</h1>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Card className="village-card p-4 text-center bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="coin mx-auto mb-2">🪙</div>
          <h3 className="font-bold font-fredoka">Total Coins</h3>
          <p className="text-2xl font-bold text-secondary">{currentCoins.toLocaleString()}</p>
        </Card>
        
        <Card className="village-card p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-bold font-fredoka">Badges Earned</h3>
          <p className="text-2xl font-bold text-primary">{earnedBadges.length}/{totalBadges}</p>
        </Card>
        
        <Card className="village-card p-4 text-center bg-gradient-to-br from-success/10 to-success/5">
          <Gift className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="font-bold font-fredoka">Achievements</h3>
          <p className="text-2xl font-bold text-success">{achievements.filter(a => a.completed).length}/{achievements.length}</p>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges Collection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="village-card p-4 h-fit">
            <h3 className="text-xl font-bold font-fredoka mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-warning" />
              Badge Collection
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative"
                >
                  <Card className={`p-3 text-center transition-all duration-300 ${
                    badge.earned 
                      ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white shadow-lg` 
                      : 'bg-muted/50 grayscale'
                  } ${badge.earned ? 'hover:scale-105' : ''}`}>
                    
                    {!badge.earned && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${badge.earned ? 'bg-white/20' : 'bg-muted'}`}
                      >
                        <div className="flex items-center gap-1">
                          {getRarityIcon(badge.rarity)}
                          <span className="capitalize">{badge.rarity}</span>
                        </div>
                      </Badge>
                      {badge.earned && <CheckCircle className="w-4 h-4" />}
                    </div>
                    
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs opacity-90 mb-2">{badge.description}</p>
                    
                    {!badge.earned && badge.progress !== undefined && (
                      <div className="mt-2">
                        <Progress value={(badge.progress / badge.maxProgress!) * 100} className="h-2" />
                        <p className="text-xs mt-1">{badge.progress}/{badge.maxProgress}</p>
                      </div>
                    )}
                    
                    {badge.earned && badge.earnedDate && (
                      <p className="text-xs opacity-75">Earned {badge.earnedDate}</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Achievements & Challenges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Card className="village-card p-4">
            <h3 className="text-xl font-bold font-fredoka mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-success" />
              Current Achievements
            </h3>
            
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={`p-3 ${achievement.completed ? 'bg-success/10 border-success' : 'bg-muted/30'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold font-fredoka">{achievement.name}</h4>
                      {achievement.completed ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <Badge variant="outline">{achievement.points} pts</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    
                    <div className="mb-2">
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                        <span className="text-success">{achievement.reward}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Coin Shop Teaser */}
          <Card className="village-card p-4 bg-gradient-to-br from-accent/10 to-primary/10">
            <div className="text-center">
              <div className="text-4xl mb-2">🛍️</div>
              <h3 className="font-bold font-fredoka mb-2">Coin Shop</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Spend your coins on amazing rewards!
              </p>
              <Button 
                variant="outline" 
                disabled 
                className="opacity-50"
              >
                Coming Soon!
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Motivation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 village-card p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10"
      >
        <div className="text-4xl mb-3">🌟</div>
        <h3 className="text-xl font-bold font-fredoka mb-2">Keep Collecting!</h3>
        <p className="text-muted-foreground">
          Every game you play, every lesson you complete brings you closer to amazing rewards! 
          Can you collect them all? 🏆
        </p>
      </motion.div>
    </div>
  );
};

export default RewardsSection;