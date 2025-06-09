export type BreathingPhase = 'prepare' | 'inhale' | 'hold' | 'exhale' | 'rest';

export interface BreathingState {
  phase: BreathingPhase;
  timeLeft: number;
  isActive: boolean;
  currentCycle: number;
  totalCycles: number;
  isPreparing: boolean;
}

export interface Speaker {
  id: string;
  name: string;
  avatar: string;
}

export interface MoodOption {
  id: string;
  icon: string;
  color: string;
  name: string;
}

export const PHASE_DURATIONS = {
  prepare: 3,
  inhale: 4,
  hold: 7,
  exhale: 8,
  rest: 2
};

export const PHASE_INSTRUCTIONS = {
  prepare: 'Get Ready',
  inhale: 'Breathe In',
  hold: 'Hold',
  exhale: 'Breathe Out',
  rest: 'Rest'
};

export const SPEAKERS: Speaker[] = [
  { id: 'emily', name: 'Emily', avatar: '/avatars/emily.jpg' },
  { id: 'william', name: 'William', avatar: '/avatars/william.jpg' },
  { id: 'khloe', name: 'Khloe', avatar: '/avatars/khloe.jpg' },
  { id: 'john', name: 'John', avatar: '/avatars/john.jpg' }
];

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'none', icon: '🚫', color: 'bg-gray-600', name: 'None' },
  { id: 'calm', icon: '🧘', color: 'bg-green-600', name: 'Calm' },
  { id: 'focus', icon: '🎯', color: 'bg-purple-600', name: 'Focus' },
  { id: 'meditation', icon: '🧘‍♂️', color: 'bg-blue-600', name: 'Meditation' }
];