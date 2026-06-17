"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search reviewed products...", className = "" }: SearchBarProps) {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      {/* Background soft pink glow when active */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-300/25 to-rose-300/25 opacity-0 blur-sm transition-opacity duration-300 focus-within:opacity-100"></div>
      
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3.5 text-pink-400/70">
          <Search className="h-3.5 w-3.5" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9.5 w-full rounded-full border border-pink-100 bg-white pl-10 pr-9 text-xs text-neutral-800 placeholder-neutral-400/80 transition-all duration-300 focus:border-pink-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100/50 shadow-sm shadow-pink-500/5"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3.5 text-neutral-400 hover:text-pink-400 transition-colors"
            type="button"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
