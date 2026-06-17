"use client";

import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/products/SearchBar";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/data/sample-products";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search query and selected category
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.reviewSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Title area */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 rounded-full bg-pink-100/80 border border-pink-200 px-3 py-0.5 text-[9px] font-bold text-pink-500 mb-2 shadow-sm">
            <Sparkles className="h-3 w-3 text-pink-400" />
            All reviewed finds 🎀
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-neutral-800 mb-1">
            Kwang Picks
          </h1>
          <p className="max-w-md mx-auto text-xs text-neutral-500">
            Browse through everything she's reviewed on TikTok. Use the search or category filters to find exactly what you need.
          </p>
        </div>

        {/* Search & Filter section */}
        <div className="flex flex-col items-center justify-between gap-3 mb-6 bg-white border border-pink-100 p-3 rounded-2xl shadow-sm">
          <SearchBar value={searchQuery} onChange={setSearchQuery} className="w-full" />
          
          <div className="w-full border-t border-pink-50/60 pt-2 flex items-center justify-center">
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              className="max-w-full"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-2">
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
              Results ({filteredProducts.length})
            </h2>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
