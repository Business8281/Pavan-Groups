import Hero from "@/components/Hero";
import Products from "@/components/Products";
import BrowseTilesBy from "@/components/BrowseTilesBy";
import WhyChooseUs from "@/components/WhyChooseUs";
import ShippingAustralia from "@/components/ShippingAustralia";
import ElegantDiscovery from "@/components/ElegantDiscovery";

export default function Home() {
  return (
    <>
      {/* Sticky Parallax Hero Wrapper: Hero sticks only while Products curtain slides over it */}
      <div className="relative">
        <Hero />
        <Products />
      </div>
      <BrowseTilesBy />
      <ShippingAustralia />
      <ElegantDiscovery />
      <WhyChooseUs />
    </>
  );
}
