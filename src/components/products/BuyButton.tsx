"use client";

import React from "react";
import { ExternalLink, ShoppingBag, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopLinks } from "@/types/product";
import { trackProductClick } from "@/lib/products-service";

interface BuyButtonProps {
  shopLinks: ShopLinks;
  productId: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  tiktokUrl?: string;
}

export function BuyButton({ shopLinks, productId, className = "", size = "default", tiktokUrl }: BuyButtonProps) {
  // Define platform details with cute pastel colors
  const platforms = [
    ...(tiktokUrl ? [{
      key: "tiktokVideo" as const,
      label: "Video Review",
      url: tiktokUrl,
      bgClass: "bg-[#fff0f3] hover:bg-[#ffe0e6] text-[#ff3366] border border-[#ffd4dd] rounded-full shadow-sm shadow-pink-500/5",
      icon: Play,
    }] : []),
    {
      key: "tiktokShop" as const,
      label: "TikTok Shop",
      url: shopLinks.tiktokShop,
      bgClass: "bg-neutral-800 hover:bg-neutral-900 text-white border border-neutral-700/30 rounded-full shadow-sm shadow-black/5",
      icon: ShoppingBag,
    },
    {
      key: "shopee" as const,
      label: "Shopee",
      url: shopLinks.shopee,
      bgClass: "bg-[#fff2ef] hover:bg-[#ffe5df] text-[#ff4c24] border border-[#ffded6] rounded-full shadow-sm shadow-orange-500/5",
      icon: ShoppingBag,
    },
    {
      key: "lazada" as const,
      label: "Lazada",
      url: shopLinks.lazada,
      bgClass: "bg-[#f3f6ff] hover:bg-[#e5ecff] text-[#1a56db] border border-[#dae3ff] rounded-full shadow-sm shadow-blue-500/5",
      icon: ShoppingBag,
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
    trackProductClick(productId, platform);
  };

  return (
    <div className={`grid gap-1.5 w-full ${activePlatforms.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${className}`}>
      {activePlatforms.map((platform) => {
        const IconComponent = platform.icon;
        return (
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
              <IconComponent className="h-3.5 w-3.5" />
              <span className="truncate">{platform.label}</span>
              <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
            </Button>
          </a>
        );
      })}
    </div>
  );
}
