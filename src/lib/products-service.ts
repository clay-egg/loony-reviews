import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  increment, 
  limit,
  addDoc
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Product } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/data/sample-products";

/**
 * Fetches all products.
 * Falls back to SAMPLE_PRODUCTS if Firebase is not configured or fails.
 */
export async function fetchProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured || !db) {
    return SAMPLE_PRODUCTS;
  }

  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    
    if (querySnapshot.empty) {
      console.log("Firestore products collection is empty. Using sample data.");
      return SAMPLE_PRODUCTS;
    }

    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      products.push({
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || new Date().toISOString(),
      } as Product);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return SAMPLE_PRODUCTS;
  }
}

/**
 * Fetches a single product by its slug.
 * Falls back to SAMPLE_PRODUCTS lookup.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isFirebaseConfigured || !db) {
    const staticProduct = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
    return staticProduct || null;
  }

  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Check static fallback in case db is empty
      const staticProduct = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
      return staticProduct || null;
    }

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || new Date().toISOString(),
    } as Product;
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}" from Firestore:`, error);
    const staticProduct = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
    return staticProduct || null;
  }
}

/**
 * Dynamically tracks product affiliate clicks by incrementing a Firestore counter
 * and adding a log to a nested 'clicks' history collection.
 */
export async function trackProductClick(productId: string, platform?: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.log(`Static Mode: Clicked affiliate link for product ${productId} (${platform || 'unknown'})`);
    return;
  }

  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      clickCount: increment(1),
      updatedAt: new Date(),
    });

    // Log the transaction in a separate clicks log collection
    const clicksRef = collection(db, "clicks");
    await addDoc(clicksRef, {
      productId,
      platform: platform || "unknown",
      clickedAt: new Date(),
    });
  } catch (error) {
    console.error(`Error tracking click for product ${productId}:`, error);
  }
}

/**
 * Helper to build unique categories dynamically based on current product list.
 */
export function getCategories(products: Product[]): string[] {
  const uniqueCategories = Array.from(
    new Set(
      products
        .map((p) => p.category)
        .filter((cat): cat is string => typeof cat === "string" && cat.trim() !== "")
    )
  );
  return ["All", ...uniqueCategories];
}
