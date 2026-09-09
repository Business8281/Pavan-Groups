import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, getAllProducts } from "@/lib/productsData";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Stone Specimen Not Found | Pavan Stones Group",
    };
  }

  return {
    title: `${product.name} | Pavan Stones Group`,
    description: `${product.tagline} Direct quarry extraction from ${product.origin}. Available in custom sizes and export containers.`,
    keywords: `${product.name}, ${product.company}, ${product.category}, ${product.origin}, natural stone exporter, Indian stone`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(id, 3);

  return <ProductDetailView product={product} relatedProducts={related} />;
}
