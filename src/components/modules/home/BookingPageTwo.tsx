"use client"

import { useState } from "react"
import { CarIcon, ChevronRight, MapPin } from "lucide-react"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"
import { Select, SelectItem } from "@heroui/select"
import Image from "next/image"
import { useGetLocations } from "@/src/hooks/location.hook"
import { useGetPackages } from "@/src/hooks/package.hook"
export default function BookingPageTwo() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Your Ride</h1>
      <CarBooking />
    </div>
  )
}


interface Car {
  _id: string
  name: string
  model: string
  seats: number
  bags: number
  image: string
}

const fetchPackages = async (pickupId: string, dropId: string): Promise<any> => {
  if (!pickupId || !dropId) return {};
  try {
      const res = await fetch(`/package?pickupLocation=${pickupId}&dropLocation=${dropId}`);
      const data = await res.json();
    console.log({ data });

    return data;
  } catch (error) {
    console.log({error});
  }
}

function CarBooking() {
  const [bookingStep, setBookingStep] = useState<"initial" | "locations" | "packages">("initial")
  const [selectedPickup, setSelectedPickup] = useState<string>("")
  const [selectedDrop, setSelectedDrop] = useState<string>("")
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const {data: locations, isLoading: isLocationsLoading, isError: isLocationsError} = useGetLocations();
  const {data: packages, isLoading: isLoadingPackages, isError: isPackagesError} = useGetPackages();

  // Fetch packages based on selected locations
//   const {
//     data: packages = {},
//     isLoading: isLoadingPackages,
//     error: packagesError,
//   } = useQuery({
//     queryKey: ["packages", selectedPickup, selectedDrop],
//     queryFn: () => fetchPackages(selectedPickup, selectedDrop),
//     enabled: !!(selectedPickup && selectedDrop && bookingStep === "locations"),
//   })

  // Handle booking start
  const handleStartBooking = () => {
    setBookingStep("locations")
  }

  // Handle location selection
  const handleLocationSubmit = () => {
    if (selectedPickup && selectedDrop) {
      setBookingStep("packages")
    }
  }

  // Handle package selection
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    // Here you would typically proceed to the next step (payment, confirmation, etc.)
  }

  // Reset booking
  const handleReset = () => {
    setBookingStep("initial")
    setSelectedPickup("")
    setSelectedDrop("")
    setSelectedPackage("")
  }

//   console.log({selectedDrop, selectedPickup});
// console.log({packages})

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex items-center gap-2">
          <CarIcon className="h-6 w-6" />
          <h2 className="text-xl font-bold">Car Booking</h2>
        </div>
        {bookingStep !== "initial" && (
          <Button color="default" variant="light" size="sm" onClick={handleReset} className="text-white">
            Start Over
          </Button>
        )}
      </CardHeader>

      <CardBody>
        {/* Initial Step */}
        {bookingStep === "initial" && (
          <div className="flex flex-col gap-4 items-center py-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold mb-2">Ready for your journey?</h3>
              <p className="text-gray-600">Choose an option to get started</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
              <Button
                color="primary"
                className="flex-1 h-14"
                startContent={<CarIcon className="h-5 w-5" />}
                onPress={handleStartBooking}
              >
                Book a Car
              </Button>
              <Button color="default" className="flex-1 h-14" isDisabled startContent={<MapPin className="h-5 w-5" />}>
                Give a Tour
              </Button>
            </div>
          </div>
        )}

        {/* Locations Step */}
        {bookingStep === "locations" && (
          <div className="flex flex-col gap-6 py-4">
            <h3 className="text-lg font-semibold">Select Pickup & Drop Locations</h3>

            {isLocationsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner color="primary" />
              </div>
            ) : isLocationsError ? (
              <div className="text-center text-red-500 py-4">Error loading locations. Please try again.</div>
            ) : (
              <div className="space-y-4">
                <Select
                  label="Pickup Location"
                  placeholder="Select pickup location"
                  selectedKeys={selectedPickup ? [selectedPickup] : []}
                  onChange={(e) => setSelectedPickup(e.target.value)}
                  className="w-full"
                  startContent={<MapPin className="text-default-400 h-4 w-4" />}
                >
                  {locations?.data?.map((location: any) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.location} {location.city && `- ${location.city}`}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Drop Location"
                  placeholder="Select drop location"
                  selectedKeys={selectedDrop ? [selectedDrop] : []}
                  onChange={(e) => setSelectedDrop(e.target.value)}
                  className="w-full"
                  startContent={<MapPin className="text-default-400 h-4 w-4" />}
                >
                  {locations?.data?.map((location: any) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.location} {location.city && `- ${location.city}`}
                    </SelectItem>
                  ))}
                </Select>

                {selectedPickup && selectedDrop && isLoadingPackages && (
                  <div className="flex justify-center py-4">
                    <Spinner color="primary" size="sm" />
                  </div>
                )}

                {selectedPickup && selectedDrop && packages.length === 0 && !isLoadingPackages && (
                  <div className="text-center text-amber-600 py-2">No packages available for these locations.</div>
                )}

                <Button
                  color="primary"
                  className="w-full mt-4"
                  onPress={handleLocationSubmit}
                  isDisabled={!selectedPickup || !selectedDrop || packages.length === 0}
                  endContent={<ChevronRight className="h-4 w-4" />}
                >
                  View Available Cars
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Packages Step */}
        {bookingStep === "packages" && (
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="text-lg font-semibold">Select Your Car</h3>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>
                  {locations?.data?.find((l: any) => l._id === selectedPickup)?.location} to{" "}
                  {locations?.data?.find((l: any) => l._id === selectedDrop)?.location}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages?.data?.flatMap((pkg: any) =>
                pkg.carPricing.map((pricing: any) => (
                  <Card
                    key={`${pkg._id}-${pricing.car._id}`}
                    isPressable
                    onPress={() => handleSelectPackage(`${pkg._id}-${pricing.car._id}`)}
                    className={`border ${selectedPackage === `${pkg._id}-${pricing.car._id}` ? "border-primary" : "border-gray-200"}`}
                  >
                    <CardBody className="flex flex-col md:flex-row gap-4 p-4">
                      <div className="w-full md:w-1/4">
                        <Image
                          alt={pricing.car.name}
                          className="object-cover rounded-lg h-32 w-full"
                          src={"/placeholder.svg"}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">{pricing.car.name}</h4>
                          <p className="text-sm text-gray-600">{pricing.car.model}</p>

                          <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Seats:</span>
                              <span className="text-sm font-medium">{pricing.car.seats}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">Bags:</span>
                              <span className="text-sm font-medium">{pricing.car.bags}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          <div className="text-xl font-bold text-primary">${pricing.fare.toLocaleString()}</div>
                          <Button
                            color="primary"
                            size="sm"
                            variant={selectedPackage === `${pkg._id}-${pricing.car._id}` ? "solid" : "bordered"}
                          >
                            {selectedPackage === `${pkg._id}-${pricing.car._id}` ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )),
              )}
            </div>
          </div>
        )}
      </CardBody>

      <CardFooter className="flex justify-between">
        {bookingStep === "packages" && (
          <Button color="primary" className="w-full" isDisabled={!selectedPackage}>
            Continue to Booking
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
