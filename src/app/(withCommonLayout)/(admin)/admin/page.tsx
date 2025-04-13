"use client";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useGetDrivingTypes } from "@/src/hooks/drivingTypes.hook";
import { useGetMakes } from "@/src/hooks/makes.hook";
import { useGetYears } from "@/src/hooks/years.hook";
import {
  BarChart3,
  Users,
  Layers3,
  DollarSign,
  Car,
  Calendar,
} from "lucide-react";

const Page = () => {
  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useGetCategories();

  const {
    data: makes,
    isLoading: loadingMakes,
    isError: errorMakes,
  } = useGetMakes();

  const {
    data: drivingTypes,
    isLoading: loadingDrivingTypes,
    isError: errorDrivingTypes,
  } = useGetDrivingTypes();

  const {
    data: years,
    isLoading: loadingYears,
    isError: errorYears,
  } = useGetYears();

  const isLoading =
    loadingCategories || loadingMakes || loadingDrivingTypes || loadingYears;
  const isError =
    errorCategories || errorMakes || errorDrivingTypes || errorYears;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
        Vehicle Management Dashboard
      </h1>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading dashboard data...</p>
      ) : isError ? (
        <p className="text-sm text-red-500">Failed to load dashboard data.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <GlassCard
            title="Registered Users"
            value="1,204" // Replace with dynamic data later
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
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Latest System Activities
        </h2>
        <p className="text-gray-500 text-sm">No recent activity available.</p>
      </div>
    </div>
  );
};

export default Page;

// GlassCard component
const GlassCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div
      className={`rounded-2xl p-5 bg-gradient-to-br ${color} bg-opacity-30 backdrop-blur-md shadow-md border border-white/20 flex justify-between items-center transition-transform hover:scale-[1.02]`}>
      <div>
        <p className="text-sm text-white/80">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="bg-white/30 p-3 rounded-full shadow-inner">{icon}</div>
    </div>
  );
};
