import React from 'react';
import { motion } from 'framer-motion';

interface PreparationStageProps {
  timeLeft: number;
  onComplete: () => void;
}

const PreparationStage: React.FC<PreparationStageProps> = ({ timeLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center min-h-[500px] text-center"
    >
      {/* Preparation Circle */}
      <div className="relative mb-8">
        <motion.div
          className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-yellow-400/50 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="text-center text-white">
            <motion.div
              className="text-6xl font-bold mb-2"
              key={timeLeft}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {timeLeft}
            </motion.div>
          </div>
        </motion.div>

        {/* Outer rings */}
        <motion.div
          className="absolute inset-0 w-64 h-64 rounded-full border-2 border-yellow-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <motion.div
          className="absolute inset-0 w-64 h-64 rounded-full border border-orange-400/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
      </div>

      {/* Preparation Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Get Ready
        </h2>
        <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
          Find a comfortable position and prepare to begin your 4-7-8 breathing session.
          Take a moment to relax and focus on your breath.
        </p>
      </motion.div>

      {/* Breathing Instructions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto"
      >
        <h3 className="text-white font-semibold mb-4 text-center">
          4-7-8 Breathing Technique
        </h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-400 font-bold">4</span>
            </div>
            <span>Inhale through your nose for 4 seconds</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-400 font-bold">7</span>
            </div>
            <span>Hold your breath for 7 seconds</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-400 font-bold">8</span>
            </div>
            <span>Exhale through your mouth for 8 seconds</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreparationStage;