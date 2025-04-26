"use client"

import CarBooking from "./CarBooking"

export default function BookingPageTwo() {
  return (
    <div className="container mx-auto pb-12 ">
      <div className="max-w-5xl mx-auto px-4 pt-12 text-center">
        <div className="mb-8 text-center">
          <h3 className="text-[#FF141D] font-semibold uppercase">How Can We Assist?</h3>
          <h2 className="downtext-gradient text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Let's Make Your Journey Smoother
          </h2>
          <p className="downtext-gradient max-w-2xl mx-auto text-base md:text-lg">
            From booking your ride to solving your queries,
            <span className="font-bold">our team is ready to support you—every mile of the way.</span>
          </p>
        </div>
      </div>

      <CarBooking />
    </div>
  )
}