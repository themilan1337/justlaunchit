import React from 'react';
import { motion } from 'framer-motion';
import { MOOD_OPTIONS } from '../types/breathing';

interface MoodSelectionProps {
  selectedMood: string;
  onMoodChange: (moodId: string) => void;
}

const MoodSelection: React.FC<MoodSelectionProps> = ({
  selectedMood,
  onMoodChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <div className="grid grid-cols-2 gap-3">
        {MOOD_OPTIONS.map((mood, index) => (
          <motion.button
            key={mood.id}
            onClick={() => onMoodChange(mood.id)}
            className={`p-6 rounded-2xl transition-all duration-300 flex items-center justify-center ${
              selectedMood === mood.id
                ? 'bg-blue-500/20 border border-blue-400/50'
                : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">
                {mood.icon}
              </div>
              {mood.name !== 'None' && (
                <div className="text-sm text-gray-400">
                  {mood.name}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodSelection;