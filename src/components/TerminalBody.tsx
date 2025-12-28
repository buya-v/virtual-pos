import React from 'react';
import { LCDDisplay } from './LCDDisplay';
import { InputMatrix } from './InputMatrix';
import { useTerminal } from '../context/TerminalContext';
import { Power } from 'lucide-react';

export const TerminalBody: React.FC = () => {
  const { resetTerminal, isNetworkBusy, currentState } = useTerminal();

  return (
    <div className="relative w-[360px] bg-pos-chassis rounded-3xl p-6 shadow-chassis border-t border-gray-600">
      {/* Branding Area */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-400 font-bold tracking-widest text-sm uppercase">VeriSim v3</div>
        
        {/* LED Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-mono">NET</span>
          <div 
            className={`w-3 h-3 rounded-full transition-colors duration-200 border border-gray-900 ${isNetworkBusy ? 'bg-led-amber animate-pulse shadow-[0_0_8px_#FFB000]' : 'bg-gray-800'}`}
          />
        </div>
      </div>

      {/* LCD Screen Wrapper */}
      <div className="mb-6 p-1 bg-gray-900 rounded-lg shadow-lg">
        <LCDDisplay />
      </div>

      {/* Contactless Reader / Divider */}
      <div className="h-1 bg-gray-800 mb-6 rounded-full w-full overflow-hidden flex items-center justify-center">
         {currentState === 'PROCESSING' && <div className="w-full h-full bg-blue-500 animate-progress" />}
      </div>

      {/* Keypad */}
      <InputMatrix />

      {/* Card Slot Styling */}
      <div className="mt-8 h-3 bg-gray-900 rounded-full border-b border-gray-700 flex justify-center items-center">
          <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>

      {/* Hardware Controls (Hidden/Subtle) */}
      <div className="absolute -right-4 top-20 flex flex-col gap-4">
        {/* Reset Pinhole */}
        <button 
            onClick={resetTerminal}
            title="Hardware Reset"
            className="w-6 h-6 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center hover:bg-red-900 active:bg-red-600 transition-colors shadow-lg group"
        >
           <Power size={12} className="text-gray-500 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};
