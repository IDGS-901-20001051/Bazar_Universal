import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/mockData'

const ProductDetail = ({ onAddSale }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      
      try {
        const foundProduct = await getProductById(id)
        setProduct(foundProduct)
      } catch (error) {
        console.error('Failed to load product:', error)
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">⭐</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">⭐</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>)
    }

    return stars
  }

  const handlePurchase = async () => {
    if (!product) return

    setIsPurchasing(true)
    
    try {
      const success = await onAddSale(product.id, quantity)
      
      if (success) {
        alert('¡Compra registrada exitosamente!')
        navigate('/sales')
      } else {
        alert('Error al registrar la compra')
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Error al registrar la compra')
    } finally {
      setIsPurchasing(false)
    }
  }

  const shareProduct = async () => {
    const shareData = {
      title: product.title,
      text: `${product.title} - ${formatPrice(product.price)}`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Enlace copiado al portapapeles')
      })
    }
  }

  if (isLoading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando producto...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Producto no encontrado</h2>
            <p>El producto que buscas no existe o ha sido eliminado.</p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span className="separator">/</span>
          <span className="current">{product.title}</span>
        </nav>

        {/* Product Detail */}
        <div className="product-detail">
          {/* Images Section */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="main-img"
              />
              <button 
                className="share-btn"
                onClick={shareProduct}
                aria-label="Compartir producto"
              >
                📤 Compartir
              </button>
            </div>
            
            {product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-meta">
                <span className="category">{product.category}</span>
                <span className="brand">{product.brand}</span>
              </div>
              
              <h1 className="product-title">{product.title}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-value">({product.rating})</span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            {product.features && (
              <div className="product-features">
                <h3>Características</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-stock">
              <div className="stock-info">
                <span className="stock-label">Disponibilidad:</span>
                <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                </span>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Cantidad:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      min="1"
                      max={product.stock}
                    />
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="total-price">
                  <span>Total: {formatPrice(product.price * quantity)}</span>
                </div>

                <button 
                  className="btn btn-primary btn-lg purchase-btn"
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? (
                    <>
                      <span className="loading"></span>
                      Registrando compra...
                    </>
                  ) : (
                    'Comprar'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-detail-page {
          min-height: calc(100vh - 80px);
          padding: 2rem 0;
          background-color: var(--bg-secondary);
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .product-detail-page .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
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

        .not-found {
          text-align: center;
          padding: 4rem 2rem;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          width: 100%;
          max-width: 1200px;
        }

        .breadcrumb a {
          color: var(--primary-color);
          text-decoration: none;
        }

        .breadcrumb .separator {
          color: var(--text-light);
        }

        .breadcrumb .current {
          color: var(--text-secondary);
        }

        .product-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          background-color: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .product-images {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-image {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: var(--border-radius);
          overflow: hidden;
          background-color: var(--bg-gray);
        }

        .main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .share-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: var(--border-radius);
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
          backdrop-filter: blur(4px);
        }

        .share-btn:hover {
          background-color: rgba(255, 255, 255, 1);
        }

        .image-thumbnails {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding: 0.5rem 0;
        }

        .thumbnail {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border: 2px solid transparent;
          border-radius: var(--border-radius);
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition);
          background: none;
          padding: 0;
        }

        .thumbnail.active {
          border-color: var(--primary-color);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category {
          background-color: rgba(99, 102, 241, 0.1);
          color: var(--primary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .brand {
          color: var(--text-light);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .product-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stars {
          display: flex;
          gap: 0.1rem;
        }

        .star {
          font-size: 1.1rem;
        }

        .star.empty {
          opacity: 0.3;
        }

        .rating-value {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .product-price {
          padding: 1rem 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }

        .current-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .product-description h3,
        .product-features h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .product-description p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .product-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .product-features li {
          color: var(--text-secondary);
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-light);
          position: relative;
          padding-left: 1.5rem;
        }

        .product-features li:before {
          content: '✓';
          color: var(--success-color);
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .product-features li:last-child {
          border-bottom: none;
        }

        .stock-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stock-label {
          font-weight: 500;
          color: var(--text-primary);
        }

        .stock-status.in-stock {
          color: var(--success-color);
          font-weight: 500;
        }

        .stock-status.out-of-stock {
          color: var(--danger-color);
          font-weight: 500;
        }

        .purchase-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background-color: var(--bg-gray);
          border-radius: var(--border-radius);
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quantity-selector label {
          font-weight: 500;
          color: var(--text-primary);
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .quantity-controls button {
          background-color: var(--bg-primary);
          border: none;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: var(--transition);
          font-size: 1.1rem;
          font-weight: 500;
        }

        .quantity-controls button:hover:not(:disabled) {
          background-color: var(--bg-gray);
        }

        .quantity-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-controls input {
          border: none;
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          padding: 0.75rem;
          width: 60px;
          text-align: center;
          font-size: 1rem;
        }

        .total-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          text-align: center;
        }

        .purchase-btn {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .product-detail-page .container {
            padding: 0 1.5rem;
            width: 100%;
            max-width: 100%;
          }

          .product-detail {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
            width: 100%;
            max-width: 100%;
          }

          .main-image {
            height: 300px;
          }

          .product-title {
            font-size: 1.5rem;
          }

          .current-price {
            font-size: 2rem;
          }

          .quantity-selector {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .breadcrumb {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .product-detail-page {
            padding: 1rem 0;
          }

          .product-detail-page .container {
            padding: 0 1rem;
            width: 100%;
            max-width: 100%;
          }

          .product-detail {
            padding: 1rem;
            width: 100%;
          }

          .breadcrumb {
            margin-bottom: 1rem;
            width: 100%;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ProductDetail
