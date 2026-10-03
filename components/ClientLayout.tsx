"use client";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { WishlistProvider } from "@/context/WishlistContext";

const WishlistDrawer = dynamic(() => import("@/components/WishlistDrawer"), {
  ssr: false,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      {/* Intro Preloader */}
      <Preloader />

      {/* Grain overlay */}
      <div className="grain" />

      {/* Smooth scroll & layout shell */}
      <SmoothScroll>
        <Navigation />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </SmoothScroll>

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer />
    </WishlistProvider>
  );
}
