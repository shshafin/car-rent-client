import { Metadata } from "next";
import AdminPackagePage from "./_components/AdminPackagePage";

export const metadata: Metadata = {
  title: "Tyre Size - Admin",
};

const page = () => {
  return (
    <div>
      <AdminPackagePage />
    </div>
  );
};

export default page;
