import React, { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // --- Logic Handlers ---
  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
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
      setHistory([...history, `${previousValue} ${operation} ${currentValue} = ${result}`]);
    }
    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a, b, op) => {
    switch(op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleClear = () => { setDisplay('0'); setPreviousValue(null); setOperation(null); };
  const handleEqual = () => handleOperation(operation);
  
  // Common button styles
  const btnClass = "p-4 rounded-xl text-xl font-bold bg-white hover:bg-gray-50 text-gray-800 shadow-sm transition-all active:scale-95";
  const opClass = "p-4 rounded-xl text-xl font-bold bg-orange-500 text-white shadow-sm hover:bg-orange-600 active:scale-95";

  return (
    // [BUG 1 - TYPO]: 'min-h-scren' is a typo (missing 'e'). The background won't cover the full height.
    // [FIX]: <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
    <div className="min-h-scren bg-slate-100 flex items-center justify-center p-4 font-sans">
      
      {/* Wrapper to hold Calculator + History side-by-side */}
      {/* [BUG 2 - LAYOUT]: 'flex-col' stacks them vertically instead of side-by-side, breaking the desktop view. */}
      {/* [FIX]: <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-start"> */}
      <div className="flex flex-col gap-6 w-full max-w-5xl items-start">

        {/* --- CALCULATOR SECTION --- */}
        <div className="w-full md:w-80 flex-shrink-0">
          
          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
            
            {/* Display Screen */}
            {/* [BUG 3 - SPACING]: 'mb-[-100px]' pulls the keypad up, overlapping and hiding the display text. */}
            {/* [FIX]: <div className="mb-6 text-right space-y-2"> */}
            <div className="mb-[-100px] text-right space-y-2">
              <div className="text-slate-400 text-sm h-5">{previousValue} {operation}</div>
              
              {/* [BUG 4 - COLOR]: Text color 'text-slate-900' matches background, making numbers invisible. */}
              {/* [FIX]: <div className="text-white text-5xl font-extrabold tracking-tight truncate"> */}
              <div className="text-slate-900 text-5xl font-extrabold tracking-tight truncate">
                {display}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-3">
              <button onClick={handleClear} className="col-span-2 p-4 rounded-xl bg-red-100 text-red-600 font-bold hover:bg-red-200">AC</button>
              <button className={btnClass}>%</button>
              <button onClick={() => handleOperation('÷')} className={opClass}>÷</button>

              <button onClick={() => handleNumber(7)} className={btnClass}>7</button>
              <button onClick={() => handleNumber(8)} className={btnClass}>8</button>
              <button onClick={() => handleNumber(9)} className={btnClass}>9</button>
              <button onClick={() => handleOperation('×')} className={opClass}>×</button>

              <button onClick={() => handleNumber(4)} className={btnClass}>4</button>
              
              {/* [BUG 5 - SPACING]: 'p-0' removes padding, making button '5' tiny compared to others. */}
              {/* [FIX]: <button onClick={() => handleNumber(5)} className={btnClass}>5</button> */}
              <button onClick={() => handleNumber(5)} className="p-0 rounded-xl text-xl font-bold bg-white text-gray-800 shadow-sm">5</button>
              
              <button onClick={() => handleNumber(6)} className={btnClass}>6</button>
              <button onClick={() => handleOperation('-')} className={opClass}>-</button>

              <button onClick={() => handleNumber(1)} className={btnClass}>1</button>
              <button onClick={() => handleNumber(2)} className={btnClass}>2</button>
              <button onClick={() => handleNumber(3)} className={btnClass}>3</button>

              {/* [BUG 6 - LAYERS]: 'absolute top-0' rips the '+' button out of the grid and floats it at the top left of the card. */}
              {/* [FIX]: <button onClick={() => handleOperation('+')} className={opClass}>+</button> */}
              <button onClick={() => handleOperation('+')} className="absolute top-0 left-0 p-4 bg-orange-500 text-white font-bold">+</button>

              {/* [BUG 7 - LAYOUT]: 'flex' breaks the grid cell alignment. It should span 2 columns or just be a block. */}
              {/* [FIX]: <button onClick={() => handleNumber(0)} className={`${btnClass} col-span-2`}>0</button> */}
              <button onClick={() => handleNumber(0)} className={`flex p-4 rounded-xl bg-white font-bold`}>0</button>

              <button className={btnClass}>.</button>
              
              {/* [BUG 8 - COLOR]: 'bg-yellow-100' on white text is extremely low contrast/unreadable. */}
              {/* [FIX]: <button onClick={handleEqual} className={opClass}>=</button> */}
              <button onClick={handleEqual} className="p-4 rounded-xl text-xl font-bold bg-yellow-100 text-white shadow-sm">=</button>
            </div>
          </div>

          {/* Backspace Button */}
          {/* [BUG 9 - TYPO]: 'tex-gray-900' is a typo (missing 't'). It defaults to black/inherit, breaking consistent styling. */}
          {/* [FIX]: <button className="w-full mt-3 bg-gray-300 text-gray-900 font-bold py-3 rounded-lg ..."> */}
          <button className="w-full mt-3 bg-gray-300 tex-gray-900 font-bold py-3 rounded-lg text-sm shadow-sm">
            ← Backspace
          </button>
        </div>

        {/* --- HISTORY PANEL --- */}
        {/* [BUG 10 - LAYERS]: '-z-50' puts the panel behind the main background container, making it unclickable or hidden. */}
        {/* [FIX]: <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:flex-grow"> */}
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:flex-grow -z-50 relative">
          <h2 className="text-gray-800 font-bold text-lg mb-4">History</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No calculations yet</p>
            ) : (
              history.map((entry, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm font-mono">
                  {entry}
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