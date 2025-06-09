import React from 'react';
import { motion } from 'framer-motion';
import { PHASE_INSTRUCTIONS } from '../types/breathing';
import type { BreathingState } from '../types/breathing';

interface BreathingCircleProps {
  breathingState: BreathingState;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ breathingState }) => {
  const getCircleScale = () => {
    switch (breathingState.phase) {
      case 'prepare':
        return 1;
      case 'inhale':
        return 1.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 0.8;
      case 'rest':
        return 1;
      default:
        return 1;
    }
  };

  const getCircleColor = () => {
    switch (breathingState.phase) {
      case 'prepare':
        return 'from-yellow-400 to-orange-500';
      case 'inhale':
        return 'from-blue-400 to-cyan-500';
      case 'hold':
        return 'from-purple-400 to-pink-500';
      case 'exhale':
        return 'from-green-400 to-emerald-500';
      case 'rest':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  const getGlowColor = () => {
    switch (breathingState.phase) {
      case 'prepare':
        return 'shadow-yellow-400/50';
      case 'inhale':
        return 'shadow-blue-400/50';
      case 'hold':
        return 'shadow-purple-400/50';
      case 'exhale':
        return 'shadow-green-400/50';
      case 'rest':
        return 'shadow-gray-400/30';
      default:
        return 'shadow-blue-400/50';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] mb-8">
      {/* Main Breathing Circle */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          className={`w-48 h-48 rounded-full bg-gradient-to-br ${getCircleColor()} ${getGlowColor()} shadow-2xl flex items-center justify-center`}
          animate={{
            scale: getCircleScale(),
            opacity: breathingState.phase === 'rest' ? 0.6 : 1
          }}
          transition={{
            duration: breathingState.phase === 'inhale' ? 4 :
                     breathingState.phase === 'hold' ? 0.5 :
                     breathingState.phase === 'exhale' ? 8 :
                     breathingState.phase === 'prepare' ? 1 : 2,
            ease: breathingState.phase === 'inhale' ? 'easeIn' :
                  breathingState.phase === 'exhale' ? 'easeOut' : 'easeInOut'
          }}
        >
          {/* Inner content */}
          <div className="text-center text-white">
            <motion.div
              className="text-4xl font-bold mb-2"
              key={breathingState.timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {breathingState.timeLeft}
            </motion.div>
            <motion.div
              className="text-lg font-medium"
              key={breathingState.phase}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {PHASE_INSTRUCTIONS[breathingState.phase]}
            </motion.div>
          </div>
        </motion.div>

        {/* Outer ring animation */}
        <motion.div
          className={`absolute w-64 h-64 rounded-full border-2 border-white/20`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">
            Cycle {breathingState.currentCycle} of {breathingState.totalCycles}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round((breathingState.currentCycle / breathingState.totalCycles) * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(breathingState.currentCycle / breathingState.totalCycles) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BreathingCircle;