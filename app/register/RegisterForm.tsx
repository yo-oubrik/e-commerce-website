"use client";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/input/Input";
import { Separator } from "../components/Separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

const RegisterForm = () => {
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
      <h2 className="text-2xl font-bold">Sign Up for E~Shop</h2>
      <Button outline onClick={() => {}} label="Sign up with Google" />
      <Separator width={100} />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validation={{
          minLength: {
            value: 6,
            message: "Username length must be at least 8 characters long",
          },
          validate: validateUsername,
        }}
      />
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
            message: "Password must be at least 6 characters long",
          },
        }}
      />
      <Button
        label={isLoading ? "Loading..." : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="" className="underline">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
