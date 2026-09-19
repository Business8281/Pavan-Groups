import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Slate Stone & CNC Architectural Carvings | Pavan Stones Group",
  description: "Metamorphic slates, 3D relief ledger panels, and 5-axis precision milled architectural stone.",
};

export default function SlateStonePage() {
  return <CategoryProductsView categorySlug="slate-stone" />;
}
