"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BuyButton } from "@/components/products/BuyButton";
import { fetchProductBySlug } from "@/lib/products-service";
import { Product } from "@/types/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  // Unwrapping params Promise using React.use()
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchProductBySlug(slug);
        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error loading product detail:", error);
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
  }, [slug]);

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
            Fetching product details... 🎀
          </p>
        </main>
        <Footer />
      </div>
    );
  }

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
          <Link href="/">
            <span className="cursor-pointer text-[10px] font-bold text-pink-500 hover:text-pink-600 bg-white border border-pink-200 rounded-full px-4 py-1.5 transition-all">
              Back to Home
            </span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const primaryImage = product.images[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-2xl w-full px-4 py-6">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-500 hover:text-pink-500 mb-4 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to home
        </Link>

        {/* Product Details Card */}
        <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm mb-6 flex flex-col gap-4">
          {/* Product Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-pink-50 bg-pink-50/10">
            <img
              src={primaryImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            
            <span className="absolute top-2 left-2 rounded-full bg-pink-50/90 backdrop-blur-md px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-pink-500 border border-pink-100/50">
              {product.category}
            </span>

            {product.isFeatured && (
              <span className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-pink-400 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                <Heart className="h-2.5 w-2.5 fill-white text-white" />
                Viral
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-base font-extrabold text-neutral-800 mb-2 leading-tight">
              {product.title}
            </h1>

            {/* Description */}
            <p className="text-[11px] text-neutral-500 leading-relaxed mb-3">
              {product.description}
            </p>

            {/* Verdict Quote */}
            {product.reviewSummary && (
              <p className="text-[11px] text-pink-500 font-medium italic leading-relaxed mb-3">
                🌸 "{product.reviewSummary}"
              </p>
            )}
          </div>

          {/* Direct Buy & Video Buttons */}
          <div className="border-t border-pink-50 pt-3">
            <BuyButton 
              shopLinks={product.shopLinks} 
              productId={product.id} 
              size="sm" 
              tiktokUrl={product.tiktokUrl} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
