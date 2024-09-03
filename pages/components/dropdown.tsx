import React from 'react';

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center relative w-40">
      <select
        value={value}
        onChange={onChange}
        className="flex-1 appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.5 8L10 12.5 14.5 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
