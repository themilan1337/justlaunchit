import React from 'react';
import { motion } from 'framer-motion';

interface DurationSelectionProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [5, 10, 15];

const DurationSelection: React.FC<DurationSelectionProps> = ({
  selectedDuration,
  onDurationChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <h3 className="text-white text-lg font-medium text-center mb-6 tracking-wide">
        SELECT DURATION
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {DURATION_OPTIONS.map((duration, index) => (
          <motion.button
            key={duration}
            onClick={() => onDurationChange(duration)}
            className={`py-6 px-4 rounded-2xl transition-all duration-300 ${
              selectedDuration === duration
                ? 'bg-blue-500/20 border border-blue-400/50'
                : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {duration}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                MINUTES
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DurationSelection;