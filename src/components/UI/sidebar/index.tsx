"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SidebarOptions } from "./SidebarOptions";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@heroui/button";
import { adminLinks, userLinks } from "./constants";
import Image from "next/image";
import SidebarLoading from "./Loading";

const Sidebar = () => {
  const { user, isLoading } = useUser(); // Assuming isLoading is being returned from your context
  const [loading, setLoading] = useState(true);

  // Simulate data loading for this example
  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  if (loading) {
    return <SidebarLoading />;
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-default-100 p-4">
        <div className="relative h-64 w-full overflow-hidden rounded-md">
          {user?.profilePhoto ? (
            <Image
              alt="User profile photo"
              src={user.profilePhoto}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-default-200">
              <p className="text-xl font-semibold text-default-500">No Image</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <h1 className="text-xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm text-default-500">{user?.email}</p>
        </div>

        <Button
          as={Link}
          href="/profile/create-post"
          className="mt-4 w-full rounded-md">
          Create a Post
        </Button>
      </div>

      <div className="rounded-xl bg-default-100 p-4 border-t-2 border-t-default-200">
        <SidebarOptions
          links={user?.role === "USER" ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
