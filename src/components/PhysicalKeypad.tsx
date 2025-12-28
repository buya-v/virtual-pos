import React from 'react';
import { clsx } from 'clsx';

interface KeypadProps {
  onPress: (key: string) => void;
}

const Key: React.FC<{ 
  label: string; 
  value: string; 
  variant?: 'default' | 'action' | 'clear' | 'cancel' | 'enter';
  onClick: () => void 
}> = ({ label, value, variant = 'default', onClick }) => {
  
  // Visual Beep Logic could go here
  const handleClick = () => {
    onClick();
  };

  const baseClasses = "h-14 rounded font-bold text-xl transition-all active:shadow-btn-dn transform active:translate-y-[2px] flex items-center justify-center select-none cursor-pointer";
  
  const colors = {
    default: "bg-[#3D3D3D] text-white shadow-btn-up",
    action: "bg-[#3D3D3D] text-white shadow-btn-up",
    clear: "bg-yellow-500 text-black shadow-btn-up",
    cancel: "bg-red-600 text-white shadow-btn-up",
    enter: "bg-status-success text-white shadow-btn-up",
  };

  return (
    <button 
      className={clsx(baseClasses, colors[variant])}
      onClick={handleClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export const PhysicalKeypad: React.FC<KeypadProps> = ({ onPress }) => {
  return (
    <div className="p-6 bg-terminal-body rounded-b-lg grid grid-cols-4 gap-4">
      {/* Row 1 */}
      <Key label="1" value="1" onClick={() => onPress('1')} />
      <Key label="2" value="2" onClick={() => onPress('2')} />
      <Key label="3" value="3" onClick={() => onPress('3')} />
      <Key label="CANCEL" value="CANCEL" variant="cancel" onClick={() => onPress('CANCEL')} />

      {/* Row 2 */}
      <Key label="4" value="4" onClick={() => onPress('4')} />
      <Key label="5" value="5" onClick={() => onPress('5')} />
      <Key label="6" value="6" onClick={() => onPress('6')} />
      <Key label="CLEAR" value="CLEAR" variant="clear" onClick={() => onPress('CLEAR')} />

      {/* Row 3 */}
      <Key label="7" value="7" onClick={() => onPress('7')} />
      <Key label="8" value="8" onClick={() => onPress('8')} />
      <Key label="9" value="9" onClick={() => onPress('9')} />
      <Key label="ENTER" value="ENTER" variant="enter" onClick={() => onPress('ENTER')} />

      {/* Row 4 */}
      <Key label="*" value="*" variant="action" onClick={() => onPress('*')} />
      <Key label="0" value="0" onClick={() => onPress('0')} />
      <Key label="#" value="#" variant="action" onClick={() => onPress('#')} />
      <div className="bg-transparent"></div> {/* Spacer */}
    </div>
  );
};
