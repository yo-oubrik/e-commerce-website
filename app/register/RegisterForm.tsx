"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/input/Input";
import { Separator } from "../components/Separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { error } from "console";
import { safeUser } from "../product/utils/types";
const RegisterForm = ({ currentUser }: { currentUser: safeUser | null }) => {
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

  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");
        signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        })
          .then((res) => {
            if (res?.error) {
              toast.error(res.error);
            } else {
              router.push("/");
              router.refresh();
              toast.success("Logged in");
            }
          })
          .catch((error) => {
            toast.error("An internal error occured");
            console.log(error);
          });
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "An internal error occured");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validateUsername = (value: string) => {
    // Regex pattern to check for special characters
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(value)) {
      return "Username should not contain special characters";
    }
    return true;
  };

  if (currentUser) return <p>Logged in. Redirecting...</p>;

  return (
    <>
      <h2 className="text-2xl font-bold">
        Sign Up for E<span className="text-base align-middle">-</span>Shop
      </h2>
      <Button
        outline
        onClick={() => {
          signIn("google");
        }}
        label="Sign up with Google"
        Icon={AiOutlineGoogle}
      />
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
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
