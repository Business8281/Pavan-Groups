import Hero from "@/components/Hero";
import HeroStoneCategories from "@/components/HeroStoneCategories";
import NaturalStoneCollectionShowcase from "@/components/NaturalStoneCollectionShowcase";
import Products from "@/components/Products";
import BrowseTilesBy from "@/components/BrowseTilesBy";
import WhyChooseUs from "@/components/WhyChooseUs";
import ElegantDiscovery from "@/components/ElegantDiscovery";

export default function Home() {
  return (
    <>
      {/* Sticky Parallax Hero Wrapper: Hero sticks only while curtain slides over it */}
      <div className="relative">
        <Hero />
        <HeroStoneCategories />
        <NaturalStoneCollectionShowcase />
        <Products />
      </div>
      <BrowseTilesBy />
      <ElegantDiscovery />
      <WhyChooseUs />
    </>
  );
}



