import React from 'react';

interface AmountSelectorProps {
  amount: number;
  onChange: (amount: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({
  amount,
  onChange,
  step = 5,
  min = 0,
  max = 500
}) => {
  const amounts = Array.from({ length: 7 }, (_, i) => {
    const centerIndex = 3;
    const offset = (i - centerIndex) * step;
    return amount + offset;
  }).filter(val => val >= min && val <= max);

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 bg-pink-100 opacity-20 rounded-full" />
      </div>
      <div className="flex flex-col items-center space-y-2">
        {amounts.map((value, index) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`w-full text-center py-1 ${
              index === 3 
                ? 'text-xl font-medium text-pink-500' 
                : 'text-gray-400'
            }`}
          >
            {value} ml
          </button>
        ))}
      </div>
    </div>
  );
};

export default AmountSelector;