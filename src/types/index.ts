export type TerminalState = 
  | 'IDLE' 
  | 'AMOUNT_ENTRY' 
  | 'WAITING_FOR_CARD' 
  | 'AUTHORIZING' 
  | 'APPROVED' 
  | 'DECLINED';

export type ResponseCode = '00' | '05' | '51';

export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  status: 'APPROVED' | 'DECLINED';
  cardType: string;
  responseCode: ResponseCode;
}

export interface DevSettings {
  responseCode: ResponseCode;
  latencyMs: number;
  cardType: 'Visa' | 'Mastercard' | 'Amex' | 'Invalid';
}