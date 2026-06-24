import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { SAMPLE_PRODUCTS } from "../data/sample-products";

// Load environment variables from .env.local manually to maintain zero external dependencies
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  console.log("Loading environment variables from .env.local...");
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const firstEquals = trimmed.indexOf("=");
    if (firstEquals === -1) return;
    const key = trimmed.substring(0, firstEquals).trim();
    const value = trimmed.substring(firstEquals + 1).trim();
    const cleanValue = value.replace(/^["']|["']$/g, "");
    process.env[key] = cleanValue;
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isConfigured = 
  !!firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "your_api_key" && 
  !!firebaseConfig.projectId && 
  firebaseConfig.projectId !== "your_project_id";

if (!isConfigured) {
  console.error("❌ ERROR: Firebase credentials are not configured in .env.local!");
  console.error("Please fill in NEXT_PUBLIC_FIREBASE_API_KEY and other parameters, then run this script again.");
  process.exit(1);
}

async function seed() {
  console.log(`Starting Firestore seed for project: ${firebaseConfig.projectId}...`);
  
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    for (const product of SAMPLE_PRODUCTS) {
      console.log(`Uploading: ${product.title} (${product.id})...`);
      
      const { id, ...data } = product;
      const docRef = doc(db, "products", id);
      
      // Convert date string timestamps to real JavaScript Date objects for Firestore Timestamps
      const firestoreData = {
        ...data,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
      };
      
      await setDoc(docRef, firestoreData);
    }
    
    console.log("✅ SUCCESS: All products successfully seeded to Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR during seeding process:", error);
    process.exit(1);
  }
}

seed();
