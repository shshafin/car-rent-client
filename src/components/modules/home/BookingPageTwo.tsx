// "use client"

// import { useState } from "react"
// import { CarIcon, ChevronRight, MapPin } from "lucide-react"
// import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
// import { Button } from "@heroui/button"
// import { Spinner } from "@heroui/spinner"
// import { Select, SelectItem } from "@heroui/select"
// import Image from "next/image"
// import { useGetLocations } from "@/src/hooks/location.hook"
// import { useGetPackages } from "@/src/hooks/package.hook"
// export default function BookingPageTwo() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Book Your Ride</h1>
//       <CarBooking />
//     </div>
//   )
// }

// function CarBooking() {
//   const [bookingStep, setBookingStep] = useState<"initial" | "locations" | "packages">("initial")
//   const [selectedPickup, setSelectedPickup] = useState<string>("")
//   const [selectedDrop, setSelectedDrop] = useState<string>("")
//   const [selectedPackage, setSelectedPackage] = useState<string>("")
//   const {data: locations, isLoading: isLocationsLoading, isError: isLocationsError} = useGetLocations();
//   const {data: packages, isLoading: isLoadingPackages, isError: isPackagesError} = useGetPackages(selectedPickup, selectedDrop);

//   // Handle booking start
//   const handleStartBooking = () => {
//     setBookingStep("locations")
//   }

//   // Handle location selection
//   const handleLocationSubmit = () => {
//     if (selectedPickup && selectedDrop) {
//       setBookingStep("packages")
//     }
//   }

//   // Handle package selection
//   const handleSelectPackage = (packageId: string) => {
//     setSelectedPackage(packageId)
//     // Here you would typically proceed to the next step (payment, confirmation, etc.)
//   }

//   // Reset booking
//   const handleReset = () => {
//     setBookingStep("initial")
//     setSelectedPickup("")
//     setSelectedDrop("")
//     setSelectedPackage("")
//   }

//   console.log({selectedDrop, selectedPickup, packages});

//   return (
//     <Card className="w-full max-w-3xl mx-auto">
//       <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//         <div className="flex items-center gap-2">
//           <CarIcon className="h-6 w-6" />
//           <h2 className="text-xl font-bold">Car Booking</h2>
//         </div>
//         {bookingStep !== "initial" && (
//           <Button color="default" variant="light" size="sm" onClick={handleReset} className="text-white">
//             Start Over
//           </Button>
//         )}
//       </CardHeader>

//       <CardBody>
//         {/* Initial Step */}
//         {bookingStep === "initial" && (
//           <div className="flex flex-col gap-4 items-center py-8">
//             <div className="text-center mb-4">
//               <h3 className="text-xl font-semibold mb-2">Ready for your journey?</h3>
//               <p className="text-gray-600">Choose an option to get started</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
//               <Button
//                 color="primary"
//                 className="flex-1 h-14"
//                 startContent={<CarIcon className="h-5 w-5" />}
//                 onPress={handleStartBooking}
//               >
//                 Book a Car
//               </Button>
//               <Button color="default" className="flex-1 h-14" isDisabled startContent={<MapPin className="h-5 w-5" />}>
//                 Give a Tour
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Locations Step */}
//         {bookingStep === "locations" && (
//           <div className="flex flex-col gap-6 py-4">
//             <h3 className="text-lg font-semibold">Select Pickup & Drop Locations</h3>

//             {isLocationsLoading ? (
//               <div className="flex justify-center py-8">
//                 <Spinner color="primary" />
//               </div>
//             ) : isLocationsError ? (
//               <div className="text-center text-red-500 py-4">Error loading locations. Please try again.</div>
//             ) : (
//               <div className="space-y-4">
//   {/* Pickup Location */}
//   <div>
//     <label htmlFor="pickup" className="block text-sm font-medium mb-1">
//       Pickup Location
//     </label>
//     <div className="relative">
//       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 h-4 w-4" />
//       <select
//         id="pickup"
//         className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
//         value={selectedPickup}
//         onChange={(e) => setSelectedPickup(e.target.value)}
//       >
//         <option value="">Select pickup location</option>
//         {locations?.data?.map((location: any) => (
//           <option key={location._id} value={location._id}>
//             {location.location} {location.city && `- ${location.city}`}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>

//   {/* Drop Location */}
//   <div>
//     <label htmlFor="drop" className="block text-sm font-medium mb-1">
//       Drop Location
//     </label>
//     <div className="relative">
//       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 h-4 w-4" />
//       <select
//         id="drop"
//         className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
//         value={selectedDrop}
//         onChange={(e) => setSelectedDrop(e.target.value)}
//       >
//         <option value="">Select drop location</option>
//         {locations?.data?.map((location: any) => (
//           <option key={location._id} value={location._id}>
//             {location.location} {location.city && `- ${location.city}`}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>

//   {/* Loading Spinner */}
//   {selectedPickup && selectedDrop && isLoadingPackages && (
//     <div className="flex justify-center py-4">
//       <Spinner color="primary" size="sm" />
//     </div>
//   )}

//   {/* No Packages Message */}
//   {selectedPickup && selectedDrop && packages?.data?.length === 0 && !isLoadingPackages && (
//     <div className="text-center text-amber-600 py-2">
//       No packages available for these locations.
//     </div>
//   )}

//   {/* Button */}
//   <Button
//     color="primary"
//     className="w-full mt-4"
//     onPress={handleLocationSubmit}
//     isDisabled={!selectedPickup || !selectedDrop || packages?.data?.length === 0}
//     endContent={<ChevronRight className="h-4 w-4" />}
//   >
//     View Available Cars
//   </Button>
// </div>

//             )}
//           </div>
//         )}

//         {/* Packages Step */}
//         {bookingStep === "packages" && (
//           <div className="flex flex-col gap-6 py-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//               <h3 className="text-lg font-semibold">Select Your Car</h3>
//               <div className="text-sm text-gray-600 flex items-center gap-1">
//                 <MapPin className="h-3 w-3" />
//                 <span>
//                   {locations?.data?.find((l: any) => l._id === selectedPickup)?.location} to{" "}
//                   {locations?.data?.find((l: any) => l._id === selectedDrop)?.location}
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {packages?.data?.flatMap((pkg: any) =>
//                 pkg.carPricing.map((pricing: any) => (
//                   <Card
//                     key={`${pkg._id}-${pricing.car._id}`}
//                     isPressable
//                     onPress={() => handleSelectPackage(`${pkg._id}-${pricing.car._id}`)}
//                     className={`border ${selectedPackage === `${pkg._id}-${pricing.car._id}` ? "border-primary" : "border-gray-200"}`}
//                   >
//                     <CardBody className="flex flex-col p-0">
//                       {/* Car Image - Full Width at Top */}
//                       <div className="w-full">
//                         <Image
//                           alt={pricing.car.name}
//                           className="object-cover w-full h-48"
//                           src={pricing.car.image || "/placeholder.svg?height=128&width=128&query=car"}
//                           objectFit="cover"
//                           width={500}
//                           height={300}
//                         />
//                       </div>

//                       {/* Car Details - Below Image */}
//                       <div className="p-4">
//                         <div className="mb-4">
//                           <h4 className="text-lg font-semibold">{pricing.car.name}</h4>
//                           <p className="text-sm text-gray-600">{pricing.car.model}</p>

//                           <div className="flex gap-4 mt-2">
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs text-gray-500">Seats:</span>
//                               <span className="text-sm font-medium">{pricing.car.seats}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs text-gray-500">Bags:</span>
//                               <span className="text-sm font-medium">{pricing.car.bags}</span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex justify-between items-center">
//                           <div className="text-xl font-bold text-primary">${pricing.fare.toLocaleString()}</div>
//                           <Button
//                             color="primary"
//                             size="sm"
//                             onPress={() => handleSelectPackage(`${pkg._id}-${pricing.car._id}`)}
//                             variant={selectedPackage === `${pkg._id}-${pricing.car._id}` ? "solid" : "bordered"}
//                           >
//                             {selectedPackage === `${pkg._id}-${pricing.car._id}` ? "Selected" : "Select"}
//                           </Button>
//                         </div>
//                       </div>
//                     </CardBody>
//                   </Card>
//                 )),
//               )}
//             </div>
//           </div>
//         )}
//       </CardBody>

//       <CardFooter className="flex justify-between">
//         {bookingStep === "packages" && (
//           <Button color="primary" className="w-full" isDisabled={!selectedPackage}>
//             Continue to Booking
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   )
// }

"use client";

import { useState } from "react";
import {
  CarIcon,
  ChevronRight,
  MapPin,
  CreditCard,
  Wallet,
  DollarSign,
  CarFront,
  Luggage,
  Sofa,
  Car,
  Info,
  BadgeDollarSign,
} from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { useGetLocations } from "@/src/hooks/location.hook";
import { useGetPackages } from "@/src/hooks/package.hook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

export default function BookingPageTwo() {
  return (
    <div className="container mx-auto pb-12 ">
      <div className="max-w-5xl mx-auto px-4 pt-12 text-center">
        <div className="mb-8 text-center">
          <h3 className="text-[#FF141D] font-semibold uppercase">
            How Can We Assist?
          </h3>
          <h2 className="downtext-gradient text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Let’s Make Your Journey Smoother
          </h2>
          <p className="downtext-gradient max-w-2xl mx-auto text-base md:text-lg">
            From booking your ride to solving your queries,
            <span className="font-bold">
              our team is ready to support you—every mile of the way.
            </span>
          </p>
        </div>
      </div>

      <CarBooking />
    </div>
  );
}

function CarBooking() {
  const [bookingStep, setBookingStep] = useState<
    "initial" | "locations" | "packages" | "payment"
  >("initial");
  const [selectedPickup, setSelectedPickup] = useState<string>("");
  const [selectedDrop, setSelectedDrop] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<
    "partial" | "full" | "cash" | ""
  >("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const {
    data: locations,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
  } = useGetLocations();
  const {
    data: packages,
    isLoading: isLoadingPackages,
    isError: isPackagesError,
  } = useGetPackages(selectedPickup, selectedDrop);

  // Handle booking start
  const handleStartBooking = () => {
    setBookingStep("locations");
  };

  // Handle location selection
  const handleLocationSubmit = () => {
    if (selectedPickup && selectedDrop) {
      setBookingStep("packages");
    }
  };

  // Handle package selection
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    // Here you would typically proceed to the next step (payment, confirmation, etc.)
  };

  // Reset booking
  const handleReset = () => {
    setBookingStep("initial");
    setSelectedPickup("");
    setSelectedDrop("");
    setSelectedPackage("");
    setPaymentMethod("");
    setIsBookingConfirmed(false);
  };

  // Handle continue to payment
  const handleContinueToPayment = () => {
    setBookingStep("payment");
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: "partial" | "full" | "cash") => {
    setPaymentMethod(method);

    if (method === "cash") {
      setIsConfirmModalOpen(true);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    setIsPaymentModalOpen(false);
    setIsConfirmModalOpen(false);
    setIsBookingConfirmed(true);
  };

  // Get selected package and car details
  const getSelectedPackageDetails = () => {
    if (!selectedPackage) return null;

    const [packageId, carId] = selectedPackage.split("-");
    const pkg = packages?.data?.find((p: any) => p._id === packageId);
    if (!pkg) return null;

    const pricing = pkg.carPricing.find((p: any) => p.car._id === carId);
    if (!pricing) return null;

    return {
      package: pkg,
      car: pricing.car,
      fare: pricing.fare,
    };
  };

  const selectedPackageDetails = getSelectedPackageDetails();

  console.log({ selectedDrop, selectedPickup, packages });

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
            className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-4 py-1.5 rounded-md text-sm shadow-sm hover:bg-white/20 transition">
            Start Over
          </button>
        )}
      </CardHeader>

      <CardBody>
        {/* Initial Step */}

        {bookingStep === "initial" && (
          <div className="flex flex-col items-center py-12 bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg w-full mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold text-black mb-4">
                Ready for your journey?
              </h3>
              <p className="text-lg text-black opacity-80">
                Choose an option to get started
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto">
              <Button
                onClick={handleStartBooking}
                color="primary"
                className="flex-1 h-16 bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg font-medium rounded-lg shadow-lg backdrop-blur-lg bg-opacity-30 hover:bg-opacity-40 transition-all"
                startContent={<CarIcon className="h-6 w-6 mr-3 text-white" />}>
                Book a Car
              </Button>
              <Button
                color="default"
                className="flex-1 h-16 bg-gradient-to-r from-gray-300 to-gray-500 text-gray-600 text-lg font-medium rounded-lg shadow-lg opacity-70 hover:opacity-90 cursor-not-allowed backdrop-blur-lg bg-opacity-20"
                startContent={<MapPin className="h-6 w-6 mr-3 text-gray-600" />}
                isDisabled>
                Give a Tour
              </Button>
            </div>
          </div>
        )}

        {/* Locations Step */}
        {bookingStep === "locations" && (
          <div className="flex flex-col gap-6 py-8 px-6 bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Select Pickup & Drop Locations
            </h3>

            {isLocationsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner
                  color="primary"
                  size="lg"
                />
              </div>
            ) : isLocationsError ? (
              <div className="text-center text-red-500 py-4">
                Error loading locations. Please try again.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Pickup Location */}
                <div>
                  <label
                    htmlFor="pickup"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <select
                      id="pickup"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      value={selectedPickup}
                      onChange={(e) => setSelectedPickup(e.target.value)}>
                      <option value="">Select pickup location</option>
                      {locations?.data?.map((location: any) => (
                        <option
                          key={location._id}
                          value={location._id}>
                          {location.location}{" "}
                          {location.city && `- ${location.city}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Drop Location */}
                <div>
                  <label
                    htmlFor="drop"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Drop Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <select
                      id="drop"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      value={selectedDrop}
                      onChange={(e) => setSelectedDrop(e.target.value)}>
                      <option value="">Select drop location</option>
                      {locations?.data?.map((location: any) => (
                        <option
                          key={location._id}
                          value={location._id}>
                          {location.location}{" "}
                          {location.city && `- ${location.city}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Loading Spinner */}
                {selectedPickup && selectedDrop && isLoadingPackages && (
                  <div className="flex justify-center py-4">
                    <Spinner
                      color="primary"
                      size="sm"
                    />
                  </div>
                )}

                {/* No Packages Message */}
                {selectedPickup &&
                  selectedDrop &&
                  packages?.data?.length === 0 &&
                  !isLoadingPackages && (
                    <div className="text-center text-amber-600 py-2">
                      No packages available for these locations.
                    </div>
                  )}

                {/* Button */}
                <Button
                  color="primary"
                  className="w-full mt-6 h-14 bg-gradient-to-r from-orange-400 to-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-red-700 transition-all"
                  onPress={handleLocationSubmit}
                  isDisabled={
                    !selectedPickup ||
                    !selectedDrop ||
                    packages?.data?.length === 0
                  }
                  endContent={<ChevronRight className="h-5 w-5 text-white" />}>
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
              <h3 className="text-2xl font-semibold text-gray-800">
                Select Your Car
              </h3>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>
                  {
                    locations?.data?.find((l: any) => l._id === selectedPickup)
                      ?.location
                  }{" "}
                  to{" "}
                  {
                    locations?.data?.find((l: any) => l._id === selectedDrop)
                      ?.location
                  }
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
              {packages?.data?.flatMap((pkg: any) =>
                pkg.carPricing.map((pricing: any) => (
                  <Card
                    key={`${pkg._id}-${pricing.car._id}`}
                    isPressable
                    onPress={() =>
                      handleSelectPackage(`${pkg._id}-${pricing.car._id}`)
                    }
                    className={`border border-gray-200 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${
                      selectedPackage === `${pkg._id}-${pricing.car._id}`
                        ? "border-primary"
                        : ""
                    }`}>
                    <CardBody className="flex flex-col p-0">
                      {/* Car Image */}
                      <div className="w-full rounded-t-xl overflow-hidden">
                        <Image
                          alt={pricing.car.name}
                          className="object-cover w-full h-56"
                          src={
                            pricing.car.image ||
                            "/placeholder.svg?height=128&width=128&query=car"
                          }
                          objectFit="cover"
                          width={500}
                          height={300}
                        />
                      </div>

                      {/* Car Details */}
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-2">
                          {pricing.car.name}
                        </h4>
                        <p className="text-sm text-gray-300 mb-4">
                          {pricing.car.model}
                        </p>

                        <div className="flex gap-6 mb-4">
                          {/* Seats Icon */}
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="flex justify-center items-center gap-1">
                              <Sofa className="text-lg text-primary" />
                              <h1 className="text-gray-200">seats:</h1>
                            </div>
                            <span className="text-sm font-medium text-gray-200">
                              {pricing.car.seats}
                            </span>
                          </div>

                          {/* Bags Icon */}
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="flex justify-center items-center gap-1">
                              <Luggage className="text-lg text-red-400" />
                              <h1 className="text-gray-200">bags:</h1>
                            </div>
                            <span className="text-sm font-medium text-gray-200">
                              {pricing.car.bags}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-xl font-semibold text-primary">
                            ${pricing.fare.toLocaleString()}
                          </div>
                          <Button
                            color="primary"
                            size="sm"
                            onPress={() =>
                              handleSelectPackage(
                                `${pkg._id}-${pricing.car._id}`
                              )
                            }
                            variant={
                              selectedPackage ===
                              `${pkg._id}-${pricing.car._id}`
                                ? "solid"
                                : "bordered"
                            }
                            className="text-sm font-medium rounded-md">
                            {selectedPackage === `${pkg._id}-${pricing.car._id}`
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Payment Step */}
        {bookingStep === "payment" && (
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Choose Payment Method
              </h3>

              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="whitespace-nowrap">
                  {
                    locations?.data?.find((l: any) => l._id === selectedPickup)
                      ?.location
                  }
                  <span className="mx-1 text-white/40">→</span>
                  {
                    locations?.data?.find((l: any) => l._id === selectedDrop)
                      ?.location
                  }
                </span>
              </div>
            </div>

            {selectedPackageDetails && (
              <div className="relative rounded-2xl p-6 border border-white/20 backdrop-blur-xl bg-white/10 shadow-2xl">
                {/* Sparkle or glow background effect (optional) */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm z-[-1]" />

                <div className="flex items-center gap-6">
                  {/* Car Image with gradient border */}
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/40 to-pink-500/40 p-[2px]">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-black/20">
                      <Image
                        src={
                          selectedPackageDetails.car.image ||
                          "/placeholder.svg?height=112&width=112&query=car"
                        }
                        alt={selectedPackageDetails.car.name}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Textual Info */}
                  <div className="text-white space-y-1">
                    <h4 className="flex items-center gap-2 text-xl font-semibold">
                      <Car size={20} /> {selectedPackageDetails.car.name}
                    </h4>
                    <p className="text-sm text-white/70 flex items-center gap-2">
                      <Info size={16} /> Model:{" "}
                      {selectedPackageDetails.car.model}
                    </p>
                    <div className="flex items-center gap-2 text-lg font-bold text-amber-300 mt-2">
                      <BadgeDollarSign size={18} /> $
                      {selectedPackageDetails.fare.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isBookingConfirmed ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                <div className="text-green-600 text-xl mb-2">
                  Booking Confirmed!
                </div>
                <p className="text-gray-700">
                  Your booking has been successfully confirmed. You will receive
                  a confirmation email shortly.
                </p>
                <Button
                  color="primary"
                  className="mt-4"
                  onPress={handleReset}>
                  Book Another Ride
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("partial")}
                  className="border hover:border-primary transition-colors">
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] hover:shadow-lg cursor-pointer">
                    {/* Icon */}
                    <div className="bg-blue-200/30 p-3 rounded-full border border-blue-400/30">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>

                    {/* Text (centered) */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <h4 className="text-white font-semibold text-base">
                        Partial Payment
                      </h4>
                      <p className="text-sm text-white/70">
                        Pay 50% now and the rest later
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5 text-white/40" />
                  </CardBody>
                </Card>

                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("full")}
                  className="border hover:border-primary transition-colors">
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] hover:shadow-lg cursor-pointer">
                    {/* Icon */}
                    <div className="bg-purple-200/30 p-3 rounded-full border border-purple-400/30">
                      <Wallet className="h-6 w-6 text-purple-500" />
                    </div>

                    {/* Payment Info (centered text) */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <h4 className="text-white font-semibold text-base">
                        Full Payment
                      </h4>
                      <p className="text-sm text-white/70">
                        Pay the entire amount now
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5 text-white/40" />
                  </CardBody>
                </Card>

                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("cash")}
                  className="border hover:border-primary transition-colors">
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] cursor-pointer">
                    {/* Icon */}
                    <div className="bg-green-200/30 p-3 rounded-full border border-green-300/30">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>

                    {/* Text Centered */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <h4 className="text-white font-semibold text-base">
                        Cash Payment
                      </h4>
                      <p className="text-sm text-white/70">
                        Pay in cash upon arrival
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5 text-white/40" />
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        )}
      </CardBody>

      <CardFooter className="flex justify-between">
        {bookingStep === "packages" && (
          <Button
            color="primary"
            className="w-full"
            isDisabled={!selectedPackage}
            onPress={handleContinueToPayment}>
            Continue to Booking
          </Button>
        )}
      </CardFooter>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            {paymentMethod === "partial" ? "Partial Payment" : "Full Payment"}
          </ModalHeader>
          <ModalBody>
            {selectedPackageDetails && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Car:</span>
                    <span className="font-medium text-gray-700">
                      {selectedPackageDetails.car.model}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium text-gray-700">
                      {
                        locations?.data?.find(
                          (l: any) => l._id === selectedPickup
                        )?.location
                      }
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium text-gray-700">
                      {
                        locations?.data?.find(
                          (l: any) => l._id === selectedDrop
                        )?.location
                      }
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Fare:</span>
                    <span className="font-medium text-gray-700">
                      ${selectedPackageDetails.fare.toLocaleString()}
                    </span>
                  </div>
                  {paymentMethod === "partial" && (
                    <div className="flex justify-between font-bold text-primary">
                      <span>Amount to Pay Now (50%):</span>
                      <span>
                        ${(selectedPackageDetails.fare * 0.5).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleConfirmPayment}>
              Pay & Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Cash Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirm Cash Payment</ModalHeader>
          <ModalBody>
            {selectedPackageDetails && (
              <div className="space-y-4">
                <p>
                  You've selected to pay in cash upon arrival. Please confirm
                  your booking details:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Car:</span>
                    <span className="font-medium text-gray-700">
                      {selectedPackageDetails.car.model}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium text-gray-700">
                      {
                        locations?.data?.find(
                          (l: any) => l._id === selectedPickup
                        )?.location
                      }
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium text-gray-700">
                      {
                        locations?.data?.find(
                          (l: any) => l._id === selectedDrop
                        )?.location
                      }
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-600">Total Fare:</span>
                    <span className=" text-gray-700">
                      ${selectedPackageDetails.fare.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-green-600">
                  By confirming, you agree to pay the full amount in cash to the
                  driver upon arrival.
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleConfirmPayment}>
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
