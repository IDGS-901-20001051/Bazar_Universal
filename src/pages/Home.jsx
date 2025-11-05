import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/items?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Bazar Online
              </h1>
              <p className="hero-subtitle">
                Encuentra todo lo que necesitas en un solo lugar
              </p>
            </div>

            {/* Search Box */}
            <div className="search-section">
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Tecnología</h3>
              <p className="feature-description">
                Los últimos smartphones, laptops y gadgets
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Gaming</h3>
              <p className="feature-description">
                Consolas y accesorios para gamers
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3 className="feature-title">Audio</h3>
              <p className="feature-description">
                Auriculares y equipos de sonido premium
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3 className="feature-title">Computadoras</h3>
              <p className="feature-description">
                Laptops y equipos de cómputo profesionales
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          min-height: calc(100vh - 80px);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, #8b5cf6 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .search-section {
          margin-top: 2rem;
        }

        .search-form {
          display: flex;
          justify-content: center;
        }

        .search-box {
          position: relative;
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          background-color: white;
          border-radius: 50px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .search-icon {
          position: absolute;
          left: 1.5rem;
          color: var(--text-light);
          font-size: 1.2rem;
          z-index: 1;
        }

        .search-input {
          flex: 1;
          padding: 1.25rem 1.5rem 1.25rem 3.5rem;
          border: none;
          font-size: 1.1rem;
          color: var(--text-primary);
          background: transparent;
        }

        .search-input:focus {
          outline: none;
        }

        .search-input::placeholder {
          color: var(--text-light);
        }

        .search-btn {
          padding: 1.25rem 2rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .search-btn:hover {
          background-color: var(--primary-hover);
        }

        .features-section {
          padding: 4rem 0;
          background-color: var(--bg-primary);
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
          max-width: 1200px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding: 0 2rem;
          justify-items: center;
        }

        .feature-card {
          background-color: var(--bg-primary);
          padding: 2rem;
          border-radius: var(--border-radius-lg);
          text-align: center;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          border: 1px solid var(--border-light);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .feature-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .hero-content {
            padding: 0 1.5rem;
            width: 100%;
            max-width: 100%;
          }

          .search-box {
            margin: 0 auto;
            max-width: 95%;
            width: 100%;
          }

          .search-input {
            padding: 1rem 1rem 1rem 3rem;
            font-size: 1rem;
          }

          .search-btn {
            padding: 1rem 1.5rem;
            font-size: 0.9rem;
          }

          .search-icon {
            left: 1rem;
            font-size: 1rem;
          }

          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            padding: 0 1.5rem;
            width: 100%;
            max-width: 100%;
            margin: 2rem auto 0;
            justify-items: center;
          }

          .feature-card {
            padding: 1.5rem;
            width: 100%;
            max-width: 300px;
          }

          .feature-icon {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 3rem 0;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-content {
            padding: 0 1rem;
          }

          .search-box {
            flex-direction: column;
            border-radius: var(--border-radius-lg);
            max-width: 95%;
          }

          .search-input {
            padding: 1rem;
            text-align: center;
          }

          .search-icon {
            display: none;
          }

          .search-btn {
            width: 100%;
            border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
          }

          .features-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
            gap: 1rem;
            width: 100%;
            margin: 2rem auto 0;
          }

          .feature-card {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
