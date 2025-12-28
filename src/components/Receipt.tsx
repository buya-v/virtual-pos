import React from 'react';
import { TransactionData } from '../types';

interface ReceiptProps {
  data: TransactionData;
  approved: boolean;
}

export const Receipt: React.FC<ReceiptProps> = ({ data, approved }) => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 bg-white shadow-xl z-50 animate-print origin-top">
      <div className="p-4 font-receipt text-xs leading-tight text-gray-800 border-b-2 border-dashed border-gray-300">
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg">STORE #1024</h3>
          <p>123 Fake Street</p>
          <p>Silicon Valley, CA</p>
        </div>
        
        <div className="flex justify-between mb-2">
          <span>DATE: {new Date().toLocaleDateString()}</span>
          <span>TIME: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span>TRACE:</span>
          <span>{data.traceId}</span>
        </div>

        <div className="border-b border-black my-2"></div>

        <div className="flex justify-between text-lg font-bold mb-4">
          <span>TOTAL</span>
          <span>${data.amount.toFixed(2)}</span>
        </div>

        <div className="text-center mb-4">
          <span className="font-bold text-sm block">
            {approved ? 'APPROVED' : 'DECLINED'}
          </span>
          {approved && <span className="text-[10px]">AUTH CODE: 88291S</span>}
        </div>

        <div className="text-center text-[10px]">
          THANK YOU FOR SHOPPING
          <br />
          CUSTOMER COPY
        </div>
      </div>
      {/* Torn paper effect at bottom */}
      <div className="h-4 bg-white w-full" style={{
        clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'
      }}></div>
    </div>
  );
};
