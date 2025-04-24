// app/dashboard/page.tsx (or wherever this lives)

import { Users, PackageCheck, MapPin, CarFront } from "lucide-react"; // <- You'll move your API logic here
import { DataEmpty, DataError } from "./_components/DataFetchingStates";
import { getLocation } from "@/src/services/Location";
import { getCar } from "@/src/services/Car";
import GlassCard from "./_components/GlassCard";
import { getUsers } from "@/src/services/Users";
import { getPackage } from "@/src/services/Package";

const Page = async () => {
  try {
    const [packages, locations, cars, users] = await Promise.all([
      getPackage("pickupId", "dropId"), // Replace with actual IDs or logic to get them
      getLocation(),
      getCar(),
      getUsers(),
    ]);

    return (
      <div className="w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Vehicle Management Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <GlassCard
            title="Registered Users"
            value={`${users?.data?.length || 0}`}
            icon={<Users className="w-6 h-6 text-white" />}
            color="from-indigo-500 to-purple-600"
          />
          <GlassCard
            title="Packages"
            value={`${packages?.data?.length || 0}`}
            icon={<PackageCheck className="w-6 h-6 text-white" />}
            color="from-green-500 to-teal-600"
          />
          <GlassCard
            title="Locations"
            value={`${locations?.data?.length || 0}`}
            icon={<MapPin className="w-6 h-6 text-white" />}
            color="from-orange-500 to-pink-600"
          />
          <GlassCard
            title="Cars"
            value={`${cars?.data?.length || 0}`}
            icon={<CarFront className="w-6 h-6 text-white" />}
            color="from-blue-500 to-cyan-600"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Latest System Activities
          </h2>
          <DataEmpty />
        </div>
      </div>
    );
  } catch (error) {
    return <DataError />;
  }
};

export default Page;
