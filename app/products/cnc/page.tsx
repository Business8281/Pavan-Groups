import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "CNC & Architectural Carvings Collection | Pavan Stones Group",
  description: "Precision 5-axis milled 3D architectural stone relief panels, high-pressure waterjet perforated stone jalis, and bespoke stone murals.",
  keywords: "CNC stone carving, 3D stone relief, stone jali, architectural stone panels, Pavan Stones Group",
};

export default function CNCPage() {
  return <CategoryProductsView categorySlug="cnc" />;
}
