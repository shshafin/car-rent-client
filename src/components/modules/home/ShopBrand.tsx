import Image from "next/image";

// Dummy JSON data for brands
const brands = [
  { logo: "/michelin-logo.png", link: "#" },
  { logo: "/goodyear-logo.png", link: "#" },
  { logo: "/bridgestone-logo-png.png", link: "#" },
  { logo: "/continental-logo.png", link: "#" },
  { logo: "/TOYO-TIRES.png", link: "#" },
  { logo: "/images.png", link: "#" },
];

const ShopByBrandSection = () => {
  return (
    <section className="py-16 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8 text-center">
          <h3 className="text-[#FF141D] font-semibold uppercase">
            Shop by Tire Brand
          </h3>
          <h2 className="downtext-gradient text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Choose the Best Tires for Your Journey
          </h2>
          <p className="downtext-gradient max-w-2xl mx-auto text-base md:text-lg">
            Browse top tire brands and find the perfect fit for your car, truck,
            or SUV.
            <span className="font-bold">
              Get the quality and performance you need for every road.
            </span>
          </p>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <a
              href={brand.link}
              key={index}
              className="flex justify-center items-center transition-transform transform hover:scale-105">
              <div className="rounded-full overflow-hidden bg-white shadow-md p-4">
                <Image
                  src={brand.logo}
                  alt={`Brand ${index + 1}`}
                  layout="intrinsic"
                  width={100} // Adjusted size for a more uniform look
                  height={100}
                  className="object-contain" // Ensure the image fits nicely within the circle
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByBrandSection;
