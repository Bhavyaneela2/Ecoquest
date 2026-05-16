import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Palette, Users, Shirt } from 'lucide-react';

interface Avatar {
  gender: 'boy' | 'girl';
  skinTone: string;
  hairColor: string;
  shirtColor: string;
}

interface AvatarCreationProps {
  avatar: Avatar | null;
  onAvatarChange: (avatar: Avatar) => void;
  onContinue: () => void;
}

const skinTones = ['#F4C2A1', '#E8B284', '#D4A574', '#C19660', '#A67C52', '#8B6F47'];
const hairColors = ['#2C1810', '#6B4423', '#8B4513', '#D2691E', '#DEB887', '#F5DEB3'];
const shirtColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];

const AvatarCreation = ({ avatar, onAvatarChange, onContinue }: AvatarCreationProps) => {
  const [activeTab, setActiveTab] = useState<'gender' | 'skin' | 'hair' | 'shirt'>('gender');

  const updateAvatar = (key: keyof Avatar, value: string) => {
    const newAvatar = avatar || { gender: 'boy', skinTone: skinTones[0], hairColor: hairColors[0], shirtColor: shirtColors[0] };
    onAvatarChange({ ...newAvatar, [key]: value });
  };

  const AvatarPreview = () => (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary-light to-primary border-4 border-white shadow-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Face */}
          <circle cx="50" cy="40" r="25" fill={avatar?.skinTone || skinTones[0]} />
          {/* Hair */}
          <path
            d="M25 35 Q50 15 75 35 Q75 25 50 20 Q25 25 25 35"
            fill={avatar?.hairColor || hairColors[0]}
          />
          {/* Eyes */}
          <circle cx="42" cy="35" r="2" fill="#000" />
          <circle cx="58" cy="35" r="2" fill="#000" />
          {/* Smile */}
          <path d="M45 45 Q50 48 55 45" stroke="#000" strokeWidth="1.5" fill="none" />
          {/* Body */}
          <rect x="35" y="65" width="30" height="35" rx="15" fill={avatar?.shirtColor || shirtColors[0]} />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-fredoka">
            Create Your Avatar
          </h1>
          <p className="text-muted-foreground mb-6">
            Design your character for the village adventure!
          </p>
          
          <AvatarPreview />
        </div>

        <div className="space-y-6">
          {/* Gender Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Users className="w-4 h-4" />
              Character Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['boy', 'girl'].map((gender) => (
                <Button
                  key={gender}
                  variant={avatar?.gender === gender ? "default" : "outline"}
                  onClick={() => updateAvatar('gender', gender)}
                  className="h-12 font-fredoka capitalize"
                >
                  {gender === 'boy' ? '👦' : '👧'} {gender}
                </Button>
              ))}
            </div>
          </div>

          {/* Skin Tone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Palette className="w-4 h-4" />
              Skin Tone
            </label>
            <div className="grid grid-cols-6 gap-2">
              {skinTones.map((tone) => (
                <button
                  key={tone}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    avatar?.skinTone === tone ? 'border-primary scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: tone }}
                  onClick={() => updateAvatar('skinTone', tone)}
                />
              ))}
            </div>
          </div>

          {/* Hair Color */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Palette className="w-4 h-4" />
              Hair Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {hairColors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    avatar?.hairColor === color ? 'border-primary scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => updateAvatar('hairColor', color)}
                />
              ))}
            </div>
          </div>

          {/* Shirt Color */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Shirt className="w-4 h-4" />
              Shirt Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {shirtColors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    avatar?.shirtColor === color ? 'border-primary scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => updateAvatar('shirtColor', color)}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: avatar ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={onContinue}
            disabled={!avatar}
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
          >
            Continue Adventure
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AvatarCreation;