import Image from "next/image";

export default function Landing() {
  return (
    <div className="pb-0">
      {/* Top Banner */}
      <div className="bg-default-900 text-white text-sm px-4 py-2 flex flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <Image
          src="/promo.jpg"
          alt="Promo Icon"
          width={40}
          height={40}
        />
        <div className="flex flex-wrap items-center justify-center gap-1 text-default-900 text-xs sm:text-lg font-medium">
          <strong className="font-bold text-default-50 text-base sm:text-xl">
            Welcome to{" "}
            <span className="text-[#AE1215]">Transportationthai!</span>
          </strong>
          <span className="text-default-50 text-sm sm:text-lg">
            Book rides, share journeys & travel smarter.
          </span>
        </div>
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
      </div>
    </div>
  );
}
