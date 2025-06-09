import React from 'react';
import { motion } from 'framer-motion';
import { SPEAKERS } from '../types/breathing';
import type { Speaker } from '../types/breathing';

interface SpeakerSelectionProps {
  selectedSpeaker: string;
  onSpeakerChange: (speakerId: string) => void;
}

const SpeakerSelection: React.FC<SpeakerSelectionProps> = ({
  selectedSpeaker,
  onSpeakerChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <h3 className="text-white text-lg font-medium text-center mb-6 tracking-wide">
        SELECT SPEAKER
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {SPEAKERS.map((speaker, index) => (
          <motion.button
            key={speaker.id}
            onClick={() => onSpeakerChange(speaker.id)}
            className={`flex items-center p-3 rounded-2xl transition-all duration-300 ${
              selectedSpeaker === speaker.id
                ? 'bg-blue-500/20 border border-blue-400/50'
                : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center mr-3 overflow-hidden">
              {/* Placeholder avatar - in real app would use actual images */}
              <span className="text-2xl">
                {speaker.name === 'Emily' ? '👩🏻' : 
                 speaker.name === 'William' ? '👨🏻' :
                 speaker.name === 'Khloe' ? '👩🏼' : '👨🏼'}
              </span>
            </div>
            <span className="text-white font-medium">{speaker.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SpeakerSelection;