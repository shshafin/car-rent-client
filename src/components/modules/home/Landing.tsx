"use client"

import Image from "next/image"
import CarBooking from "./CarBooking"

export default function Landing() {
  return (
    <div className="relative">
      {/* Top Banner */}
      <div className="bg-default-900 text-white text-sm px-4 py-2 flex flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <Image src="/promo.jpg" alt="Promo Icon" width={40} height={40} />
        <div className="flex flex-wrap items-center justify-center gap-1 text-default-900 text-xs sm:text-lg font-medium">
          <strong className="font-bold text-default-50 text-base sm:text-xl">
            Welcome to <span className="text-[#AE1215]">Transportationthai!</span>
          </strong>
          <span className="text-default-50 text-sm sm:text-lg">Book rides, share journeys & travel smarter.</span>
        </div>
      </div>

      {/* Hero Section with Overlay */}
      <div className="relative">
        {/* Hero Video */}
        <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay with gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="container mx-auto px-4 text-center mb-32">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Welcome to Transportationthai</h1>
              <p className="text-xl md:text-2xl drop-shadow-md">Book rides, share journeys & travel smarter.</p>
            </div>
          </div>
        </div>

        {/* Booking Card - Positioned to overlap the hero video */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="absolute left-0 right-0 -top-32 md:-top-40">
            <div className="bg-white rounded-lg shadow-xl mx-auto max-w-4xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Book Your Ride</h2>
              <CarBooking />
            </div>
          </div>
        </div>
      </div>

      {/* Content below the booking card - Add padding to account for the overlapping card */}
      <div className="pt-[600px] md:pt-[650px] lg:pt-[700px]">{/* Your additional content can go here */}</div>
    </div>
  )
}
