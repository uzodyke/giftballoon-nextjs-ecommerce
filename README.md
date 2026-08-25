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

## Products

Defined in `src/data/products.ts`, with images in `public/images/`:
- Stuffed Wine Balloon (£70.00)
- Stuffed Balloon with Teddy Outside (£70.00)
- Golden Treasure Stuffed Balloon (£70.00)
- Simplistic Glow (£60.00)
- Golden Elegance (£45.00)
- Luxury Charm (£45.00)
- Scarlet Elegance (£55.00)
- Sweet Celebration (£45.00)
- The Royal Rose (£55.00)
- The Cherished Teddy (£55.00)

Keep this list, and the catalog in `public/llms.txt`, in sync with
`products.ts` whenever a product or price changes.

---

Built with ❤️ using Next.js and Stripe
