import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface KeypadButtonProps {
  label: string;
  subLabel?: string;
  variant?: 'default' | 'confirm' | 'cancel' | 'clear';
  onClick: () => void;
  className?: string;
}

export const KeypadButton: React.FC<KeypadButtonProps> = ({ 
  label, 
  subLabel, 
  variant = 'default', 
  onClick,
  className
}) => {
  const baseStyles = "relative w-full h-12 rounded-md flex flex-col items-center justify-center select-none active:translate-y-[4px] active:shadow-none transition-all duration-75";
  
  const variants = {
    default: "bg-[#2A2A2B] text-white shadow-key border border-gray-700",
    confirm: "bg-action-confirm text-white shadow-[0px_4px_0px_#14532D] border border-green-700",
    cancel: "bg-action-cancel text-white shadow-[0px_4px_0px_#7F1D1D] border border-red-700",
    clear: "bg-action-clear text-black shadow-[0px_4px_0px_#78350F] border border-yellow-700",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
    >
      <span className={clsx("font-ui font-bold", variant === 'default' ? "text-lg" : "text-sm uppercase")}>
        {label}
      </span>
      {subLabel && variant === 'default' && (
        <span className="text-[10px] text-gray-400 font-ui leading-none">{subLabel}</span>
      )}
    </motion.button>
  );
};