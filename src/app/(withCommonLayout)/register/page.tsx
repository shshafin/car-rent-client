"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { Button } from "@heroui/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

const RegisterPage = () => {
  const { mutate: handleUserRegistration } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // handle form submission
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleUserRegistration(userData);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4">
      <h3 className="my-2 text-2xl font-bold">Register with FoundX</h3>
      <p className="mb-4">Help Lost Items Find Their Way Home</p>
      <div className="w-full max-w-md">
        <FXForm
          onSubmit={onSubmit}
          // !Only for development
          defaultValues={{
            name: "doe",
            email: "doe@test.com",
            mobileNumber: "01798460435",
            password: "doe1234",
          }}>
          <div className="py-3">
            <FXInput
              name="name"
              label="Name"
              type="text"
              required={true}
              isClearable={true}
            />
          </div>
          <div className="py-3">
            <FXInput
              name="email"
              label="Email"
              type="email"
              required={true}
              isClearable={true}
            />
          </div>
          <div className="py-3">
            <FXInput
              name="mobileNumber"
              label="Mobile Number"
              type="text"
              required={true}
              isClearable={true}
            />
          </div>
          <div className="py-3">
            <FXInput
              name="password"
              label="Password"
              type="password"
              required={true}
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit">
            Register
          </Button>
        </FXForm>

        <div className="text-center">
          Already have an account? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
