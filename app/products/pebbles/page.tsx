import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Natural Rough & Polished River Pebbles | Pavan Impex",
  description: "Quarry-direct unpolished rough pebbles, high-gloss tumble-polished river stones, and vibrant semi-precious agate specimens for architectural landscaping and decorative applications.",
};

export default function PebblesCategoryPage() {
  return <CategoryProductsView categorySlug="pebbles" />;
}
