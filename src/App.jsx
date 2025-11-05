import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Importar páginas
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'
import Sales from './pages/Sales'

// Importar componentes globales
import Navbar from './components/Navbar'
import { getSales, addSale } from './data/mockData'

function App() {
  const [sales, setSales] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSales = async () => {
      try {
        const salesData = await getSales()
        setSales(salesData)
      } catch (error) {
        console.error('Failed to load sales:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSales()
  }, [])

  const addNewSale = async (productId, quantity = 1) => {
    try {
      const success = await addSale(productId, quantity)
      if (success) {
        // Refresh sales data
        const updatedSales = await getSales()
        setSales(updatedSales)
      }
      return success
    } catch (error) {
      console.error('Failed to add sale:', error)
      return false
    }
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<SearchResults />} />
            <Route path="/item/:id" element={<ProductDetail onAddSale={addNewSale} />} />
            <Route path="/sales" element={<Sales sales={sales} isLoading={isLoading} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
