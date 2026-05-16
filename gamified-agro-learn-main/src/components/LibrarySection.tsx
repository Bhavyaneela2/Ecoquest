import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Volume2, Video, FileText, Play } from 'lucide-react';

interface LibrarySectionProps {
  onBack: () => void;
  userGrade: string;
}

interface LibraryItem {
  id: string;
  title: string;
  subject: string;
  type: 'notes' | 'audio' | 'video' | 'story';
  grade: string[];
  description: string;
  icon: string;
  duration?: string;
  content?: string;
}

const libraryItems: LibraryItem[] = [
  // Notes
  {
    id: 'math-numbers',
    title: 'Learning Numbers 1-10',
    subject: 'Math',
    type: 'notes',
    grade: ['1st Grade', '2nd Grade'],
    description: 'Fun ways to learn and remember numbers',
    icon: '🔢',
    content: `Numbers are everywhere in our village! Let's learn to count:

1 - One mango 🥭
2 - Two chickens 🐔🐔  
3 - Three flowers 🌸🌸🌸
4 - Four butterflies 🦋🦋🦋🦋
5 - Five stars ⭐⭐⭐⭐⭐

Practice counting things around you every day!`
  },
  {
    id: 'english-alphabet',
    title: 'Alphabet A-Z',
    subject: 'English',
    type: 'notes',
    grade: ['1st Grade', '2nd Grade'],
    description: 'Learn all 26 letters with village examples',
    icon: '🅰️',
    content: `Let's explore the alphabet with village friends:

A is for Apple 🍎
B is for Butterfly 🦋
C is for Cow 🐄
D is for Dog 🐕
E is for Elephant 🐘

Practice writing each letter in the sand!`
  },
  {
    id: 'science-animals',
    title: 'Village Animals',
    subject: 'Science',
    type: 'notes',
    grade: ['1st Grade', '2nd Grade', '3rd Grade'],
    description: 'Learn about animals in our village',
    icon: '🐄',
    content: `Animals help our village in many ways:

Cows 🐄 give us milk
Chickens 🐔 give us eggs
Dogs 🐕 protect our homes
Cats 🐱 catch mice
Buffalo 🐃 help plow fields

All animals need food, water, and shelter to live happily!`
  },

  // Audio
  {
    id: 'alphabet-song',
    title: 'Alphabet Song',
    subject: 'English',
    type: 'audio',
    grade: ['1st Grade', '2nd Grade'],
    description: 'Sing along with the alphabet song',
    icon: '🎵',
    duration: '2:30'
  },
  {
    id: 'counting-rhyme',
    title: 'Counting Rhyme',
    subject: 'Math',
    type: 'audio',
    grade: ['1st Grade', '2nd Grade'],
    description: 'Learn numbers with a fun rhyme',
    icon: '🎶',
    duration: '3:00'
  },

  // Videos
  {
    id: 'water-cycle-video',
    title: 'Water Cycle Animation',
    subject: 'Science',
    type: 'video',
    grade: ['3rd Grade', '4th Grade'],
    description: 'Watch how water moves in nature',
    icon: '🌊',
    duration: '5:45'
  },
  {
    id: 'shapes-video',
    title: 'Shapes Around Us',
    subject: 'Math',
    type: 'video',
    grade: ['1st Grade', '2nd Grade'],
    description: 'Find shapes in everyday objects',
    icon: '⭐',
    duration: '4:20'
  },

  // Stories
  {
    id: 'clever-rabbit',
    title: 'The Clever Rabbit',
    subject: 'English',
    type: 'story',
    grade: ['2nd Grade', '3rd Grade'],
    description: 'Interactive story about a smart rabbit',
    icon: '🐰',
    duration: '8:00'
  },
  {
    id: 'village-festival',
    title: 'Village Festival',
    subject: 'English',
    type: 'story',
    grade: ['3rd Grade', '4th Grade', '5th Grade'],
    description: 'Join the exciting village celebration',
    icon: '🎊',
    duration: '10:00'
  }
];

const LibrarySection = ({ onBack, userGrade }: LibrarySectionProps) => {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [activeTab, setActiveTab] = useState('notes');

  // Filter items by grade and type
  const getFilteredItems = (type: string) => {
    return libraryItems.filter(item => 
      item.type === type && item.grade.includes(userGrade)
    );
  };

  const openItem = (item: LibraryItem) => {
    setSelectedItem(item);
  };

  const closeItem = () => {
    setSelectedItem(null);
  };

  if (selectedItem && selectedItem.type === 'notes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={closeItem}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold font-fredoka">{selectedItem.title}</h1>
              <Badge variant="secondary">{selectedItem.subject}</Badge>
            </div>
          </div>

          <Card className="village-card p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedItem.icon}</div>
            </div>
            <div className="prose prose-lg max-w-none">
              {selectedItem.content?.split('\n').map((line, index) => (
                <p key={index} className="mb-3 text-lg leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold font-fredoka text-accent">📚 Library</h1>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 village-card">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Stories
            </TabsTrigger>
          </TabsList>

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredItems('notes').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card 
                    className="village-card cursor-pointer h-full"
                    onClick={() => openItem(item)}
                  >
                    <div className="p-4">
                      <div className="text-center mb-3">
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <Badge variant="outline">{item.subject}</Badge>
                      </div>
                      <h3 className="font-bold font-fredoka mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Read Notes
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredItems('audio').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="village-card">
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold font-fredoka">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground">Duration: {item.duration}</p>
                        </div>
                        <Button className="bg-gradient-to-r from-accent to-accent-light">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Video Tab */}
          <TabsContent value="video" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredItems('video').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="village-card overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl">
                      {item.icon}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{item.subject}</Badge>
                        <span className="text-xs text-muted-foreground">{item.duration}</span>
                      </div>
                      <h3 className="font-bold font-fredoka mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="story" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredItems('story').map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="village-card">
                    <div className="p-4">
                      <div className="text-center mb-4">
                        <div className="text-5xl mb-2">{item.icon}</div>
                        <Badge variant="outline">{item.subject}</Badge>
                      </div>
                      <h3 className="font-bold font-fredoka mb-2 text-center">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 text-center">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground text-center mb-4">
                        Reading time: {item.duration}
                      </p>
                      <Button className="w-full bg-gradient-to-r from-success to-success-light">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Reading
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default LibrarySection;