import React from 'react';
import { TerminalShell } from './components/organisms/TerminalShell';
import { DevControls } from './components/organisms/DevControls';
import { TransactionHistory } from './components/organisms/TransactionHistory';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-ui flex flex-col items-center justify-center">
      
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Virtual POS</h1>
        <p className="text-gray-500 mt-2">Hardware Terminal Simulator v1.0</p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The Terminal (Center Stage) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-1">
          <div className="sticky top-8">
            <TerminalShell />
            <div className="text-center mt-6 text-xs text-gray-400 max-w-[340px]">
              <p>Keyboard Shortcuts Enabled</p>
              <p>Use NumPad or Click buttons</p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Data */}
        <div className="lg:col-span-7 space-y-6 order-2 lg:order-2">
          <DevControls />
          <TransactionHistory />
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
            <strong>How to use:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-blue-700">
              <li>Terminal starts in <strong>IDLE</strong> mode.</li>
              <li>Enter an amount (e.g., 100 for $1.00) and press <strong>ENTER</strong>.</li>
              <li>When prompt says "PRESENT CARD", click the <strong>Card Reader</strong> area.</li>
              <li>Use Dev Controls to simulate declined cards or network timeouts.</li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;