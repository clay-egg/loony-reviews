"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-base tracking-tight transition hover:opacity-90">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-pink-500 border border-pink-200 shadow-sm">
            <Heart className="h-4 w-4 fill-pink-400 text-pink-400 animate-pulse" />
          </div>
          <span className="text-neutral-800 font-extrabold tracking-tight">
            BabyLoony's <span className="text-pink-400">Reviews</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-pink-500 ${isActive(item.href) ? "text-pink-500" : "text-neutral-500"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA / Admin Link */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-pink-500 hover:bg-pink-50 text-xs font-bold gap-1.5 rounded-full border border-pink-100/50 bg-white px-4">
              <Shield className="h-3.5 w-3.5 text-pink-400" />
              Admin
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-full p-1.5 text-neutral-500 hover:bg-pink-50 hover:text-pink-500 focus:outline-none border border-transparent active:border-pink-100"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-pink-100 bg-white/95 py-3 px-4 shadow-sm animate-in fade-in slide-in-from-top-5">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold py-2 px-3 rounded-xl transition-colors ${isActive(item.href)
                    ? "bg-pink-50 text-pink-500"
                    : "text-neutral-600 hover:bg-pink-50/50 hover:text-pink-500"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-pink-100/60 my-1.5" />
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:bg-pink-50/50 hover:text-pink-500 py-2 px-3 rounded-xl"
            >
              <Shield className="h-4 w-4 text-pink-400" />
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
