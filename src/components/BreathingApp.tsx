import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHASE_DURATIONS } from '../types/breathing';
import type { BreathingState } from '../types/breathing';
import PersonalRequestInput from './PersonalRequestInput';
import SpeakerSelection from './SpeakerSelection';
import DurationSelection from './DurationSelection';
import MoodSelection from './MoodSelection';
import BreathingCircle from './BreathingCircle';
import PreparationStage from './PreparationStage';
import MobileBottomMenu from './MobileBottomMenu';

const BreathingApp: React.FC = () => {
  const [breathingState, setBreathingState] = useState<BreathingState>({
    phase: 'prepare',
    timeLeft: PHASE_DURATIONS.prepare,
    isActive: false,
    currentCycle: 0,
    totalCycles: 4,
    isPreparing: false
  });

  const [personalRequest, setPersonalRequest] = useState<string>('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('emily');
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const [selectedMood, setSelectedMood] = useState<string>('none');
  const [showBreathingSession, setShowBreathingSession] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Calculate total cycles based on duration
  useEffect(() => {
    const cycleTime = PHASE_DURATIONS.inhale + PHASE_DURATIONS.hold + PHASE_DURATIONS.exhale + PHASE_DURATIONS.rest;
    const totalCycles = Math.floor((selectedDuration * 60) / cycleTime);
    setBreathingState(prev => ({ ...prev, totalCycles }));
  }, [selectedDuration]);

  // Play notification sound
  const playNotificationSound = (frequency: number = 440, duration: number = 200) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Play completion sound
  const playCompletionSound = () => {
    if (!audioContextRef.current) return;
    
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 chord
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playNotificationSound(freq, 800);
      }, index * 200);
    });
  };

  const startBreathingSession = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    setShowBreathingSession(true);
    setBreathingState({
      phase: 'prepare',
      timeLeft: PHASE_DURATIONS.prepare,
      isActive: false,
      currentCycle: 0,
      totalCycles: breathingState.totalCycles,
      isPreparing: true
    });
    
    playNotificationSound(440, 300);
  };

  const startActualBreathing = () => {
    setBreathingState(prev => ({
      ...prev,
      phase: 'inhale',
      timeLeft: PHASE_DURATIONS.inhale,
      isActive: true,
      currentCycle: 1,
      isPreparing: false
    }));
    
    playNotificationSound(523.25, 400); // C5 note
  };

  const stopBreathing = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setBreathingState({
      phase: 'prepare',
      timeLeft: PHASE_DURATIONS.prepare,
      isActive: false,
      currentCycle: 0,
      totalCycles: breathingState.totalCycles,
      isPreparing: false
    });
    setShowBreathingSession(false);
  };

  // Main breathing timer logic
  useEffect(() => {
    if (breathingState.isActive || breathingState.isPreparing) {
      intervalRef.current = setInterval(() => {
        setBreathingState(prev => {
          if (prev.timeLeft > 1) {
            return { ...prev, timeLeft: prev.timeLeft - 1 };
          }
          
          // Handle preparation phase completion
          if (prev.isPreparing) {
            startActualBreathing();
            return prev;
          }
          
          // Phase transition logic for breathing
          let nextPhase: any;
          let nextTimeLeft: number;
          let nextCycle = prev.currentCycle;
          
          switch (prev.phase) {
            case 'inhale':
              nextPhase = 'hold';
              nextTimeLeft = PHASE_DURATIONS.hold;
              playNotificationSound(659.25, 300); // E5 note
              break;
            case 'hold':
              nextPhase = 'exhale';
              nextTimeLeft = PHASE_DURATIONS.exhale;
              playNotificationSound(783.99, 300); // G5 note
              break;
            case 'exhale':
              nextPhase = 'rest';
              nextTimeLeft = PHASE_DURATIONS.rest;
              playNotificationSound(392, 300); // G4 note
              break;
            case 'rest':
              if (prev.currentCycle >= prev.totalCycles) {
                playCompletionSound();
                return {
                  ...prev,
                  isActive: false,
                  phase: 'prepare',
                  timeLeft: PHASE_DURATIONS.prepare
                };
              }
              nextPhase = 'inhale';
              nextTimeLeft = PHASE_DURATIONS.inhale;
              nextCycle = prev.currentCycle + 1;
              playNotificationSound(523.25, 400); // C5 note
              break;
            default:
              nextPhase = 'inhale';
              nextTimeLeft = PHASE_DURATIONS.inhale;
          }
          
          return {
            ...prev,
            phase: nextPhase,
            timeLeft: nextTimeLeft,
            currentCycle: nextCycle
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [breathingState.isActive, breathingState.isPreparing]);

  if (showBreathingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
          <AnimatePresence mode="wait">
            {breathingState.isPreparing ? (
              <PreparationStage
                key="preparation"
                timeLeft={breathingState.timeLeft}
                onComplete={startActualBreathing}
              />
            ) : (
              <motion.div
                key="breathing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md"
              >
                <BreathingCircle breathingState={breathingState} />
                
                {/* Session Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">
                    4-7-8 Breathing Session
                  </h2>
                  <p className="text-gray-300">
                    {selectedDuration} minute session with {selectedSpeaker}
                  </p>
                  {personalRequest && (
                    <p className="text-sm text-gray-400 mt-2 italic">
                      "{personalRequest}"
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Stop Button */}
          <motion.button
            onClick={stopBreathing}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            End Session
          </motion.button>
        </div>
        
        <MobileBottomMenu />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
      <div className="flex-1 px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-md mx-auto">
          <PersonalRequestInput
            value={personalRequest}
            onChange={setPersonalRequest}
          />
          
          <SpeakerSelection
            selectedSpeaker={selectedSpeaker}
            onSpeakerChange={setSelectedSpeaker}
          />
          
          <DurationSelection
            selectedDuration={selectedDuration}
            onDurationChange={setSelectedDuration}
          />
          
          <MoodSelection
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
          />
          
          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <motion.button
              onClick={startBreathingSession}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Breathing Session
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      <MobileBottomMenu />
    </div>
  );
};

export default BreathingApp;