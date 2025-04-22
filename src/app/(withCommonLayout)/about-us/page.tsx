import Image from "next/image";
import {
  Car,
  Bus,
  Plane,
  Users,
  ShieldCheck,
  CalendarCheck,
  Smile,
  Medal,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#f0f9ff] text-gray-900 font-serif">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-900 flex items-center justify-center gap-2 transition-all ease-in-out duration-300 hover:text-gold">
            <Users className="w-8 h-8 text-indigo-700" /> About Us
          </h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
            Welcome to{" "}
            <strong className="text-indigo-800">TransportationThai</strong> —
            your go-to solution for premium ride sharing, long-trip vehicle
            rentals, and airport pickups across Thailand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105">
            <Car className="w-10 h-10 text-blue-600 mb-4 transition-all ease-in-out duration-300 hover:text-gold" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Daily Ride Sharing
            </h3>
            <p className="text-gray-700 text-sm">
              Affordable and reliable ride-sharing services throughout Thailand
              — perfect for daily commutes and short trips.
            </p>
          </div>
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105">
            <Bus className="w-10 h-10 text-green-600 mb-4 transition-all ease-in-out duration-300 hover:text-gold" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Long Trip Vehicle Rentals
            </h3>
            <p className="text-gray-700 text-sm">
              Need to travel across the country? We provide buses and private
              vehicles for comfortable, long-distance travel.
            </p>
          </div>
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105">
            <Plane className="w-10 h-10 text-purple-600 mb-4 transition-all ease-in-out duration-300 hover:text-gold" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Airport Pickups
            </h3>
            <p className="text-gray-700 text-sm">
              Seamless airport pickups with professional drivers waiting to
              welcome you at the terminal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              With years of experience and a passionate team, we focus on
              providing top-tier transportation services. From solo travelers to
              group journeys, our platform ensures safety, comfort, and
              efficiency in every ride.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
              <li>Trusted and verified drivers</li>
              <li>Easy booking interface</li>
              <li>24/7 customer support</li>
              <li>Fully sanitized and well-maintained vehicles</li>
            </ul>
          </div>
          <div>
            <Image
              src="/thai.jpg"
              alt="TransportationThai"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg hover:scale-105 transition-all ease-in-out duration-300"
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-indigo-900 mb-4 flex justify-center items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-indigo-700" /> Our Commitment
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We believe transportation should be smooth, safe, and seamless. We
            invest in modern vehicles, maintain high service standards, and
            continuously improve based on your feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="flex items-center gap-6 bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
            <CalendarCheck className="w-10 h-10 text-teal-700" />
            <div>
              <h3 className="font-bold text-lg">Flexible Scheduling</h3>
              <p className="text-sm text-gray-700">
                Book rides anytime. Whether early morning or late night, we've
                got you covered.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
            <Smile className="w-10 h-10 text-pink-600" />
            <div>
              <h3 className="font-bold text-lg">Customer Satisfaction</h3>
              <p className="text-sm text-gray-700">
                Thousands of happy customers trust us for their transportation
                needs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
            <div>
              <h3 className="font-bold text-lg">Safe & Secure Rides</h3>
              <p className="text-sm text-gray-700">
                We prioritize your safety with real-time tracking and verified
                drivers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
            <Medal className="w-10 h-10 text-yellow-600" />
            <div>
              <h3 className="font-bold text-lg">Award-Winning Service</h3>
              <p className="text-sm text-gray-700">
                Recognized for excellence and innovation in transportation
                services.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-indigo-900 mb-6">
            Meet Our Founder
          </h2>
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/profile.jpg"
              alt="Founder Thanawat Kitchaman"
              width={160}
              height={160}
              className="rounded-full shadow-lg hover:scale-105 transition-all ease-in-out duration-300"
            />
            <h3 className="text-2xl font-bold text-gray-900">
              Mr. Thanawat Kitchaman
            </h3>
            <p className="text-gray-700 max-w-xl">
              Driven by a vision to transform transportation in Thailand, Mr.
              Thanawat founded TransportationThai with a strong belief in
              innovation, quality, and customer care. Under his leadership, the
              company continues to redefine how people travel across the
              country.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
