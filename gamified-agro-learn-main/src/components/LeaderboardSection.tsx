import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Medal, Star, Crown, Users, MapPin } from 'lucide-react';

interface LeaderboardSectionProps {
  onBack: () => void;
  currentUser: any;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  grade: string;
  points: number;
  gamesPlayed: number;
  streak: number;
  avatar: string;
  schoolCode?: string;
  village?: string;
}

const classLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    grade: '2nd Grade',
    points: 2450,
    gamesPlayed: 45,
    streak: 12,
    avatar: '👧🏽'
  },
  {
    id: '2', 
    name: 'Raj Kumar',
    grade: '2nd Grade',
    points: 2380,
    gamesPlayed: 42,
    streak: 8,
    avatar: '👦🏽'
  },
  {
    id: '3',
    name: 'Amit Patel',
    grade: '2nd Grade', 
    points: 2250,
    gamesPlayed: 38,
    streak: 15,
    avatar: '👦🏻'
  },
  {
    id: '4',
    name: 'Sneha Singh',
    grade: '2nd Grade',
    points: 2100,
    gamesPlayed: 35,
    streak: 6,
    avatar: '👧🏻'
  },
  {
    id: '5',
    name: 'Arjun Das',
    grade: '2nd Grade',
    points: 1950,
    gamesPlayed: 32,
    streak: 4,
    avatar: '👦🏽'
  }
];

const villageLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Riverside School',
    grade: 'School',
    points: 15670,
    gamesPlayed: 245,
    streak: 0,
    avatar: '🏫',
    village: 'Riverside Village'
  },
  {
    id: '2',
    name: 'Mountain View School', 
    grade: 'School',
    points: 14320,
    gamesPlayed: 220,
    streak: 0,
    avatar: '🏫',
    village: 'Mountain Village'
  },
  {
    id: '3',
    name: 'Forest Elementary',
    grade: 'School', 
    points: 13890,
    gamesPlayed: 210,
    streak: 0,
    avatar: '🏫',
    village: 'Forest Village'
  },
  {
    id: '4',
    name: 'Valley School',
    grade: 'School',
    points: 12450,
    gamesPlayed: 185,
    streak: 0,
    avatar: '🏫',
    village: 'Green Valley'
  },
  {
    id: '5',
    name: 'Sunrise School',
    grade: 'School',
    points: 11200,
    gamesPlayed: 165,
    streak: 0,
    avatar: '🏫',
    village: 'Sunrise Village'
  }
];

const LeaderboardSection = ({ onBack, currentUser }: LeaderboardSectionProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-warning" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-warning to-secondary text-black';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
    return 'bg-muted text-muted-foreground';
  };

  const LeaderboardList = ({ data, isVillage = false }: { data: LeaderboardEntry[], isVillage?: boolean }) => (
    <div className="space-y-3">
      {data.map((entry, index) => {
        const rank = index + 1;
        const isCurrentUser = !isVillage && entry.name.toLowerCase() === currentUser?.name?.toLowerCase();
        
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`village-card overflow-hidden ${isCurrentUser ? 'ring-2 ring-primary' : ''}`}>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadge(rank)}`}>
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold font-fredoka">{entry.name}</h3>
                      {isCurrentUser && <Badge className="bg-primary text-primary-foreground text-xs">You</Badge>}
                      <span className="text-2xl">{entry.avatar}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {entry.points.toLocaleString()} pts
                      </span>
                      <span>{entry.gamesPlayed} games</span>
                      {!isVillage && entry.streak > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning" />
                          {entry.streak} streak
                        </span>
                      )}
                      {isVillage && entry.village && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {entry.village}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      variant={rank <= 3 ? 'default' : 'secondary'}
                      className={rank <= 3 ? getRankBadge(rank) : ''}
                    >
                      #{rank}
                    </Badge>
                    {!isVillage && (
                      <p className="text-xs text-muted-foreground mt-1">{entry.grade}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

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
          <h1 className="text-2xl font-bold font-fredoka text-warning">🏆 Leaderboard</h1>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Card className="village-card p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-bold font-fredoka">Your Rank</h3>
          <p className="text-2xl font-bold text-primary">#3</p>
          <p className="text-sm text-muted-foreground">in your class</p>
        </Card>
        
        <Card className="village-card p-4 text-center bg-gradient-to-br from-secondary/10 to-secondary/5">
          <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
          <h3 className="font-bold font-fredoka">Total Points</h3>
          <p className="text-2xl font-bold text-secondary">2,250</p>
          <p className="text-sm text-muted-foreground">this month</p>
        </Card>
        
        <Card className="village-card p-4 text-center bg-gradient-to-br from-success/10 to-success/5">
          <Medal className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="font-bold font-fredoka">Best Streak</h3>
          <p className="text-2xl font-bold text-success">15 days</p>
          <p className="text-sm text-muted-foreground">personal record</p>
        </Card>
      </motion.div>

      {/* Leaderboard Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="class" className="w-full">
          <TabsList className="grid w-full grid-cols-2 village-card">
            <TabsTrigger value="class" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Class
            </TabsTrigger>
            <TabsTrigger value="village" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Village Schools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="class" className="mt-6">
            <div className="village-card p-4 mb-4">
              <h3 className="font-bold font-fredoka mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Class Leaderboard
              </h3>
              <p className="text-sm text-muted-foreground">
                Compete with your classmates and see who's the top learner!
              </p>
            </div>
            <LeaderboardList data={classLeaderboard} />
          </TabsContent>

          <TabsContent value="village" className="mt-6">
            <div className="village-card p-4 mb-4">
              <h3 className="font-bold font-fredoka mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Village Schools Competition
              </h3>
              <p className="text-sm text-muted-foreground">
                See how schools across different villages are performing!
              </p>
            </div>
            <LeaderboardList data={villageLeaderboard} isVillage={true} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 village-card p-6 text-center bg-gradient-to-br from-success/10 to-accent/10"
      >
        <div className="text-4xl mb-3">🌟</div>
        <h3 className="text-xl font-bold font-fredoka mb-2">Keep Learning!</h3>
        <p className="text-muted-foreground">
          Play more games, complete lessons, and climb up the leaderboard! 
          Every point brings you closer to becoming the village's top learner! 🚀
        </p>
      </motion.div>
    </div>
  );
};

export default LeaderboardSection;