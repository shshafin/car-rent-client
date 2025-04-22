import { Metadata } from "next";
import AdminCarPage from "./_components/AdminCarPage";
export const metadata: Metadata = {
  title: "Driving Type - Admin",
};

const page = () => {
  return (
    <div>
      <AdminCarPage />
    </div>
  );
};

export default page;
