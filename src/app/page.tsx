"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/products/SearchBar";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { fetchProducts, getCategories } from "@/lib/products-service";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const title = product.title || "";
    const description = product.description || "";
    const reviewSummary = product.reviewSummary || "";
    const category = product.category || "";

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="relative flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-400"></div>
            <Heart className="absolute h-4 w-4 fill-pink-400 text-pink-400 animate-pulse" />
          </div>
          <p className="mt-4 text-[10px] font-bold text-pink-400 tracking-wider animate-pulse uppercase">
            Loading kwang's cute picks... 🎀
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-5">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-pink-200/20 blur-[60px] pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-1 rounded-full bg-pink-100/80 border border-pink-200 px-2.5 py-0.5 text-[9px] font-bold text-pink-500 mb-2.5 shadow-sm">
            <Heart className="h-2.5 w-2.5 fill-pink-400 text-pink-400" />
            Cute finds, honest reviews 🎀
          </div>
          
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1 text-neutral-800">
            Kwang Picks
          </h1>
          
          <p className="max-w-md mx-auto text-[10px] sm:text-xs text-neutral-500 mb-4 leading-relaxed">
            Browse products she reviewed on TikTok and find direct shopping links in one sweet little place.
          </p>

          <div className="flex justify-center w-full mb-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex items-center justify-center max-w-md mx-auto mt-2">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 pb-12">
        <section>
          <div className="flex justify-between items-center mb-3.5 px-1">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
              Reviewed Items ({filteredProducts.length})
            </h2>
          </div>
          <ProductGrid products={filteredProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

