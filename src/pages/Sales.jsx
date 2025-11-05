import { Link } from 'react-router-dom'

const Sales = ({ sales, isLoading }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getTotalAmount = () => {
    return sales.reduce((total, sale) => total + sale.total, 0)
  }

  const getTotalItems = () => {
    return sales.reduce((total, sale) => total + sale.quantity, 0)
  }

  if (isLoading) {
    return (
      <div className="sales-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando compras...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="sales-page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Compras Registradas</h1>
          </div>
          
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h3>No hay compras registradas</h3>
            <p>Cuando realices compras aparecerán aquí</p>
            <Link to="/" className="btn btn-primary">
              Ir a comprar
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sales-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Compras Registradas</h1>
            <p className="page-subtitle">
              Historial de todas tus compras realizadas
            </p>
          </div>
          <Link to="/" className="btn btn-secondary">
            Seguir comprando
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-value">{sales.length}</span>
              <span className="stat-label">Compras totales</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <span className="stat-value">{getTotalItems()}</span>
              <span className="stat-label">Productos comprados</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <span className="stat-value">{formatPrice(getTotalAmount())}</span>
              <span className="stat-label">Total gastado</span>
            </div>
          </div>
        </div>

        {/* Sales List */}
        <div className="sales-list">
          <h2 className="section-title">Historial de compras</h2>
          
          <div className="sales-grid">
            {sales.map(sale => (
              <div key={sale.id} className="sale-card">
                <div className="sale-header">
                  <div className="sale-id">
                    <span className="label">Compra #</span>
                    <span className="value">{sale.id.toString().padStart(3, '0')}</span>
                  </div>
                  <div className="sale-status">
                    <span className={`status-badge ${sale.status.toLowerCase()}`}>
                      {sale.status}
                    </span>
                  </div>
                </div>

                <div className="sale-product">
                  <div className="product-image">
                    <img 
                      src={sale.productImage} 
                      alt={sale.productTitle}
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="product-details">
                    <h3 className="product-title">{sale.productTitle}</h3>
                    <div className="product-info">
                      <span className="quantity">Cantidad: {sale.quantity}</span>
                      <span className="unit-price">
                        Precio unitario: {formatPrice(sale.price)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sale-footer">
                  <div className="sale-date">
                    <span className="date-label">Fecha de compra:</span>
                    <span className="date-value">{formatDate(sale.date)}</span>
                  </div>
                  
                  <div className="sale-total">
                    <span className="total-label">Total:</span>
                    <span className="total-value">{formatPrice(sale.total)}</span>
                  </div>
                </div>

                <div className="sale-actions">
                  <Link 
                    to={`/item/${sale.productId}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Ver producto
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sales-page {
          min-height: calc(100vh - 80px);
          padding: 2rem 0;
          background-color: var(--bg-secondary);
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .sales-page .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          width: 100%;
          max-width: 1200px;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          background-color: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
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

        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
          width: 100%;
          max-width: 1200px;
        }

        .stat-card {
          background-color: var(--bg-primary);
          padding: 1.5rem;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid var(--border-light);
        }

        .stat-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-color);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .sales-grid {
          display: grid;
          gap: 1.5rem;
          width: 100%;
          max-width: 1200px;
        }

        .sale-card {
          background-color: var(--bg-primary);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          border: 1px solid var(--border-light);
          transition: var(--transition);
        }

        .sale-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-1px);
        }

        .sale-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background-color: var(--bg-gray);
          border-bottom: 1px solid var(--border-light);
        }

        .sale-id .label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .sale-id .value {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 1.1rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-badge.completada {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .sale-product {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
        }

        .product-image {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: var(--border-radius);
          overflow: hidden;
          background-color: var(--bg-gray);
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .quantity,
        .unit-price {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .sale-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 1.5rem 1.5rem;
          gap: 1rem;
        }

        .sale-date {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .date-label {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .date-value {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .sale-total {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }

        .total-label {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .total-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .sale-actions {
          padding: 0 1.5rem 1.5rem;
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .sales-page .container {
            padding: 0 1.5rem;
            width: 100%;
            max-width: 100%;
          }

          .page-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            width: 100%;
          }

          .page-title {
            font-size: 2rem;
          }

          .stats-summary {
            grid-template-columns: 1fr;
            gap: 1rem;
            width: 100%;
          }

          .stat-card {
            padding: 1.25rem;
          }

          .sale-product {
            flex-direction: column;
            gap: 1rem;
          }

          .product-image {
            align-self: center;
            width: 100px;
            height: 100px;
          }

          .sale-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .sale-total {
            align-items: flex-start;
          }

          .sale-actions {
            justify-content: stretch;
          }

          .sale-actions .btn {
            width: 100%;
            justify-content: center;
          }

          .sales-grid {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .sales-page {
            padding: 1rem 0;
          }

          .sales-page .container {
            padding: 0 1rem;
            width: 100%;
            max-width: 100%;
          }

          .sale-card {
            margin: 0;
          }

          .sale-header,
          .sale-product,
          .sale-footer,
          .sale-actions {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .stats-summary,
          .sales-grid,
          .page-header {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Sales
