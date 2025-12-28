export type TerminalState = 
  | 'OFF' 
  | 'BOOTING' 
  | 'IDLE' 
  | 'INPUT_AMOUNT' 
  | 'PROCESSING' 
  | 'SUCCESS' 
  | 'ERROR';

export interface TransactionLog {
  id: string;
  timestamp: string;
  type: 'REQUEST' | 'RESPONSE' | 'SYSTEM';
  payload: any;
  status: 'pending' | 'success' | 'error';
}

export interface POSConfig {
  merchantId: string;
  currency: string;
  networkLatencyMode: boolean;
  soundEnabled: boolean;
}

export interface TerminalContextType {
  currentState: TerminalState;
  displayMessage: string;
  inputBuffer: string;
  logs: TransactionLog[];
  config: POSConfig;
  isNetworkBusy: boolean;
  // Actions
  powerOn: () => void;
  resetTerminal: () => void;
  inputKey: (key: string) => void;
  toggleNetworkLatency: () => void;
  toggleSound: () => void;
  clearLogs: () => void;
}