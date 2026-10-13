import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Natural Slate & Stone Mosaic Collection | Pavan Stones Group",
  description: "Authentic Markapur natural slate, stacked stone cladding, and handcrafted stone mosaics directly from quarry reserves.",
  keywords: "Slate stone, Markapur natural slate, slate mosaic, slate exporter India",
};

export default function SlatesPage() {
  return <CategoryProductsView categorySlug="slates" />;
}
