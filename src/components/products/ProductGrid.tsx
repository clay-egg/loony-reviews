import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-pink-100 rounded-2xl bg-white shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-400 mb-3 border border-pink-100/50 animate-pulse">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-bold text-neutral-800 mb-1">No products found</h3>
        <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
          We couldn't find any products matching your selection. Try adjusting your search query or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
