"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card"
import { Button } from "@heroui/button"
import { CreditCard, Wallet, DollarSign, Check, ArrowLeft, BadgeDollarSign, Car, Info } from "lucide-react"
import Image from "next/image"
import { useGetLocations } from "@/src/hooks/location.hook"
import { useGetPackages } from "@/src/hooks/package.hook"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import StripePaymentForm from "../_components/stripe-payment-form"
import PayPalPaymentButton from "../_components/paypal-payment-button"
import { useUser } from "@/src/context/user.provider"

// Initialize Stripe (in a real app, you would use your actual publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// PayPal options
const paypalOptions = {
  clientId: "YOUR_PAYPAL_CLIENT_ID",
  currency: "USD",
  intent: "capture",
}
const createMongoDate = (date: string, time: string) => {
  const [year, month, day] = date.split("-")
  const [hour, minute] = time.split(":")
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`)
}
export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get query parameters
  const packageId = searchParams.get("packageId")
  const carId = searchParams.get("carId")
  const pickupLocation = searchParams.get("pickup")
  const dropLocation = searchParams.get("drop")
  const pickupDate = searchParams.get("pickupDate")
  const pickupTime = searchParams.get("pickupTime")
  const dropoffDate = searchParams.get("dropoffDate")
  const dropoffTime = searchParams.get("dropoffTime")
  const numBags = searchParams.get("bags")
  const numSeats = searchParams.get("seats")
  const paymentMethod = searchParams.get("paymentMethod") as string | null
  const pickupDateObj = createMongoDate(pickupDate || "", pickupTime || "")
  const dropDateObj = createMongoDate(dropoffDate || "", dropoffTime || "")


  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const {user}= useUser();

  // Fetch data
  const { data: locations } = useGetLocations()
  const { data: packages } = useGetPackages(pickupLocation || "", dropLocation || "")

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

  // Calculate payment amount
  const isPartialPayment = paymentMethod?.includes("partial")
  const paymentAmount = selectedPackageDetails
    ? isPartialPayment
      ? selectedPackageDetails.fare * 0.5
      : selectedPackageDetails.fare
    : 0

  // If no package, car, or payment method is selected, redirect back
  useEffect(() => {
    if (!packageId || !carId || !paymentMethod) {
      router.push("/booking")
    }
  }, [packageId, carId, paymentMethod, router])

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    if (paymentMethod === "cash") {
      setIsConfirmModalOpen(false)
      setIsBookingConfirmed(true)
      return
    }

    // For Stripe and PayPal, this would be handled by their respective components
    setIsProcessingPayment(true)
  }

  // Handle successful payment
  const handlePaymentSuccess = () => {
    setIsProcessingPayment(false)
    setIsConfirmModalOpen(false)
    setIsBookingConfirmed(true)
  }

  // Handle booking another ride
  const handleBookAnother = () => {
    router.push("/booking")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex justify-between items-center px-6 py-4 rounded-t-xl bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 text-white shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {paymentMethod?.includes("stripe") && <CreditCard className="h-7 w-7 text-white drop-shadow-sm" />}
            {paymentMethod?.includes("paypal") && <Wallet className="h-7 w-7 text-white drop-shadow-sm" />}
            {paymentMethod === "cash" && <DollarSign className="h-7 w-7 text-white drop-shadow-sm" />}
            <h2 className="text-2xl font-bold tracking-tight">
              {paymentMethod?.includes("stripe") && `Stripe ${isPartialPayment ? "Partial" : "Full"} Payment`}
              {paymentMethod?.includes("paypal") && `PayPal ${isPartialPayment ? "Partial" : "Full"} Payment`}
              {paymentMethod === "cash" && "Cash Payment"}
            </h2>
          </div>
          <button
            onClick={() => router.back()}
            className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-4 py-1.5 rounded-md text-sm shadow-sm hover:bg-white/20 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </CardHeader>

        <CardBody className="p-6">
          {isBookingConfirmed ? (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="text-green-600 text-xl mb-2">Booking Confirmed!</div>
              <p className="text-gray-700 mb-4">
                Your booking has been successfully confirmed. You will receive a confirmation email shortly.
              </p>

              {selectedPackageDetails && (
                <div className="bg-white p-4 rounded-lg mb-6 text-left">
                  <h4 className="font-semibold text-gray-800 mb-2">Booking Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Booking ID:</span>
                        <span className="font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Car:</span>
                        <span className="font-medium">{selectedPackageDetails.car.name}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium">
                          {locations?.data?.find((l: any) => l._id === pickupLocation)?.location}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium">
                          {locations?.data?.find((l: any) => l._id === dropLocation)?.location}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Pickup:</span>
                        <span className="font-medium">
                          {pickupDate} {pickupTime}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Passengers:</span>
                        <span className="font-medium">{numSeats}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Payment:</span>
                        <span className="font-medium">
                          {paymentMethod === "cash" && "Cash on Arrival"}
                          {paymentMethod?.includes("stripe") &&
                            `Stripe - ${isPartialPayment ? "Partial (50%)" : "Full Payment"}`}
                          {paymentMethod?.includes("paypal") &&
                            `PayPal - ${isPartialPayment ? "Partial (50%)" : "Full Payment"}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-600">Total:</span>
                        <span className="text-primary">${paymentAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button color="primary" className="mt-2" onPress={handleBookAnother}>
                Book Another Ride
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {selectedPackageDetails && (
                <div className="relative rounded-2xl p-6 border border-white/20 backdrop-blur-xl bg-white/10 shadow-2xl">
                  {/* Sparkle or glow background effect (optional) */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm z-[-1]" />

                  <div className="flex items-center gap-6">
                    {/* Car Image with gradient border */}
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/40 to-pink-500/40 p-[2px]">
                      <div className="w-full h-full rounded-xl overflow-hidden bg-black/20">
                        <Image
                          src={selectedPackageDetails.car.image || "/placeholder.svg?height=112&width=112&query=car"}
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
                        <Info size={16} /> Model: {selectedPackageDetails.car.model}
                      </p>
                      <div className="flex items-center gap-2 text-lg font-bold text-amber-300 mt-2">
                        <BadgeDollarSign size={18} /> ${selectedPackageDetails.fare.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Pickup Location</h4>
                      <p className="font-medium">
                        {locations?.data?.find((l: any) => l._id === pickupLocation)?.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Pickup Date & Time</h4>
                      <p className="font-medium">
                        {pickupDate} at {pickupTime}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Number of Passengers</h4>
                      <p className="font-medium">{numSeats}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Drop Location</h4>
                      <p className="font-medium">
                        {locations?.data?.find((l: any) => l._id === dropLocation)?.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Dropoff Date & Time</h4>
                      <p className="font-medium">
                        {dropoffDate} at {dropoffTime}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Number of Bags</h4>
                      <p className="font-medium">{numBags}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Payment Method:</span>
                    <span className="font-medium">
                      {paymentMethod?.includes("stripe") &&
                        `Stripe - ${isPartialPayment ? "Partial Payment (50%)" : "Full Payment"}`}
                      {paymentMethod?.includes("paypal") &&
                        `PayPal - ${isPartialPayment ? "Partial Payment (50%)" : "Full Payment"}`}
                      {paymentMethod === "cash" && "Cash on Arrival"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-700 font-medium">Total Fare:</span>
                    <span className="text-xl font-bold text-primary">
                      ${selectedPackageDetails?.fare.toLocaleString()}
                    </span>
                  </div>

                  {isPartialPayment && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-700 font-medium">Amount to Pay Now (50%):</span>
                      <span className="text-lg font-bold text-primary">${paymentAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {paymentMethod !== "cash" && (
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {paymentMethod?.includes("stripe") ? "Stripe Payment" : "PayPal Payment"}
                  </h3>

                  {paymentMethod?.includes("stripe") && (
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm
                        amount={paymentAmount}
                        onSuccess={handlePaymentSuccess}
                        isProcessing={isProcessingPayment}
                        bookingData={
                          {
                            user: user?._id,
                            package: packageId,
                            car: carId,
                            pickupLocation,
                            dropLocation,
                            pickUpTime: pickupDateObj,
                            dropOffTime: dropDateObj,
                            totalAmount: selectedPackageDetails?.fare,
                            paymentMethod,
                            amountPaid: paymentAmount,
                            paymentStatus: "pending",
                            paymentType: isPartialPayment ? "partial" : "full",
                          }
                        }
                      />
                    </Elements>
                  )}

                  {paymentMethod?.includes("paypal") && (
                    <PayPalScriptProvider options={paypalOptions}>
                      <PayPalPaymentButton
                        amount={paymentAmount}
                        onSuccess={handlePaymentSuccess}
                        isProcessing={isProcessingPayment}
                      />
                    </PayPalScriptProvider>
                  )}
                </div>
              )}
            </div>
          )}
        </CardBody>

        {!isBookingConfirmed && paymentMethod === "cash" && (
          <CardFooter>
            <Button
              color="primary"
              className="w-full h-14 bg-gradient-to-r from-orange-400 to-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-red-700 transition-all"
              onPress={() => setIsConfirmModalOpen(true)}
            >
              Confirm Cash Booking
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Confirmation Modal for Cash Payment */}
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
                    <span className="font-medium text-gray-700">{selectedPackageDetails.car.model}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium text-gray-700">
                      {locations?.data?.find((l: any) => l._id === pickupLocation)?.location}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium text-gray-700">
                      {locations?.data?.find((l: any) => l._id === dropLocation)?.location}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-medium text-gray-700">
                      {pickupDate} {pickupTime}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium text-gray-700">{numSeats}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Bags:</span>
                    <span className="font-medium text-gray-700">{numBags}</span>
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
    </div>
  )
}
