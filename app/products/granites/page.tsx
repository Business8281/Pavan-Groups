import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Premium Granite Collection | Pavan Stones Group",
  description: "World-renowned Chimakurthy Black Galaxy Granite with golden-bronze stars and monolithic Steel Grey architectural granite.",
  keywords: "Granite, Black Galaxy granite, Steel Grey granite, Chimakurthy quarries, Indian granite exporter",
};

export default function GranitesPage() {
  return <CategoryProductsView categorySlug="granites" />;
}
