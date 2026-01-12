import React, { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current !== 0 ? prev / current : 0;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      
      // Add to history
      const historyEntry = `${previousValue} ${operation} ${currentValue} = ${result}`;
      setHistory([historyEntry, ...history.slice(0, 4)]);
      
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleToggleSign = () => {
    const num = parseFloat(display);
    setDisplay(String(-num));
  };

  const handlePercentage = () => {
    const num = parseFloat(display);
    setDisplay(String(num / 100));
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const btnClass = "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg text-xl shadow-sm active:scale-95 transition-all duration-75 cursor-pointer";
  const opClass = "bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl shadow-sm active:scale-95 transition-all duration-75 cursor-pointer";
  const funcClass = "bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-4 rounded-lg text-lg shadow-sm active:scale-95 transition-all duration-75 cursor-pointer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 font-mono">
      
      <div className="flex gap-6 w-full max-w-2xl flex-col md:flex-row">
        
        {/* Main Calculator */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full md:max-w-xs flex-shrink-0">
          
          {/* DISPLAY SCREEN */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 mb-6 text-right space-y-2">
            <div className="text-gray-500 text-xs h-5 overflow-hidden truncate">
              {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
            </div>
            <div className="text-white text-5xl font-bold truncate break-words">
              {display}
            </div>
          </div>

          {/* KEYPAD GRID */}
          <div className="grid grid-cols-4 gap-3">
            
            {/* Row 1 - Functions */}
            <button onClick={handleClear} className={funcClass}>C</button>
            <button onClick={handleToggleSign} className={funcClass}>±</button>
            <button onClick={handlePercentage} className={funcClass}>%</button>
            <button onClick={() => handleOperation('÷')} className={opClass}>÷</button>

            {/* Row 2 */}
            <button onClick={() => handleNumber(7)} className={btnClass}>7</button>
            <button onClick={() => handleNumber(8)} className={btnClass}>8</button>
            <button onClick={() => handleNumber(9)} className={btnClass}>9</button>
            <button onClick={() => handleOperation('×')} className={opClass}>×</button>

            {/* Row 3 */}
            <button onClick={() => handleNumber(4)} className={btnClass}>4</button>
            <button onClick={() => handleNumber(5)} className={btnClass}>5</button>
            <button onClick={() => handleNumber(6)} className={btnClass}>6</button>
            <button onClick={() => handleOperation('-')} className={opClass}>-</button>

            {/* Row 4 */}
            <button onClick={() => handleNumber(1)} className={btnClass}>1</button>
            <button onClick={() => handleNumber(2)} className={btnClass}>2</button>
            <button onClick={() => handleNumber(3)} className={btnClass}>3</button>
            <button onClick={() => handleOperation('+')} className={opClass}>+</button>

            {/* Row 5 */}
            <button onClick={() => handleNumber(0)} className={`${btnClass} col-span-2`}>0</button>
            <button onClick={handleDecimal} className={btnClass}>.</button>
            <button onClick={handleEquals} className={`${opClass} font-extrabold text-2xl`}>=</button>

          </div>

          {/* Backspace Button */}
          <button 
            onClick={handleBackspace}
            className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg text-sm shadow-sm active:scale-95 transition-all duration-75"
          >
            ← Backspace
          </button>

        </div>

        {/* History Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full md:max-w-sm flex-grow">
          <h2 className="text-gray-800 font-bold text-lg mb-4">History</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No calculations yet</p>
            ) : (
              history.map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer text-sm font-mono"
                >
                  <span className="text-gray-600">{entry}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
