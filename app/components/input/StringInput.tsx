"use client";

import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
type stringInputType = "text" | "password" | "email";
interface IInput {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  required?: boolean;
  requiredMessage?: string;
  errors: FieldErrors;
  type?: string;
  validation?: Record<string, any>;
}

const StringInput: React.FC<IInput> = ({
  id,
  label,
  register,
  type = "text",
  errors,
  disabled,
  required,
  requiredMessage = "This field is required",
  validation = {},
}) => {
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: required ? requiredMessage : false,
          ...validation,
        })}
        placeholder=""
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
        autoComplete="off"
        type={type}
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
          ${hasValue && "scale-75 -translate-y-4"}
          ${errors[id] ? "text-rose-400" : "text-slate-400"}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-rose-400 text-sm">
          {errors[id].message?.toString()}
        </span>
      )}
    </div>
  );
};

export default StringInput;
