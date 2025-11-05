// API configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://api-bazar-universal-u1nf.onrender.com/api/v1'  // 🎯 Tu API en Render
  : 'http://localhost:8000/api/v1'

// API service functions
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    const config = { ...defaultOptions, ...options }
    
    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Products API
  async getProducts(skip = 0, limit = 100) {
    return this.request(`/products?skip=${skip}&limit=${limit}`)
  }

  async searchProducts(query, page = 1, perPage = 10) {
    return this.request(`/products/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`)
  }

  async getProduct(id) {
    return this.request(`/products/${id}`)
  }

  async getProductsByCategory(category, skip = 0, limit = 100) {
    return this.request(`/products/category/${encodeURIComponent(category)}?skip=${skip}&limit=${limit}`)
  }

  // Sales API
  async getSales(skip = 0, limit = 100) {
    return this.request(`/sales?skip=${skip}&limit=${limit}`)
  }

  async getSalesStats() {
    return this.request('/sales/stats')
  }

  async createSale(productId, quantity = 1) {
    return this.request('/sales', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity
      })
    })
  }

  async getSale(id) {
    return this.request(`/sales/${id}`)
  }
}

// Create singleton instance
export const apiService = new ApiService()

// Helper functions for backward compatibility
export const getProducts = () => apiService.getProducts()
export const searchProducts = (query) => apiService.searchProducts(query).then(result => result.products)
export const getProductById = (id) => apiService.getProduct(id)
export const getSales = () => apiService.getSales().then(result => result.sales)
export const getSalesStats = () => apiService.getSalesStats()
export const addSale = (productId, quantity) => apiService.createSale(productId, quantity)
