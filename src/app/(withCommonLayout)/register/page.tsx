"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { Button } from "@heroui/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/src/schemas/register.schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterPage = () => {
  const { mutate: handleUserRegistration, isSuccess: registerSuccess } =
    useUserRegistration();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };
    handleUserRegistration(userData);
  };

  useEffect(() => {
    if (registerSuccess) {
      router.push("/login");
    }
  }, [registerSuccess, router]);

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 h-[calc(100vh-100px)]">
      <h3 className="my-2 text-2xl font-bold">Register with TyreDash</h3>
      <p className="mb-4">Help Lost Items Find Their Way Home</p>
      <div className="w-full max-w-3xl">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerSchema)}
          defaultValues={{
            fullName: "Fahim Hossain",
            email: "fahim@examplea.com",
            phone: "01876543210",
            address: "Flat 5B, Green City, Dhanmondi, Dhaka",
            zipCode: "1209",
            city: "Dhaka",
            country: "Bangladesh",
            password: "12345678",
          }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="py-2">
              <FXInput
                name="fullName"
                label="Full Name"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="email"
                label="Email"
                type="email"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="phone"
                label="Phone Number"
              />
            </div>
            <div className="py-2">
              <FXInput
                name="address"
                label="Address"
              />
            </div>
            <div className="py-2">
              <FXInput
                name="zipCode"
                label="ZIP Code"
              />
            </div>
            <div className="py-2">
              <FXInput
                name="city"
                label="City"
              />
            </div>
            <div className="py-2">
              <FXInput
                name="country"
                label="Country"
              />
            </div>
            <div className="py-2">
              <FXInput
                name="password"
                label="Password"
                type="password"
                required
              />
            </div>
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
