import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-pink-100 bg-pink-50/40 py-10 text-neutral-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight text-neutral-800 mb-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-pink-500 border border-pink-200 shadow-sm">
                <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
              </div>
              <span className="font-extrabold text-neutral-800">
                BabyLoony's <span className="text-pink-400">Reviews 🌸</span>
              </span>
            </Link>
            <p className="max-w-xs text-[11px] leading-relaxed text-neutral-500 mb-1">
              Your daily dose of aesthetic finds 🎀
            </p>
            <p className="max-w-xs text-[10px] leading-relaxed text-neutral-400">
              Browse honest product reviews from TikTok and find direct shopping links in one sweet place.
            </p>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">Socials</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">TikTok: @babyloony.reviews</a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">Instagram: @babyloony.reviews</a>
              </li>
              <li>
                <span className="text-neutral-400">Contact: hello@babyloony.com</span>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">Links</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/" className="hover:text-pink-500 transition">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-pink-500 transition">All Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pink-500 transition">About Me</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-pink-500 transition flex items-center gap-0.5">Admin Console 🔑</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-pink-100/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px]">
          <p>© {new Date().getFullYear()} BabyLoony's Reviews. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-pink-400 fill-pink-400 animate-pulse" /> for TikTok fans.
          </p>
        </div>
      </div>
    </footer>
  );
}
