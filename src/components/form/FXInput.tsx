"use client";

import { IInput } from "@/src/types";
import { Input } from "@heroui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

export default function FXInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  isClearable = true,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
      isClearable={isClearable}
    />
  );
}
