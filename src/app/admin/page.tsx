"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  ShoppingBag,
  X,
  AlertTriangle,
  ExternalLink,
  Save,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductVisibility,
  uploadProductImage,
  fetchStorefrontSettings,
  updateStorefrontSettings,
  compressAndEncodeImage
} from "@/lib/products-service";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Product } from "@/types/product";

interface Notification {
  message: string;
  type: "success" | "error" | "warning";
}

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  description: "",
  reviewSummary: "",
  images: "",
  tiktokUrl: "",
  shopLinks: {
    tiktokShop: "",
    shopee: "",
    lazada: "",
  },
  isFeatured: false,
  isHidden: false,
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState(emptyForm);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Storefront Settings State
  const [heroDescInput, setHeroDescInput] = useState("");
  const [aboutTitleInput, setAboutTitleInput] = useState("");
  const [aboutBio1Input, setAboutBio1Input] = useState("");
  const [aboutBio2Input, setAboutBio2Input] = useState("");
  const [aboutAvatarInput, setAboutAvatarInput] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const title = product.title || "";
    const description = product.description || "";
    const category = product.category || "";
    const query = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    );
  });

  // Auth States
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Load products and settings
  async function loadData() {
    setLoading(true);
    try {
      const [productsData, settingsData] = await Promise.all([
        fetchProducts(true),
        fetchStorefrontSettings()
      ]);
      setProducts(productsData);
      setHeroDescInput(settingsData.heroDescription);
      setAboutTitleInput(settingsData.aboutTitle || "");
      setAboutBio1Input(settingsData.aboutBio1 || "");
      setAboutBio2Input(settingsData.aboutBio2 || "");
      setAboutAvatarInput(settingsData.aboutAvatarUrl || "/Profile.JPG");
      setProfilePreviewUrl(settingsData.aboutAvatarUrl || "/Profile.JPG");
    } catch (error) {
      console.error("Error loading admin data:", error);
      showNotification("Error loading data from database", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setUser({ email: "static-admin@example.com" } as User);
      setAuthLoading(false);
      loadData();
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (firebaseUser) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "myatminhan03@gmail.com";
        if (firebaseUser.email?.toLowerCase() === adminEmail.toLowerCase()) {
          loadData();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please fill in all fields.");
      return;
    }

    if (!auth) {
      setLoginError("Firebase authentication is not configured.");
      return;
    }

    setLoginSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      showNotification("Signed in successfully! 🌸", "success");
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "Invalid email or password.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      showNotification("Signed out successfully.", "success");
    } catch (error) {
      console.error("Logout error:", error);
      showNotification("Error signing out.", "error");
    }
  };

  // Save storefront settings
  const handleSaveSettings = async () => {
    if (!heroDescInput.trim()) {
      showNotification("Hero description cannot be empty!", "error");
      return;
    }

    setSavingSettings(true);
    try {
      let uploadedUrl = aboutAvatarInput;
      if (profileFile) {
        // Compress and convert to Base64 string (bypassing Firebase Storage)
        uploadedUrl = await compressAndEncodeImage(profileFile);
        setAboutAvatarInput(uploadedUrl);
        setProfileFile(null); // Reset file selection
      }

      const updatedSettings = {
        heroDescription: heroDescInput,
        aboutTitle: aboutTitleInput,
        aboutBio1: aboutBio1Input,
        aboutBio2: aboutBio2Input,
        aboutAvatarUrl: uploadedUrl,
      };

      if (isFirebaseConfigured) {
        await updateStorefrontSettings(updatedSettings);
        showNotification("Storefront settings updated successfully! 🎀", "success");
      } else {
        // Static mode fallback
        console.log("Static Mode: Simulating storefront settings update:", updatedSettings);
        showNotification("Static Mode: Settings update simulated! 🎀", "success");
      }
    } catch (error) {
      console.error("Error saving storefront settings:", error);
      showNotification("Failed to update storefront settings.", "error");
    } finally {
      setSavingSettings(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error" | "warning") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper to pre-populate form for editing
  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setSelectedFile(null);
    setPreviewUrl(product.images?.[0] || "");
    setFormData({
      title: product.title || "",
      slug: product.slug || "",
      category: product.category || "",
      description: product.description || "",
      reviewSummary: product.reviewSummary || "",
      images: (product.images || []).join(", "),
      tiktokUrl: product.tiktokUrl || "",
      shopLinks: {
        tiktokShop: product.shopLinks?.tiktokShop || "",
        shopee: product.shopLinks?.shopee || "",
        lazada: product.shopLinks?.lazada || "",
      },
      isFeatured: !!product.isFeatured,
      isHidden: !!product.isHidden,
    });
    setShowModal(true);
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData(emptyForm);
    setShowModal(true);
  };

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => {
      const generatedSlug = prev.slug ? prev.slug : title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { ...prev, title, slug: generatedSlug };
    });
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      showNotification("Title and Category are required fields!", "error");
      return;
    }

    setUploadingImage(true);
    let uploadedImageUrl = "";

    try {
      if (selectedFile) {
        // Compress and convert to Base64 string (bypassing Firebase Storage)
        uploadedImageUrl = await compressAndEncodeImage(selectedFile);
      }
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      showNotification("Failed to upload image. Please try again.", "error");
      setUploadingImage(false);
      return;
    } finally {
      setUploadingImage(false);
    }

    // Determine final list of image URLs
    let finalImages: string[] = [];
    if (uploadedImageUrl) {
      finalImages = [uploadedImageUrl];
    } else {
      const rawImages = formData.images.trim();
      if (rawImages.startsWith("data:")) {
        finalImages = [rawImages];
      } else {
        finalImages = rawImages.split(",").map(img => img.trim()).filter(Boolean);
      }
    }

    const cleanedPayload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category: formData.category,
      description: formData.description,
      reviewSummary: formData.reviewSummary,
      rating: 0, // Hardcoded fallback
      priceRange: "", // Hardcoded fallback
      images: finalImages,
      tiktokUrl: formData.tiktokUrl,
      shopLinks: {
        tiktokShop: formData.shopLinks.tiktokShop || "",
        shopee: formData.shopLinks.shopee || "",
        lazada: formData.shopLinks.lazada || "",
      },
      pros: [], // Hardcoded fallback
      cons: [], // Hardcoded fallback
      isFeatured: formData.isFeatured,
      isHidden: formData.isHidden,
    };

    try {
      if (isFirebaseConfigured) {
        if (editingId) {
          await updateProduct(editingId, cleanedPayload);
          showNotification("Product updated successfully! 🎀", "success");
        } else {
          await createProduct(cleanedPayload);
          showNotification("New product created successfully! 🌸", "success");
        }
      } else {
        // Static mode simulation
        if (editingId) {
          console.log("Static Mode: Simulating product update:", editingId, cleanedPayload);
          showNotification("Static Mode: Simulating product update! 🎀", "success");
        } else {
          console.log("Static Mode: Simulating product creation:", cleanedPayload);
          showNotification("Static Mode: Simulating product creation! 🌸", "success");
        }
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification("Failed to save product in database.", "error");
    }
  };

  // Toggle Visibility directly
  const handleToggleVisibility = async (product: Product) => {
    const newHiddenState = !product.isHidden;
    try {
      if (isFirebaseConfigured) {
        await toggleProductVisibility(product.id, newHiddenState);
      } else {
        console.log(`Static Mode: Simulating visibility toggle for ${product.id} to ${newHiddenState}`);
      }
      showNotification(
        newHiddenState
          ? `"${product.title}" is now hidden 🔒`
          : `"${product.title}" is now visible 👁️`,
        "success"
      );
      loadData();
    } catch (error) {
      showNotification("Failed to toggle visibility.", "error");
    }
  };

  // Delete product
  const handleDeleteClick = async (productId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? 🎀\nThis cannot be undone!`)) {
      try {
        if (isFirebaseConfigured) {
          await deleteProduct(productId);
        } else {
          console.log("Static Mode: Simulating deletion for product:", productId);
        }
        showNotification("Product deleted successfully.", "success");
        loadData();
      } catch (error) {
        showNotification("Failed to delete product.", "error");
      }
    }
  };

  // Stats summary variables
  const totalPicks = products.length;
  const hiddenPicks = products.filter(p => p.isHidden).length;

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24">
          <div className="relative flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-400"></div>
            <Heart className="absolute h-4 w-4 fill-pink-400 text-pink-400 animate-pulse" />
          </div>
          <p className="mt-4 text-[10px] font-bold text-pink-400 tracking-wider animate-pulse uppercase">
            Verifying Admin Session... 🎀
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-sm bg-white border border-pink-100 rounded-3xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1 rounded-full bg-pink-100/80 border border-pink-200 px-3 py-0.5 text-[9px] font-bold text-pink-500 mb-1.5 shadow-sm">
                <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
                Authorized Access Only 🎀
              </div>
              <h1 className="text-xl font-extrabold text-neutral-800">Admin Login</h1>
              <p className="text-[10px] text-neutral-400 mt-1">Please sign in to manage storefront picks.</p>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-3 mb-4 text-[10px] font-semibold leading-relaxed flex gap-2 items-center">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs border border-pink-100 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs border border-pink-100 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                />
              </div>

              <Button
                type="submit"
                disabled={loginSubmitting}
                className="cursor-pointer w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full text-xs font-bold h-9 shadow-sm border border-pink-400 transition-all flex items-center justify-center gap-1.5"
              >
                {loginSubmitting ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "myatminhan03@gmail.com";
  const isAuthorized = user.email?.toLowerCase() === adminEmail.toLowerCase();

  if (!isAuthorized) {
    return (
      <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="w-full max-w-sm bg-white border border-pink-100 rounded-3xl p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-400 mb-3 border border-red-100 mx-auto">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h1 className="text-sm font-bold text-neutral-800 mb-1">Access Denied 🔒</h1>
            <p className="text-[10px] text-neutral-500 max-w-xs mb-4 leading-relaxed mx-auto">
              The account <strong>{user.email}</strong> is not authorized to access the Admin Console.
            </p>
            <div className="flex gap-2">
              <Link href="/" className="flex-1">
                <Button className="cursor-pointer w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full text-[10px] font-bold h-8">
                  Back to Store
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="cursor-pointer flex-1 bg-red-400 hover:bg-red-500 text-white rounded-full text-[10px] font-bold h-8 border border-red-400"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff7f8] text-[#3f2d32] selection:bg-pink-100 selection:text-pink-600">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-5">
          <Link href="/" className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-500 hover:text-pink-500 transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Back to store
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-neutral-400 bg-pink-100/30 border border-pink-100 px-2 py-0.5 rounded-full">
              {user.email}
            </span>
            <Button
              onClick={handleLogout}
              size="sm"
              className="cursor-pointer bg-white hover:bg-red-50 text-red-400 border border-red-100 rounded-full text-[9px] font-bold h-6 px-2.5 shadow-sm transition-all"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Warning Banner if Static Fallback */}
        {!isFirebaseConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 mb-6 flex gap-3 items-start shadow-sm">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold mb-0.5">Static Fallback Mode Enabled</h3>
              <p className="text-[10px] text-amber-700 leading-relaxed">
                Your database credentials in `.env.local` are unconfigured or placeholder strings. The dashboard is displaying local mock data. Creating, editing, hiding, or deleting operations will log to the console but will not save to Firestore. Local photo uploads will convert to **Base64 strings** in the storefront.
              </p>
            </div>
          </div>
        )}

        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 rounded-full bg-pink-100/80 border border-pink-200 px-3 py-0.5 text-[9px] font-bold text-pink-500 mb-1.5 shadow-sm">
            <Sparkles className="h-3 w-3 fill-pink-400 text-pink-400" />
            Manage storefront picks 🎀
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-neutral-800">
            BabyLoony's Reviews Admin
          </h1>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-lg border transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${notification.type === "success"
            ? "bg-pink-50 border-pink-200 text-pink-500"
            : notification.type === "warning"
              ? "bg-amber-50 border-amber-200 text-amber-700"
              : "bg-red-50 border-red-200 text-red-500"
            }`}>
            {notification.type === "success" && <CheckCircle2 className="h-4 w-4 text-pink-400 fill-pink-50" />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Stats Grid - 2 columns now */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-pink-100 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-[8px] uppercase tracking-widest text-neutral-400 font-extrabold">Total Picks</p>
            <p className="text-lg font-black text-pink-500 mt-0.5">{totalPicks}</p>
          </div>
          <div className="bg-white border border-pink-100 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-[8px] uppercase tracking-widest text-neutral-400 font-extrabold">Hidden Picks</p>
            <p className="text-lg font-black text-neutral-400 mt-0.5">{hiddenPicks}</p>
          </div>
        </div>

        {/* Edit Profile & Settings Trigger */}
        <div className="mb-6 flex justify-end">
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
            className="cursor-pointer border-pink-200 text-pink-500 hover:bg-pink-50/50 rounded-xl text-[10px] font-bold h-7.5 px-3.5 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Edit2 className="h-3 w-3" />
            {showSettings ? "Hide Profile Settings" : "Edit Profile & Settings"}
          </Button>
        </div>

        {/* Storefront Settings Card */}
        {showSettings && (
          <div className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm mb-6 animate-in fade-in duration-200">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 mb-3">
              Storefront Settings
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">Hero Description</label>
                <textarea
                  value={heroDescInput}
                  onChange={(e) => setHeroDescInput(e.target.value)}
                  rows={3}
                  className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium resize-y"
                  placeholder="Enter homepage hero description..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">About Profile Photo</label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-pink-100 bg-pink-50 flex-shrink-0">
                    {profilePreviewUrl ? (
                      <img src={profilePreviewUrl} alt="About Avatar Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-neutral-300 font-bold">No Image</div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileFile(file);
                        setProfilePreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="text-xs text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-pink-100 file:text-pink-500 hover:file:bg-pink-200/70 file:cursor-pointer cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">About Page Title</label>
                <input
                  type="text"
                  value={aboutTitleInput}
                  onChange={(e) => setAboutTitleInput(e.target.value)}
                  className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                  placeholder="e.g. Hey, I'm BabyLoony! ✨"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">About Bio Paragraph 1</label>
                <textarea
                  value={aboutBio1Input}
                  onChange={(e) => setAboutBio1Input(e.target.value)}
                  rows={3}
                  className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium resize-y"
                  placeholder="Enter first bio paragraph..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1">About Bio Paragraph 2</label>
                <textarea
                  value={aboutBio2Input}
                  onChange={(e) => setAboutBio2Input(e.target.value)}
                  rows={3}
                  className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium resize-y"
                  placeholder="Enter second bio paragraph..."
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  size="sm"
                  className="cursor-pointer bg-pink-400 hover:bg-pink-500 text-white rounded-full text-[10px] font-bold h-7.5 px-4 shadow-sm border border-pink-400 transition-all flex items-center gap-1"
                >
                  {savingSettings ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Button & List */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
              Catalog Items {products.length > 0 ? `(${filteredProducts.length} of ${products.length})` : `(${products.length})`}
            </h2>
            <Button
              onClick={handleAddNewClick}
              size="sm"
              className="cursor-pointer bg-pink-400 hover:bg-pink-500 text-white rounded-full text-[10px] font-bold h-7.5 px-3 shadow-sm border border-pink-400 transition-all flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Cute Pick
            </Button>
          </div>
          {/* Search box input */}
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs border border-pink-100 rounded-full px-4 py-1.5 focus:outline-none focus:border-pink-400 bg-white placeholder-neutral-300 font-medium shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-pink-500 text-[10px] font-bold select-none"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-pink-100 rounded-2xl shadow-sm">
            <div className="relative flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-100 border-t-pink-400"></div>
              <Heart className="absolute h-3 w-3 fill-pink-400 text-pink-400 animate-pulse" />
            </div>
            <p className="mt-3 text-[9px] font-bold text-pink-400 tracking-widest animate-pulse uppercase">
              Loading Catalog...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-pink-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-xs text-neutral-400">No products found. Click "Add Cute Pick" to create your first item! 🌸</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white border border-pink-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-xs text-neutral-400">No products match your search query "{searchQuery}" 🔍</p>
          </div>
        ) : (
          /* Mobile-First Card List Layout */
          <div className="flex flex-col gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white border rounded-2xl p-3 shadow-sm transition-all flex flex-col gap-2.5 ${product.isHidden ? "border-pink-50 bg-neutral-50/50 opacity-80" : "border-pink-100 hover:border-pink-200"
                  }`}
              >
                {/* Product Core Info */}
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-pink-50 bg-pink-50/10">
                    <img
                      src={
                        product.images?.[0] && !(product.images[0].startsWith("data:") && !product.images[0].includes(",")) && product.images[0] !== "data:image/jpeg;base64"
                          ? product.images[0]
                          : "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=150&q=80"
                      }
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-full bg-pink-50 px-2 py-0.2 text-[8px] font-bold uppercase tracking-wider text-pink-400 border border-pink-100/50">
                        {product.category}
                      </span>
                      {product.isFeatured && (
                        <span className="rounded-full bg-pink-400 px-1.5 py-0.2 text-[8px] font-bold uppercase text-white shadow-sm flex items-center gap-0.5">
                          <Heart className="h-2 w-2 fill-white text-white" />
                          Viral
                        </span>
                      )}
                      {product.isHidden && (
                        <span className="rounded-full bg-neutral-200 px-1.5 py-0.2 text-[8px] font-bold uppercase text-neutral-600 flex items-center gap-0.5">
                          Hidden
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs font-bold text-neutral-800 truncate mt-1">
                      {product.title}
                    </h3>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-pink-50/60 w-full"></div>

                {/* Bottom Row: Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400">
                    <ShoppingBag className="h-3 w-3 text-pink-300" />
                    <span>Pick details</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Toggle Visibility */}
                    <button
                      onClick={() => handleToggleVisibility(product)}
                      title={product.isHidden ? "Make Visible" : "Hide Product"}
                      className={`cursor-pointer h-7 w-7 rounded-full flex items-center justify-center border transition-all ${product.isHidden
                        ? "bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200"
                        : "bg-pink-50 text-pink-400 border-pink-100 hover:bg-pink-100"
                        }`}
                    >
                      {product.isHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleEditClick(product)}
                      title="Edit Product"
                      className="cursor-pointer h-7 w-7 rounded-full flex items-center justify-center bg-pink-50 text-pink-400 border border-pink-100 hover:bg-pink-100 transition-all"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteClick(product.id, product.title)}
                      title="Delete Product"
                      className="cursor-pointer h-7 w-7 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-100 hover:bg-red-100 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Preview Link */}
                    <Link href={`/products/${product.slug}`} target="_blank" title="View Details Page">
                      <span className="cursor-pointer h-7 w-7 rounded-full flex items-center justify-center bg-neutral-50 text-neutral-400 border border-neutral-200 hover:bg-neutral-100 transition-all">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit/Add Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto animate-in fade-in duration-200">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm" onClick={() => !uploadingImage && setShowModal(false)}></div>

          {/* Modal Container */}
          <div className="bg-white border border-pink-100 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-xl relative z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-pink-50 shrink-0">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
                <h3 className="text-sm font-black text-neutral-800">
                  {editingId ? "Edit Cute Pick" : "Add New Cute Pick"}
                </h3>
              </div>
              <button
                onClick={() => !uploadingImage && setShowModal(false)}
                disabled={uploadingImage}
                className="cursor-pointer h-7 w-7 rounded-full flex items-center justify-center hover:bg-pink-50 text-neutral-400 hover:text-pink-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form Scrollable Area */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Product Info Section */}
              <div className="space-y-3">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 border-b border-pink-50/55 pb-1">
                  General Info
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Peach Glow Velvet Lip Tint"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 mb-1">Slug (URL identifier)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., peach-glow-lip-tint"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 mb-1">Category</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Beauty, Fashion, Home"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Product Description</label>
                    <textarea
                      placeholder="Give a brief description of the product..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Review / Verdict Section */}
              <div className="space-y-3">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 border-b border-pink-50/55 pb-1">
                  Verdict
                </h4>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 mb-1">Verdict Summary (1-2 lines)</label>
                  <input
                    type="text"
                    placeholder="e.g., Stays on all day, super smooth velvet finish!"
                    value={formData.reviewSummary}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviewSummary: e.target.value }))}
                    className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                  />
                </div>
              </div>

              {/* Media Section */}
              <div className="space-y-3">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 border-b border-pink-50/55 pb-1">
                  Media & Video
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* Local Photo Upload */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Upload Product Photo</label>
                    <div className="flex gap-3 items-center bg-pink-50/10 border border-pink-100 rounded-2xl p-2.5">
                      <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-pink-50 bg-white flex items-center justify-center relative text-pink-300">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-pink-200" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <label className="cursor-pointer inline-flex items-center gap-1 bg-pink-100 hover:bg-pink-200/80 text-pink-500 border border-pink-200 px-3 py-1 rounded-full text-[9px] font-bold transition-all shadow-sm">
                          <Plus className="h-3 w-3" />
                          Choose Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {selectedFile && (
                          <p className="text-[8px] text-neutral-400 font-medium truncate max-w-[200px]">
                            Selected: {selectedFile.name}
                          </p>
                        )}
                        {!selectedFile && previewUrl && previewUrl.startsWith("http") && (
                          <p className="text-[8px] text-neutral-400 font-medium">
                            Using saved image URL
                          </p>
                        )}
                      </div>
                    </div>
                  </div>


                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">TikTok Video URL</label>
                    <input
                      type="text"
                      placeholder="e.g., https://www.tiktok.com/@user/video/..."
                      value={formData.tiktokUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, tiktokUrl: e.target.value }))}
                      className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Affiliate links */}
              <div className="space-y-3">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 border-b border-pink-50/55 pb-1">
                  Affiliate Shop Links
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Shopee Link</label>
                    <input
                      type="text"
                      placeholder="https://shopee.com/..."
                      value={formData.shopLinks.shopee}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shopLinks: { ...prev.shopLinks, shopee: e.target.value }
                      }))}
                      className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Lazada Link</label>
                    <input
                      type="text"
                      placeholder="https://lazada.com/..."
                      value={formData.shopLinks.lazada}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shopLinks: { ...prev.shopLinks, lazada: e.target.value }
                      }))}
                      className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">TikTok Shop Link</label>
                    <input
                      type="text"
                      placeholder="https://shop.tiktok.com/..."
                      value={formData.shopLinks.tiktokShop}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shopLinks: { ...prev.shopLinks, tiktokShop: e.target.value }
                      }))}
                      className="w-full text-xs border border-pink-100 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-400 bg-pink-50/10 placeholder-neutral-300 font-medium"
                    />
                  </div>

                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-neutral-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="accent-pink-400 h-4 w-4"
                  />
                  <span>Viral Highlight ⭐️</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-neutral-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isHidden}
                    onChange={(e) => setFormData(prev => ({ ...prev, isHidden: e.target.checked }))}
                    className="accent-neutral-500 h-4 w-4"
                  />
                  <span>Hide from Public Storefront 🔒</span>
                </label>
              </div>

              {/* Form Action Buttons inside Form */}
              <div className="flex gap-2 pt-4 border-t border-pink-50 shrink-0">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={uploadingImage}
                  className="cursor-pointer flex-1 py-2 text-xs text-neutral-500 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-full h-9 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploadingImage}
                  className="cursor-pointer flex-1 py-2 text-xs text-white bg-pink-400 hover:bg-pink-500 rounded-full h-9 font-bold border border-pink-400 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Processing Photo...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{editingId ? "Save Product" : "Upload Product"}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
