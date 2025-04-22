// components/Tour/TourDashboard.tsx
"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import {
  useDeleteTour,
  useGetTours,
  useUpdateTourStatus,
} from "@/src/hooks/tour.hook";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Dropdown } from "@heroui/dropdown";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  running: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function TourDashboard() {
  const { data: tours, isLoading } = useGetTours();
  const { mutate: updateStatus } = useUpdateTourStatus({});
  const { mutate: deleteTour } = useDeleteTour({});
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-48 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours?.data?.map((tour: any) => (
        <Card
          key={tour._id}
          className="hover:shadow-md transition-shadow">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {tour.name}
                </h3>
                <p className="text-sm text-gray-500">{tour.email}</p>
              </div>
              <Badge className={`${statusColors[tour.status]} text-sm`}>
                {tour.status}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup:</span>
                <span className="text-gray-900">
                  {new Date(tour.pickupDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dropoff:</span>
                <span className="text-gray-900">
                  {new Date(tour.dropoffDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">People:</span>
                <span className="text-gray-900">{tour.numberOfPeople}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Dropdown
                trigger={
                  <Button
                    variant="ghost"
                    size="sm">
                    <span className="sr-only">Open menu</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </Button>
                }
                items={[
                  {
                    content: "Mark Completed",
                    onAction: () =>
                      updateStatus({
                        id: tour._id,
                        status: "completed",
                      }),
                  },
                  {
                    content: "Cancel Tour",
                    onAction: () =>
                      updateStatus({
                        id: tour._id,
                        status: "cancelled",
                      }),
                  },
                  {
                    content: "Edit Details",
                    onAction: () =>
                      (window.location.href = `/tours/${tour._id}`),
                  },
                  {
                    content: "Delete Tour",
                    className: "text-red-600 hover:bg-red-50",
                    onAction: () => {
                      deleteTour(tour._id, {
                        onSuccess: () => {
                          queryClient.invalidateQueries(["GET_TOURS"]);
                          toast.success("Tour deleted successfully");
                        },
                      });
                    },
                  },
                ]}
              />
              <Button
                variant="solid"
                size="sm"
                as={Link}
                href={`/tours/${tour._id}`}>
                View Details
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
