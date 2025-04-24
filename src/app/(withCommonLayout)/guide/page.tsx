import {
  User,
  Mail,
  Phone,
  MapPin,
  Map,
  Lock,
  Car,
  Landmark,
  DollarSign,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
export default function GuidePage() {
  const inputFields: [string, React.ElementType][] = [
    ["Full Name", User],
    ["Email Address", Mail],
    ["Phone Number", Phone],
    ["Address", MapPin],
    ["ZIP Code", MapPin],
    ["City", Landmark],
    ["Country", Map],
    ["Password", Lock],
  ];
  const bookingFields: [string, React.ElementType][] = [
    ["Pickup Location", MapPin],
    ["Drop-off Location", MapPin],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f7fa] text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title Section */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-900">
            How to Book Your Ride
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
            Welcome to our seamless ride booking service. Follow these quick
            steps and enjoy your journey.
          </p>
        </div>

        {/* Step 1 - Account Creation */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-5 sm:mb-6 flex items-center gap-2">
            <User className="text-indigo-600" /> Step 1: Create Your Account
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
            {inputFields.map(([placeholder, Icon], i) => (
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-2"
                key={i}>
                <Icon className="text-indigo-600" />
                <input
                  type={placeholder === "Password" ? "password" : "text"}
                  placeholder={placeholder}
                  className="w-full p-3 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 - Booking Your Ride */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-5 sm:mb-6 flex items-center gap-2">
            <Car className="text-indigo-600" /> Step 2: Book Your Ride
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-5 sm:space-y-6">
            {bookingFields.map(([placeholder, Icon], i) => (
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-2"
                key={i}>
                <Icon className="text-indigo-600" />
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-full p-3 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            ))}

            {/* Car Selection */}
            <div>
              <label className="text-gray-700 font-medium flex items-center gap-2">
                <Car className="text-indigo-600" />
                Select Car
              </label>
              <select className="w-full p-3 mt-2 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm">
                <option value="toyota">Toyota Camry</option>
                <option value="bmw">BMW Series 5</option>
                <option value="mercedes">Mercedes-Benz E-Class</option>
                <option value="ford">Ford Explorer</option>
              </select>
            </div>

            {/* Price and Seat Info */}
            {[
              { price: 1500, seats: 4, bags: 3 },
              { price: 5000, seats: 30, bags: 50 },
            ].map(({ price, seats, bags }, i) => (
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2"
                key={i}>
                <div className="text-base sm:text-lg font-bold text-gray-900">
                  <DollarSign className="inline text-green-600 mr-1" />
                  Price: <span className="text-indigo-600">฿{price}</span>
                </div>
                <div className="text-sm text-gray-700">
                  Seats: {seats} | Bags: {bags}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3 - Payment Confirmation */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-5 sm:mb-6 flex items-center gap-2">
            <DollarSign className="text-indigo-600" /> Step 3: Payment
            Confirmation
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-base sm:text-lg text-gray-700">
                Total Price: <span className="text-indigo-600">฿5000</span>
              </div>
              <div className="text-base sm:text-lg text-gray-700">
                Pay Now: <span className="text-indigo-600">฿1000</span> (20%)
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-lg hover:bg-green-800 transition-all duration-300">
                Pay ฿1000 to Confirm
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">or</p>
              <button className="w-full sm:w-auto px-6 py-3 bg-indigo-700 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-900 transition-all duration-300">
                Pay Full ฿5000 Now
              </button>
            </div>
          </div>
        </div>

        {/* Step 4 - View Bookings */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-5 sm:mb-6 flex items-center gap-2">
            <CalendarCheck className="text-indigo-600" /> Step 4: View Your
            Bookings
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-4">
            {[
              {
                id: "#12345",
                pickup: "Bangkok",
                drop: "Pattaya",
                status: "Confirmed",
              },
              {
                id: "#12346",
                pickup: "Phuket",
                drop: "Krabi",
                status: "Pending",
              },
            ].map(({ id, pickup, drop, status }, i) => (
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-indigo-100 p-4 rounded-md gap-2"
                key={i}>
                <div className="text-sm text-gray-700">Booking ID: {id}</div>
                <div className="text-sm text-gray-700">Pickup: {pickup}</div>
                <div className="text-sm text-gray-700">Drop-off: {drop}</div>
                <div className="text-sm text-gray-700 flex items-center gap-1">
                  <CheckCircle2
                    className="text-green-600"
                    size={16}
                  />
                  {status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
