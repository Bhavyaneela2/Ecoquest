import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
];

interface LanguageSelectionProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onContinue: () => void;
}

const LanguageSelection = ({ selectedLanguage, onLanguageSelect, onContinue }: LanguageSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-village-cream via-village-light to-village-cream p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Village background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20">🏠</div>
        <div className="absolute top-1/4 right-10 text-5xl opacity-20 animate-bounce-gentle">🌳</div>
        <div className="absolute bottom-1/4 left-16 text-4xl opacity-20 animate-pulse">🌻</div>
        <div className="absolute bottom-10 right-16 text-3xl opacity-20">🦋</div>
        <div className="absolute top-1/3 left-1/3 text-4xl opacity-15">🌿</div>
        <div className="absolute bottom-1/3 right-1/3 text-5xl opacity-15">🌸</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Globe className="w-16 h-16 text-primary mx-auto mb-4 animate-spin-slow" />
          <h1 className="text-3xl font-bold text-village-dark mb-2 font-fredoka">
            Welcome to Learning Village!
          </h1>
          <p className="text-village-muted">
            Choose your language to start your learning adventure
          </p>
        </div>

        <div className="grid gap-3 mb-8">
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={selectedLanguage === language.code ? "default" : "outline"}
                className={`w-full h-14 justify-between text-left font-fredoka bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all ${
                  selectedLanguage === language.code
                    ? "bg-gradient-to-r from-primary/20 to-primary-light/20 border-primary shadow-lg"
                    : "hover:border-primary/50 hover:shadow-md"
                }`}
                onClick={() => onLanguageSelect(language.code)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm opacity-70">{language.nativeName}</div>
                  </div>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5" />
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedLanguage ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={onContinue}
            disabled={!selectedLanguage}
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
          >
            Continue to Adventure
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;