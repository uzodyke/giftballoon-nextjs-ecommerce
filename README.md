# GiftBalloon Next.js Ecommerce

A modern, responsive ecommerce application for balloon arrangements built with Next.js, TypeScript, and Stripe.

## Features

- 🎈 **Product Catalog** - Browse 10+ unique balloon arrangements
- 🛒 **Shopping Cart** - Add items with customizable options (style, size, color)
- 💳 **Stripe Integration** - Secure payment processing with live Stripe
- 🔍 **Image Zoom** - Click-to-zoom product images
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Built with Next.js 16 and optimized images

## Product Categories

- **Romance** - Heart balloons, love bouquets
- **Luxury** - Premium balloon arrangements
- **Kids** - Teddy bear balloons, fun designs
- **Floral** - Rose charm balloons
- **Modern** - Simplistic glow effects
- **Personalized** - Custom picture balloons

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Payments**: Stripe with live integration
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/giftballoon-nextjs-ecommerce.git
cd giftballoon-nextjs-ecommerce
npm install
```

**Environment Variables**

Create a `.env.local` file with your Stripe keys:
```env
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js 16 app directory
│   │   ├── page.tsx         # Home page with featured products
│   │   ├── shop/            # Product catalog
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   └── api/             # API routes for Stripe
│   ├── components/          # Reusable components
│   │   ├── ProductCard.tsx  # Product display with options
│   │   ├── ImageZoom.tsx    # Click-to-zoom functionality
│   │   └── CheckoutForm.tsx # Stripe payment form
│   ├── context/             # React Context
│   │   └── CartContext.tsx  # Shopping cart state
│   ├── data/                # Product data
│   │   └── products.ts      # Balloon product catalog
│   └── lib/                 # Utilities
│       └── stripe.ts        # Stripe configuration
├── public/
│   └── images/              # Product images
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This application is optimized for deployment on Vercel:

1. **Push to GitHub** (this repository)
2. **Connect to Vercel** - Import your GitHub repository
3. **Add Environment Variables** - Configure your Stripe keys in Vercel
4. **Deploy** - Automatic deployment on every push

## Product Images

All balloon product images are included and optimized:
- Heart Stuffed Balloon (£30.85)
- Luxury Stuffed Balloons (£45.00)
- Rose Charm Balloon (£26.00)
- Teddy Inside Balloon (£35.00)
- Love Bouquet (£30.00)
- Wine Balloon (£35.00)
- Teddy Outside Balloon (£35.00)
- Golden Treasure Balloon (£35.00)
- Simplistic Glow (£25.00)
- Picture Special (£40.00)

---

Built with ❤️ using Next.js and Stripe
