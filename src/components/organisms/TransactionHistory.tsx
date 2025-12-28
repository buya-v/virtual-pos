import React from 'react';
import { useTerminalStore } from '../../store/useTerminalStore';
import { ScrollText, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const TransactionHistory: React.FC = () => {
  const { history } = useTerminalStore();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[400px]">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <ScrollText size={20} className="text-gray-600" />
        <h2 className="font-bold font-ui text-lg text-gray-800">Transaction Log</h2>
        <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{history.length}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto receipt-scroll p-0">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
            <ScrollText size={48} className="opacity-20" />
            <p className="text-sm">No transactions yet</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 sticky top-0 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {tx.timestamp.toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1.5 ${
                      tx.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.status === 'APPROVED' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      <span className="text-xs font-bold">{tx.responseCode}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};