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
    price: 30.85,
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
    id: 'luxury-stuffed-balloons',
    name: 'Luxury Stuffed Balloons',
    description: 'Premium luxury balloon arrangement with high-end materials and elegant presentation. Perfect for special celebrations.',
    price: 45.00,
    image: '/images/luxury-stuffed-balloons-45.jpg',
    images: [
      '/images/luxury-stuffed-balloons-45.jpg'
    ],
    category: 'Luxury',
    inStock: true,
    options: {
      styles: [
        { name: 'Classic Luxury', price: 0 },
        { name: 'Premium Package', price: 20 },
        { name: 'VIP Experience', price: 50 }
      ],
      sizes: [
        { name: 'Standard Set', price: 0 },
        { name: 'Large Display', price: 25 },
        { name: 'Grand Arrangement', price: 60 }
      ]
    }
  },
  {
    id: 'rose-charm-balloon',
    name: 'Rose Charm Balloon',
    description: 'Elegant rose-themed balloon with charming details. Perfect for garden parties, romantic dinners, or floral-themed events.',
    price: 26.00,
    image: '/images/rose-charm-balloon-26.jpg',
    images: [
      '/images/rose-charm-balloon-26.jpg'
    ],
    category: 'Floral',
    inStock: true,
    options: {
      styles: [
        { name: 'Single Rose', price: 0 },
        { name: 'Rose Bouquet', price: 10 },
        { name: 'Premium Rose Garden', price: 20 }
      ],
      colors: [
        { name: 'Classic Red Rose', price: 0 },
        { name: 'Pink Roses', price: 0 },
        { name: 'White Roses', price: 0 },
        { name: 'Mixed Roses', price: 5 }
      ]
    }
  },
  {
    id: 'teddy-inside-balloon',
    name: 'Stuffed Balloon with Teddy Inside',
    description: 'Surprise balloon with adorable teddy bear inside. Perfect gift for children, birthdays, or anyone who loves cuddly surprises.',
    price: 35.00,
    image: '/images/teddy-inside-balloon-35.jpg',
    images: [
      '/images/teddy-inside-balloon-35.jpg'
    ],
    category: 'Kids',
    inStock: true,
    options: {
      styles: [
        { name: 'Standard Teddy', price: 0 },
        { name: 'Large Teddy', price: 10 },
        { name: 'Premium Plush', price: 20 }
      ],
      colors: [
        { name: 'Brown Teddy', price: 0 },
        { name: 'White Teddy', price: 0 },
        { name: 'Pink Teddy', price: 0 },
        { name: 'Custom Color', price: 5 }
      ]
    }
  },
  {
    id: 'love-bouquet',
    name: 'Love Bouquet',
    description: 'Romantic love-themed balloon bouquet perfect for anniversaries, proposals, or expressing your feelings to someone special.',
    price: 30.00,
    image: '/images/love-bouquet-30.jpg',
    images: [
      '/images/love-bouquet-30.jpg'
    ],
    category: 'Romance',
    inStock: true,
    options: {
      styles: [
        { name: 'Classic Love', price: 0 },
        { name: 'Romantic Deluxe', price: 15 },
        { name: 'Proposal Package', price: 30 }
      ],
      sizes: [
        { name: 'Intimate Bouquet', price: 0 },
        { name: 'Standard Bouquet', price: 10 },
        { name: 'Grand Gesture', price: 25 }
      ]
    }
  },
  {
    id: 'wine-balloon',
    name: 'Stuffed Wine Balloon',
    description: 'Sophisticated balloon arrangement perfect for wine lovers, celebrations, or adult parties. Elegant and mature design.',
    price: 35.00,
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
    price: 35.00,
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
    price: 35.00,
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
    price: 25.00,
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
    id: 'picture-special',
    name: 'Picture Special',
    description: 'Customizable balloon arrangement with photo integration. Perfect for personalized gifts, memorials, or special photo moments.',
    price: 40.00,
    image: '/images/picture-special-40.jpg',
    images: [
      '/images/picture-special-40.jpg'
    ],
    category: 'Personalized',
    inStock: true,
    options: {
      styles: [
        { name: 'Single Photo', price: 0 },
        { name: 'Photo Collage', price: 15 },
        { name: 'Premium Frame', price: 25 }
      ],
      sizes: [
        { name: 'Standard Photo', price: 0 },
        { name: 'Large Display', price: 12 },
        { name: 'Poster Size', price: 25 }
      ]
    }
  }
]

export const categories = [
  'All',
  'Romance',
  'Luxury',
  'Floral',
  'Kids',
  'Adult',
  'Modern',
  'Personalized'
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