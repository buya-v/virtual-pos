import React, { useRef, useEffect } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { ScrollText, Wifi, Volume2, VolumeX, Trash2, Copy } from 'lucide-react';

export const DevConsole: React.FC = () => {
  const { logs, config, toggleNetworkLatency, toggleSound, clearLogs, currentState } = useTerminal();
  const endRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of logs
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const copyToCurl = (payload: any) => {
    const curl = `curl -X POST https://api.vpos.sim/v1/tx \
-H "Content-Type: application/json" \
-d '${JSON.stringify(payload)}'`;
    navigator.clipboard.writeText(curl);
    alert('Copied CURL to clipboard');
  };

  return (
    <div className="w-full md:w-96 bg-gray-900 border-l border-gray-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <ScrollText size={16} /> DevTools / Inspector
        </h2>
      </div>

      {/* State Inspector */}
      <div className="p-4 bg-gray-800/30 border-b border-gray-800">
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-gray-500 block">STATE MACHINE</span>
            <span className={`font-bold ${currentState === 'ERROR' ? 'text-red-400' : 'text-green-400'}`}>
              {currentState}
            </span>
          </div>
          <div>
             <span className="text-gray-500 block">MERCHANT ID</span>
             <span className="text-blue-300">{config.merchantId}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-2 grid grid-cols-3 gap-2 border-b border-gray-800">
        <button 
            onClick={toggleNetworkLatency}
            className={`p-2 rounded text-xs flex flex-col items-center gap-1 transition-colors ${config.networkLatencyMode ? 'bg-orange-900/50 text-orange-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          <Wifi size={14} />
          {config.networkLatencyMode ? '3G (Slow)' : 'LTE (Fast)'}
        </button>
        
        <button 
            onClick={toggleSound}
            className={`p-2 rounded text-xs flex flex-col items-center gap-1 transition-colors ${config.soundEnabled ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
        >
          {config.soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          Sound
        </button>

        <button 
            onClick={clearLogs}
            className="p-2 rounded text-xs flex flex-col items-center gap-1 bg-gray-800 text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      {/* Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
        {logs.length === 0 && (
            <div className="text-center text-gray-600 mt-10 italic">No events recorded</div>
        )}
        
        {[...logs].reverse().map((log) => (
          <div key={log.id} className="bg-gray-800/50 rounded border border-gray-700 overflow-hidden group">
            <div className="flex justify-between items-center px-2 py-1 bg-gray-800">
              <span className={`font-bold ${log.type === 'REQUEST' ? 'text-blue-400' : log.type === 'RESPONSE' ? 'text-purple-400' : 'text-gray-400'}`}>
                {log.type}
              </span>
              <span className="text-[10px] text-gray-500">{log.timestamp.split('T')[1].split('.')[0]}</span>
            </div>
            <div className="p-2 relative">
              <pre className="whitespace-pre-wrap break-all text-gray-300">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
              {log.type === 'REQUEST' && (
                  <button 
                    onClick={() => copyToCurl(log.payload)}
                    className="absolute top-2 right-2 p-1 bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
                    title="Copy as cURL"
                  >
                      <Copy size={10} />
                  </button>
              )}
            </div>
            <div className={`h-1 w-full ${log.status === 'error' ? 'bg-red-500' : log.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};
