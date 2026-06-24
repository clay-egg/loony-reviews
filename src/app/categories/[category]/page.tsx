"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { fetchProducts, getCategories } from "@/lib/products-service";
import { Product } from "@/types/product";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const categoryParam = resolvedParams.category;
  
  // Decode category parameter
  const decodedCategory = decodeURIComponent(categoryParam);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
          setCategories(getCategories(data));
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => (product.category || "").toLowerCase() === decodedCategory.toLowerCase()
  );

  const handleSelectCategory = (category: string) => {
    if (category.toLowerCase() === "all") {
      router.push("/");
    } else {
      router.push(`/categories/${encodeURIComponent(category)}`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="relative flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-400"></div>
            <Heart className="absolute h-4 w-4 fill-pink-400 text-pink-400 animate-pulse" />
          </div>
          <p className="mt-4 text-[10px] font-bold text-pink-400 tracking-wider animate-pulse uppercase">
            Exploring category... 🎀
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-500 hover:text-pink-500 mb-4 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to home
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
            categories={categories}
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
