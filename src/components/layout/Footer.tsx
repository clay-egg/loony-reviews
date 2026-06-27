"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-pink-100 bg-white/40 py-6 text-neutral-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-[11px]">
          {/* Copyright */}
          <p className="text-neutral-400 tracking-wide">
            © {new Date().getFullYear()} BabyLoony's Reviews. All rights reserved.
          </p>

          {/* Socials */}
          <div>
            <a
              href="https://www.tiktok.com/@babeloony_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-500 hover:underline font-semibold transition"
            >
              Follow on TikTok 🎀
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}



