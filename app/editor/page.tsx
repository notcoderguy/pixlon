"use client";

import Input from "../../components/inputs/Input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const page = () => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/editor/dashboard");
    }
  }, [session?.status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // NEXT AUTH SIGNIN
    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback.error);
          setIsLoading(false);
          return;
        }
        router.push("/editor/dashboard");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="background-design w-full min-h-screen bg-gray-950 flex flex-col gap-5 justify-center items-center">
      <div>
        <div className="text-white text-center text-sm">logo</div>
        <h1 className="font-black text-2xl text-white tracking-widest">
          Sign in as editor
        </h1>
      </div>

      <form
        className="bg-gray-100 rounded-xl py-16 px-10 flex flex-col gap-20 w-[600px] items-center justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-10">
          <Input
            id="email"
            type="email"
            label="Email"
            register={register}
            error={errors}
            required={true}
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            register={register}
            error={errors}
            required={true}
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} fullWidth={true} type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default page;
