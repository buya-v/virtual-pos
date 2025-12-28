import React, { useState } from 'react';
import { LCDScreen } from './components/LCDScreen';
import { PhysicalKeypad } from './components/PhysicalKeypad';
import { DevPanel } from './components/DevPanel';
import { Receipt } from './components/Receipt';
import { usePosLogic } from './hooks/usePosLogic';
import { CreditCard, Nfc, Smartphone } from 'lucide-react';
import { clsx } from 'clsx';

function App() {
  const {
    status,
    inputBuffer,
    logs,
    latencyMode,
    txData,
    showDiagnostic,
    setLatencyMode,
    setShowDiagnostic,
    handleKeyPress,
    processPayment
  } = usePosLogic();

  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-200 overflow-hidden font-sans">
      
      {/* Main Stage: The Terminal */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        
        {/* Receipt Output Area */}
        <div className="relative w-[320px] h-[60px] mb-[-20px] z-0 overflow-visible">
          {(status === 'PRINTING' || status === 'APPROVED') && txData && (
            <Receipt data={txData} approved={status === 'APPROVED'} />
          )}
        </div>

        {/* Terminal Chassis */}
        <div className="relative z-10 w-[320px] bg-terminal-body rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-white/10 chassis-texture p-4 pb-8">
          
          {/* Branding */}
          <div className="flex justify-between items-center mb-4 px-2">
             <div className="text-gray-400 font-bold tracking-widest text-xs">vPOS S-200</div>
             <div className="flex gap-1">
                <div className={clsx("w-2 h-2 rounded-full", status !== 'BOOTING' ? 'bg-green-500' : 'bg-red-500 animate-pulse')}></div>
             </div>
          </div>

          {/* Components */}
          <LCDScreen 
            status={status} 
            inputBuffer={inputBuffer} 
            txData={txData} 
            showDiagnostic={showDiagnostic}
          />
          
          <div className="my-6 h-1 bg-black/30 rounded-full mx-4 shadow-beveled"></div>
          
          <PhysicalKeypad onPress={handleKeyPress} />

          {/* Card Reader Slot Visuals */}
          <div className="absolute -right-4 top-1/3 w-4 h-32 bg-gray-800 rounded-r-lg border-l-4 border-black flex items-center justify-center shadow-lg">
            <div className="w-1 h-20 bg-black/50 rounded-full"></div>
          </div>
        </div>

        {/* Interaction Modals (The "Inputs") */}
        {status === 'AWAITING_PAYMENT' && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl border border-gray-200 animate-fade-in flex gap-4">
             <button 
              onClick={() => processPayment('INSERT')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 rounded-lg transition-colors"
             >
                <CreditCard className="text-blue-600" />
                <span className="text-xs font-bold">Insert Chip</span>
             </button>
             <button 
              onClick={() => processPayment('TAP')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-green-50 rounded-lg transition-colors"
             >
                <Nfc className="text-green-600" />
                <span className="text-xs font-bold">Tap Card</span>
             </button>
             <button 
              onClick={() => processPayment('SWIPE')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-purple-50 rounded-lg transition-colors"
             >
                <Smartphone className="text-purple-600" />
                <span className="text-xs font-bold">Apple Pay</span>
             </button>
          </div>
        )}

      </div>

      {/* Side Drawer Toggle (Mobile) */}
      <button 
        className="md:hidden fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <Settings />
      </button>

      {/* DevPanel */}
      <div className={clsx(
        "fixed md:relative inset-y-0 right-0 z-40 transform transition-transform duration-300 ease-in-out md:transform-none",
        drawerOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <DevPanel 
          logs={logs} 
          status={status} 
          latencyMode={latencyMode}
          onToggleLatency={setLatencyMode}
          showDiagnostic={showDiagnostic}
          onToggleDiagnostic={setShowDiagnostic}
        />
      </div>

    </div>
  );
}

export default App;