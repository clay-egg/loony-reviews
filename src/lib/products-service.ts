import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  limit,
  addDoc,
  deleteDoc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from "./firebase";
import { Product } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/data/sample-products";

/**
 * Fetches all products.
 * Falls back to SAMPLE_PRODUCTS if Firebase is not configured or fails.
 */
export async function fetchProducts(includeHidden: boolean = false): Promise<Product[]> {
  if (!isFirebaseConfigured || !db) {
    return includeHidden ? SAMPLE_PRODUCTS : SAMPLE_PRODUCTS.filter(p => !p.isHidden);
  }

  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    
    if (querySnapshot.empty) {
      console.log("Firestore products collection is empty. Using sample data.");
      const fallbackList = includeHidden ? SAMPLE_PRODUCTS : SAMPLE_PRODUCTS.filter(p => !p.isHidden);
      return fallbackList;
    }

    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      // Filter out internal configurations/settings documents
      if (docSnap.id.startsWith("_")) {
        return;
      }

      const data = docSnap.data();
      
      // Filter out hidden products in memory if includeHidden is false
      if (!includeHidden && data.isHidden === true) {
        return;
      }
      
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
    return includeHidden ? SAMPLE_PRODUCTS : SAMPLE_PRODUCTS.filter(p => !p.isHidden);
  }
}

/**
 * Fetches a single product by its slug.
 * Falls back to SAMPLE_PRODUCTS lookup.
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (slug.startsWith("_")) {
    return null;
  }

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
 * Creates a new product in Firestore.
 */
export async function createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  try {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, {
      ...productData,
      isFeatured: productData.isFeatured || false,
      isHidden: productData.isHidden || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

/**
 * Updates an existing product in Firestore.
 */
export async function updateProduct(productId: string, productData: Partial<Product>): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  try {
    const productRef = doc(db, "products", productId);
    // Strip metadata keys that shouldn't be overwritten as internal fields
    const { id, createdAt, updatedAt, ...cleanData } = productData as any;
    
    await updateDoc(productRef, {
      ...cleanData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    throw error;
  }
}

/**
 * Deletes a product from Firestore.
 */
export async function deleteProduct(productId: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error;
  }
}

/**
 * Toggles the isHidden status of a product in Firestore.
 */
export async function toggleProductVisibility(productId: string, isHidden: boolean): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      isHidden,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(`Error toggling visibility for product ${productId}:`, error);
    throw error;
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

/**
 * Compresses and encodes an image file to a Base64 JPEG data URL.
 * Resizes the image to fit within maxWidth/maxHeight and compresses it to the specified quality.
 */
export function compressAndEncodeImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Uploads a product image file to Firebase Storage.
 * Returns the public download URL of the uploaded image.
 */
export async function uploadProductImage(file: File): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase Storage is not configured.");
  }

  try {
    const fileExtension = file.name.split(".").pop() || "jpg";
    const uniqueFileName = `products/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;
    const storageRef = ref(storage, uniqueFileName);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get and return public download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
}

export interface StorefrontSettings {
  heroDescription: string;
  aboutTitle?: string;
  aboutBio1?: string;
  aboutBio2?: string;
  aboutAvatarUrl?: string;
}

const DEFAULT_SETTINGS: StorefrontSettings = {
  heroDescription: "รวมพิกัดของรีวิวน่ารักๆ จาก TikTok ช้อปง่ายตรงปก พร้อมลิงก์ตรงจากร้านค้าในไทย 🎀",
  aboutTitle: "สวัสดีค่า เบบี้ลูนี่เอง! 🎀✨",
  aboutBio1: "ยินดีต้อนรับสู่แหล่งรวมพิกัดของกุ๊กกิ๊กที่เรารีวิวใน TikTok นะคะ! เราชอบตามล่าหาของแต่งห้อง เครื่องเขียน และไอเท็มบิวตี้ลายน่ารักๆ สไตล์มินิมอลอยู่แล้ว เลยอยากแชร์ต่อความคิวท์ให้ทุกคนค่ะ",
  aboutBio2: "ทุกไอเท็มบนเพจนี้ผ่านการใช้งานจริงและคัดมาแล้วว่าดีต่อใจแน่นอนค่ะ สามารถกดปุ่มนำทางช้อปปิ้งออนไลน์ไปยัง Shopee/Lazada ร้านค้าตรงได้ทันทีเลยน้า ขอบคุณสำหรับการสนับสนุนค่ะ! 💕",
  aboutAvatarUrl: "/Profile.JPG",
};

/**
 * Fetches the storefront settings (like hero description) from Firestore.
 * Falls back to DEFAULT_SETTINGS if Firebase is not configured or fails.
 */
export async function fetchStorefrontSettings(): Promise<StorefrontSettings> {
  if (!isFirebaseConfigured || !db) {
    return DEFAULT_SETTINGS;
  }

  try {
    const settingsRef = doc(db, "products", "_settings");
    const docSnap = await getDoc(settingsRef);
    if (docSnap.exists()) {
      return docSnap.data() as StorefrontSettings;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error fetching storefront settings from Firestore:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Updates the storefront settings in Firestore.
 */
export async function updateStorefrontSettings(settingsData: StorefrontSettings): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  try {
    const settingsRef = doc(db, "products", "_settings");
    await setDoc(settingsRef, settingsData, { merge: true });
  } catch (error) {
    console.error("Error updating storefront settings in Firestore:", error);
    throw error;
  }
}

