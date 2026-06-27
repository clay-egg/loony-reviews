"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { fetchStorefrontSettings } from "@/lib/products-service";

export default function AboutPage() {
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutBio1, setAboutBio1] = useState("");
  const [aboutBio2, setAboutBio2] = useState("");
  const [aboutAvatarUrl, setAboutAvatarUrl] = useState("/Profile.JPG");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadSettings() {
      try {
        const settings = await fetchStorefrontSettings();
        if (isMounted) {
          setAboutTitle(settings.aboutTitle || "");
          setAboutBio1(settings.aboutBio1 || "");
          setAboutBio2(settings.aboutBio2 || "");
          setAboutAvatarUrl(settings.aboutAvatarUrl || "/Profile.JPG");
        }
      } catch (error) {
        console.error("Error loading about settings:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="relative flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-400"></div>
            <Heart className="absolute h-4 w-4 fill-pink-400 text-pink-400 animate-pulse" />
          </div>
          <p className="mt-4 text-[10px] font-bold text-pink-400 tracking-wider animate-pulse uppercase">
            Loading BabyLoony's page... 🎀
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32]">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center">

        {/* Creator Profile Section - Balanced Horizontal Split on Desktop */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-20">

          {/* Avatar Container - Made Even Larger */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full blur opacity-20 group-hover:opacity-45 transition duration-300"></div>
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-4 border-white shadow-xl bg-pink-50">
              <img
                src={aboutAvatarUrl}
                alt="BabyLoony Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-pink-100 text-2xl shadow-md select-none">
              🎀
            </div>
          </div>

          {/* Profile Details & Bio */}
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
            {/* Header info */}
            <div className="flex flex-col items-center md:items-start gap-2 mb-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-50/80 border border-pink-100 px-4 py-1 text-[10px] font-bold text-pink-500 tracking-wider uppercase">
                Creator & Reviewer
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-neutral-800 tracking-tight flex items-center gap-2">
                BabyLoony
              </h1>
              <p className="text-sm md:text-base text-neutral-400 font-bold">
                @babeloony_
              </p>
            </div>

            {/* Biography paragraphs - Made Larger */}
            <div className="space-y-5 max-w-2xl">
              {aboutTitle && (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight">
                  {aboutTitle}
                </h2>
              )}
              {aboutBio1 && (
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
                  {aboutBio1}
                </p>
              )}
              {aboutBio2 && (
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
                  {aboutBio2}
                </p>
              )}
            </div>

            {/* Social Channels / Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full sm:w-auto">
              <a
                href="https://www.tiktok.com/@babeloony_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white border border-pink-100 hover:bg-pink-50/40 hover:border-pink-200 text-sm font-bold text-neutral-700 hover:text-pink-500 transition-all duration-300 shadow-sm min-w-[200px]"
              >
                <img src="/tiktok.svg" alt="TikTok Logo" className="h-4 w-4 select-none pointer-events-none" />
                Follow on TikTok
              </a>
              <a
                href="https://th.shp.ee/w3szglti?smtt=0.0.9"
                target="_blank"
                rel="noopener noreferrer"
                className="block min-w-[200px]"
              >
                <Button className="cursor-pointer w-full bg-pink-400 hover:bg-pink-500 text-white rounded-2xl text-sm font-bold h-12.5 flex items-center justify-center gap-2.5 shadow-md shadow-pink-500/10 transition-all duration-300 active:scale-95">
                  <img src="/shopee.svg" alt="Shopee Logo" className="h-4.5 w-4.5 select-none pointer-events-none" />
                  Follow on Shopee
                </Button>
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
