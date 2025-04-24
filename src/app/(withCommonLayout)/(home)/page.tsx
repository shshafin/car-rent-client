import BlogSection from "@/src/components/modules/home/Blog";
import Deals from "@/src/components/modules/home/Deals";
import FinancingSection from "@/src/components/modules/home/Financing";
import Landing from "@/src/components/modules/home/Landing";
import ShopByBrandSection from "@/src/components/modules/home/ShopBrand";
import ShopCategory from "@/src/components/modules/home/ShopCategory";
import TreadWellSection from "@/src/components/modules/home/Treadwall";

export default function Home() {
  return (
    <>
      <Landing />
      <h1 className="text-2xl bg-gray-700 p-4 my-5 text-center">
        Booking part Coming soon
      </h1>
      <h1 className="text-2xl bg-gray-700 p-4 my-5 text-center">
        Tour Part coming soon
      </h1>
      {/* <BookingForm /> */}
      {/* <Deals />
      <ShopCategory />
      <TreadWellSection />
      <ShopByBrandSection />
      <FinancingSection />
      <BlogSection /> */}
    </>
  );
}
