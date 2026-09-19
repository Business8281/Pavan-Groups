import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "North Indian Granite Collection | Pavan Stones Group",
  description: "Quarry-direct Rajasthan Royal Black and Alaska White crystalline granites.",
};

export default function NorthIndianGranitePage() {
  return <CategoryProductsView categorySlug="north-indian-granite" />;
}
