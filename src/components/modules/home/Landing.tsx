// "use client"

// import Image from "next/image"
// import CarBooking from "./CarBooking"
// import TourBookingBanner from "./TourBookingBanner"

// export default function Landing() {
//   return (
//     <div className="relative">
//       {/* Top Banner */}
//       <div className="bg-default-900 text-white text-sm px-4 py-2 flex flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
//         <Image src="/promo.jpg" alt="Promo Icon" width={40} height={40} />
//         <div className="flex flex-wrap items-center justify-center gap-1 text-default-900 text-xs sm:text-lg font-medium">
//           <strong className="font-bold text-default-50 text-base sm:text-xl">
//             Welcome to <span className="text-[#AE1215]">Transportationthai!</span>
//           </strong>
//           <span className="text-default-50 text-sm sm:text-lg">Book rides, share journeys & travel smarter.</span>
//         </div>
//       </div>

//       {/* Hero Section with Overlay */}
//       <div className="relative border-2 border-red-500">
//         {/* Hero Video */}
//         <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden">
//           <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
//             <source src="/banner.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>

//           {/* Overlay with gradient for better text visibility */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>

//           {/* Hero Content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//             <div className="container mx-auto px-4 text-center mb-32">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Welcome to Transportationthai</h1>
//               <p className="text-xl md:text-2xl drop-shadow-md">Book rides, share journeys & travel smarter.</p>
//             </div>
//           </div>
//         </div>

//         {/* Booking Card - Positioned to overlap the hero video */}
//         <div className="container mx-auto px-4 relative z-10 border-2 border-sky-500">
//           <div className="absolute left-0 right-0 -top-32 md:-top-40 lg:-top-48">
//             <div className="bg-white rounded-lg shadow-xl mx-auto max-w-4xl">
//               <CarBooking />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content below the booking card - Calculate height dynamically */}
//       <div className="relative border-2 border-green-500">
//         {/* This spacer div ensures proper spacing after the hero section */}
//         <div className="h-[700px] md:h-[600px] lg:h-[500px]"></div>

//         {/* Tour booking banner */}
//         <div className="container mx-auto px-4 mb-12">
//           <TourBookingBanner />
//         </div>

//         {/* Additional content can go here */}
//       </div>
//     </div>
//   )
// }

"use client"

import Image from "next/image"
import CarBooking from "./CarBooking"
import TourBookingBanner from "./TourBookingBanner"

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
          <span className="text-default-50 text-sm sm:text-lg">
            Book rides, share journeys & travel smarter.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Hero Video */}
        <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>

          {/* Hero Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <div className="container mx-auto px-4 text-center mb-32">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                Welcome to Transportationthai
              </h1>
              <p className="text-xl md:text-2xl drop-shadow-md">
                Book rides, share journeys & travel smarter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Car Booking Section (visually overlaps video, but stays in document flow) */}
      <div className="container mx-auto px-4 -mt-32 md:-mt-40 lg:-mt-48 z-20 relative">
        <div className="bg-white rounded-lg shadow-xl mx-auto max-w-4xl">
          <CarBooking />
        </div>
      </div>

      {/* Tour Booking Section - will automatically be pushed down by dynamic height of CarBooking */}
      <div className="container mx-auto px-4 mt-12 mb-12">
        <TourBookingBanner />
      </div>

      {/* Add more content here as needed */}
    </div>
  )
}
