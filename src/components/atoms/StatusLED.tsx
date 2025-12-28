import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface StatusLEDProps {
  active: boolean;
  label?: string;
}

export const StatusLED: React.FC<StatusLEDProps> = ({ active, label }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div 
        animate={{ 
          backgroundColor: active ? '#3B82F6' : '#1f2937',
          boxShadow: active ? '0 0 8px #3B82F6' : 'none'
        }}
        className="w-3 h-3 rounded-full border border-gray-700 bg-gray-800 transition-colors duration-300"
      />
      {label && <span className="text-[10px] text-gray-500 font-ui uppercase">{label}</span>}
    </div>
  );
};