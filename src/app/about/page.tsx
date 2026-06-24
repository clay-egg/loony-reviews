"use client";

import React from "react";
import Link from "next/link";
import { Heart, Mail, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-md w-full px-4 py-12 flex flex-col justify-center">
        
        {/* Creator Profile Card */}
        <section className="bg-white border border-pink-100 rounded-3xl p-6 shadow-sm relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 h-24 w-24 bg-pink-100/25 blur-xl rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-3.5">
              <div className="h-14 w-14 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-500 font-extrabold text-sm shadow-sm">
                loony
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white border border-pink-100 text-[8px] shadow-sm">
                🎀
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 border border-pink-100 px-2 py-0.5 text-[8px] font-bold text-pink-500 mb-2.5">
              About Me 
            </span>
            
            <h1 className="text-base font-extrabold text-neutral-800 mb-2">
              Hey, I'm BabyLoony! 💖
            </h1>
            
            <p className="text-[11px] text-neutral-500 leading-relaxed mb-6">
              I'm a TikTok creator obsessed with finding the cutest, most aesthetic products online. I test them out and share my 100% honest reviews so you can shop with confidence.
            </p>

            <a
              href="mailto:hello@babyloony.com"
              className="w-full"
            >
              <Button
                className="cursor-pointer w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full text-[10px] font-bold h-8.5 flex items-center justify-center gap-1.5 shadow-sm shadow-pink-500/5 transition-all duration-300 active:scale-95"
              >
                <Mail className="h-3.5 w-3.5" />
                Email for Collaborations 💌
              </Button>
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
