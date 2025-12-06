import { PoopShape, Mood } from './types';
import React from 'react';

export const POOP_SHAPES_DATA: Record<PoopShape, { label: string; icon: React.ReactNode; color: string }> = {
  [PoopShape.SWIRL]: { 
    label: "经典粉旋风", 
    color: "text-pink-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow-md">
        <path d="M12 2C9 2 7 3.5 7 5C7 6 8 7 9 7.5V8C6 8 4 10 4 12C4 14.5 6 16 8 16.5V17C4 17 2 19 2 21C2 21.5 2.5 22 3 22H21C21.5 22 22 21.5 22 21C22 19 20 17 16 17V16.5C18 16 20 14.5 20 12C20 10 18 8 15 8V7.5C16 7 17 6 17 5C17 3.5 15 2 12 2Z" />
      </svg>
    ) 
  },
  [PoopShape.HEART]: { 
    label: "爱心噗噗", 
    color: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow-md">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    )
  },
  [PoopShape.STAR]: { 
    label: "超级巨星", 
    color: "text-yellow-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow-md">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    )
  },
  [PoopShape.GLITTER_BOMB]: { 
    label: "闪亮炸弹", 
    color: "text-purple-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow-md">
        <circle cx="12" cy="12" r="6" />
        <path d="M12 2L13 5H16L14 7L15 10L12 8L9 10L10 7L8 5H11L12 2Z" className="animate-spin origin-center"/>
        <path d="M2 12L5 13V16L7 14L10 15L8 12L10 9L7 10L5 7V10L2 12Z" className="opacity-50"/>
      </svg>
    )
  },
  [PoopShape.RABBIT]: { 
    label: "兔兔软糖", 
    color: "text-pink-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow-md">
         <path d="M12 2C10 2 8 4 8 7V9C6 9 4 11 4 14C4 17 6 20 9 21C9 21.5 9.5 22 10 22H14C14.5 22 15 21.5 15 21C18 20 20 17 20 14C20 11 18 9 16 9V7C16 4 14 2 12 2M9 4C9.5 4 10 4.5 10 5V8H9V5C9 4.5 9 4 9 4M14 5C14 4.5 14.5 4 15 4C15 4 15 4.5 15 5V8H14V5Z"/>
      </svg>
    )
  }
};

export const MOOD_DATA: Record<Mood, string> = {
  [Mood.HAPPY]: "🥰 感觉超棒",
  [Mood.MEH]: "😐 也就那样",
  [Mood.SAD]: "😢 肚肚痛痛",
  [Mood.DYING]: "💀 救命啊",
  [Mood.ANGELIC]: "😇 升天了",
};
