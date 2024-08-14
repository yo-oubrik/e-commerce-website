"use client";
import { use, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/input/Input";
import { Separator } from "../components/Separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { safeUser } from "../product/utils/types";
const LoginForm = ({ currentUser }: { currentUser: safeUser | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  });
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
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Logged in successfully");
        } else {
          toast.error(callback?.error || "Ooops! an internal error occured");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ooops! an internal error occured");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (currentUser) return <p>Logged in. Redirecting...</p>;
  return (
    <>
      <h2 className="text-2xl font-bold">
        Sign in to E<span className="text-base align-middle">-</span>Shop
      </h2>
      <Button
        outline
        onClick={() => {
          signIn("google");
        }}
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
        <Link href="/register" className="underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
