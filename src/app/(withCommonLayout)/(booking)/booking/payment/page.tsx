"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { CreditCard, Wallet, DollarSign, MapPin, ChevronRight } from "lucide-react"
import { useGetLocations } from "@/src/hooks/location.hook"
import { useGetPackages } from "@/src/hooks/package.hook"

export default function PaymentMethodPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get query parameters
  const packageId = searchParams.get("packageId")
  const carId = searchParams.get("carId")
  const pickupLocation = searchParams.get("pickup")
  const dropLocation = searchParams.get("drop")
  const pickupDate = searchParams.get("pickupDate")
  const pickupTime = searchParams.get("pickupTime")
  // const dropoffDate = searchParams.get("dropoffDate")
  // const dropoffTime = searchParams.get("dropoffTime")
  const numBags = searchParams.get("bags")
  const numSeats = searchParams.get("seats")

  // Fetch data
  const { data: locations } = useGetLocations()
  const { data: packages } = useGetPackages(pickupLocation || "", dropLocation || "")

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: string) => {
    // Create URL with all parameters
    const params = new URLSearchParams({
      packageId: packageId || "",
      carId: carId || "",
      pickup: pickupLocation || "",
      drop: dropLocation || "",
      pickupDate: pickupDate || "",
      pickupTime: pickupTime || "",
      // dropoffDate: dropoffDate || "",
      // dropoffTime: dropoffTime || "",
      bags: numBags || "1",
      seats: numSeats || "1",
      paymentMethod: method,
    })

    router.push(`/booking/checkout?${params.toString()}`)
  }

  // Get selected package and car details
  const getSelectedPackageDetails = () => {
    if (!packageId || !carId || !packages?.data) return null

    const pkg = packages.data.find((p: any) => p._id === packageId)
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

  // If no package or car is selected, redirect back to booking
  useEffect(() => {
    if (!packageId || !carId) {
      router.push("/")
    }
  }, [packageId, carId, router])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Choose Payment Method</h1>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex justify-between items-center px-6 py-4 rounded-t-xl bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 text-white shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <CreditCard className="h-7 w-7 text-white drop-shadow-sm" />
            <h2 className="text-2xl font-bold tracking-tight">Payment Method</h2>
          </div>
          <button
            onClick={() => router.back()}
            className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-4 py-1.5 rounded-md text-sm shadow-sm hover:bg-white/20 transition"
          >
            Back
          </button>
        </CardHeader>

        <CardBody className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Choose Payment Method
              </h3>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="whitespace-nowrap">
                  {locations?.data?.find((l: any) => l._id === pickupLocation)?.location}
                  <span className="mx-1">→</span>
                  {locations?.data?.find((l: any) => l._id === dropLocation)?.location}
                </span>
              </div>
            </div>

            {selectedPackageDetails && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Booking Details</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Car:</span>
                        <span className="font-medium">{selectedPackageDetails.car.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{selectedPackageDetails.car.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup:</span>
                        <span className="font-medium">
                          {pickupDate} {pickupTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Trip Details</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium">
                          {locations?.data?.find((l: any) => l._id === pickupLocation)?.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium">
                          {locations?.data?.find((l: any) => l._id === dropLocation)?.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passengers:</span>
                        <span className="font-medium">{numSeats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bags:</span>
                        <span className="font-medium">{numBags}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-primary">
                    <span>Total Fare:</span>
                    <span>${selectedPackageDetails.fare.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 mt-4">
              <h4 className="font-medium mb-2">Online Payment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("stripe-partial")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] hover:shadow-lg cursor-pointer">
                    {/* Icon */}
                    <div className="bg-blue-200/30 p-3 rounded-full border border-blue-400/30">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>

                    {/* Text (centered) */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-base">Stripe - Partial Payment</h4>
                      <p className="text-sm">Pay 50% now and the rest later</p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5" />
                  </CardBody>
                </Card>

                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("stripe-full")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] hover:shadow-lg cursor-pointer">
                    {/* Icon */}
                    <div className="bg-blue-200/30 p-3 rounded-full border border-blue-400/30">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>

                    {/* Payment Info */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-base">Stripe - Full Payment</h4>
                      <p className="text-sm">Pay the entire amount now</p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5" />
                  </CardBody>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("paypal-partial")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] hover:shadow-lg cursor-pointer">
                    {/* Icon */}
                    <div className="bg-purple-200/30 p-3 rounded-full border border-purple-400/30">
                      <Wallet className="h-6 w-6 text-purple-500" />
                    </div>

                    {/* Payment Info */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-base">PayPal - Partial Payment</h4>
                      <p className="text-sm">Pay 50% now and the rest later</p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5" />
                  </CardBody>
                </Card>

                <Card
                  isPressable
                  onPress={() => handlePaymentMethodSelect("paypal-full")}
                  className="border hover:border-primary transition-colors"
                >
                  <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] cursor-pointer">
                    {/* Icon */}
                    <div className="bg-purple-200/30 p-3 rounded-full border border-purple-400/30">
                      <Wallet className="h-6 w-6 text-purple-500" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-base">PayPal - Full Payment</h4>
                      <p className="text-sm">Pay the entire amount now</p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5" />
                  </CardBody>
                </Card>
              </div>

              <h4 className="font-medium mt-4 mb-2">Pay Later</h4>
              <Card
                isPressable
                onPress={() => handlePaymentMethodSelect("cash")}
                className="border hover:border-primary transition-colors"
              >
                <CardBody className="flex items-center gap-5 p-5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md transition hover:scale-[1.01] cursor-pointer">
                  {/* Icon */}
                  <div className="bg-green-200/30 p-3 rounded-full border border-green-300/30">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-semibold text-base">Cash Payment</h4>
                    <p className="text-sm">Pay in cash upon arrival</p>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="h-5 w-5" />
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
