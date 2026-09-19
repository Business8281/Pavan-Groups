import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Applications: Architectural Wall Cladding, Pavers & Cobbles | Pavan Stones Group",
  description: "Explore heavy-duty pavers, cobblestones, and 3D interlocking modular ledger panels.",
};

export default function ApplicationsPage() {
  return <CategoryProductsView categorySlug="applications" />;
}
