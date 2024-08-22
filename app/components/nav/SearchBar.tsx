"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
export const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          search: data.searchTerm,
        },
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
    reset();
  };
  return (
    <div className="flex max-sm:hidden">
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Explore E~Shop"
        className="py-[6px] px-2 rounded-tl-md outline-none focus:border-[0.5px] focus:border-slate-500 max-md:w-44 "
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-700 py-[6px] px-2 text-white rounded-r-md hover:opacity-85"
      >
        Search
      </button>
    </div>
  );
};
