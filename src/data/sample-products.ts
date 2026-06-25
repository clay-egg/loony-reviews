import { Product } from "@/types/product";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "peach-tint-01",
    title: "Peach Glow Velvet Lip Tint",
    slug: "peach-glow-velvet-lip-tint",
    category: "Beauty",
    description: "Achieve the ultimate soft-blur gradient lip look. This velvety lip tint is enriched with peach extracts and hyaluronic acid to lock in moisture. It provides a long-lasting, smudge-proof matte finish with a delicious natural peach scent.",
    reviewSummary: "The dreamiest formula that feels like air on the lips. Non-drying, stays on for hours, and the peach shade is a perfect MLBB (My Lips But Better) color for daily wear.",
    rating: 4.8,
    priceRange: "$8 - $12",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@beautyfinds/video/7123456789012345678",
    shopLinks: {
      shopee: "https://shopee.com/sample-peach-tint",
      lazada: "https://lazada.com/sample-peach-tint",
      tiktokShop: "https://shop.tiktok.com/sample-peach-tint"
    },
    pros: [
      "Super hydrating, velvety formula",
      "Delicious natural peach scent",
      "Beautiful smudge-proof gradient effect",
      "Very budget-friendly"
    ],
    cons: [
      "Requires touch-ups after greasy meals",
      "Slightly transfers on cups initially"
    ],
    isFeatured: true,
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-15T12:30:00Z"
  },
  {
    id: "bow-cardigan-02",
    title: "Cozy Pastel Knitted Bow Cardigan",
    slug: "cozy-pastel-knitted-bow-cardigan",
    category: "Fashion",
    description: "An adorable addition to your wardrobe. This ultra-soft knitted cardigan features oversized ribbing, cute drop shoulders, and delicate hand-stitched bow detailing down the front. Crafted from high-quality cloud-yarn that is guaranteed scratch-free.",
    reviewSummary: "Insanely soft and looks exactly like the viral TikTok styling videos. It fits perfectly oversized without looking bulky. The knit is warm and feels premium.",
    rating: 4.7,
    priceRange: "$25 - $35",
    images: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@ootdfinds/video/7234567890123456789",
    shopLinks: {
      shopee: "https://shopee.com/sample-bow-cardigan"
    },
    pros: [
      "Extremely soft cloud-yarn material",
      "Adorable hand-stitched bows",
      "Oversized cozy fit",
      "Breathable yet warm"
    ],
    cons: [
      "Hand wash recommended to protect bows",
      "Buttons can feel slightly loose out of the box"
    ],
    isFeatured: false,
    createdAt: "2026-06-03T11:00:00Z",
    updatedAt: "2026-06-12T09:20:00Z"
  },
  {
    id: "sunset-lamp-03",
    title: "AuraGlow LED Sunset Projection Lamp",
    slug: "auraglow-led-sunset-projection-lamp",
    category: "Home",
    description: "Bring the warm, soothing glow of a golden hour sunset right into your bedroom. This viral projection lamp features 16 color modes, adjustable brightness, and a 360-degree rotating head to help you capture the perfect TikTok aesthetic or unwind after a long day.",
    reviewSummary: "The ultimate mood-setter for any room. Easy to control via remote, extremely bright, and turns any boring wall into a masterpiece. A must-have for content creators and cozy room lovers alike.",
    rating: 4.8,
    priceRange: "$15 - $25",
    images: [
      "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@cozyroomvibes/video/7345678901234567890",
    shopLinks: {
      shopee: "https://shopee.com/sample-sunset-lamp",
      lazada: "https://lazada.com/sample-sunset-lamp",
      tiktokShop: "https://shop.tiktok.com/sample-sunset-lamp"
    },
    pros: [
      "16 vibrant color transitions",
      "Robust base with 360-degree rotating head",
      "Includes remote control and mobile app support",
      "Low power consumption via USB"
    ],
    cons: [
      "Remote control requires direct line of sight",
      "USB power adapter is not included in the box"
    ],
    isFeatured: true,
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-15T12:30:00Z"
  },
  {
    id: "mechanical-keyboard-04",
    title: "VibeType K8 Pro Wireless Mechanical Keyboard",
    slug: "vibetype-k8-pro-wireless-mechanical-keyboard",
    category: "Gadgets",
    description: "An absolute dream for keyboard enthusiasts and desk setup creators. This hot-swappable 75% mechanical keyboard comes with pre-lubed linear switches for that signature 'thacky' typing sound. Offers both Bluetooth 5.1 and wired connections, with gorgeous RGB lighting.",
    reviewSummary: "Sounds amazing right out of the box. The typing experience is incredibly smooth and the battery life lasts for weeks. Perfect for upgrading your desk setup aesthetic and productivity.",
    rating: 4.9,
    priceRange: "$80 - $110",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@keyboardsetup/video/7456789012345678901",
    shopLinks: {
      shopee: "https://shopee.com/sample-k8-keyboard"
    },
    pros: [
      "Superb 'thacky' sound profile with pre-lubed switches",
      "Hot-swappable PCB for easy customization",
      "Dual mode (Bluetooth & USB-C)",
      "Premium aluminum frame"
    ],
    cons: [
      "Heavy to carry around",
      "Companion software takes time to configure"
    ],
    isFeatured: false,
    createdAt: "2026-06-05T08:15:00Z",
    updatedAt: "2026-06-16T14:20:00Z"
  },
  {
    id: "portable-blender-05",
    title: "BlendGo Active Portable USB Blender",
    slug: "blendgo-active-portable-usb-blender",
    category: "Lifestyle",
    description: "Get fresh smoothies on-the-go with the BlendGo Active. Engineered with 6 stainless steel blades and a powerful motor, it turns frozen fruits and leafy greens into delicious shakes in 30 seconds. Featuring a leak-proof design and easy USB-C recharging.",
    reviewSummary: "Incredibly convenient for post-workout shakes or quick breakfast smoothies. It's powerful enough for ice, easy to clean, and fits perfectly in a car cup holder. Lives up to the viral hype.",
    rating: 4.6,
    priceRange: "$25 - $35",
    images: [
      "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@healthyhacks/video/7567890123456789012",
    shopLinks: {
      shopee: "https://shopee.com/sample-blendgo",
      lazada: "https://lazada.com/sample-blendgo",
      tiktokShop: "https://shop.tiktok.com/sample-blendgo"
    },
    pros: [
      "Ultra-portable with convenient carry strap",
      "Easy self-cleaning (just add water and soap, then blend)",
      "Rechargeable battery lasts for up to 15 blends",
      "BPA-free eco-friendly materials"
    ],
    cons: [
      "Cannot blend large chunks of hard ice without liquid",
      "Capacity is relatively small (14 oz)"
    ],
    isFeatured: false,
    createdAt: "2026-06-10T11:45:00Z",
    updatedAt: "2026-06-10T11:45:00Z"
  },
  {
    id: "matcha-powder-06",
    title: "Sweet Sakura Honey Matcha Powder",
    slug: "sweet-sakura-honey-matcha-powder",
    category: "Food",
    description: "The ultimate cozy pink drink. This ceremonial Uji matcha powder is blended with real ground sakura blossoms and a touch of dehydrated wild honey. Creates a sweet, floral latte with a beautiful pastel color and smooth, clean energy boost.",
    reviewSummary: "Tastes like spring in a cup. It has no bitter aftertaste at all, and blending it with warm oat milk creates the prettiest floral latte ever. Worth every penny.",
    rating: 4.6,
    priceRange: "$12 - $18",
    images: [
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@matchavibes/video/7678901234567890123",
    shopLinks: {
      shopee: "https://shopee.com/sample-sakura-matcha",
      lazada: "https://lazada.com/sample-sakura-matcha"
    },
    pros: [
      "Genuine ceremonial grade Uji matcha base",
      "Naturally sweetened with honey crystals",
      "Stunning pastel aesthetic color",
      "No grassy or bitter taste profile"
    ],
    cons: [
      "Smaller tin size (only 30g)",
      "Sakura blossom scent can be subtle"
    ],
    isFeatured: false,
    createdAt: "2026-06-12T14:30:00Z",
    updatedAt: "2026-06-12T14:30:00Z"
  },
  {
    id: "desk-organizers-07",
    title: "Heart Shaped Pastel Desk Organizers",
    slug: "heart-shaped-pastel-desk-organizers",
    category: "Budget Finds",
    description: "Keep your workspace tidy and adorable. This set of 3 stackable acrylic organizers features heart-shaped cutouts and pastel dividers. Perfect for storing pens, washi tape, makeup brushes, or hair accessories while adding a soft, clean aesthetic to your room setup.",
    reviewSummary: "Super affordable, sturdy, and instantly cuteified my work-from-home desk setup. The heart details make me happy every time I grab a pen.",
    rating: 4.5,
    priceRange: "$5 - $8",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@deskfinds/video/7789012345678901234",
    shopLinks: {
      shopee: "https://shopee.com/sample-desk-organizer"
    },
    pros: [
      "Incredibly cheap price point",
      "Stackable space-saving design",
      "Tough, crystal-clear acrylic with pastel colors",
      "Cute heart-shaped details"
    ],
    cons: [
      "Acrylic can scratch easily if handled roughly",
      "Dividers are fixed in place"
    ],
    isFeatured: false,
    createdAt: "2026-06-08T09:15:00Z",
    updatedAt: "2026-06-14T11:40:00Z"
  },
  {
    id: "cat-charger-08",
    title: "Kawaii Cat Paw Wireless Charging Dock",
    slug: "kawaii-cat-paw-wireless-charging-dock",
    category: "Cute Finds",
    description: "Charge your phone with absolute cuteness. This 15W fast wireless charging stand features a soft silicone cat paw pad that gently lights up with a warm glow when charging. Compatible with all Qi-enabled iPhone and Android devices.",
    reviewSummary: "Honestly the cutest charger I've ever owned. The cat paw silicone pad is soft, holds my phone securely, and the warm indicator light is the perfect nightlight.",
    rating: 4.9,
    priceRange: "$20 - $30",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@gadgetfinds/video/7890123456789012345",
    shopLinks: {
      shopee: "https://shopee.com/sample-cat-charger",
      lazada: "https://lazada.com/sample-cat-charger",
      tiktokShop: "https://shop.tiktok.com/sample-cat-charger"
    },
    pros: [
      "Fast 15W Qi-wireless charging",
      "Adorable soft silicone cat paw design",
      "Warm ambient indicator glow",
      "Anti-slip base"
    ],
    cons: [
      "USB-C cable is included, but requires a fast charging plug",
      "Cannot charge with thick metal phone cases"
    ],
    isFeatured: true,
    createdAt: "2026-06-14T08:00:00Z",
    updatedAt: "2026-06-17T15:00:00Z"
  },
  {
    id: "cocoa-spoons-09",
    title: "Mini Marshmallow Flower Cocoa Spoons",
    slug: "mini-marshmallow-flower-cocoa-spoons",
    category: "Food",
    description: "Make your hot chocolate magical. These wooden spoons are coated in premium Belgian milk chocolate and topped with handmade marshmallow flowers that blossom when stirred into warm milk.",
    reviewSummary: "Absolutely adorable and they make the perfect cozy drink. The chocolate is sweet and rich, and watching the marshmallow flower bloom is so satisfying!",
    rating: 4.8,
    priceRange: "$6 - $10",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@cocoafinds/video/7901234567890123456",
    shopLinks: {
      shopee: "https://shopee.com/sample-cocoa-spoons",
      lazada: "https://lazada.com/sample-cocoa-spoons"
    },
    pros: [
      "Beautiful marshmallow blossom effect",
      "Rich Belgian milk chocolate",
      "Great packaging, perfect for gifting",
      "100% natural ingredients"
    ],
    cons: [
      "A bit sweet if you add extra sugar",
      "Single-use only"
    ],
    isFeatured: false,
    createdAt: "2026-06-15T09:00:00Z",
    updatedAt: "2026-06-15T09:00:00Z"
  },
  {
    id: "fuzzy-slippers-10",
    title: "Soft Bear Paw Fuzzy Slippers",
    slug: "soft-bear-paw-fuzzy-slippers",
    category: "Fashion",
    description: "The ultimate cozy footwear. These plush slippers feature a warm fleece lining and a cute non-slip bear paw design with embroidered claws. Keep your feet warm and stylish all winter.",
    reviewSummary: "Incredibly cozy and warm. They are like walking on clouds! The embroidery is super clean and the non-slip grip works great on wooden floors.",
    rating: 4.9,
    priceRange: "$12 - $18",
    images: [
      "https://images.unsplash.com/photo-1520006406004-f91d5b990e4e?auto=format&fit=crop&w=800&q=80"
    ],
    tiktokUrl: "https://www.tiktok.com/@slipperfinds/video/7912345678901234567",
    shopLinks: {
      shopee: "https://shopee.com/sample-fuzzy-slippers"
    },
    pros: [
      "Extremely warm and cozy fleece",
      "Adorable paw embroidery details",
      "Thick memory foam sole support",
      "Excellent non-slip grip bottom"
    ],
    cons: [
      "Run slightly small, recommend sizing up",
      "Hand wash only to preserve plush feel"
    ],
    isFeatured: true,
    createdAt: "2026-06-16T10:00:00Z",
    updatedAt: "2026-06-16T10:00:00Z"
  }
];

export const CATEGORIES = ["All", ...Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)))];
