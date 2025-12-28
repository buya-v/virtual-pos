import { create } from 'zustand';
import { DevSettings, TerminalState, Transaction, ResponseCode } from '../types';
import { playBeep, playSuccess, playError } from '../utils/audio';

interface TerminalStore {
  // State
  status: TerminalState;
  amount: number; // in cents
  history: Transaction[];
  
  // Dev Config
  settings: DevSettings;
  
  // Actions
  setSettings: (settings: Partial<DevSettings>) => void;
  digitPress: (digit: number) => void;
  clearPress: () => void;
  cancelPress: () => void;
  confirmPress: () => void;
  simulateCard: () => Promise<void>;
  reset: () => void;
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  status: 'IDLE',
  amount: 0,
  history: [],
  settings: {
    responseCode: '00',
    latencyMs: 1500,
    cardType: 'Visa',
  },

  setSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  digitPress: (digit) => {
    playBeep(600);
    set((state) => {
      if (state.status === 'IDLE' || state.status === 'APPROVED' || state.status === 'DECLINED') {
        // Start new transaction
        return { status: 'AMOUNT_ENTRY', amount: digit };
      }
      if (state.status === 'AMOUNT_ENTRY') {
        // Max limit check (e.g. 9999.99)
        if (state.amount > 99999) return state;
        return { amount: state.amount * 10 + digit };
      }
      return state;
    });
  },

  clearPress: () => {
    playBeep(400);
    set((state) => {
      if (state.status === 'AMOUNT_ENTRY') {
        if (state.amount === 0) return { status: 'IDLE' };
        return { amount: Math.floor(state.amount / 10) };
      }
      return state;
    });
  },

  cancelPress: () => {
    playBeep(300);
    set({ status: 'IDLE', amount: 0 });
  },

  confirmPress: () => {
    playBeep(800);
    const { status, amount } = get();
    if (status === 'AMOUNT_ENTRY' && amount > 0) {
      set({ status: 'WAITING_FOR_CARD' });
    }
  },

  simulateCard: async () => {
    const { status, settings, amount, history } = get();
    if (status !== 'WAITING_FOR_CARD') return;

    set({ status: 'AUTHORIZING' });
    playBeep(1000, 0.05); // Read beep

    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, settings.latencyMs));

    const isApproved = settings.responseCode === '00';
    
    // Record Transaction
    const newTx: Transaction = {
      id: `TX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      amount,
      timestamp: new Date(),
      status: isApproved ? 'APPROVED' : 'DECLINED',
      cardType: settings.cardType,
      responseCode: settings.responseCode
    };

    set({
      status: isApproved ? 'APPROVED' : 'DECLINED',
      history: [newTx, ...history]
    });

    if (isApproved) playSuccess();
    else playError();

    // Auto reset after 3 seconds
    setTimeout(() => {
      set((state) => (state.status === 'APPROVED' || state.status === 'DECLINED' ? { status: 'IDLE', amount: 0 } : state));
    }, 3000);
  },

  reset: () => set({ status: 'IDLE', amount: 0 }),
}));