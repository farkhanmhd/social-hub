import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        <div className="mt-2">
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={id}
            required
            className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </label>
    </div>
  );
}
