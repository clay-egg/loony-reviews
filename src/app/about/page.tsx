"use client";

import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Send, Star, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! Kwang will get back to you soon 🎀");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Creator Intro Section */}
        <section className="bg-white border border-pink-100 rounded-3xl p-5 shadow-sm mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-pink-100/30 blur-2xl rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col items-center text-center">
            {/* Cute Avatar Placeholder */}
            <div className="relative mb-3">
              <div className="h-16 w-16 rounded-full bg-pink-100 border-2 border-pink-200 flex items-center justify-center text-pink-400 font-extrabold text-base shadow-sm">
                kwang
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-pink-100 text-[10px] shadow-sm">
                🎀
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 border border-pink-100 px-2.5 py-0.5 text-[9px] font-bold text-pink-500 mb-2">
              Creator Profile 
            </span>
            
            <h1 className="text-lg sm:text-xl font-extrabold text-neutral-800 mb-1.5">
              Hey, I'm Kwang! 💖
            </h1>
            
            <p className="max-w-md text-xs text-neutral-500 leading-relaxed">
              I'm a TikTok creator obsessed with finding the cutest, most aesthetic products online. I test them out and share my 100% honest reviews so you can shop with confidence.
            </p>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="grid grid-cols-1 gap-3.5 mb-6">
          <div className="bg-white border border-pink-100 p-4 rounded-2xl shadow-sm flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 border border-pink-100/50">
              <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-800 mb-0.5">Honest Reviews</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Tired of sponsored videos that praise everything? I buy products with my own money and point out the cons alongside the pros. No bias, just the truth!
              </p>
            </div>
          </div>

          <div className="bg-white border border-pink-100 p-4 rounded-2xl shadow-sm flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 border border-pink-100/50">
              <Star className="h-4 w-4 fill-pink-400 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-800 mb-0.5">Cute Daily Finds</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                If it's pastel, cozy, cat-themed, or has a bow, it's probably here. I scour online shops to locate items that bring a spark of joy to your room setup.
              </p>
            </div>
          </div>

          <div className="bg-white border border-pink-100 p-4 rounded-2xl shadow-sm flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-500 border border-pink-100/50">
              <Sparkles className="h-4 w-4 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-800 mb-0.5">Direct Shopping Links</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                No more begging for 'Link in bio!' or typing custom coupon codes. I compile all active store options (Shopee, Lazada, TikTok Shop, Amazon) right here in this sweet little hub.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Collaborations Form */}
        <section className="bg-white border border-pink-100 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-1.5 mb-3 border-b border-pink-50 pb-2.5">
            <Send className="h-3.5 w-3.5 text-pink-400" />
            <h2 className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
              Brand Collaborations
            </h2>
          </div>
          
          <p className="text-[11px] text-neutral-500 mb-4 leading-relaxed">
            Are you a cute brand looking for honest content creation or product showcases? Send me a message using this contact card!
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="h-8 w-full rounded-xl border border-pink-100 bg-[#fff7f8]/30 px-3 text-[11px] text-neutral-800 placeholder-neutral-400 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-100/30"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@brand.com"
                  className="h-8 w-full rounded-xl border border-pink-100 bg-[#fff7f8]/30 px-3 text-[11px] text-neutral-800 placeholder-neutral-400 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-100/30"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Message Proposal
              </label>
              <textarea
                required
                rows={3}
                placeholder="Let's make something sweet..."
                className="w-full rounded-xl border border-pink-100 bg-[#fff7f8]/30 p-2.5 text-[11px] text-neutral-800 placeholder-neutral-400 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-100/30 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full text-xs font-bold h-8.5 shadow-sm shadow-pink-500/5 transition-all duration-300 active:scale-98"
            >
              Send Message 🎀
            </Button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
