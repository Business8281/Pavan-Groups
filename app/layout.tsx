import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Pavan Stones Group — Manufacturer, Supplier, Exporter & Installer | Markapur, India",
  description:
    "Pavan Stones Group is a manufacturer, supplier, exporter, and installer of premium natural stones based in Markapur, Andhra Pradesh, India. Operating through Pavan Impex, Sai Balaji Impex, and Pavan Granite.",
  keywords:
    "Pavan Stones Group, Pavan Impex, Sai Balaji Impex, Pavan Granite, Markapur natural stone, slate stones, wall cladding, limestone products, Cuddapah black, Black Galaxy granite, natural stone exporter India",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-[#f8fafc] text-[#140d0a] font-sans font-light antialiased selection:bg-[#c85a32] selection:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
