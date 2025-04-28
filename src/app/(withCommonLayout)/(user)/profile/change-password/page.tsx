import { Metadata } from "next";
import ChangePasswordPage from "./_components/ChangePasswordPage";

export const metadata: Metadata = {
  title: "Change Password",
};

const page = () => {
  return (
    <div>
      <ChangePasswordPage />
    </div>
  );
};

export default page;