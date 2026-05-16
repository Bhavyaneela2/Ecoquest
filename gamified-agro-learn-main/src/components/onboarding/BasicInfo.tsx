import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User, GraduationCap, School } from 'lucide-react';

interface UserInfo {
  name: string;
  grade: string;
  schoolCode: string;
}

interface BasicInfoProps {
  userInfo: UserInfo | null;
  onInfoChange: (info: UserInfo) => void;
  onComplete: () => void;
}

const grades = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];

const BasicInfo = ({ userInfo, onInfoChange, onComplete }: BasicInfoProps) => {
  const updateInfo = (key: keyof UserInfo, value: string) => {
    const newInfo = userInfo || { name: '', grade: '', schoolCode: '' };
    onInfoChange({ ...newInfo, [key]: value });
  };

  const isComplete = userInfo?.name && userInfo?.grade;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-gentle" />
          <h1 className="text-3xl font-bold text-foreground mb-2 font-fredoka">
            Tell us About You!
          </h1>
          <p className="text-muted-foreground">
            Help us create the perfect learning adventure
          </p>
        </div>

        <div className="space-y-6 village-card p-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-primary" />
              What's your name?
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={userInfo?.name || ''}
              onChange={(e) => updateInfo('name', e.target.value)}
              className="village-input"
            />
          </div>

          {/* Grade Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <GraduationCap className="w-4 h-4 text-primary" />
              Which grade are you in?
            </Label>
            <Select
              value={userInfo?.grade || ''}
              onValueChange={(value) => updateInfo('grade', value)}
            >
              <SelectTrigger className="village-input">
                <SelectValue placeholder="Select your grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* School Code (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="schoolCode" className="flex items-center gap-2 text-sm font-medium">
              <School className="w-4 h-4 text-primary" />
              School Code (Optional)
            </Label>
            <Input
              id="schoolCode"
              placeholder="Ask your teacher for school code"
              value={userInfo?.schoolCode || ''}
              onChange={(e) => updateInfo('schoolCode', e.target.value)}
              className="village-input"
            />
            <p className="text-xs text-muted-foreground">
              If your teacher gave you a school code, enter it here to join your class!
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={onComplete}
            disabled={!isComplete}
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
          >
            🎉 Start My Adventure!
          </Button>
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Ready to explore the amazing world of learning? 🌟
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicInfo;