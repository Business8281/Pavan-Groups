import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "CNC Designs & 3D Stone Murals | Pavan Stones Group",
  description: "Precision 5-axis milled 3D architectural stone relief panels, spiritual temple murals, and bespoke natural stone carvings.",
  keywords: "CNC stone designs, 3D stone murals, sandstone relief, Pavan Impex, Pavan Stones Group",
};

export default function CNCDesignsPage() {
  return <CategoryProductsView categorySlug="cnc" />;
}
