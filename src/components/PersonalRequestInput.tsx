import React from 'react';
import { motion } from 'framer-motion';

interface PersonalRequestInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const PersonalRequestInput: React.FC<PersonalRequestInputProps> = ({
  value,
  onChange,
  maxLength = 200
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-2xl">🧘</span>
        </div>
      </div>
      
      <h2 className="text-white text-lg font-medium text-center mb-6 tracking-wide">
        DESCRIBE YOUR PERSONAL REQUEST
      </h2>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder="Tell us what you'd like to focus on during your breathing session..."
          className="w-full h-32 bg-gray-800/50 border border-gray-700/50 rounded-2xl px-4 py-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
        />
        
        {/* Character Counter */}
        <div className="absolute bottom-3 right-4 text-xs text-gray-400">
          {value.length}/{maxLength}
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalRequestInput;