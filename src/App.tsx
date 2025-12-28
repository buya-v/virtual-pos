import React from 'react';
import { TerminalProvider } from './context/TerminalContext';
import { TerminalBody } from './components/TerminalBody';
import { DevConsole } from './components/DevConsole';

const App: React.FC = () => {
  return (
    <TerminalProvider>
      <div className="min-h-screen bg-[#111827] flex flex-col md:flex-row overflow-hidden">
        {/* Left Stage: The Terminal */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 relative">
           {/* Decorative Background grid */}
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
           
           <TerminalBody />
           
           <div className="mt-8 text-gray-500 text-sm max-w-md text-center">
              <p>Virtual POS Simulator v3.0</p>
              <p className="text-xs mt-2">Use Numpad on your keyboard or click buttons. <br/> Press <strong>ESC</strong> to Clear.</p>
           </div>
        </div>

        {/* Right Stage: Dev Tools */}
        <DevConsole />
      </div>
    </TerminalProvider>
  );
};

export default App;