import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', label, className = '', ...props }) => {
  const baseStyle = "font-mono font-bold px-4 py-2 text-sm md:text-base border-2 active:translate-y-1 transition-all uppercase tracking-wider";
  
  let colors = "";
  if (variant === 'primary') {
    colors = "bg-y2k-hot text-white border-white hover:bg-y2k-purple shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]";
  } else if (variant === 'secondary') {
    colors = "bg-white text-y2k-hot border-y2k-hot hover:bg-y2k-light shadow-[4px_4px_0px_0px_rgba(255,105,180,0.5)]";
  } else {
    colors = "bg-red-500 text-white border-black hover:bg-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  }

  return (
    <button 
      className={`${baseStyle} ${colors} ${className}`} 
      {...props}
    >
      {label}
    </button>
  );
};
