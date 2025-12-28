import React, { useEffect, useRef } from 'react';
import { LogEntry, TerminalState } from '../types';
import { AlertCircle, ArrowUpRight, ArrowDownLeft, Settings, Database } from 'lucide-react';
import { clsx } from 'clsx';

interface DevPanelProps {
  logs: LogEntry[];
  status: TerminalState;
  latencyMode: boolean;
  onToggleLatency: (val: boolean) => void;
  showDiagnostic: boolean;
  onToggleDiagnostic: (val: boolean) => void;
}

export const DevPanel: React.FC<DevPanelProps> = ({ 
  logs, 
  status, 
  latencyMode, 
  onToggleLatency, 
  showDiagnostic,
  onToggleDiagnostic
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 shadow-xl w-full md:w-[400px]">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-bold uppercase text-gray-600 flex items-center gap-2">
          <Settings size={16} /> Operational Inspector
        </h2>
      </div>

      {/* Controls */}
      <div className="p-4 grid grid-cols-2 gap-4 border-b border-gray-200">
        <div className="col-span-2">
          <label className="text-xs font-semibold text-gray-500">CURRENT STATE</label>
          <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {status}
          </div>
        </div>

        <div className="flex items-center justify-between col-span-2 bg-gray-100 p-2 rounded">
          <span className="text-xs font-medium">Simulate Network Latency (2-5s)</span>
          <button 
            onClick={() => onToggleLatency(!latencyMode)}
            className={clsx(
              "w-10 h-5 rounded-full transition-colors relative",
              latencyMode ? "bg-blue-600" : "bg-gray-300"
            )}
          >
            <span className={clsx(
              "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform",
              latencyMode ? "translate-x-5" : "translate-x-0"
            )} />
          </button>
        </div>

         <div className="flex items-center justify-between col-span-2 bg-gray-100 p-2 rounded">
          <span className="text-xs font-medium">Diagnostic Overlay</span>
          <button 
            onClick={() => onToggleDiagnostic(!showDiagnostic)}
            className={clsx(
              "w-10 h-5 rounded-full transition-colors relative",
              showDiagnostic ? "bg-purple-600" : "bg-gray-300"
            )}
          >
            <span className={clsx(
              "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform",
              showDiagnostic ? "translate-x-5" : "translate-x-0"
            )} />
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-2 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
          <Database size={12} /> Live Trace Log
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
          {logs.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-10">No activity recorded</p>
          )}
          {logs.map((log) => (
            <div key={log.id} className="text-xs font-mono border rounded p-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400">{log.timestamp}</span>
                <Badge type={log.type} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-gray-700">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ type: LogEntry['type'] }> = ({ type }) => {
  if (type === 'REQUEST') return <span className="flex items-center gap-1 text-blue-600 font-bold"><ArrowUpRight size={10} /> REQ</span>;
  if (type === 'RESPONSE') return <span className="flex items-center gap-1 text-green-600 font-bold"><ArrowDownLeft size={10} /> RES</span>;
  return <span className="flex items-center gap-1 text-gray-600 font-bold"><AlertCircle size={10} /> SYS</span>;
};