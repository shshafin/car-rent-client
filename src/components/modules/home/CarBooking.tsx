"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CarIcon, ChevronRight, MapPin, CarFront, Luggage, Sofa, Clock, Calendar, Users, Briefcase } from "lucide-react"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"
import Image from "next/image"
import { useGetLocations } from "@/src/hooks/location.hook"
import { useGetPackages } from "@/src/hooks/package.hook"

export default function CarBooking() {
  const router = useRouter()
  const [bookingStep, setBookingStep] = useState<"initial" | "locations" | "packages">("initial")
  const [selectedPickup, setSelectedPickup] = useState<string>("")
  const [selectedDrop, setSelectedDrop] = useState<string>("")
  const [selectedPackage, setSelectedPackage] = useState<string>("")

  // State for additional fields
  const [pickupDate, setPickupDate] = useState<string>("")
  const [pickupTime, setPickupTime] = useState<string>("")
  const [dropoffDate, setDropoffDate] = useState<string>("")
  const [dropoffTime, setDropoffTime] = useState<string>("")
  const [numBags, setNumBags] = useState<string>("1")
  const [numSeats, setNumSeats] = useState<string>("1")

  const { data: locations, isLoading: isLocationsLoading, isError: isLocationsError } = useGetLocations()
  const {
    data: packages,
    isLoading: isLoadingPackages,
    isError: isPackagesError,
  } = useGetPackages(selectedPickup, selectedDrop)

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
  }

  // Reset booking
  const handleReset = () => {
    setBookingStep("initial")
    setSelectedPickup("")
    setSelectedDrop("")
    setSelectedPackage("")
    setPickupDate("")
    setPickupTime("")
    setDropoffDate("")
    setDropoffTime("")
    setNumBags("1")
    setNumSeats("1")
  }

  // Handle continue to payment
  const handleContinueToPayment = () => {
    if (!selectedPackage) return

    // Extract package and car IDs
    const [packageId, carId] = selectedPackage.split("-")

    // Create URL with all parameters
    const params = new URLSearchParams({
      packageId,
      carId,
      pickup: selectedPickup,
      drop: selectedDrop,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      bags: numBags,
      seats: numSeats,
    })

    // Navigate to payment page with query parameters
    router.push(`/booking/payment?${params.toString()}`)
  }

  // Get today's date in YYYY-MM-DD format for date inputs
  const today = new Date().toISOString().split("T")[0]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex justify-between items-center px-6 py-4 rounded-t-xl bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 text-white shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <CarFront className="h-7 w-7 text-white drop-shadow-sm" />
          <h2 className="text-2xl font-bold tracking-tight">Car Booking</h2>
        </div>
        {bookingStep !== "initial" && (
          <button
            onClick={handleReset}
            className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-4 py-1.5 rounded-md text-sm shadow-sm hover:bg-white/20 transition"
          >
            Start Over
          </button>
        )}
      </CardHeader>

      <CardBody>
        {/* Initial Step */}
        {bookingStep === "initial" && (
          <div className="flex flex-col items-center py-12 bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg w-full mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold text-black mb-4">Ready for your journey?</h3>
              <p className="text-lg text-black opacity-80">Choose an option to get started</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto">
              <Button
                onPress={handleStartBooking}
                color="primary"
                className="flex-1 h-16 bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg font-medium rounded-lg shadow-lg backdrop-blur-lg bg-opacity-30 hover:bg-opacity-40 transition-all"
                startContent={<CarIcon className="h-6 w-6 mr-3 text-white" />}
              >
                Book a Car
              </Button>
              <Button
                color="default"
                className="flex-1 h-16 bg-gradient-to-r from-gray-300 to-gray-500 text-gray-600 text-lg font-medium rounded-lg shadow-lg opacity-70 hover:opacity-90 cursor-not-allowed backdrop-blur-lg bg-opacity-20"
                startContent={<MapPin className="h-6 w-6 mr-3 text-gray-600" />}
                isDisabled
              >
                Give a Tour
              </Button>
            </div>
          </div>
        )}

        {/* Locations Step */}
        {bookingStep === "locations" && (
          <div className="flex flex-col gap-6 py-8 px-6 bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Select Pickup & Drop Locations</h3>

            {isLocationsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner color="primary" size="lg" />
              </div>
            ) : isLocationsError ? (
              <div className="text-center text-red-500 py-4">Error loading locations. Please try again.</div>
            ) : (
              <div className="space-y-6">
                {/* Pickup Location */}
                <div>
                  <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <select
                      id="pickup"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      value={selectedPickup}
                      onChange={(e) => setSelectedPickup(e.target.value)}
                    >
                      <option value="">Select pickup location</option>
                      {locations?.data?.map((location: any) => (
                        <option key={location._id} value={location._id}>
                          {location.location} {location.city && `- ${location.city}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pickup Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pickup Date */}
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="date"
                        id="pickupDate"
                        min={today}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Pickup Time */}
                  <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="time"
                        id="pickupTime"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Drop Location */}
                <div>
                  <label htmlFor="drop" className="block text-sm font-medium text-gray-700 mb-2">
                    Drop Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <select
                      id="drop"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      value={selectedDrop}
                      onChange={(e) => setSelectedDrop(e.target.value)}
                    >
                      <option value="">Select drop location</option>
                      {locations?.data?.map((location: any) => (
                        <option key={location._id} value={location._id}>
                          {location.location} {location.city && `- ${location.city}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dropoff Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dropoff Date */}
                  <div>
                    <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Dropoff Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="date"
                        id="dropoffDate"
                        min={pickupDate || today}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={dropoffDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Dropoff Time */}
                  <div>
                    <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Dropoff Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="time"
                        id="dropoffTime"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={dropoffTime}
                        onChange={(e) => setDropoffTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Bags and Seats Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Number of Bags */}
                  <div>
                    <label htmlFor="numBags" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Bags
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <select
                        id="numBags"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={numBags}
                        onChange={(e) => setNumBags(e.target.value)}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Bag" : "Bags"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Number of Seats */}
                  <div>
                    <label htmlFor="numSeats" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Passengers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <select
                        id="numSeats"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={numSeats}
                        onChange={(e) => setNumSeats(e.target.value)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Passenger" : "Passengers"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Loading Spinner */}
                {selectedPickup && selectedDrop && isLoadingPackages && (
                  <div className="flex justify-center py-4">
                    <Spinner color="primary" size="sm" />
                  </div>
                )}

                {/* No Packages Message */}
                {selectedPickup && selectedDrop && packages?.data?.length === 0 && !isLoadingPackages && (
                  <div className="text-center text-amber-600 py-2">No packages available for these locations.</div>
                )}

                {/* Button */}
                <Button
                  color="primary"
                  className="w-full mt-6 h-14 bg-gradient-to-r from-orange-400 to-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-red-700 transition-all"
                  onPress={handleLocationSubmit}
                  isDisabled={!selectedPickup || !selectedDrop || packages?.data?.length === 0}
                  endContent={<ChevronRight className="h-5 w-5 text-white" />}
                >
                  View Available Cars
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Packages Step */}
        {bookingStep === "packages" && (
          <div className="flex flex-col gap-8 py-8 px-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-2xl font-semibold text-gray-800">Select Your Car</h3>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>
                  {locations?.data?.find((l: any) => l._id === selectedPickup)?.location} to{" "}
                  {locations?.data?.find((l: any) => l._id === selectedDrop)?.location}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {packages?.data?.flatMap((pkg: any) =>
                pkg.carPricing.map((pricing: any) => (
                  <Card
                    key={`${pkg._id}-${pricing.car._id}`}
                    isPressable
                    onPress={() => handleSelectPackage(`${pkg._id}-${pricing.car._id}`)}
                    className={`border border-gray-200 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${
                      selectedPackage === `${pkg._id}-${pricing.car._id}` ? "border-primary" : ""
                    }`}
                  >
                    <CardBody className="flex flex-col p-0">
                      {/* Car Image */}
                      <div className="w-full rounded-t-xl overflow-hidden">
                        <Image
                          alt={pricing.car.name}
                          className="object-cover w-full h-56"
                          src={
                            pricing.car.image || "/placeholder.svg?height=128&width=128&query=car" || "/placeholder.svg"
                          }
                          objectFit="cover"
                          width={500}
                          height={300}
                        />
                      </div>

                      {/* Car Details */}
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-2">{pricing.car.name}</h4>
                        <p className="text-sm text-gray-300 mb-4">{pricing.car.model}</p>

                        <div className="flex gap-6 mb-4">
                          {/* Seats Icon */}
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="flex justify-center items-center gap-1">
                              <Sofa className="text-lg text-primary" />
                              <h1 className="text-gray-200">seats:</h1>
                            </div>
                            <span className="text-sm font-medium text-gray-200">{pricing.car.seats}</span>
                          </div>

                          {/* Bags Icon */}
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="flex justify-center items-center gap-1">
                              <Luggage className="text-lg text-red-400" />
                              <h1 className="text-gray-200">bags:</h1>
                            </div>
                            <span className="text-sm font-medium text-gray-200">{pricing.car.bags}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-xl font-semibold text-primary">${pricing.fare.toLocaleString()}</div>
                          <Button
                            color="primary"
                            size="sm"
                            onPress={() => handleSelectPackage(`${pkg._id}-${pricing.car._id}`)}
                            variant={selectedPackage === `${pkg._id}-${pricing.car._id}` ? "solid" : "bordered"}
                            className="text-sm font-medium rounded-md"
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
          <Button
            color="primary"
            className="w-full h-14 bg-gradient-to-r from-orange-400 to-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-red-700 transition-all"
            isDisabled={!selectedPackage || !pickupDate || !pickupTime}
            onPress={handleContinueToPayment}
          >
            Continue to Booking
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
