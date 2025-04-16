// app/dashboard/page.tsx (or wherever this lives)

import {
  BarChart3,
  Users,
  Layers3,
  Car,
  Calendar,
  Scissors,
} from "lucide-react"; // <- You'll move your API logic here
import { DataEmpty, DataError } from "./_components/DataFetchingStates";
import { getCategories } from "@/src/services/Categories";
import { getMakes } from "@/src/services/Makes";
import { getDrivingTypes } from "@/src/services/DrivingTypes";
import { getYears } from "@/src/services/Years";
import GlassCard from "./_components/GlassCard";
import { getTrims } from "@/src/services/Trims";
import { getUsers } from "@/src/services/Users";

const Page = async () => {
  try {
    const [categories, makes, users, drivingTypes, years] = await Promise.all([
      getCategories(),
      getMakes(),
      getDrivingTypes(),
      getYears(),
      getTrims(),
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
            title="Vehicle Categories"
            value={`${categories?.data?.length || 0}`}
            icon={<Layers3 className="w-6 h-6 text-white" />}
            color="from-green-500 to-teal-600"
          />
          <GlassCard
            title="Car Brands (Makes)"
            value={`${makes?.data?.length || 0}`}
            icon={<Car className="w-6 h-6 text-white" />}
            color="from-orange-500 to-pink-600"
          />
          <GlassCard
            title="Drive Types Available"
            value={`${drivingTypes?.data?.length || 0}`}
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            color="from-blue-500 to-cyan-600"
          />
          <GlassCard
            title="Model Years Supported"
            value={`${years?.data?.length || 0}`}
            icon={<Calendar className="w-6 h-6 text-white" />}
            color="from-fuchsia-500 to-rose-500"
          />
          <GlassCard
            title="Model Trims Supported"
            value={`${years?.data?.length || 0}`}
            icon={<Scissors className="w-6 h-6 text-white" />}
            color="from-yellow-400 to-yellow-600"
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
