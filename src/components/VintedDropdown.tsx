import React, { useState } from 'react';
import './VintedDropdown.css';

interface DropdownOption {
  label: string | number;
  value: string | number;
}

interface VintedDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  isExpanded?: boolean;
}

const VintedDropdown: React.FC<VintedDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  isExpanded: defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsExpanded(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className='vinted-dropdown'>
      <button
        type='button'
        className={`vinted-dropdown-button ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-haspopup='listbox'
        aria-expanded={isExpanded}
      >
        <span className='dropdown-label'>{label}</span>
        <span className='selected-value'>{selectedOption?.label || ''}</span>
        <svg
          className='dropdown-arrow'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 10L12 15L17 10'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {isExpanded && (
        <div className='dropdown-options' role='listbox'>
          {options.map((option) => (
            <button
              key={option.value}
              className={`dropdown-option ${
                value === option.value ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
              role='option'
              aria-selected={value === option.value}
            >
              {option.label}
              {value === option.value && (
                <div className='checkbox'>
                  <div className='checkbox-inner' />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VintedDropdown;
