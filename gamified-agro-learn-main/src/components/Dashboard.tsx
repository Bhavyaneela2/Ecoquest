import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Gamepad2, 
  BookOpen, 
  Trophy, 
  Gift, 
  Users, 
  MapPin, 
  Coins, 
  Star,
  Play,
  Clock,
  Target
} from 'lucide-react';

interface DashboardProps {
  userInfo: any;
  avatar: any;
  onNavigate: (section: string) => void;
}

const Dashboard = ({ userInfo, avatar, onNavigate }: DashboardProps) => {
  const coins = 250;
  const level = 5;
  const streakDays = 7;

  const sections = [
    {
      id: 'play-learn',
      title: '🎮 Play & Learn',
      description: 'Fun games for every subject',
      icon: Gamepad2,
      color: 'from-primary to-primary-light',
      stats: '12 Games Available'
    },
    {
      id: 'library',
      title: '📚 Library',
      description: 'Stories, videos & lessons',
      icon: BookOpen,
      color: 'from-accent to-accent-light',
      stats: '25+ Resources'
    },
    {
      id: 'village-map',
      title: '🗺️ My Village',
      description: 'Learning journey map',
      icon: MapPin,
      color: 'from-earth to-earth-light',
      stats: 'Level 5 Progress'
    },
    {
      id: 'leaderboard',
      title: '🏆 Leaderboard',
      description: 'See how you rank!',
      icon: Trophy,
      color: 'from-secondary to-secondary-light',
      stats: 'Rank #3 in Class'
    },
    {
      id: 'rewards',
      title: '🎁 Rewards',
      description: 'Badges & achievements',
      icon: Gift,
      color: 'from-success to-success-light',
      stats: '8 Badges Earned'
    }
  ];

  const recentActivities = [
    { subject: 'Math', game: 'Counting Mangoes', score: 95, time: '2 hours ago' },
    { subject: 'English', game: 'Word Builder', score: 88, time: '1 day ago' },
    { subject: 'Science', game: 'Water Cycle', score: 92, time: '2 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-4 relative overflow-hidden">
      {/* Village background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20">🏘️</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20 animate-bounce-gentle">🌳</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-pulse">🎪</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20">🎨</div>
        <div className="absolute top-1/3 left-1/4 text-3xl opacity-15">🌻</div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl opacity-15">🦋</div>
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between village-card p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="avatar-container">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="40" r="25" fill={avatar?.skinTone} />
                <path
                  d="M25 35 Q50 15 75 35 Q75 25 50 20 Q25 25 25 35"
                  fill={avatar?.hairColor}
                />
                <circle cx="42" cy="35" r="2" fill="#000" />
                <circle cx="58" cy="35" r="2" fill="#000" />
                <path d="M45 45 Q50 48 55 45" stroke="#000" strokeWidth="1.5" fill="none" />
                <rect x="35" y="65" width="30" height="35" rx="15" fill={avatar?.shirtColor} />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-fredoka text-village-dark">
                Welcome back, {userInfo?.name}! 👋
              </h1>
              <p className="text-village-muted">{userInfo?.grade} • Village Explorer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 village-card px-3 py-2">
              <Coins className="w-5 h-5 text-secondary" />
              <span className="font-bold text-lg">{coins}</span>
            </div>
            <div className="flex items-center gap-2 village-card px-3 py-2">
              <Star className="w-5 h-5 text-warning" />
              <span className="font-bold">Level {level}</span>
            </div>
            <div className="flex items-center gap-2 village-card px-3 py-2">
              <Target className="w-5 h-5 text-success" />
              <span className="font-bold">{streakDays} day streak</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Sections */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`village-card cursor-pointer h-32 bg-gradient-to-br ${section.color} text-white overflow-hidden relative group`}
                  onClick={() => onNavigate(section.id)}
                >
                  <div className="p-4 h-full flex flex-col justify-between relative z-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold font-fredoka">{section.title}</h3>
                      <section.icon className="w-6 h-6 animate-bounce-gentle" />
                    </div>
                    <div>
                      <p className="text-white/90 text-sm mb-1">{section.description}</p>
                      <p className="text-white/70 text-xs">{section.stats}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="village-card p-4"
          >
            <h3 className="text-lg font-bold mb-4 font-fredoka flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Continue Learning
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2 hover:bg-primary/5"
                onClick={() => onNavigate('math-game')}
              >
                <span className="text-2xl">🧮</span>
                <span className="text-sm">Math Quest</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2 hover:bg-accent/5"
                onClick={() => onNavigate('english-game')}
              >
                <span className="text-2xl">📝</span>
                <span className="text-sm">Word Adventure</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2 hover:bg-success/5"
                onClick={() => onNavigate('science-game')}
              >
                <span className="text-2xl">🔬</span>
                <span className="text-sm">Science Lab</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="village-card p-4"
          >
            <h3 className="text-lg font-bold mb-4 font-fredoka flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{activity.game}</p>
                    <p className="text-xs text-muted-foreground">{activity.subject} • {activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {activity.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="village-card p-4 bg-gradient-to-br from-secondary/20 to-secondary/10"
          >
            <h3 className="text-lg font-bold mb-2 font-fredoka">🌟 Daily Challenge</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Complete today's math challenge to earn bonus coins!
            </p>
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-secondary to-secondary-light text-secondary-foreground hover:from-secondary-dark hover:to-secondary"
              onClick={() => onNavigate('daily-challenge')}
            >
              Start Challenge (+50 coins)
            </Button>
          </motion.div>

          {/* Progress Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="village-card p-4"
          >
            <h3 className="text-lg font-bold mb-4 font-fredoka">📊 This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Games Played</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lessons Completed</span>
                <Badge>8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Time Spent</span>
                <Badge>3h 45m</Badge>
              </div>
              <div className="village-progress h-2 mt-3">
                <div className="village-progress-bar" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground text-center">75% to next level!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;