import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Natural Slate Stone Mosaics & Ledgers | Pavan Impex",
  description: "Artisan-carved natural slate stone mosaics, geometric mesh-backed tiles, and interlocking split-face ledger panels fabricated directly from Markapur reserves.",
};

export default function MosaicsCategoryAliasPage() {
  return <CategoryProductsView categorySlug="mosaic" />;
}
