"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Sparkles, AlertCircle, Play } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RatingStars } from "@/components/products/RatingStars";
import { BuyButton } from "@/components/products/BuyButton";
import { TikTokEmbed } from "@/components/products/TikTokEmbed";
import { ProductCard } from "@/components/products/ProductCard";
import { SAMPLE_PRODUCTS } from "@/data/sample-products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  // Unwrapping params Promise using React.use()
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-400 mb-3 border border-pink-100">
            <AlertCircle className="h-5 w-5" />
          </div>
          <h1 className="text-sm font-bold text-neutral-800 mb-1">Pick Not Found</h1>
          <p className="text-[10px] text-neutral-500 max-w-xs mb-4">
            We couldn't find the cute item you were looking for. It might have been renamed or removed.
          </p>
          <Link href="/products">
            <span className="cursor-pointer text-[10px] font-bold text-pink-500 hover:text-pink-600 bg-white border border-pink-200 rounded-full px-4 py-1.5 transition-all">
              Back to All Finds
            </span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related products (same category, excluding current product, max 4)
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  // Fallback: If no related products in the same category, grab other featured ones
  const fallbackRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : SAMPLE_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  const primaryImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Link */}
        <Link href="/products" className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-500 hover:text-pink-500 mb-4 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to all finds
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-white border border-pink-100 rounded-2xl p-4 shadow-sm mb-8">
          
          {/* Left Column: Image Gallery & TikTok Embed */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {/* Primary Image Display */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-pink-50 bg-pink-50/10">
              <img
                src={primaryImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              
              {/* Category Badge */}
              <span className="absolute top-2 left-2 rounded-full bg-pink-50/90 backdrop-blur-md px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-pink-500 border border-pink-100/50">
                {product.category}
              </span>

              {/* Viral Badge */}
              {product.isFeatured && (
                <span className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-pink-400 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                  <Heart className="h-2 w-2 fill-white text-white" />
                  Viral
                </span>
              )}
            </div>

            {/* Gallery Thumbnails (only render if > 1 images) */}
            {product.images.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-[4/3] w-12 overflow-hidden rounded-md border cursor-pointer transition-all ${
                      activeImageIndex === index
                        ? "border-pink-400 ring-2 ring-pink-100"
                        : "border-pink-100 hover:border-pink-300"
                    }`}
                  >
                    <img src={img} alt={`thumbnail-${index}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* TikTok Video embed container */}
            <div className="mt-1">
              <TikTokEmbed url={product.tiktokUrl} className="w-full" />
            </div>
          </div>

          {/* Right Column: Information & CTAs */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Rating & Price */}
              <div className="flex items-center justify-between border-b border-pink-50 pb-2 mb-3">
                <RatingStars rating={product.rating} showNumber className="scale-100" />
                <span className="text-[10px] font-bold text-pink-500 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full">
                  {product.priceRange}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-base sm:text-lg font-extrabold text-neutral-800 mb-2 leading-tight">
                {product.title}
              </h1>

              {/* Review Description */}
              <p className="text-[11px] text-neutral-500 leading-relaxed mb-3">
                {product.description}
              </p>

              {/* Verdict Summary Block */}
              <div className="bg-pink-50/30 border border-pink-100/40 rounded-xl p-3 mb-3">
                <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 mb-0.5">
                  Verdict Summary 🎀
                </h3>
                <p className="text-[11px] text-pink-500 font-bold leading-relaxed italic">
                  "{product.reviewSummary}"
                </p>
              </div>

              {/* Pros & Cons Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-pink-50 pt-3 mb-4">
                <div>
                  <h4 className="text-[9px] font-extrabold text-emerald-600 mb-1 uppercase tracking-wider">
                    Pros
                  </h4>
                  <ul className="space-y-0.5 text-xs text-neutral-500">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[9px] font-extrabold text-rose-500 mb-1 uppercase tracking-wider">
                    Cons
                  </h4>
                  <ul className="space-y-0.5 text-xs text-neutral-500">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-rose-400 font-bold">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Shopping Links */}
            <div className="border-t border-pink-50 pt-3">
              <h4 className="text-[8px] font-extrabold text-neutral-400 mb-1.5 uppercase tracking-widest">
                Shop Direct Links
              </h4>
              <BuyButton shopLinks={product.shopLinks} productId={product.id} size="sm" />
            </div>
          </div>

        </div>

        {/* Related Products Section */}
        <section className="border-t border-pink-100/50 pt-6">
          <div className="flex items-center gap-1 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            <h2 className="text-xs font-extrabold text-neutral-800 tracking-wide uppercase">
              You Might Also Like
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fallbackRelated.map((relatedProd) => (
              <ProductCard key={relatedProd.id} product={relatedProd} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
