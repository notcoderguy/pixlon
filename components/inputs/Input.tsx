"use client";

import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  error,
  disabled,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-900 text-lg">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `bg-white px-2 py-3 leading-6 block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600`,
            error[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
