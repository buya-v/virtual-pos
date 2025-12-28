import React, { useMemo } from 'react';
import { TerminalState, TransactionData } from '../types';
import { clsx } from 'clsx';

interface LCDProps {
  status: TerminalState;
  inputBuffer: string;
  txData: TransactionData | null;
  showDiagnostic: boolean;
}

export const LCDScreen: React.FC<LCDProps> = ({ status, inputBuffer, txData, showDiagnostic }) => {
  
  // Formatter for Currency
  const formatCurrency = (centsString: string) => {
    const num = parseInt(centsString || '0') / 100;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  // Content Logic based on State Machine
  const screenContent = useMemo(() => {
    if (showDiagnostic && txData) {
      return [
        '** DIAGNOSTIC **',
        `TRACE: ${txData.traceId}`,
        `STATE: ${status}`,
        'MEM: OK'
      ];
    }

    switch (status) {
      case 'BOOTING':
        return ['TERMINAL BOOT...', 'CHECKING RAM... OK', 'CONNECTING...', 'PLEASE WAIT'];
      case 'IDLE':
        return ['WELCOME', '', 'ENTER AMOUNT', ''];
      case 'INPUT_AMOUNT':
        return ['SALE', '', formatCurrency(inputBuffer), 'ENTER TO CONFIRM'];
      case 'AWAITING_PAYMENT':
        return ['AMOUNT: ' + (txData ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(txData.amount) : '$0.00'), 'PLEASE PRESENT', 'CARD', 'INSERT / TAP / SWIPE'];
      case 'PROCESSING':
        return ['PROCESSING...', '', 'DO NOT REMOVE', 'CARD'];
      case 'APPROVED':
        return ['APPROVED', 'AUTH: 894523', '', 'REMOVE CARD'];
      case 'DECLINED':
        return ['DECLINED', 'CODE: 05', '', 'TRY ANOTHER CARD'];
      case 'PRINTING':
        return ['PRINTING RECEIPT...', '', 'PLEASE WAIT', ''];
      case 'ERROR_COMMS':
        return ['COMM ERROR', 'CHECK LINE', '', 'PRESS CLEAR'];
      default:
        return ['SYSTEM ERROR', '', '', ''];
    }
  }, [status, inputBuffer, txData, showDiagnostic]);

  return (
    <div className="bg-terminal-dark p-4 rounded-t-lg">
      <div className="relative w-full h-32 bg-lcd-bg rounded border-4 border-zinc-600 shadow-inner overflow-hidden">
        {/* LCD Overlay Grid for texture */}
        <div className="absolute inset-0 lcd-grid pointer-events-none z-10"></div>
        
        {/* Text Content */}
        <div className="relative z-0 p-2 font-display text-lcd-text text-xl leading-6 tracking-widest">
          {screenContent.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap min-h-[1.5rem]">
              {line}
              {/* Blinking Cursor Simulation */}
              {status === 'INPUT_AMOUNT' && idx === 2 && (
                <span className="animate-pulse-fast bg-lcd-text inline-block w-3 h-5 ml-1 align-middle"></span>
              )}
            </div>
          ))}
        </div>

        {/* Backlight Dimming Logic (Visualized via opacity layer) */}
        <div 
          className={clsx(
            "absolute inset-0 bg-black pointer-events-none transition-opacity duration-1000",
            status === 'IDLE' ? "opacity-20" : "opacity-0"
          )}
        ></div>
      </div>
    </div>
  );
};