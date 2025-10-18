import React from 'react';

const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  rows, 
  icon: Icon, 
  required = false,
  hint
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <div className="mb-4 group">
      <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 
              ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} 
          />
        )}
        {rows ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            placeholder={placeholder}
            className={`
              w-full p-3 border rounded-lg transition-all duration-200
              ${Icon ? 'pl-10' : ''}
              ${isFocused 
                ? 'border-blue-500 ring-2 ring-blue-100 bg-white' 
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'}
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            `}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            className={`
              w-full p-3 border rounded-lg transition-all duration-200
              ${Icon ? 'pl-10' : ''}
              ${isFocused 
                ? 'border-blue-500 ring-2 ring-blue-100 bg-white' 
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'}
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            `}
          />
        )}
        {/* Animated focus border */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300
          ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
        </div>
      </div>
      {hint && (
        <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
          {hint}
        </p>
      )}
    </div>
  );
};

export default InputField;
