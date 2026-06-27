## Visual Style

The website should be a girly cute aesthetic product review storefront.

Design direction:
- Hello Kitty-inspired, but never use official Hello Kitty images, logos, copyrighted artwork, or character names in the UI.
- Soft pink, cream, white, and light red accents.
- Minimalist, clean, friendly, and mobile-first.
- Rounded product cards.
- Soft borders and gentle shadows.
- Cute bow, heart, sparkle, and star-like accents are allowed using CSS or icons.
- Light theme only for now.
- Avoid dark mode unless requested later.

UI rules:
- Mobile layout is more important than desktop.
- Avoid oversized hero sections, cards, images, and text.
- Product cards should be compact and easy to scroll.
- Use rounded-xl, rounded-2xl, or rounded-full.
- Prefer soft borders over strong shadows.
- Use readable but cute typography.
- Keep spacing comfortable but not too large.

Minimalist Page Layouts:
- Homepage: Only Navbar, Hero (search & chips), ProductGrid, and Footer. No featured review highlights or why-follow decks.
- Product Details: Single product image, rating, price, short review summary, buy buttons, and simple video link. Rendered inside a centered card frame.
- About: Cardless, full-width layout (`max-w-5xl`). On desktop, renders as a balanced row with profile avatar on the left and details on the right. On mobile, stacks vertically. Features TikTok and Shopee follow buttons using SVG logos instead of email collaboration forms.
- Admin Panel: Features a product search box to dynamically filter catalog items. Contains a toggleable Storefront Settings card (hidden by default) allowing customization of hero text and About page properties.
- Content & Storage: All image uploads (product photos, profile avatar) bypass Firebase Storage and are encoded as Base64 strings to support Firestore-only environments. Bio text renders conditionally without default hardcoded fallbacks if cleared by the admin.