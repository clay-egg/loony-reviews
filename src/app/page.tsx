"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Film, ArrowRight, Heart, Gift, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/products/SearchBar";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { TikTokEmbed } from "@/components/products/TikTokEmbed";
import { Button } from "@/components/ui/button";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/data/sample-products";

export default function Home() {
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

  // Get featured products (isFeatured = true)
  const featuredProducts = SAMPLE_PRODUCTS.filter((p) => p.isFeatured);
  
  // Highlight the primary featured product
  const heroFeaturedProduct = featuredProducts[0] || SAMPLE_PRODUCTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-10">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full bg-pink-200/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 h-[150px] w-[150px] rounded-full bg-pink-100/10 blur-[60px] pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1 rounded-full bg-pink-100/80 border border-pink-200 px-3 py-0.5 text-[9px] font-bold text-pink-500 mb-3 shadow-sm">
            <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
            Cute finds, honest reviews 🎀
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-neutral-800 leading-tight">
            Kwang Picks
          </h1>
          
          <p className="max-w-md mx-auto text-[11px] sm:text-xs text-neutral-500 mb-5 leading-relaxed">
            Browse products she reviewed on TikTok and find direct shopping links in one sweet little place.
          </p>

          {/* Hero CTAs */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Link href="/products">
              <Button className="cursor-pointer bg-pink-400 hover:bg-pink-500 text-white rounded-full text-[10px] font-bold px-3.5 h-8 shadow-sm transition-all duration-300">
                Browse Finds
              </Button>
            </Link>
            <a href="#featured-review">
              <Button variant="outline" className="cursor-pointer border-pink-200 bg-white hover:bg-pink-50/50 text-neutral-600 rounded-full text-[10px] font-bold px-3.5 h-8 shadow-sm transition-all duration-300">
                View Reviews
              </Button>
            </a>
          </div>

          <div className="flex justify-center w-full">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* Why Follow Her Reviews Section */}
        <section className="mb-8 rounded-2xl border border-pink-100/60 bg-pink-50/20 p-4 md:p-5 shadow-sm">
          <h3 className="text-center text-[10px] font-extrabold uppercase tracking-widest text-pink-400/80 mb-4 flex items-center justify-center gap-1">
            <span>✨</span> Why follow her reviews? <span>✨</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-pink-100/40 shadow-sm flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 text-pink-500 mb-1.5">
                <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
              </div>
              <h4 className="text-[11px] font-bold text-neutral-800 mb-0.5">Honest Reviews</h4>
              <p className="text-[9px] text-neutral-500 leading-relaxed">
                Real pros and cons of every single viral TikTok product, no sugarcoating.
              </p>
            </div>
            
            <div className="bg-white p-3 rounded-xl border border-pink-100/40 shadow-sm flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 text-pink-500 mb-1.5">
                <Star className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
              </div>
              <h4 className="text-[11px] font-bold text-neutral-800 mb-0.5">Cute Daily Finds</h4>
              <p className="text-[9px] text-neutral-500 leading-relaxed">
                Handpicked aesthetic finds that look darling in your room and daily life.
              </p>
            </div>
            
            <div className="bg-white p-3 rounded-xl border border-pink-100/40 shadow-sm flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 text-pink-500 mb-1.5">
                <Gift className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
              </div>
              <h4 className="text-[11px] font-bold text-neutral-800 mb-0.5">Direct Shopping Links</h4>
              <p className="text-[9px] text-neutral-500 leading-relaxed">
                Direct Shopee, Lazada, TikTok Shop, and Amazon links so you don't have to search.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Video Highlight */}
        {heroFeaturedProduct && searchQuery === "" && (
          <section id="featured-review" className="mb-8 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-pink-50/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Left Column: Embed */}
              <div className="lg:col-span-4 flex justify-center">
                <TikTokEmbed url={heroFeaturedProduct.tiktokUrl} className="w-full max-w-[280px]" />
              </div>
              
              {/* Right Column: Review Details */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-pink-50 border border-pink-100 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-pink-500 mb-2">
                  <Film className="h-2.5 w-2.5 text-pink-400" />
                  Featured Review
                </span>
                
                <h2 className="text-base sm:text-lg font-bold text-neutral-800 mb-1 leading-tight">
                  {heroFeaturedProduct.title}
                </h2>
                
                <p className="text-[11px] text-neutral-500 mb-2.5 leading-relaxed">
                  {heroFeaturedProduct.description}
                </p>

                <div className="bg-pink-50/30 border border-pink-100/40 rounded-xl p-2.5 mb-3">
                  <h4 className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Verdict Summary</h4>
                  <p className="text-[11px] text-pink-500 font-bold leading-relaxed italic">
                    "{heroFeaturedProduct.reviewSummary}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div>
                    <h5 className="text-[9px] font-bold text-emerald-600 mb-0.5 uppercase tracking-wider">Pros</h5>
                    <ul className="space-y-0.5 text-[10px] text-neutral-600">
                      {heroFeaturedProduct.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[9px] font-bold text-rose-500 mb-0.5 uppercase tracking-wider">Cons</h5>
                    <ul className="space-y-0.5 text-[10px] text-neutral-600">
                      {heroFeaturedProduct.cons.slice(0, 3).map((con, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-rose-400 font-bold">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Product Explorer */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-4">
            <div>
              <h2 className="text-sm font-extrabold text-neutral-800 tracking-wide uppercase">
                Explore Reviewed Products
              </h2>
              <p className="text-[9px] text-neutral-500">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
              </p>
            </div>
            
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              className="md:max-w-xs"
            />
          </div>

          <ProductGrid products={filteredProducts} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
