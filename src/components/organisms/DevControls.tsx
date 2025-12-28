import React from 'react';
import { useTerminalStore } from '../../store/useTerminalStore';
import { Settings2, RotateCcw } from 'lucide-react';
import { ResponseCode } from '../../types';

export const DevControls: React.FC = () => {
  const { settings, setSettings, reset, status } = useTerminalStore();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
      <div className="flex items-center gap-2 mb-6 text-gray-800">
        <Settings2 size={20} />
        <h2 className="font-bold font-ui text-lg">Developer Controls</h2>
      </div>

      <div className="space-y-6">
        {/* Response Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 block">Simulated Response</label>
          <select
            value={settings.responseCode}
            onChange={(e) => setSettings({ responseCode: e.target.value as ResponseCode })}
            className="w-full p-2 border border-gray-300 rounded-md font-ui text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="00">00 - Approved</option>
            <option value="05">05 - Declined (Generic)</option>
            <option value="51">51 - Insufficient Funds</option>
          </select>
        </div>

        {/* Network Latency */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-600">Network Latency</label>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{settings.latencyMs}ms</span>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={settings.latencyMs}
            onChange={(e) => setSettings({ latencyMs: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-ui uppercase">
            <span>Fast (4G)</span>
            <span>Slow (2G)</span>
          </div>
        </div>

        {/* Card Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 block">Simulated Card</label>
          <div className="grid grid-cols-2 gap-2">
            {['Visa', 'Mastercard', 'Amex', 'Invalid'].map((type) => (
              <button
                key={type}
                onClick={() => setSettings({ cardType: type as any })}
                className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                  settings.cardType === type
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
           <button
             onClick={reset}
             className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm font-medium"
           >
             <RotateCcw size={16} />
             Hard Reset Terminal
           </button>
        </div>
        
        <div className="text-xs text-gray-400 font-mono mt-4">
          STATUS: <span className="text-blue-600">{status}</span>
        </div>
      </div>
    </div>
  );
};