"use client";

import React, { useState } from "react";
import Input from "../../../../components/inputs/Input";
import Button from "../../../../components/Button";
import axios from "axios";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/create", data)
      .then((callback) => {
        setIsLoading(true);
        console.log(callback.data);
        return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-full flex justify-center items-center">
      <form
        className="rounded-xl py-16 px-10 flex flex-col gap-10 w-[500px] items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          id="name"
          type="text"
          label="Username"
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
        <Button disabled={isLoading} fullWidth={true} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default page;
