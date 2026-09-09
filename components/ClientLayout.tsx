"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
