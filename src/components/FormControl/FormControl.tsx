import React from 'react';

type Props = {
  inputId: string;
  label: string;
  children: React.ReactNode;
  errorMessage?: string;
};

export const INPUT_CLASS =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm';

const FormControl = ({ inputId, label, children, errorMessage }: Props) => {
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {errorMessage != null ? (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  );
};

export default FormControl;
