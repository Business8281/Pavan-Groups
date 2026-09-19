import type { Metadata } from "next";
import CategoryProductsView from "@/components/CategoryProductsView";

export const metadata: Metadata = {
  title: "South Indian Granite Collection | Pavan Stones Group",
  description: "World-renowned Chimakurthy Black Galaxy with golden bronzite stars and monolithic Steel Grey granites.",
};

export default function SouthIndianGranitePage() {
  return <CategoryProductsView categorySlug="south-indian-granite" />;
}
