import React from 'react';
import { useTerminal } from '../context/TerminalContext';
import { Wifi, WifiOff, Lock } from 'lucide-react';

export const LCDDisplay: React.FC = () => {
  const { currentState, inputBuffer, displayMessage, config, isNetworkBusy } = useTerminal();

  // Formatting helper
  const formatCurrency = (val: string) => {
    const num = parseInt(val || '0', 10);
    return (num / 100).toFixed(2);
  };

  const renderContent = () => {
    switch (currentState) {
      case 'OFF':
        return <div className="w-full h-full bg-[#1A2408] opacity-90" />;
      
      case 'BOOTING':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <div className="text-sm">SYSTEM BOOT</div>
            <div className="w-32 h-2 border border-[#1A2408] p-0.5">
              <div className="h-full bg-[#1A2408] animate-[pulse_1s_ease-in-out_infinite] w-full origin-left scale-x-50"></div>
            </div>
            <div className="text-xs">vPOS v3.0.1</div>
          </div>
        );

      case 'IDLE':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-xl animate-pulse">{displayMessage}</div>
            <div className="text-sm mt-1">INSERT CARD</div>
          </div>
        );

      case 'INPUT_AMOUNT':
        return (
          <div className="flex flex-col h-full justify-between py-2 px-1">
            <div className="text-xs text-right">SALE</div>
            <div className="text-4xl text-right font-bold">
              ${formatCurrency(inputBuffer)}
            </div>
          </div>
        );

      case 'PROCESSING':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-lg">PROCESSING</div>
            <div className="text-xs mt-2">DO NOT REMOVE CARD</div>
          </div>
        );

      case 'SUCCESS':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl font-bold">APPROVED</div>
            <div className="text-sm">AUTH: {Math.floor(Math.random() * 999999)}</div>
          </div>
        );

      case 'ERROR':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-xl font-bold blink">ERROR</div>
            <div className="text-sm">{displayMessage}</div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-48 bg-lcd-backlight rounded-md p-4 relative overflow-hidden shadow-inner border-4 border-[#222]">
      {/* Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      
      {/* Status Bar */}
      <div className={`flex justify-between text-[#1A2408] text-xs font-bold mb-2 font-lcd z-0 relative ${currentState === 'OFF' ? 'invisible' : ''}`}>
        <span className="flex items-center gap-1">
          {config.networkLatencyMode ? <WifiOff size={12} /> : <Wifi size={12} />}
          {isNetworkBusy && <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-[#1A2408] opacity-75"></span>}
        </span>
        <span className="flex items-center gap-1">
           BAT 100% <Lock size={10} />
        </span>
      </div>

      {/* Main Content Area */}
      <div className="font-lcd text-[#1A2408] h-32 w-full relative z-0">
        {renderContent()}
      </div>
    </div>
  );
};
