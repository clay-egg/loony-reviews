"use client";

import React from "react";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopLinks } from "@/types/product";

interface BuyButtonProps {
  shopLinks: ShopLinks;
  productId: string;
  className?: string;
  size?: "default" | "sm" | "lg";
}

export function BuyButton({ shopLinks, productId, className = "", size = "default" }: BuyButtonProps) {
  // Define platform details with cute pastel colors
  const platforms = [
    {
      key: "tiktokShop" as const,
      label: "TikTok Shop",
      url: shopLinks.tiktokShop,
      bgClass: "bg-neutral-800 hover:bg-neutral-900 text-white border border-neutral-700/30 rounded-full shadow-sm shadow-black/5",
      accentColor: "#FE2C55",
    },
    {
      key: "shopee" as const,
      label: "Shopee",
      url: shopLinks.shopee,
      bgClass: "bg-[#fff2ef] hover:bg-[#ffe5df] text-[#ff4c24] border border-[#ffded6] rounded-full shadow-sm shadow-orange-500/5",
      accentColor: "#EE4D2D",
    },
    {
      key: "lazada" as const,
      label: "Lazada",
      url: shopLinks.lazada,
      bgClass: "bg-[#f3f6ff] hover:bg-[#e5ecff] text-[#1a56db] border border-[#dae3ff] rounded-full shadow-sm shadow-blue-500/5",
      accentColor: "#102F82",
    },
    {
      key: "amazon" as const,
      label: "Amazon",
      url: shopLinks.amazon,
      bgClass: "bg-[#fffbf0] hover:bg-[#fff5d6] text-[#a06200] border border-[#fceecc] rounded-full shadow-sm shadow-amber-500/5",
      accentColor: "#FF9900",
    },
  ];

  const activePlatforms = platforms.filter((p) => p.url);

  if (activePlatforms.length === 0) {
    return (
      <Button disabled className="w-full bg-pink-50/50 text-pink-200 border border-pink-100 rounded-full">
        Out of Stock / No Links
      </Button>
    );
  }

  const handleTrackClick = (platform: string) => {
    // Analytics tracking will be hooked up here in later phases.
    console.log(`Product Clicked: ${productId} on platform ${platform}`);
  };

  return (
    <div className={`grid gap-1.5 w-full ${activePlatforms.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${className}`}>
      {activePlatforms.map((platform) => (
        <a
          key={platform.key}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleTrackClick(platform.key)}
          className="w-full block"
        >
          <Button
            size={size}
            className={`w-full cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 text-xs py-1.5 h-8 font-bold ${platform.bgClass}`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="truncate">{platform.label}</span>
            <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
          </Button>
        </a>
      ))}
    </div>
  );
}
