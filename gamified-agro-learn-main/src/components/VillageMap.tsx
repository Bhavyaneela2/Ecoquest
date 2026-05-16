import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Lock, Play, CheckCircle } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  subject: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  score?: number;
  x: number;
  y: number;
  icon: string;
}

interface VillageMapProps {
  onBack: () => void;
  onPlayGame: (milestone: Milestone) => void;
  userProgress: number;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Counting Mangoes",
    subject: "Math",
    description: "Learn to count from 1 to 10 with delicious mangoes!",
    status: "completed",
    score: 95,
    x: 20,
    y: 80,
    icon: "🥭"
  },
  {
    id: 2,
    title: "Letter Garden",
    subject: "English", 
    description: "Plant alphabet seeds and watch letters grow!",
    status: "completed",
    score: 88,
    x: 35,
    y: 65,
    icon: "🌱"
  },
  {
    id: 3,
    title: "Animal Friends",
    subject: "Science",
    description: "Meet the animals that live in our village!",
    status: "completed",
    score: 92,
    x: 50,
    y: 75,
    icon: "🐄"
  },
  {
    id: 4,
    title: "Water Cycle Adventure",
    subject: "Science",
    description: "Follow water's journey from clouds to rivers!",
    status: "current",
    x: 65,
    y: 60,
    icon: "💧"
  },
  {
    id: 5,
    title: "Village Market Math",
    subject: "Math",
    description: "Help farmers sell their crops with addition!",
    status: "locked",
    x: 80,
    y: 45,
    icon: "🏪"
  },
  {
    id: 6,
    title: "Story Time Tree",
    subject: "English",
    description: "Read magical stories under the ancient tree!",
    status: "locked",
    x: 30,
    y: 40,
    icon: "🌳"
  },
  {
    id: 7,
    title: "Weather Station",
    subject: "Science",
    description: "Predict the weather for the village farmers!",
    status: "locked",
    x: 70,
    y: 30,
    icon: "⛅"
  },
  {
    id: 8,
    title: "Festival Patterns",
    subject: "Math",
    description: "Create beautiful patterns for the village festival!",
    status: "locked",
    x: 45,
    y: 20,
    icon: "🎊"
  }
];

const VillageMap = ({ onBack, onPlayGame, userProgress }: VillageMapProps) => {
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-light via-muted to-earth-light p-4">
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
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold font-fredoka">My Village Journey</p>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalMilestones} completed
              </p>
            </div>
            <div className="village-progress w-24 h-2">
              <div 
                className="village-progress-bar" 
                style={{ width: `${(completedCount / totalMilestones) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Village Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative village-card p-8 min-h-[600px] bg-gradient-to-br from-earth-light to-primary-light/20 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-float">🏠</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce-gentle">🌲</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-wiggle">🚜</div>
          <div className="absolute bottom-10 right-10 text-4xl">🌾</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-spin-slow">🦋</div>
        </div>

        {/* Path SVG */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <path 
              id="village-path" 
              d="M 20,80 Q 35,65 50,75 Q 65,60 80,45 Q 30,40 70,30 Q 45,20 45,20"
              className="map-path"
            />
          </defs>
          <use href="#village-path" />
        </svg>

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ 
              left: `${milestone.x}%`, 
              top: `${milestone.y}%` 
            }}
            onClick={() => milestone.status !== 'locked' && onPlayGame(milestone)}
          >
            <div className="relative group">
              <div
                className={`map-milestone ${milestone.status} ${
                  milestone.status === 'current' ? 'pulse-glow' : ''
                }`}
              >
                {milestone.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : milestone.status === 'locked' ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </div>

              {/* Milestone Info Card */}
              <Card className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 village-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{milestone.icon}</span>
                  <div>
                    <h4 className="font-bold font-fredoka text-sm">{milestone.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {milestone.subject}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {milestone.description}
                </p>
                
                {milestone.status === 'completed' && milestone.score && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning" />
                    <span className="text-xs font-bold">{milestone.score}%</span>
                  </div>
                )}
                
                {milestone.status === 'current' && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    Ready to Play!
                  </Badge>
                )}
                
                {milestone.status === 'locked' && (
                  <Badge variant="outline" className="text-xs">
                    Complete previous levels
                  </Badge>
                )}
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 village-card p-4"
      >
        <h3 className="font-bold font-fredoka mb-3">Map Legend</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="map-milestone completed w-8 h-8">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="map-milestone w-8 h-8 bg-gradient-to-br from-primary-light to-primary-dark">
              <Play className="w-4 h-4" />
            </div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="map-milestone locked w-8 h-8">
              <Lock className="w-4 h-4" />
            </div>
            <span>Locked</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VillageMap;