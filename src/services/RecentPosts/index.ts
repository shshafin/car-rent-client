import { envConfig } from "@/src/config/envConfig";
import next from "next";

export const getRecentPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(
    `${envConfig.base_Api}/items?sortBy=-createdAt&limit=9`,
    fetchOptions
  );

  return res.json();
};
