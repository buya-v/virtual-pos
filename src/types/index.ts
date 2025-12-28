export type TerminalState = 
  | 'BOOTING' 
  | 'IDLE' 
  | 'INPUT_AMOUNT' 
  | 'AWAITING_PAYMENT' 
  | 'PROCESSING' 
  | 'APPROVED' 
  | 'DECLINED' 
  | 'ERROR_COMMS'
  | 'PRINTING';

export type InteractionMode = 'INSERT' | 'TAP' | 'SWIPE';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'REQUEST' | 'RESPONSE' | 'SYSTEM';
  payload: any;
}

export interface TransactionData {
  amount: number;
  currency: string;
  traceId: string;
  panMasked?: string;
  method?: InteractionMode;
}