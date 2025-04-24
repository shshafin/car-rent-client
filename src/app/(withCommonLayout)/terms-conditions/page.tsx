import {
  UserPlus,
  MapPin,
  DollarSign,
  Car,
  CheckCircle,
  LayoutDashboard,
  Bus,
  ShieldCheck,
} from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f5f3ff] to-[#ede9fe] px-4 py-20 flex items-center justify-center">
      <div className="backdrop-blur-2xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8 md:p-16 max-w-5xl w-full text-gray-800">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 text-center mb-6">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Our policy ensures transparency and trust in your travel experience.
        </p>

        <div className="space-y-10">
          <Section
            icon={
              <UserPlus
                size={28}
                className="text-indigo-600"
              />
            }
            title="Account Creation"
            desc="To book a ride, passengers must first create an account. This enables you to manage bookings and access trip history securely."
          />

          <Section
            icon={
              <MapPin
                size={28}
                className="text-indigo-600"
              />
            }
            title="Pickup & Drop-off"
            desc="Select your pickup and drop-off points when booking. Pricing adjusts based on the distance and the type of car selected."
          />

          <Section
            icon={
              <Car
                size={28}
                className="text-indigo-600"
              />
            }
            title="Vehicle Details"
            desc="Each vehicle clearly lists how many passengers it supports and the luggage capacity, so you always know what to expect."
          />

          <Section
            icon={
              <DollarSign
                size={28}
                className="text-indigo-600"
              />
            }
            title="Pricing & Payment"
            desc="To confirm your ride, pay either 20% or the full amount. The advance required depends on the trip’s distance."
          />

          <Section
            icon={
              <LayoutDashboard
                size={28}
                className="text-indigo-600"
              />
            }
            title="User Dashboard"
            desc="View and manage all your rides through your personal dashboard. Monitor status, payments, and ride details in one place."
          />

          <Section
            icon={
              <Bus
                size={28}
                className="text-indigo-600"
              />
            }
            title="Tour Bookings"
            desc="You can also book tour cars or buses for group trips and adventures. Additional terms may apply based on vehicle type."
          />

          <Section
            icon={
              <ShieldCheck
                size={28}
                className="text-indigo-600"
              />
            }
            title="Booking Confirmation"
            desc="Your booking is only confirmed once the payment is successfully processed. You’ll get a notification and a dashboard update."
          />

          <div className="text-center text-sm text-gray-600 mt-10">
            <CheckCircle
              className="mx-auto text-green-500 mb-2"
              size={28}
            />
            By continuing, you agree to abide by the above terms and conditions.
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable section component
function Section({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-700">{desc}</p>
      </div>
    </div>
  );
}
