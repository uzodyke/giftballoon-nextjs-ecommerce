export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  category: string
  inStock: boolean
  options?: {
    styles?: { name: string; price: number }[]
    sizes?: { name: string; price: number }[]
    colors?: { name: string; price: number }[]
  }
}

export const products: Product[] = [
  {
    id: 'heart-stuffed-balloon',
    name: 'Heart Stuffed Balloon',
    description: 'Beautiful heart-shaped balloon perfect for romantic occasions. Filled with surprises and designed to capture hearts.',
    price: 65.85,
    image: '/images/heart-stuffed-balloon-30-85.jpg',
    images: [
      '/images/heart-stuffed-balloon-30-85.jpg'
    ],
    category: 'Romance',
    inStock: true,
    options: {
      styles: [
        { name: 'Standard Heart', price: 0 },
        { name: 'With Love Message', price: 5 },
        { name: 'Premium Gift Inside', price: 15 }
      ],
      colors: [
        { name: 'Classic Red', price: 0 },
        { name: 'Pink Romance', price: 0 },
        { name: 'Golden Heart', price: 5 }
      ]
    }
  },
  {
    id: 'wine-balloon',
    name: 'Stuffed Wine Balloon',
    description: 'Sophisticated balloon arrangement perfect for wine lovers, celebrations, or adult parties. Elegant and mature design.',
    price: 70.00,
    image: '/images/wine-balloon-35.jpg',
    images: [
      '/images/wine-balloon-35.jpg'
    ],
    category: 'Adult',
    inStock: true,
    options: {
      styles: [
        { name: 'Classic Wine Theme', price: 0 },
        { name: 'Premium Vintage', price: 15 },
        { name: 'Luxury Collection', price: 25 }
      ],
      colors: [
        { name: 'Wine Red', price: 0 },
        { name: 'Champagne Gold', price: 5 },
        { name: 'Elegant Black', price: 5 }
      ]
    }
  },
  {
    id: 'teddy-outside-balloon',
    name: 'Stuffed Balloon with Teddy Outside',
    description: 'Charming balloon with teddy bear attached outside. Perfect for children\'s parties, baby showers, or cute gift presentations.',
    price: 70.00,
    image: '/images/teddy-outside-balloon-35.jpg',
    images: [
      '/images/teddy-outside-balloon-35.jpg'
    ],
    category: 'Kids',
    inStock: true,
    options: {
      styles: [
        { name: 'Standard Design', price: 0 },
        { name: 'Deluxe Teddy', price: 12 },
        { name: 'Premium Package', price: 25 }
      ],
      colors: [
        { name: 'Pastel Pink', price: 0 },
        { name: 'Baby Blue', price: 0 },
        { name: 'Sunshine Yellow', price: 0 },
        { name: 'Mixed Colors', price: 5 }
      ]
    }
  },
  {
    id: 'golden-treasure-balloon',
    name: 'Golden Treasure Stuffed Balloon',
    description: 'Luxurious golden-themed balloon with treasure elements. Perfect for special celebrations, achievements, or milestone events.',
    price: 70.00,
    image: '/images/golden-treasure-balloon-35.jpg',
    images: [
      '/images/golden-treasure-balloon-35.jpg'
    ],
    category: 'Luxury',
    inStock: true,
    options: {
      styles: [
        { name: 'Standard Golden', price: 0 },
        { name: 'Premium Treasure', price: 20 },
        { name: 'Royal Collection', price: 40 }
      ],
      sizes: [
        { name: 'Standard Size', price: 0 },
        { name: 'Large Display', price: 15 },
        { name: 'Grand Presentation', price: 35 }
      ]
    }
  },
  {
    id: 'simplistic-glow',
    name: 'Simplistic Glow',
    description: 'Elegant and minimalist balloon design with a beautiful glow effect. Perfect for modern celebrations and stylish events.',
    price: 60.00,
    image: '/images/simplistic-glow-25.jpg',
    images: [
      '/images/simplistic-glow-25.jpg'
    ],
    category: 'Modern',
    inStock: true,
    options: {
      styles: [
        { name: 'Classic Glow', price: 0 },
        { name: 'Enhanced Lighting', price: 10 },
        { name: 'Premium Illumination', price: 20 }
      ],
      colors: [
        { name: 'Warm White', price: 0 },
        { name: 'Cool Blue', price: 0 },
        { name: 'Sunset Orange', price: 0 },
        { name: 'Multi-Color', price: 8 }
      ]
    }
  },
  {
    id: 'golden-elegance',
    name: 'Golden Elegance',
    description: 'A refined golden balloon arrangement radiating warmth and sophistication. Perfect for anniversaries, milestone celebrations, and elegant gifting.',
    price: 45.00,
    image: '/images/golden-elegance-45.png',
    images: [
      '/images/golden-elegance-45.png'
    ],
    category: 'Luxury',
    inStock: true
  },
  {
    id: 'luxury-charm',
    name: 'Luxury Charm',
    description: 'A luxurious stuffed balloon with charming premium detailing. A standout gift for those who appreciate the finer touches.',
    price: 45.00,
    image: '/images/luxury-charm-45.png',
    images: [
      '/images/luxury-charm-45.png'
    ],
    category: 'Luxury',
    inStock: true
  },
  {
    id: 'scarlet-elegance',
    name: 'Scarlet Elegance',
    description: 'A striking scarlet balloon arrangement full of romance and drama. Ideal for anniversaries, proposals, and Valentine\'s celebrations.',
    price: 55.00,
    image: '/images/scarlet-elegance-55.png',
    images: [
      '/images/scarlet-elegance-55.png'
    ],
    category: 'Romance',
    inStock: true
  },
  {
    id: 'sweet-celebration',
    name: 'Sweet Celebration',
    description: 'A cheerful, colourful balloon arrangement made for happy moments. Perfect for birthdays, congratulations, and every sweet occasion.',
    price: 45.00,
    image: '/images/sweet-celebration-45.png',
    images: [
      '/images/sweet-celebration-45.png'
    ],
    category: 'Romance',
    inStock: true
  }
]

export const categories = [
  'All',
  'Romance',
  'Luxury',
  'Kids',
  'Adult',
  'Modern'
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') {
    return products
  }
  return products.filter(product => product.category === category)
}