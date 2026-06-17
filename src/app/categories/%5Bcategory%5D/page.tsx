"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/data/sample-products";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const categoryParam = resolvedParams.category;
  
  // Decode category parameter (e.g. Budget%20Finds -> Budget Finds)
  const decodedCategory = decodeURIComponent(categoryParam);

  // Filter products by category
  const filteredProducts = SAMPLE_PRODUCTS.filter(
    (product) => product.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  const handleSelectCategory = (category: string) => {
    if (category.toLowerCase() === "all") {
      router.push("/products");
    } else {
      router.push(`/categories/${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/products" className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-500 hover:text-pink-500 mb-4 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to all finds
        </Link>

        {/* Category Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 rounded-full bg-pink-100/80 border border-pink-200 px-3 py-0.5 text-[9px] font-bold text-pink-500 mb-2 shadow-sm">
            <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
            Category Explorer 🎀
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-neutral-800 mb-1 capitalize">
            {decodedCategory}
          </h1>
          <p className="max-w-md mx-auto text-xs text-neutral-500">
            Browse through TikTok reviewed products matching the "{decodedCategory}" vibe.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center mb-6 bg-white border border-pink-100 p-2.5 rounded-2xl shadow-sm">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={decodedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
              {decodedCategory} Finds ({filteredProducts.length})
            </h2>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
