import BlogSection from "@/src/components/modules/home/Blog";
import BookingPage from "@/src/components/modules/home/Booking";
import BookingPageTwo from "@/src/components/modules/home/BookingPageTwo";
import Deals from "@/src/components/modules/home/Deals";
import FinancingSection from "@/src/components/modules/home/Financing";
import Landing from "@/src/components/modules/home/Landing";
import ShopByBrandSection from "@/src/components/modules/home/ShopBrand";
import ShopCategory from "@/src/components/modules/home/ShopCategory";
import TreadWellSection from "@/src/components/modules/home/Treadwall";

export default async function Home() {
  return (
    <>
      <Landing />
      {/* <BookingPage /> */}
      {/* <BookingPageTwo /> */}
      {/* <Deals />
      <ShopCategory />
      <TreadWellSection />
      <ShopByBrandSection />
      <FinancingSection />
      <BlogSection /> */}
    </>
  );
}
