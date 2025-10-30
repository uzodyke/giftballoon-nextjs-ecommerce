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
    id: 'birthday-deluxe-1',
    name: 'Happy Birthday Deluxe Balloon Bouquet',
    description: 'A vibrant and colorful balloon arrangement perfect for birthday celebrations. Includes premium latex balloons, foil number balloons, and decorative ribbons.',
    price: 29.99,
    image: '/images/balloon-bouquet-1.jpg',
    images: [
      '/images/balloon-bouquet-1.jpg',
      '/images/balloon-bouquet-1-alt.jpg'
    ],
    category: 'Birthday',
    inStock: true,
    options: {
      styles: [
        { name: 'Standard', price: 0 },
        { name: 'Premium with Number', price: 10 },
        { name: 'Deluxe with Foil Shapes', price: 20 }
      ],
      sizes: [
        { name: 'Small (6 balloons)', price: 0 },
        { name: 'Medium (12 balloons)', price: 15 },
        { name: 'Large (18 balloons)', price: 30 }
      ]
    }
  },
  {
    id: 'wedding-elegant-1',
    name: 'Elegant Wedding Balloon Arch',
    description: 'Sophisticated balloon arch arrangement perfect for wedding ceremonies and receptions. Features white, gold, and blush colored balloons with premium finishes.',
    price: 149.99,
    image: '/images/wedding-balloons-1.jpg',
    images: [
      '/images/wedding-balloons-1.jpg',
      '/images/wedding-balloons-1-alt.jpg'
    ],
    category: 'Wedding',
    inStock: true,
    options: {
      styles: [
        { name: 'Classic Arch', price: 0 },
        { name: 'Heart Shape', price: 50 },
        { name: 'Custom Design', price: 100 }
      ],
      sizes: [
        { name: 'Small (6ft)', price: 0 },
        { name: 'Medium (10ft)', price: 75 },
        { name: 'Large (15ft)', price: 150 }
      ]
    }
  },
  {
    id: 'graduation-success-1',
    name: 'Graduation Success Celebration',
    description: 'Celebrate academic achievements with this graduation-themed balloon arrangement. Includes graduation cap balloons, star shapes, and school color options.',
    price: 39.99,
    image: '/images/graduation-balloons-1.jpg',
    images: [
      '/images/graduation-balloons-1.jpg',
      '/images/graduation-balloons-1-alt.jpg'
    ],
    category: 'Graduation',
    inStock: true,
    options: {
      styles: [
        { name: 'Basic Bouquet', price: 0 },
        { name: 'With Graduation Cap', price: 15 },
        { name: 'School Colors Theme', price: 25 }
      ],
      colors: [
        { name: 'Blue & Gold', price: 0 },
        { name: 'Red & White', price: 0 },
        { name: 'Green & Yellow', price: 0 },
        { name: 'Custom Colors', price: 10 }
      ]
    }
  },
  {
    id: 'corporate-professional-1',
    name: 'Corporate Event Professional Display',
    description: 'Professional balloon arrangements suitable for corporate events, product launches, and business celebrations. Customizable with company colors and branding.',
    price: 89.99,
    image: '/images/corporate-balloons-1.jpg',
    images: [
      '/images/corporate-balloons-1.jpg',
      '/images/corporate-balloons-1-alt.jpg'
    ],
    category: 'Corporate',
    inStock: true,
    options: {
      styles: [
        { name: 'Standard Display', price: 0 },
        { name: 'With Company Logo', price: 40 },
        { name: 'Premium Branding Package', price: 80 }
      ],
      sizes: [
        { name: 'Small Setup', price: 0 },
        { name: 'Medium Display', price: 50 },
        { name: 'Large Installation', price: 120 }
      ]
    }
  },
  {
    id: 'anniversary-romantic-1',
    name: 'Romantic Anniversary Heart Bouquet',
    description: 'Express your love with this romantic heart-shaped balloon bouquet. Perfect for anniversaries, proposals, and romantic gestures.',
    price: 34.99,
    image: '/images/anniversary-balloons-1.jpg',
    images: [
      '/images/anniversary-balloons-1.jpg',
      '/images/anniversary-balloons-1-alt.jpg'
    ],
    category: 'Anniversary',
    inStock: true,
    options: {
      styles: [
        { name: 'Classic Hearts', price: 0 },
        { name: 'With Love Message', price: 12 },
        { name: 'Premium Foil Hearts', price: 25 }
      ],
      colors: [
        { name: 'Red & Pink', price: 0 },
        { name: 'Gold & White', price: 5 },
        { name: 'Silver & Black', price: 5 }
      ]
    }
  },
  {
    id: 'baby-shower-1',
    name: 'Baby Shower Celebration Set',
    description: 'Welcome the new arrival with this adorable baby shower balloon set. Available in blue, pink, or neutral colors with cute baby-themed shapes.',
    price: 44.99,
    image: '/images/baby-shower-balloons-1.jpg',
    images: [
      '/images/baby-shower-balloons-1.jpg',
      '/images/baby-shower-balloons-1-alt.jpg'
    ],
    category: 'Baby Shower',
    inStock: true,
    options: {
      styles: [
        { name: 'Basic Bundle', price: 0 },
        { name: 'With Baby Bottles', price: 18 },
        { name: 'Deluxe with Stork', price: 35 }
      ],
      colors: [
        { name: 'Baby Blue', price: 0 },
        { name: 'Baby Pink', price: 0 },
        { name: 'Neutral Yellow', price: 0 },
        { name: 'Mixed Pastels', price: 8 }
      ]
    }
  }
]

export const categories = [
  'All',
  'Birthday',
  'Wedding',
  'Graduation',
  'Corporate',
  'Anniversary',
  'Baby Shower'
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