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

"use client"

import { useState } from "react"
import { CarIcon, ChevronRight, MapPin, CreditCard, Wallet, DollarSign } from "lucide-react"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"
import Image from "next/image"
import { useGetLocations } from "@/src/hooks/location.hook"
import { useGetPackages } from "@/src/hooks/package.hook"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"

export default function BookingPageTwo() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Your Ride</h1>
      <CarBooking />
    </div>
  )
}

function CarBooking() {
  const [bookingStep, setBookingStep] = useState<"initial" | "locations" | "packages" | "payment">("initial")
  const [selectedPickup, setSelectedPickup] = useState<string>("")
  const [selectedDrop, setSelectedDrop] = useState<string>("")
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<"partial" | "full" | "cash" | "">("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)

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
    // Here you would typically proceed to the next step (payment, confirmation, etc.)
  }

  // Reset booking
  const handleReset = () => {
    setBookingStep("initial")
    setSelectedPickup("")
    setSelectedDrop("")
    setSelectedPackage("")
    setPaymentMethod("")
    setIsBookingConfirmed(false)
  }

  // Handle continue to payment
  const handleContinueToPayment = () => {
    setBookingStep("payment")
  }

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: "partial" | "full" | "cash") => {
    setPaymentMethod(method)

    if (method === "cash") {
      setIsConfirmModalOpen(true)
    } else {
      setIsPaymentModalOpen(true)
    }
  }

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    setIsPaymentModalOpen(false)
    setIsConfirmModalOpen(false)
    setIsBookingConfirmed(true)
  }

  // Get selected package and car details
  const getSelectedPackageDetails = () => {
    if (!selectedPackage) return null

    const [packageId, carId] = selectedPackage.split("-")
    const pkg = packages?.data?.find((p: any) => p._id === packageId)
    if (!pkg) return null

    const pricing = pkg.carPricing.find((p: any) => p.car._id === carId)
    if (!pricing) return null

    return {
      package: pkg,
      car: pricing.car,
      fare: pricing.fare,
    }
  }

  const selectedPackageDetails = getSelectedPackageDetails()

  console.log({ selectedDrop, selectedPickup, packages })

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
                {/* Pickup Location */}
                <div>
                  <label htmlFor="pickup" className="block text-sm font-medium mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 h-4 w-4" />
                    <select
                      id="pickup"
                      className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
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

                {/* Drop Location */}
                <div>
                  <label htmlFor="drop" className="block text-sm font-medium mb-1">
                    Drop Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 h-4 w-4" />
                    <select
                      id="drop"
                      className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
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
                  className="w-full mt-4"
                  onPress={handleLocationSubmit}
                  isDisabled={!selectedPickup || !selectedDrop || packages?.data?.length === 0}
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
                    <CardBody className="flex flex-col p-0">
                      {/* Car Image - Full Width at Top */}
                      <div className="w-full">
                        <Image
                          alt={pricing.car.name}
                          className="object-cover w-full h-48"
                          src={pricing.car.image || "/placeholder.svg?height=128&width=128&query=car"}
                          objectFit="cover"
                          width={500}
                          height={300}
                        />
                      </div>

                      {/* Car Details - Below Image */}
                      <div className="p-4">
                        <div className="mb-4">
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

                        <div className="flex justify-between items-center">
                          <div className="text-xl font-bold text-primary">${pricing.fare.toLocaleString()}</div>
                          <Button
                            color="primary"
                            size="sm"
                            onPress={() => handleSelectPackage(`${pkg._id}-${pricing.car._id}`)}
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

        {/* Payment Step */}
        {bookingStep === "payment" && (
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="text-lg font-semibold">Choose Payment Method</h3>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>
                  {locations?.data?.find((l: any) => l._id === selectedPickup)?.location} to{" "}
                  {locations?.data?.find((l: any) => l._id === selectedDrop)?.location}
                </span>
              </div>
            </div>

            {selectedPackageDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 overflow-hidden rounded-md">
                    <Image
                      src={selectedPackageDetails.car.image || "/placeholder.svg?height=80&width=80&query=car"}
                      alt={selectedPackageDetails.car.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedPackageDetails.car.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPackageDetails.car.model}</p>
                    <div className="text-lg font-bold text-primary mt-1">
                      ${selectedPackageDetails.fare.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isBookingConfirmed ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                <div className="text-green-600 text-xl mb-2">Booking Confirmed!</div>
                <p className="text-gray-700">
                  Your booking has been successfully confirmed. You will receive a confirmation email shortly.
                </p>
                <Button color="primary" className="mt-4" onPress={handleReset}>
                  Book Another Ride
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("partial")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-4 p-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Partial Payment</h4>
                      <p className="text-sm text-gray-600">Pay 50% now and the rest later</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardBody>
                </Card>

                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("full")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-4 p-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Wallet className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Full Payment</h4>
                      <p className="text-sm text-gray-600">Pay the entire amount now</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardBody>
                </Card>

                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("cash")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-4 p-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Cash Payment</h4>
                      <p className="text-sm text-gray-600">Pay in cash upon arrival</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        )}
      </CardBody>

      <CardFooter className="flex justify-between">
        {bookingStep === "packages" && (
          <Button color="primary" className="w-full" isDisabled={!selectedPackage} onPress={handleContinueToPayment}>
            Continue to Booking
          </Button>
        )}
      </CardFooter>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)}>
        <ModalContent>
          <ModalHeader>{paymentMethod === "partial" ? "Partial Payment" : "Full Payment"}</ModalHeader>
          <ModalBody>
            {selectedPackageDetails && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Car:</span>
                    <span className="font-medium">{selectedPackageDetails.car.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">
                      {locations?.data?.find((l: any) => l._id === selectedPickup)?.location}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">
                      {locations?.data?.find((l: any) => l._id === selectedDrop)?.location}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Fare:</span>
                    <span className="font-medium">${selectedPackageDetails.fare.toLocaleString()}</span>
                  </div>
                  {paymentMethod === "partial" && (
                    <div className="flex justify-between font-bold text-primary">
                      <span>Amount to Pay Now (50%):</span>
                      <span>${(selectedPackageDetails.fare * 0.5).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on Card</label>
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
            <Button color="default" variant="light" onPress={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleConfirmPayment}>
              Pay & Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Cash Confirmation Modal */}
      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirm Cash Payment</ModalHeader>
          <ModalBody>
            {selectedPackageDetails && (
              <div className="space-y-4">
                <p>You've selected to pay in cash upon arrival. Please confirm your booking details:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Car:</span>
                    <span className="font-medium">{selectedPackageDetails.car.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">
                      {locations?.data?.find((l: any) => l._id === selectedPickup)?.location}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">
                      {locations?.data?.find((l: any) => l._id === selectedDrop)?.location}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-600">Total Fare:</span>
                    <span className="text-primary">${selectedPackageDetails.fare.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  By confirming, you agree to pay the full amount in cash to the driver upon arrival.
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleConfirmPayment}>
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}
