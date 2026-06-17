"use client";

import React, { useEffect, useState } from "react";
import { Play, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TikTokEmbedProps {
  url: string;
  className?: string;
}

export function TikTokEmbed({ url, className = "" }: TikTokEmbedProps) {
  const [username, setUsername] = useState<string>("creator");

  useEffect(() => {
    if (!url) return;
    const regex = /@([^/]+)/;
    const match = url.match(regex);
    if (match) {
      setUsername(match[1]);
    }
  }, [url]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-pink-100 bg-white p-4 text-center shadow-sm ${className}`}>
      <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-pink-100/30 blur-xl"></div>
      <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-pink-100/30 blur-xl"></div>
      
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 border border-pink-100 text-pink-500 mb-3 animate-bounce">
          <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
        </div>

        <h3 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-1">
          TikTok Video Review
        </h3>
        
        <p className="text-[11px] text-neutral-500 max-w-[220px] mb-4 leading-relaxed">
          See the product in action! Watch the cute styling or testing video by @{username}.
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-[200px]"
        >
          <Button className="cursor-pointer w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full text-xs font-bold h-9 flex items-center justify-center gap-1.5 shadow-sm shadow-pink-500/5 transition-all duration-300">
            <Play className="h-3.5 w-3.5 fill-white text-white ml-0.5" />
            Watch TikTok Review
            <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
