"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IInput {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  errors: FieldErrors;
}

const Input: React.FC<IInput> = ({
  id,
  label,
  register,
  errors,
  disabled,
  required,
  type = "text",
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`
          peer
          w-full
          pt-5
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
          -translate-y-3
          origin-[0] 
          left-4
          peer-placeholder-shown:scale-100 gray-300
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-400" : "text-slate-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
