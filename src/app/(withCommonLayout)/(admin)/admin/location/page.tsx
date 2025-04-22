import { Metadata } from "next";
import AdminLocationPage from "./_components/AdminLocationPage";
export const metadata: Metadata = {
  title: "Make - Admin",
};

const page = () => {
  return (
    <div>
      <AdminLocationPage />
    </div>
  );
};

export default page;
