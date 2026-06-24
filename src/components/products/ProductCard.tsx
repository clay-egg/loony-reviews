"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const primaryImage = product.images?.[0] || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80";

  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-pink-100 bg-white transition-all duration-300 hover:border-pink-300 hover:shadow-sm hover:shadow-pink-500/5 hover:-translate-y-0.5 ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-pink-50/10">
        <img
          src={primaryImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
          loading="lazy"
        />
        
        {/* Soft light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-50/15 via-transparent to-transparent opacity-30"></div>
        
        {/* Category Tag */}
        <span className="absolute top-2 left-2 rounded-full bg-pink-50/90 backdrop-blur-md px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-pink-500 border border-pink-100/50">
          {product.category}
        </span>

        {/* Featured/Viral Badge */}
        {product.isFeatured && (
          <span className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-pink-400 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
            <Heart className="h-2 w-2 fill-white text-white" />
            Viral
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-2.5 justify-between">
        <div>


          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xs font-bold text-neutral-800 line-clamp-1 group-hover:text-pink-500 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Review Summary (1-2 line short review only) */}
          <p className="mt-1 text-[10px] text-neutral-500 line-clamp-2 leading-relaxed">
            {product.reviewSummary}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-2.5 pt-2.5 border-t border-pink-50/60">
          <Link href={`/products/${product.slug}`} className="block w-full">
            <Button
              className="cursor-pointer w-full bg-pink-100/70 hover:bg-pink-100 text-pink-500 rounded-full text-[10px] font-bold h-7 flex items-center justify-center gap-1 shadow-sm border border-pink-200/10 transition-all duration-300"
            >
              View Details
              <ArrowRight className="h-2.5 w-2.5 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
