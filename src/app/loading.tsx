import { Spinner } from "@heroui/spinner";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
