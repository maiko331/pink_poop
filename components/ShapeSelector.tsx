import React from 'react';
import { PoopShape } from '../types';
import { POOP_SHAPES_DATA } from '../constants';

interface ShapeSelectorProps {
  selected: PoopShape;
  onChange: (shape: PoopShape) => void;
}

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 bg-pink-50 border-2 border-dashed border-pink-300 rounded-lg">
      {(Object.keys(POOP_SHAPES_DATA) as PoopShape[]).map((shape) => {
        const data = POOP_SHAPES_DATA[shape];
        const isSelected = selected === shape;
        
        return (
          <button
            key={shape}
            type="button"
            onClick={() => onChange(shape)}
            className={`
              flex flex-col items-center justify-center p-2 rounded transition-all duration-200
              ${isSelected ? 'bg-white shadow-[2px_2px_0px_#FF00CC] scale-105 border-2 border-y2k-hot' : 'hover:bg-pink-100 opacity-70 hover:opacity-100'}
            `}
          >
            <div className={`${data.color} ${isSelected ? 'animate-bounce-slow' : ''}`}>
              {data.icon}
            </div>
            <span className="text-xs font-mono font-bold mt-1 text-gray-600">{data.label}</span>
          </button>
        );
      })}
    </div>
  );
};
