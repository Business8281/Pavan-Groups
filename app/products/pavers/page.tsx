import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "Architectural Pavers & Cobblestones | Pavan Stones Group",
  description: "Tumbled antique limestone cobblestones, calibrated vehicular driveways, and heavy-duty outdoor pavers built for lifetime durability.",
  keywords: "Stone pavers, limestone cobbles, tumbled pavers, driveway stones, outdoor paving India",
};

export default function PaversPage() {
  return <CategoryProductsView categorySlug="pavers" />;
}
