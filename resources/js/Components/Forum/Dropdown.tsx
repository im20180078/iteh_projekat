import React from 'react';

interface Props {
  options: Array<{ value: any; label: string }>;
  selectedValue: any;
  onSelect(value: any): void;
}

export default function Dropdown({ options, selectedValue, onSelect }: Props) {
    console.log(selectedValue);
    console.log(options);
  return (
    <div>
    <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">Request user type</label>
    <select
      value={selectedValue}
      onChange={(e) => onSelect(e.target.value)}
      className="block w-full px-4 py-2 mt-1 text-c0 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    </div>
  );
}