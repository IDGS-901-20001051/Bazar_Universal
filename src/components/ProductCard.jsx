import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
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

  const shareProduct = async () => {
    const shareData = {
      title: product.title,
      text: `${product.title} - ${formatPrice(product.price)}`,
      url: `${window.location.origin}/item/${product.id}`
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const url = shareData.url
      navigator.clipboard.writeText(url).then(() => {
        alert('Enlace copiado al portapapeles')
      })
    }
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <div className="product-badges">
          {product.stock <= 5 && product.stock > 0 && (
            <span className="badge badge-warning">Pocas unidades</span>
          )}
          {product.stock === 0 && (
            <span className="badge badge-danger">Agotado</span>
          )}
        </div>
        <button 
          className="share-btn"
          onClick={shareProduct}
          aria-label="Compartir producto"
        >
          📤
        </button>
      </div>

      <div className="product-info">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <span className="product-brand">{product.brand}</span>
        </div>

        <h3 className="product-title">
          <Link to={`/item/${product.id}`}>
            {product.title}
          </Link>
        </h3>

        <p className="product-description">
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description
          }
        </p>

        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-value">({product.rating})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="price">{formatPrice(product.price)}</span>
          </div>
          
          <Link 
            to={`/item/${product.id}`} 
            className="btn btn-primary btn-sm"
          >
            Ver detalles
          </Link>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background-color: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid var(--border-light);
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }

        .product-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .share-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: var(--transition);
          backdrop-filter: blur(4px);
        }

        .share-btn:hover {
          background-color: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }

        .product-info {
          padding: 1.25rem;
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .product-category {
          font-size: 0.75rem;
          color: var(--primary-color);
          background-color: rgba(99, 102, 241, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .product-brand {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .product-title {
          margin: 0 0 0.75rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .product-title a {
          color: var(--text-primary);
          text-decoration: none;
          transition: var(--transition);
        }

        .product-title a:hover {
          color: var(--primary-color);
        }

        .product-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .stars {
          display: flex;
          gap: 0.1rem;
        }

        .star {
          font-size: 0.9rem;
        }

        .star.empty {
          opacity: 0.3;
        }

        .rating-value {
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .product-price {
          flex: 1;
        }

        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        @media (max-width: 480px) {
          .product-info {
            padding: 1rem;
          }

          .product-title {
            font-size: 1rem;
          }

          .product-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductCard
