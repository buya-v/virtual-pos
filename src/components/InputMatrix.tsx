import React, { useEffect, useCallback } from 'react';
import { useTerminal } from '../context/TerminalContext';

export const InputMatrix: React.FC = () => {
  const { inputKey, currentState } = useTerminal();

  const keys = [
    { label: '1', value: '1', type: 'num' },
    { label: '2', value: '2', type: 'num' },
    { label: '3', value: '3', type: 'num' },
    { label: '4', value: '4', type: 'num' },
    { label: '5', value: '5', type: 'num' },
    { label: '6', value: '6', type: 'num' },
    { label: '7', value: '7', type: 'num' },
    { label: '8', value: '8', type: 'num' },
    { label: '9', value: '9', type: 'num' },
    { label: 'CLR', value: 'CLEAR', type: 'action', color: 'bg-yellow-600' },
    { label: '0', value: '0', type: 'num' },
    { label: 'ENT', value: 'ENTER', type: 'action', color: 'bg-green-600' },
  ];

  const handlePhysicalKey = useCallback((e: KeyboardEvent) => {
    if (currentState === 'OFF') return;
    
    const keyMap: { [key: string]: string } = {
      'Enter': 'ENTER',
      'Escape': 'CLEAR',
      'Backspace': 'CLEAR',
    };

    if (e.key >= '0' && e.key <= '9') {
      inputKey(e.key);
      simulateButtonPress(e.key);
    } else if (keyMap[e.key]) {
      inputKey(keyMap[e.key]);
      simulateButtonPress(keyMap[e.key]);
    }
  }, [currentState, inputKey]);

  // Helper to visually press button on keyboard event
  const simulateButtonPress = (val: string) => {
    const btn = document.getElementById(`btn-${val}`);
    if (btn) {
      btn.classList.add('brightness-150', 'scale-95');
      setTimeout(() => btn.classList.remove('brightness-150', 'scale-95'), 100);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlePhysicalKey);
    return () => window.removeEventListener('keydown', handlePhysicalKey);
  }, [handlePhysicalKey]);

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-gray-800 rounded-b-lg">
      {keys.map((k) => (
        <button
          key={k.value}
          id={`btn-${k.value}`}
          onClick={() => inputKey(k.value)}
          disabled={currentState === 'OFF'}
          className={`
            h-14 rounded-md font-bold text-xl transition-all duration-75 active:scale-95 shadow-tactile
            ${k.type === 'num' ? 'bg-gray-700 text-white' : 'text-white'}
            ${k.color || ''}
            ${currentState === 'OFF' ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}
          `}
        >
          {k.label}
        </button>
      ))}
    </div>
  );
};
