"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Button } from "@heroui/button"
import { Input, Textarea } from "@heroui/input"
import { Spinner } from "@heroui/spinner"
import { MapPin, Calendar, Clock, Users, Home, Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useCreateTour } from "@/src/hooks/tour.hook"
import { toast } from "sonner"

export default function TourBookingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const {mutate, isPending, isError} = useCreateTour({
    onSuccess: (data: any) => {
        console.log(data, 'tbd')
      setIsSuccess(true)
      toast.success("Tour booking successful!")
    },
  })

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: today,
    dropoffDate: today,
    pickupTime: "10:00",
    dropoffTime: "18:00",
    numberOfPeople: 1,
    address: "",
    phoneNumber: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required field validation
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "description") {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")} is required`
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Date validation
    if (formData.pickupDate && formData.dropoffDate) {
      const pickupDate = new Date(formData.pickupDate)
      const dropoffDate = new Date(formData.dropoffDate)

      if (pickupDate > dropoffDate) {
        newErrors.dropoffDate = "Drop-off date cannot be earlier than pick-up date"
      }
    }

    // Number of people validation
    if (Number.parseInt(formData.numberOfPeople.toString()) < 1) {
      newErrors.numberOfPeople = "At least one person is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    const newData = {
        ...formData,
        numberOfPeople: Number.parseInt(formData.numberOfPeople.toString()),
    }
    mutate(newData);
    console.log({formData})

    try {
      // In a real application, you would send this data to your API
      // const response = await fetch('/api/tour-booking', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to submit tour booking')
      // }

      // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1500))

    //   setIsSuccess(true)

      // Reset form after successful submission
      // setFormData({
      //   name: "",
      //   description: "",
      //   pickupLocation: "",
      //   dropoffLocation: "",
      //   pickupDate: today,
      //   dropoffDate: today,
      //   pickupTime: "10:00",
      //   dropoffTime: "18:00",
      //   numberOfPeople: 1,
      //   address: "",
      //   phoneNumber: "",
      //   email: "",
      // })
    } catch (error) {
      console.error("Error submitting tour booking:", error)
      setErrors({ form: "Failed to submit tour booking. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        color="default"
        variant="light"
        className="mb-6"
        onPress={handleBack}
        startContent={<ArrowLeft className="h-4 w-4" />}
      >
        Back to Home
      </Button>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex justify-between items-center px-6 py-4 rounded-t-xl bg-gradient-to-r from-orange-400 to-red-600 text-white shadow-md">
          <div className="flex items-center gap-3">
            <MapPin className="h-7 w-7 text-white drop-shadow-sm" />
            <h2 className="text-2xl font-bold tracking-tight">Book Your Tour</h2>
          </div>
        </CardHeader>

        <CardBody className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tour Booking Successful!</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Thank you for booking a tour with us. We've received your request and will contact you shortly to
                confirm the details.
              </p>
              <div className="flex gap-4">
                <Button color="primary" onPress={handleBack}>
                  Return to Home
                </Button>
                <Button color="default" variant="bordered" onPress={() => setIsSuccess(false)}>
                  Book Another Tour
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">{errors.form}</div>
              )}

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? "border-red-500" : ""}
                      startContent={<Users className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={errors.email ? "border-red-500" : ""}
                      startContent={<Mail className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={errors.phoneNumber ? "border-red-500" : ""}
                      startContent={<Phone className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className={errors.address ? "border-red-500" : ""}
                      startContent={<Home className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Tour Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pickup Location */}
                  <div>
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="Enter pickup location"
                      className={errors.pickupLocation ? "border-red-500" : ""}
                      startContent={<MapPin className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.pickupLocation && <p className="mt-1 text-xs text-red-500">{errors.pickupLocation}</p>}
                  </div>

                  {/* Dropoff Location */}
                  <div>
                    <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      Dropoff Location <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="dropoffLocation"
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleChange}
                      placeholder="Enter dropoff location"
                      className={errors.dropoffLocation ? "border-red-500" : ""}
                      startContent={<MapPin className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.dropoffLocation && <p className="mt-1 text-xs text-red-500">{errors.dropoffLocation}</p>}
                  </div>

                  {/* Pickup Date */}
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      min={today}
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className={errors.pickupDate ? "border-red-500" : ""}
                      startContent={<Calendar className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.pickupDate && <p className="mt-1 text-xs text-red-500">{errors.pickupDate}</p>}
                  </div>

                  {/* Pickup Time */}
                  <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Time <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className={errors.pickupTime ? "border-red-500" : ""}
                      startContent={<Clock className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.pickupTime && <p className="mt-1 text-xs text-red-500">{errors.pickupTime}</p>}
                  </div>

                  {/* Dropoff Date */}
                  <div>
                    <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Dropoff Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="dropoffDate"
                      name="dropoffDate"
                      type="date"
                      min={formData.pickupDate || today}
                      value={formData.dropoffDate}
                      onChange={handleChange}
                      className={errors.dropoffDate ? "border-red-500" : ""}
                      startContent={<Calendar className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.dropoffDate && <p className="mt-1 text-xs text-red-500">{errors.dropoffDate}</p>}
                  </div>

                  {/* Dropoff Time */}
                  <div>
                    <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Dropoff Time <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="dropoffTime"
                      name="dropoffTime"
                      type="time"
                      value={formData.dropoffTime}
                      onChange={handleChange}
                      className={errors.dropoffTime ? "border-red-500" : ""}
                      startContent={<Clock className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.dropoffTime && <p className="mt-1 text-xs text-red-500">{errors.dropoffTime}</p>}
                  </div>

                  {/* Number of People */}
                  <div>
                    <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of People <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="numberOfPeople"
                      name="numberOfPeople"
                      type="number"
                      min="1"
                      value={formData.numberOfPeople.toString()}
                      onChange={handleChange}
                      className={errors.numberOfPeople ? "border-red-500" : ""}
                      startContent={<Users className="h-4 w-4 text-gray-400" />}
                    />
                    {errors.numberOfPeople && <p className="mt-1 text-xs text-red-500">{errors.numberOfPeople}</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests or Notes
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter any special requests or additional information"
                    className={`min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                </div>
              </div>
            </form>
          )}
        </CardBody>

        {!isSuccess && (
          <CardFooter className="flex justify-end gap-2 border-t p-6 rounded-lg">
            <Button color="default" variant="light" onPress={handleBack}>
              Cancel
            </Button>
            <Button
              color="primary"
              className="bg-gradient-to-r from-orange-400 to-red-600 text-white rounded-lg"
              onClick={handleSubmit}
              isDisabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner size="sm" color="white" className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Tour Booking"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
