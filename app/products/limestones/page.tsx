import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Natural Limestone Collection | Pavan Stones Group",
  description: "Quarry-direct Cuddapah Black and Lime Yellow calibrated limestone tiles, monolithic slabs, and tumbled outdoor paving.",
  keywords: "Limestone, Cuddapah stone, Lime Yellow, Indian limestone exporter, Pavan Stones Group",
};

export default function LimestonesPage() {
  return <CategoryProductsView categorySlug="limestones" />;
}
