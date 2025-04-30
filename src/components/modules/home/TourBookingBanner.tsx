"use client"

import { useRouter } from "next/navigation"
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react"
import { Button } from "@heroui/button"

export default function TourBookingBanner() {
  const router = useRouter()

  const handleBookTour = () => {
    router.push("/tour-booking")
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-xl mb-8 max-w-7xl mx-auto">
      {/* Background Image with Overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-transparent z-10" />
        <img
          src="/mountain-lake-forest.jpg"
          alt="Tour destinations"
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
          <div className="inline-block px-2 sm:px-4 py-1 mb-2 sm:mb-4 text-xs sm:text-sm font-semibold text-white bg-orange-500 rounded-lg">
            Limited Time Offer
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-md line-clamp-2 sm:line-clamp-none">
            Discover Amazing Places with Our Guided Tours
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg mb-3 sm:mb-6 max-w-xl drop-shadow-md hidden xs:block sm:block">
            Explore breathtaking destinations with our expert guides. Customized itineraries, comfortable
            transportation, and unforgettable experiences.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 mb-3 sm:mb-6">
            <div className="flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm md:text-base">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-orange-400" />
              <span>Popular Destinations</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm md:text-base">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-orange-400" />
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm md:text-base">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-orange-400" />
              <span>Group Discounts</span>
            </div>
          </div>

          <Button
            color="primary"
            className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-400 to-red-600 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onPress={handleBookTour}
            endContent={<ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1 sm:ml-2" />}
          >
            Book Your Tour Now
          </Button>
        </div>
      </div>
    </div>
  )
}
