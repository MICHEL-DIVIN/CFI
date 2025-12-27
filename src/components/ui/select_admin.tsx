import { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = ({
  label,
  error,
  options,
  className = '',
  ...props
}: SelectProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <select
        className={`
          block w-full rounded-lg border-gray-300 shadow-sm text-orange-500 bg-gray-700
          focus:border-blue-500 focus:ring-blue-500
          px-3 py-2.5 text-base
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="" className='bg-gray-900 text-orange-500'>Sélectionner...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className=' text-orange-500'>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};