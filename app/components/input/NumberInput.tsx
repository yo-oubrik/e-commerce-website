"use client";

import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface INumberInput {
  id: string;
  label: string;
  register: UseFormRegister<any>; // Simplified without generics
  disabled?: boolean;
  errors: FieldErrors;
  validation?: Record<string, any>;
  minValue?: number;
}

const NumberInput: React.FC<INumberInput> = ({
  id,
  label,
  register,
  errors,
  disabled,
  minValue = 0,
  validation = {},
}) => {
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, {
          ...validation,
        })}
        type="number"
        className={`
          peer
          w-full
          pt-6
          p-4
          outline-none
          bg-white
          font-light
          border-2
          rounded-md
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? "border-rose-400" : "border-gray-300"}
          ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-500"}
        `}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
        }}
        min={minValue}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          cursor-text
          duration-150
          transform
          top-5
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${hasValue && "scale-75 -translate-y-4"}
          ${errors[id] ? "text-rose-400" : "text-slate-400"}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-rose-400 text-sm">
          {errors[id]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default NumberInput;
