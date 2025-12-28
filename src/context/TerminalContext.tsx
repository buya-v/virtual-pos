import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { TerminalState, TransactionLog, POSConfig, TerminalContextType } from '../types';

const DEFAULT_CONFIG: POSConfig = {
  merchantId: "MERCH-001-GENERIC",
  currency: "USD",
  networkLatencyMode: false,
  soundEnabled: true
};

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [currentState, setCurrentState] = useState<TerminalState>('OFF');
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [inputBuffer, setInputBuffer] = useState<string>('');
  const [logs, setLogs] = useState<TransactionLog[]>([]);
  const [isNetworkBusy, setIsNetworkBusy] = useState(false);
  
  // Ref for persistence debounce or immediate access
  const stateRef = useRef(currentState);
  stateRef.current = currentState;

  // Lazy Load Config from LocalStorage (Persistence P0)
  const [config, setConfig] = useState<POSConfig>(() => {
    const saved = localStorage.getItem('vpos_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  // Persist Config
  useEffect(() => {
    localStorage.setItem('vpos_config', JSON.stringify(config));
  }, [config]);

  // Logging Utility
  const addLog = (type: TransactionLog['type'], payload: any, status: TransactionLog['status'] = 'success') => {
    const newLog: TransactionLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      payload,
      status
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Audio Feedback
  const playBeep = () => {
    if (!config.soundEnabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 800;
    gain.gain.value = 0.1;
    osc.start();
    setTimeout(() => osc.stop(), 50);
  };

  // Boot Sequence
  const powerOn = () => {
    if (currentState !== 'OFF') return;
    setCurrentState('BOOTING');
    addLog('SYSTEM', { message: 'Boot sequence initiated' }, 'pending');
    
    setTimeout(() => {
      setCurrentState('IDLE');
      setDisplayMessage('WELCOME');
      addLog('SYSTEM', { message: 'System Ready', config }, 'success');
    }, 2000); // 2s Boot requirement
  };

  // Auto-boot on mount (AC 1)
  useEffect(() => {
    powerOn();
  }, []);

  const resetTerminal = () => {
    setCurrentState('OFF');
    setInputBuffer('');
    setIsNetworkBusy(false);
    addLog('SYSTEM', { message: 'Hard Reset Triggered' }, 'error');
    setTimeout(powerOn, 500);
  };

  const processTransaction = async (amount: string) => {
    setCurrentState('PROCESSING');
    setIsNetworkBusy(true);
    const latency = config.networkLatencyMode ? 3000 : 800; // Network Latency Sim

    const requestPayload = {
      merchantId: config.merchantId,
      amount: parseFloat(amount) / 100,
      currency: config.currency,
      timestamp: new Date().toISOString()
    };

    addLog('REQUEST', requestPayload, 'pending');

    // Simulate API Call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 10% fail rate
        
        setIsNetworkBusy(false);
        
        if (success) {
          setCurrentState('SUCCESS');
          setDisplayMessage('APPROVED');
          addLog('RESPONSE', { status: 'APPROVED', code: '00' }, 'success');
        } else {
          setCurrentState('ERROR');
          setDisplayMessage('COMM ERROR');
          addLog('RESPONSE', { status: 'DECLINED', error: 'Network Timeout' }, 'error');
        }

        // Return to IDLE after result
        setTimeout(() => {
          setCurrentState('IDLE');
          setInputBuffer('');
          setDisplayMessage('WELCOME');
        }, 2000);
        
        resolve();
      }, latency);
    });
  };

  const inputKey = (key: string) => {
    if (currentState === 'OFF' || currentState === 'BOOTING' || currentState === 'PROCESSING') return;

    playBeep();

    if (key === 'CLEAR') {
      setInputBuffer('');
      setCurrentState('IDLE');
      setDisplayMessage('WELCOME');
      return;
    }

    if (key === 'ENTER') {
      if (inputBuffer.length > 0) {
        processTransaction(inputBuffer);
      }
      return;
    }

    // Number Input
    if (currentState === 'IDLE') {
      setCurrentState('INPUT_AMOUNT');
    }

    if (inputBuffer.length < 9) { // Max digits
      const newVal = inputBuffer + key;
      setInputBuffer(newVal);
    }
  };

  const toggleNetworkLatency = () => {
    setConfig(prev => ({ ...prev, networkLatencyMode: !prev.networkLatencyMode }));
  };

  const toggleSound = () => {
    setConfig(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const clearLogs = () => setLogs([]);

  return (
    <TerminalContext.Provider value={{
      currentState,
      displayMessage,
      inputBuffer,
      logs,
      config,
      isNetworkBusy,
      powerOn,
      resetTerminal,
      inputKey,
      toggleNetworkLatency,
      toggleSound,
      clearLogs
    }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) throw new Error('useTerminal must be used within a TerminalProvider');
  return context;
};