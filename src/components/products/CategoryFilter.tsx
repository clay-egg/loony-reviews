"use client";

import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  className = "",
}: CategoryFilterProps) {
  return (
    <div className={`w-full overflow-x-auto scrollbar-none py-2 ${className}`}>
      <div className="flex gap-2 px-1">
        {categories.filter(Boolean).map((category) => {
          const isSelected = (selectedCategory || "").toLowerCase() === (category || "").toLowerCase();
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold tracking-wide transition-all duration-300 ${
                isSelected
                  ? "bg-pink-400 text-white shadow-sm border border-pink-400"
                  : "bg-white border border-pink-100 text-neutral-600 hover:text-pink-400 hover:bg-pink-50/20"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
