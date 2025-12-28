import React, { useEffect, useState } from 'react';
import { useTerminalStore } from '../../store/useTerminalStore';
import { LCDLine } from '../atoms/LCDLine';
import { formatCurrency } from '../../utils/formatters';
import { Wifi, BatteryMedium, Lock } from 'lucide-react';
import clsx from 'clsx';

export const Screen: React.FC = () => {
  const { status, amount } = useTerminalStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (status) {
      case 'IDLE':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <div className="border-2 border-terminal-text rounded p-1">
              <Lock className="w-6 h-6 text-terminal-text" />
            </div>
            <LCDLine text="WELCOME" align="center" />
            <LCDLine text="ENTER AMOUNT" align="center" />
          </div>
        );
      case 'AMOUNT_ENTRY':
        return (
          <div className="flex flex-col h-full justify-between pt-4">
            <LCDLine text="SALE" align="left" />
            <LCDLine text={formatCurrency(amount)} align="right" size="lg" />
          </div>
        );
      case 'WAITING_FOR_CARD':
        return (
          <div className="flex flex-col items-center justify-center h-full animate-pulse">
            <LCDLine text="PRESENT CARD" align="center" />
            <LCDLine text={formatCurrency(amount)} align="center" />
          </div>
        );
      case 'AUTHORIZING':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <LCDLine text="PROCESSING..." align="center" />
            <div className="w-full mt-2 h-1 bg-terminal-text/20 overflow-hidden">
               <div className="h-full bg-terminal-text animate-[shimmer_1s_infinite_linear] w-1/2 mx-auto" />
            </div>
          </div>
        );
      case 'APPROVED':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <LCDLine text="APPROVED" align="center" size="lg" />
            <LCDLine text="PLEASE REMOVE CARD" align="center" />
          </div>
        );
      case 'DECLINED':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <LCDLine text="DECLINED" align="center" size="lg" />
            <LCDLine text="TRY ANOTHER CARD" align="center" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-40 bg-terminal-screen rounded-md relative overflow-hidden border-4 border-gray-800 shadow-inner p-3 flex flex-col">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-lcd-scanlines opacity-30 pointer-events-none z-10 mix-blend-overlay" />
      
      {/* Status Bar */}
      <div className="flex justify-between items-center pb-2 border-b border-terminal-text/30 mb-2 z-0 relative">
        <div className="flex items-center gap-1 text-terminal-text">
          <Wifi size={14} strokeWidth={3} />
        </div>
        <span className="font-display text-terminal-text text-xs">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <div className="text-terminal-text">
          <BatteryMedium size={14} strokeWidth={3} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-0">
        {renderContent()}
      </div>
    </div>
  );
};