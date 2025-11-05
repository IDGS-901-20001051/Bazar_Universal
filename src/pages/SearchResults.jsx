import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchProducts } from '../data/mockData'
import ProductCard from '../components/ProductCard'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true)
      
      try {
        if (searchQuery) {
          const searchResults = await searchProducts(searchQuery)
          setResults(searchResults)
        } else {
          setResults([])
        }
      } catch (error) {
        console.error('Search failed:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [searchQuery])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="search-results-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Buscando productos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="search-results-page">
      <div className="container">
        {/* Header con información de búsqueda */}
        <div className="search-header">
          <div className="search-info">
            <h1 className="search-title">
              Resultados de búsqueda
            </h1>
            {searchQuery && (
              <p className="search-query">
                Buscaste: <strong>"{searchQuery}"</strong>
              </p>
            )}
            <p className="results-count">
              {results.length === 0 
                ? 'No se encontraron productos' 
                : `${results.length} producto${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {/* Botón para nueva búsqueda */}
          <Link to="/" className="btn btn-secondary">
            Nueva búsqueda
          </Link>
        </div>

        {/* Resultados */}
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No encontramos productos</h3>
            <p>Intenta con otros términos de búsqueda</p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="no-search">
            <div className="no-search-icon">🏠</div>
            <h3>¿Qué estás buscando?</h3>
            <p>Usa la búsqueda para encontrar productos</p>
            <Link to="/" className="btn btn-primary">
              Ir al inicio
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-results-page {
          min-height: calc(100vh - 80px);
          padding: 2rem 0;
          background-color: var(--bg-secondary);
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .search-results-page .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          width: 100%;
          max-width: 1200px;
        }

        .search-info {
          flex: 1;
        }

        .search-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .search-query {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .results-count {
          color: var(--text-light);
          font-size: 0.95rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          justify-items: center;
          width: 100%;
          max-width: 1200px;
        }

        .no-results,
        .no-search {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 400px;
          gap: 1rem;
        }

        .no-results-icon,
        .no-search-icon {
          font-size: 4rem;
          opacity: 0.6;
        }

        .no-results h3,
        .no-search h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .no-results p,
        .no-search p {
          color: var(--text-secondary);
          font-size: 1rem;
          margin: 0 0 1.5rem 0;
        }

        @media (max-width: 768px) {
          .search-results-page .container {
            padding: 0 1.5rem;
            width: 100%;
            max-width: 100%;
          }

          .search-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            width: 100%;
          }

          .search-title {
            font-size: 1.5rem;
          }

          .results-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .search-results-page {
            padding: 1rem 0;
          }

          .search-results-page .container {
            padding: 0 1rem;
            width: 100%;
            max-width: 100%;
          }

          .results-grid {
            grid-template-columns: 1fr;
            width: 100%;
          }

          .search-header {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default SearchResults
