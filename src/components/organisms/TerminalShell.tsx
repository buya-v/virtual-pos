import React from 'react';
import { Screen } from '../molecules/Screen';
import { KeypadButton } from '../atoms/KeypadButton';
import { StatusLED } from '../atoms/StatusLED';
import { useTerminalStore } from '../../store/useTerminalStore';
import { CreditCard } from 'lucide-react';
import clsx from 'clsx';

export const TerminalShell: React.FC = () => {
  const {
    digitPress,
    clearPress,
    cancelPress,
    confirmPress,
    status,
    simulateCard
  } = useTerminalStore();

  const isCardReady = status === 'WAITING_FOR_CARD';

  return (
    <div className="relative w-[340px] bg-terminal-surface rounded-3xl p-6 shadow-terminal border-t border-gray-700 flex flex-col gap-6">
      {/* Brand & LEDs */}
      <div className="flex justify-between items-center px-2">
        <div className="font-ui font-bold text-gray-400 tracking-wider">vPOS</div>
        <div className="flex gap-3">
          <StatusLED active={isCardReady} label="NFC" />
          <StatusLED active={status === 'AUTHORIZING'} label="NET" />
        </div>
      </div>

      {/* Screen Area */}
      <Screen />

      {/* NFC Tap Area / Card Slot Visual */}
      <div 
        className={clsx(
          "h-12 w-full rounded border-2 border-dashed border-gray-700 flex items-center justify-center gap-2 transition-colors cursor-pointer",
          isCardReady ? "border-blue-500 bg-blue-900/20 text-blue-400 animate-pulse" : "text-gray-600"
        )}
        onClick={isCardReady ? simulateCard : undefined}
        title="Click to simulate Card Tap/Insert"
      >
        <CreditCard size={20} />
        <span className="text-sm font-ui font-medium">
          {isCardReady ? "TAP CARD HERE" : "CARD READER"}
        </span>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <KeypadButton 
            key={num} 
            label={num.toString()} 
            onClick={() => digitPress(num)} 
          />
        ))}
        <KeypadButton label="" variant="default" onClick={() => {}} className="opacity-50 pointer-events-none" /> {/* Empty/Fn key */}
        <KeypadButton label="0" onClick={() => digitPress(0)} />
        <KeypadButton label="" variant="default" onClick={() => {}} className="opacity-50 pointer-events-none" /> {/* Empty/Fn key */}
      </div>

      {/* Action Tray */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        <KeypadButton label="CANCEL" variant="cancel" onClick={cancelPress} />
        <KeypadButton label="CLEAR" variant="clear" onClick={clearPress} />
        <KeypadButton label="ENTER" variant="confirm" onClick={confirmPress} />
      </div>
      
      {/* Bottom Curve Reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/50 to-transparent rounded-b-3xl pointer-events-none" />
    </div>
  );
};