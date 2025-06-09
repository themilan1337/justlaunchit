import React from 'react';
import { motion } from 'framer-motion';

const MobileBottomMenu: React.FC = () => {
  const menuItems = [
    { id: 'meditate', icon: '🧘‍♀️', label: 'Meditate', isActive: false },
    { id: 'listen', icon: '🎧', label: 'Listen', isActive: false },
    { id: 'home', icon: '🏠', label: 'Home', isActive: true },
    { id: 'ai', icon: '🤖', label: 'AI', isActive: false },
    { id: 'profile', icon: '👤', label: 'Profile', isActive: false }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-2 md:hidden z-50"
    >
      <div className="flex justify-around items-center">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            className={`flex flex-col items-center py-3 px-4 rounded-lg transition-all duration-300 ${
              item.isActive 
                ? 'bg-blue-500/20 border border-blue-400/30' 
                : 'hover:bg-white/10'
            }`}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className={`text-xs font-medium ${
              item.isActive ? 'text-blue-400' : 'text-gray-400'
            }`}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileBottomMenu;