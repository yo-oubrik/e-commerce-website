"use client";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/input/Input";
import { Separator } from "../components/Separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  const validateUsername = (value: string) => {
    // Regex pattern to check for special characters
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(value)) {
      return "Username should not contain special characters";
    }
    return true;
  };

  return (
    <>
      <h2 className="text-2xl font-bold">
        Sign in to E<span className="text-base align-middle">-</span>Shop
      </h2>
      <Button
        outline
        onClick={() => {}}
        label="Continue with Google"
        Icon={AiOutlineGoogle}
      />
      <Separator width={100} />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validation={{
          pattern: {
            value: /^\S+@\S+\.\S+$/i,
            message: "Invalid email address",
          },
        }}
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        validation={{
          minLength: {
            value: 6,
            message: "Password are at least 6 characters long",
          },
        }}
      />
      <Button
        label={isLoading ? "Loading..." : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        D'ont have an account?{" "}
        <Link href="/login" className="underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
