import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Natural Stone Chipouts & Architectural Wall Cladding | Pavan Stones Group",
  description: "Artisan-carved linear chiseled chipouts, textured granite and marble planks, and architectural stone wall cladding.",
};

export default function ChipoutCategoryPage() {
  return <CategoryProductsView categorySlug="chipouts" />;
}
