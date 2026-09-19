import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Natural Slate & Quartzite Collection | Pavan Stones Group",
  description: "Authentic Markapur Midnight Black Slate, Indian Autumn Rustic, and California Gold metamorphic hand-split clefted slates.",
  keywords: "Slate stone, Markapur black slate, Indian autumn slate, California gold, slate exporter India",
};

export default function SlatesPage() {
  return <CategoryProductsView categorySlug="slates" />;
}
