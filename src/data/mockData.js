// API integration for Bazar Universal
import { apiService } from '../services/apiService.js'

// Cache for API responses
let productsCache = null
let salesCache = null

// Fallback data for offline scenarios  
const fallbackProducts = [
  {
    id: 1,
    title: "iPhone X",
    description: "SIM-Free, Model A1901 6.5' Super Retina HD display with OLED technology A12 Bionic chip",
    price: 10200,
    category: "Smartphone", 
    brand: "Apple",
    stock: 15,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop"
    ],
    features: [
      "6.5' Super Retina HD display",
      "OLED technology",
      "A12 Bionic chip",
      "Face ID",
      "Wireless charging"
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    description: "128GB, 8GB RAM, Triple Camera, 6.2' Dynamic AMOLED display",
    price: 8500,
    category: "Smartphone",
    brand: "Samsung",
    stock: 8,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    ],
    features: [
      "6.2' Dynamic AMOLED display",
      "Triple camera system",
      "8GB RAM",
      "128GB storage",
      "5G connectivity"
    ]
  },
  {
    id: 3,
    title: "MacBook Pro 13'",
    description: "Apple M1 chip, 8GB RAM, 256GB SSD, 13.3' Retina display",
    price: 25000,
    category: "Laptop",
    brand: "Apple",
    stock: 5,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
    ],
    features: [
      "Apple M1 chip",
      "8GB unified memory",
      "256GB SSD storage",
      "13.3' Retina display",
      "Up to 17 hours battery life"
    ]
  },
  {
    id: 4,
    title: "Sony WH-1000XM4",
    description: "Wireless Noise Canceling Headphones, 30-hour battery life",
    price: 3500,
    category: "Audio",
    brand: "Sony",
    stock: 12,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop"
    ],
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Touch sensor controls",
      "Quick attention mode",
      "Wireless charging"
    ]
  },
  {
    id: 5,
    title: "Dell XPS 13",
    description: "11th Gen Intel Core i7, 16GB RAM, 512GB SSD, 13.4' InfinityEdge display",
    price: 22000,
    category: "Laptop",
    brand: "Dell",
    stock: 7,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
    ],
    features: [
      "11th Gen Intel Core i7",
      "16GB LPDDR4x RAM",
      "512GB NVMe SSD",
      "13.4' InfinityEdge display",
      "Thunderbolt 4 ports"
    ]
  },
  {
    id: 6,
    title: "Nintendo Switch",
    description: "Gaming console with Joy-Con controllers, 32GB internal storage",
    price: 7500,
    category: "Gaming",
    brand: "Nintendo",
    stock: 20,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop"
    ],
    features: [
      "Portable gaming",
      "Joy-Con controllers",
      "32GB internal storage",
      "6.2' capacitive touchscreen",
      "Dock for TV gaming"
    ]
  },
  {
    id: 7,
    title: "iPad Pro 11'",
    description: "Apple M1 chip, 128GB, Wi-Fi, Liquid Retina display",
    price: 18000,
    category: "Tablet",
    brand: "Apple",
    stock: 10,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop"
    ],
    features: [
      "Apple M1 chip",
      "11' Liquid Retina display",
      "128GB storage",
      "12MP cameras",
      "Apple Pencil compatible"
    ]
  },
  {
    id: 8,
    title: "AirPods Pro",
    description: "Active Noise Cancellation, Transparency mode, Spatial audio",
    price: 4500,
    category: "Audio",
    brand: "Apple",
    stock: 25,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1603351154351-5e2d2e50ee21?w=400&h=400&fit=crop"
    ],
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio",
      "Adaptive EQ",
      "Lightning charging case"
    ]
  },
  {
    id: 9,
    title: "HP Pavilion 15",
    description: "AMD Ryzen 5, 8GB RAM, 512GB SSD, 15.6' Full HD display",
    price: 15000,
    category: "Laptop",
    brand: "HP",
    stock: 9,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop"
    ],
    features: [
      "AMD Ryzen 5 processor",
      "8GB DDR4 RAM",
      "512GB SSD storage",
      "15.6' Full HD display",
      "Backlit keyboard"
    ]
  },
  {
    id: 10,
    title: "PlayStation 5",
    description: "Next-gen gaming console with 825GB SSD and DualSense controller",
    price: 12000,
    category: "Gaming",
    brand: "Sony",
    stock: 3,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop"
    ],
    features: [
      "Custom AMD Zen 2 CPU",
      "825GB SSD storage",
      "DualSense controller",
      "Ray tracing support",
      "4K gaming capability"
    ]
  }
];

// Datos de prueba para compras registradas
export const mockSales = [
  {
    id: 1,
    productId: 1,
    productTitle: "iPhone X",
    productImage: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop",
    price: 10200,
    quantity: 1,
    total: 10200,
    date: "2024-11-01T10:30:00Z",
    status: "Completada"
  },
  {
    id: 2,
    productId: 4,
    productTitle: "Sony WH-1000XM4",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    price: 3500,
    quantity: 1,
    total: 3500,
    date: "2024-11-02T14:15:00Z",
    status: "Completada"
  },
  {
    id: 3,
    productId: 6,
    productTitle: "Nintendo Switch",
    productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: 7500,
    quantity: 1,
    total: 7500,
    date: "2024-11-03T09:45:00Z",
    status: "Completada"
  }
];

// API-integrated functions with fallback
export const searchProducts = async (query) => {
  if (!query) return [];
  
  try {
    const result = await apiService.searchProducts(query)
    return result.products || result
  } catch (error) {
    console.warn('API search failed, using fallback:', error)
    const searchTerm = query.toLowerCase()
    return fallbackProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    )
  }
}

export const getProductById = async (id) => {
  try {
    return await apiService.getProduct(id)
  } catch (error) {
    console.warn('API getProduct failed, using fallback:', error)
    return fallbackProducts.find(product => product.id === parseInt(id))
  }
}

export const getProducts = async () => {
  if (productsCache) return productsCache
  
  try {
    productsCache = await apiService.getProducts()
    return productsCache
  } catch (error) {
    console.warn('API getProducts failed, using fallback:', error)
    productsCache = fallbackProducts
    return fallbackProducts
  }
}

export const addSale = async (productId, quantity = 1) => {
  try {
    await apiService.createSale(productId, quantity)
    salesCache = null // Clear cache to force refresh
    return true
  } catch (error) {
    console.warn('API addSale failed:', error)
    // Fallback to mock behavior
    const product = await getProductById(productId)
    if (!product) return false
    
    const newSale = {
      id: mockSales.length + 1,
      product_id: product.id,
      product_title: product.title,
      product_image: product.images[0],
      price: product.price,
      quantity: quantity,
      total: product.price * quantity,
      date: new Date().toISOString(),
      status: "Completada"
    }
    
    mockSales.push(newSale)
    return true
  }
}

export const getSales = async () => {
  if (salesCache) return salesCache
  
  try {
    const result = await apiService.getSales()
    salesCache = result.sales || result
    return salesCache
  } catch (error) {
    console.warn('API getSales failed, using fallback:', error)
    salesCache = mockSales
    return mockSales
  }
}
