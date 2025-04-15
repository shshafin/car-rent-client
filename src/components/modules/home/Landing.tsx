import Image from "next/image";

export default function Landing() {
  return (
    <div className="pb-12">
      {/* Top Banner */}
      <div className="bg-default-900 text-white text-sm px-4 py-2 flex flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <Image
          src="/promo.webp"
          alt="Promo Icon"
          width={40}
          height={40}
        />
        <div className="flex flex-wrap items-center justify-center gap-1 text-default-900 text-xs sm:text-lg font-medium">
          <strong className="font-bold text-default-50">
            5% Off All Tires and Wheels
          </strong>
          <span className="text-default-50">totaling $599+. Limited Time.</span>
          <span className="text-sm sm:text-2xl text-default-50">†</span>
        </div>
        <a
          href="#"
          className="text-yellow-500 text-sm sm:text-lg font-semibold underline">
          Learn more.
        </a>
      </div>

      {/* Hero Section */}
      <div>
        <video
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[500px] object-cover"
          autoPlay
          muted
          loop
          playsInline>
          <source
            src="/banner.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Action Area */}
        <div className="max-w-5xl mx-auto px-4 pt-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-default-900 mb-6">
            What can we help you with today?
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            {/* Shop Products */}
            <div className="flex-1 border p-6 rounded-lg shadow-md bg-white">
              <div className="flex justify-center items-center gap-1 mb-2 py-1 bg-gray-50 rounded-md w-1/4 mx-auto border-x-1 border-red-500">
                <Image
                  src="/shop.webp"
                  alt="Shop Icon"
                  width={25}
                  height={25}
                />
                <h3 className="md:text-sm lg:text-xl text-black font-semibold">
                  SHOP
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Shop the best products, then book your install at checkout.
              </p>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold text-sm sm:text-base">
                SHOP PRODUCTS
              </button>
            </div>
            {/* divider */}
            <div className="hidden md:flex  items-center justify-center h-40 my-auto">
              <div className="flex flex-col items-center">
                {/* Top half of the divider */}
                <div className="w-[0.5px] h-16 bg-gray-300" />

                {/* "or" text with spacing */}
                <div className="text-gray-400 text-sm py-1">o&nbsp;r</div>

                {/* Bottom half of the divider */}
                <div className="w-[0.5px] h-16 bg-gray-300" />
              </div>
            </div>

            {/* Schedule Service */}
            <div className="flex-1 border p-6 rounded-lg shadow-md bg-white">
              <div className="flex justify-center py-1  items-center gap-1 mb-2 bg-gray-50 rounded-md w-1/3 mx-auto border-x-1 border-red-500">
                <Image
                  src="/service.png"
                  alt="Service Icon"
                  width={25}
                  height={25}
                />
                <h3 className="md:text-sm lg:text-xl text-black font-semibold">
                  SERVICE
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Schedule an in-store visit for consultation, repair, inspection
                and more.
              </p>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold text-sm sm:text-base">
                SCHEDULE SERVICE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
