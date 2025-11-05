import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo">
              🛍️
            </div>
            <span className="navbar-title">Bazar Universal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <span className="nav-icon">🏠</span>
              Inicio
            </Link>
            <Link 
              to="/sales" 
              className={`nav-link ${isActive('/sales') ? 'active' : ''}`}
            >
              <span className="nav-icon">📋</span>
              Compras
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Inicio
          </Link>
          <Link 
            to="/sales" 
            className={`mobile-nav-link ${isActive('/sales') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">📋</span>
            Compras Registradas
          </Link>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          z-index: 50;
          box-shadow: var(--shadow-sm);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          height: 70px;
          width: 100%;
          box-sizing: border-box;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .navbar-logo {
          font-size: 2rem;
        }

        .navbar-title {
          color: var(--primary-color);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          border-radius: var(--border-radius);
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--primary-color);
          background-color: rgba(99, 102, 241, 0.1);
        }

        .nav-link.active {
          color: var(--primary-color);
          background-color: rgba(99, 102, 241, 0.1);
        }

        .nav-icon {
          font-size: 1.1rem;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          position: relative;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background-color: var(--text-primary);
          border-radius: 1px;
          transition: var(--transition);
        }

        .hamburger span:nth-child(1) {
          transform-origin: top left;
        }

        .hamburger span:nth-child(2) {
          margin: 4px 0;
        }

        .hamburger span:nth-child(3) {
          transform-origin: bottom left;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(2px, -2px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(2px, 2px);
        }

        .mobile-nav {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          display: none;
          flex-direction: column;
          padding: 1rem;
          gap: 0.5rem;
          transform: translateY(-100%);
          transition: var(--transition);
        }

        .mobile-nav.active {
          transform: translateY(0);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          border-radius: var(--border-radius);
          transition: var(--transition);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--primary-color);
          background-color: rgba(99, 102, 241, 0.1);
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 1rem 1.5rem;
            width: 100%;
            max-width: 100%;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-nav {
            display: flex;
          }

          .navbar-brand {
            font-size: 1.1rem;
          }

          .navbar-logo {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 1rem;
          }

          .navbar-brand {
            font-size: 1rem;
          }

          .navbar-logo {
            font-size: 1.5rem;
          }

          .navbar-title {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
