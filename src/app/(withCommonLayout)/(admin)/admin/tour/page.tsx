// app/tours/page.tsx
"use client";

import { CreateTourForm } from "@/src/components/modules/home/TourForm";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { TourDashboard } from "./_components/TourDashboard";
import { Tabs } from "@heroui/tabs";

export default function ToursPage() {
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Tour Management</h1>
        <Button
          variant="solid"
          onPress={() =>
            setActiveTab(activeTab === "list" ? "create" : "list")
          }>
          {activeTab === "list" ? "Create New Tour" : "Back to List"}
        </Button>
      </div>

      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as typeof activeTab)}
        tabs={[
          {
            id: "list",
            label: "Tour List",
            content: (
              <div className="space-y-6">
                <div className="max-w-md">
                  <Input
                    placeholder="Search tours..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon="search"
                  />
                </div>
                <TourDashboard />
              </div>
            ),
          },
          {
            id: "create",
            label: "Create Tour",
            content: <CreateTourForm />,
          },
        ]}
        className="mb-6"
      />
    </div>
  );
}
