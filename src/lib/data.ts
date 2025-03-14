
export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'dryfruits' | 'spices' | 'wholesale';
  price: number;
  salePrice?: number;
  image: string;
  badges?: string[];
  stock: number;
  variants?: {
    size: string;
    price: number;
    salePrice?: number;
  }[];
  featured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Dry Fruits",
    slug: "dryfruits",
    description: "Premium quality dry fruits sourced from the finest orchards",
    image: "https://images.unsplash.com/photo-1638722275748-b40c83ce0792?q=80&w=2680&auto=format&fit=crop",
  },
  {
    id: "cat-2",
    name: "Spices",
    slug: "spices",
    description: "Authentic spices to enhance the flavor of your dishes",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2680&auto=format&fit=crop",
  },
  {
    id: "cat-3",
    name: "Wholesale Deals",
    slug: "wholesale",
    description: "Special bulk offers for businesses and large families",
    image: "https://images.unsplash.com/photo-1604599886859-5bf659667821?q=80&w=2680&auto=format&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium California Almonds",
    description: "Naturally sweet and crunchy California almonds, perfect for snacking or cooking.",
    category: "dryfruits",
    price: 899,
    salePrice: 699,
    image: "https://images.unsplash.com/photo-1604599886859-5bf659667821?q=80&w=2680&auto=format&fit=crop",
    badges: ["Bestseller", "Organic"],
    stock: 50,
    variants: [
      { size: "250g", price: 249, salePrice: 199 },
      { size: "500g", price: 449, salePrice: 399 },
      { size: "1kg", price: 899, salePrice: 699 },
    ],
    featured: true,
  },
  {
    id: "prod-2",
    name: "Premium Kashmiri Saffron",
    description: "Authentic Kashmiri saffron known for its distinct aroma and flavor.",
    category: "spices",
    price: 1499,
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2680&auto=format&fit=crop",
    badges: ["Limited Stock", "Premium"],
    stock: 10,
    variants: [
      { size: "1g", price: 499 },
      { size: "2g", price: 899 },
      { size: "5g", price: 1499 },
    ],
    featured: true,
  },
  {
    id: "prod-3",
    name: "Exotic Mixed Dry Fruits Pack",
    description: "A premium selection of almonds, cashews, raisins, and pistachios.",
    category: "dryfruits",
    price: 1299,
    salePrice: 999,
    image: "https://images.unsplash.com/photo-1638722275748-b40c83ce0792?q=80&w=2680&auto=format&fit=crop",
    badges: ["Bestseller", "Gift Pack"],
    stock: 30,
    variants: [
      { size: "500g", price: 699, salePrice: 599 },
      { size: "1kg", price: 1299, salePrice: 999 },
      { size: "2kg", price: 2499, salePrice: 1899 },
    ],
    featured: true,
  },
  {
    id: "prod-4",
    name: "Garam Masala Blend",
    description: "Traditional Indian spice blend, perfect for curries and rice dishes.",
    category: "spices",
    price: 299,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd0196?q=80&w=2680&auto=format&fit=crop",
    badges: ["Homemade", "Fresh"],
    stock: 45,
    variants: [
      { size: "100g", price: 129 },
      { size: "250g", price: 299 },
      { size: "500g", price: 549 },
    ],
    featured: true,
  },
  {
    id: "prod-5",
    name: "Premium Iranian Pistachios",
    description: "Crunchy, flavorful pistachios sourced directly from Iranian farms.",
    category: "dryfruits",
    price: 1299,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2680&auto=format&fit=crop",
    badges: ["Premium", "Imported"],
    stock: 20,
    variants: [
      { size: "250g", price: 399 },
      { size: "500g", price: 749 },
      { size: "1kg", price: 1299 },
    ],
    featured: false,
  },
  {
    id: "prod-6",
    name: "Wholesale Cashew Nuts",
    description: "Premium quality cashews available at wholesale prices for businesses.",
    category: "wholesale",
    price: 4999,
    salePrice: 3999,
    image: "https://images.unsplash.com/photo-1574204382731-d8e24f118db9?q=80&w=2640&auto=format&fit=crop",
    badges: ["Wholesale Only", "Bulk Deal"],
    stock: 100,
    variants: [
      { size: "5kg", price: 4999, salePrice: 3999 },
      { size: "10kg", price: 9499, salePrice: 7999 },
    ],
    featured: false,
  },
];

export const heroSlides = [
  {
    id: "slide-1",
    title: "Diwali Special Sale",
    subtitle: "Up to 30% off on premium dry fruits",
    image: "https://images.unsplash.com/photo-1638722275748-b40c83ce0792?q=80&w=2680&auto=format&fit=crop",
    buttonText: "Shop Now",
    link: "/category/dryfruits",
  },
  {
    id: "slide-2",
    title: "Authentic Spices",
    subtitle: "Directly sourced from farms across India",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd0196?q=80&w=2680&auto=format&fit=crop",
    buttonText: "Explore",
    link: "/category/spices",
  },
  {
    id: "slide-3",
    title: "Wholesale Deals",
    subtitle: "Special prices for bulk orders",
    image: "https://images.unsplash.com/photo-1604599886859-5bf659667821?q=80&w=2680&auto=format&fit=crop",
    buttonText: "View Deals",
    link: "/category/wholesale",
  },
];

// Cart functions and state management could be added in a separate file
export type CartItem = {
  productId: string;
  quantity: number;
  variant: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  isWholesale: boolean;
};

// Mock user for testing
export const mockUser: User = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  isLoggedIn: false,
  isWholesale: false,
};

// Initial cart state
export const initialCart: CartItem[] = [];
