import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TerminalState, LogEntry, InteractionMode, TransactionData } from '../types';

export const usePosLogic = () => {
  // -- State --
  const [status, setStatus] = useState<TerminalState>('BOOTING');
  const [inputBuffer, setInputBuffer] = useState<string>('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [latencyMode, setLatencyMode] = useState<boolean>(false);
  const [txData, setTxData] = useState<TransactionData | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  // -- Refs for persistence --
  const hasBooted = useRef(false);

  // -- Logging Helper --
  const addLog = useCallback((type: LogEntry['type'], payload: any) => {
    setLogs(prev => [{
      id: uuidv4(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      payload
    }, ...prev]);
  }, []);

  // -- Lifecycle: Boot Sequence --
  useEffect(() => {
    if (!hasBooted.current) {
      const savedState = localStorage.getItem('vpos_registered');
      setTimeout(() => {
        if (savedState === 'true') {
          setStatus('IDLE');
        } else {
          setStatus('IDLE');
          localStorage.setItem('vpos_registered', 'true');
        }
        hasBooted.current = true;
        addLog('SYSTEM', { message: 'Terminal Boot Complete', version: '2.0.0' });
      }, 2000);
    }
  }, [addLog]);

  // -- Keypad Handlers --
  const handleKeyPress = (key: string) => {
    if (status === 'PROCESSING' || status === 'PRINTING') return;

    // Diagnostic Mode Trigger (Hold 5 Logic simplified to Toggle in this demo, 
    // but we can simulate the "Hold" requirement via specific sequence if needed)
    // For this implementation, we will use a separate toggle in DevPanel for usability,
    // but key '5' in IDLE could toggle it if we wanted hidden features.

    if (key === 'CLEAR') {
      setInputBuffer('');
      setStatus('IDLE');
      return;
    }

    if (key === 'CANCEL') {
      setInputBuffer('');
      setStatus('IDLE');
      addLog('SYSTEM', { action: 'User Cancelled' });
      return;
    }

    if (key === 'ENTER') {
      if (status === 'INPUT_AMOUNT' && inputBuffer.length > 0) {
        const amount = parseInt(inputBuffer) / 100;
        if (amount > 0) {
          setStatus('AWAITING_PAYMENT');
          setTxData({
            amount,
            currency: 'USD',
            traceId: uuidv4().slice(0, 8).toUpperCase()
          });
          addLog('SYSTEM', { state: 'AWAITING_PAYMENT', amount });
        }
      } else if (status === 'APPROVED' || status === 'DECLINED' || status === 'ERROR_COMMS') {
        // Acknowledge result
        if (status === 'APPROVED') setStatus('PRINTING');
        else setStatus('IDLE');
      }
      return;
    }

    // Number Inputs
    if (/^[0-9]$/.test(key)) {
      if (status === 'IDLE') {
        setStatus('INPUT_AMOUNT');
        setInputBuffer(key);
      } else if (status === 'INPUT_AMOUNT') {
        if (inputBuffer.length < 9) {
          setInputBuffer(prev => prev + key);
        }
      }
    }
  };

  // -- Payment Simulation --
  const processPayment = async (method: InteractionMode) => {
    if (status !== 'AWAITING_PAYMENT' || !txData) return;

    setStatus('PROCESSING');
    const requestPayload = {
      endpoint: '/v1/transactions/sale',
      method: 'POST',
      body: {
        amount: txData.amount,
        currency: txData.currency,
        entry_mode: method,
        trace_id: txData.traceId,
        pan_sequence: '001'
      }
    };
    
    addLog('REQUEST', requestPayload);

    // Latency Simulation
    const delay = latencyMode ? Math.random() * 3000 + 2000 : 800;
    
    setTimeout(() => {
      // Determine outcome (Simulate 10% failure rate)
      const success = Math.random() > 0.1;
      const responsePayload = success 
        ? { code: '00', message: 'APPROVED', auth_code: 'A' + Math.floor(Math.random() * 99999) }
        : { code: '05', message: 'DECLINED' };

      addLog('RESPONSE', { ...responsePayload, latency_ms: Math.floor(delay) });

      if (success) {
        setStatus('APPROVED');
      } else {
        setStatus('DECLINED');
      }
    }, delay);
  };

  // -- Receipt Logic --
  useEffect(() => {
    if (status === 'PRINTING') {
      setTimeout(() => {
        // Auto return to idle after print
        setInputBuffer('');
        setTxData(null);
        setStatus('IDLE');
      }, 4000); // Allow time for animation
    }
  }, [status]);

  return {
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
  };
};