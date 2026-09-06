import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoMark } from './LogoMark';
import { BRAND } from '../../utils/constants';
import { Menu, X, ShieldCheck, Phone, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { scrollToSection } from './ScrollManager';

export function BrandHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'hero' },
    { name: 'Services', path: '/#services', sectionId: 'services' },
    { name: 'About Us', path: '/#about', sectionId: 'about' },
    { name: 'Success Stories', path: '/#stories', sectionId: 'stories' },
    { name: 'Contact', path: '/#contact', sectionId: 'contact' }
  ];

  // Active section scroll spy when on homepage
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = ['contact', 'stories', 'about', 'services', 'hero'];

      for (const id of sections) {
        const elem = document.getElementById(id);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHomePage) {
      if (link.sectionId === 'hero' || link.path === '/') {
        scrollToSection('top');
      } else {
        scrollToSection(link.sectionId);
      }
    } else {
      // Navigate to homepage with target hash
      navigate(link.path);
    }
  };

  const handleLogoClick = (e) => {
    setMobileMenuOpen(false);
    if (isHomePage) {
      e.preventDefault();
      scrollToSection('top');
    }
  };

  const handleRegisterClick = (e) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/register') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (link) => {
    if (!isHomePage) {
      return false;
    }
    if (link.sectionId === 'hero') {
      return activeSection === 'hero' || !activeSection;
    }
    return activeSection === link.sectionId;
  };

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Top Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--maroon-950) 0%, var(--maroon-900) 50%, var(--maroon-950) 100%)',
          color: 'var(--gold-100)',
          padding: '0.35rem 1rem',
          fontSize: '0.775rem',
          borderBottom: '1px solid rgba(199, 150, 47, 0.3)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--gold-300)' }}>❖</span>
            <span style={{ fontWeight: 500 }}>
              {BRAND.tagline}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href={`tel:${BRAND.phones[0]}`}
              style={{ color: 'var(--gold-100)', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
              title="Call Helpline"
            >
              <Phone size={12} color="var(--gold-300)" />
              <span>{BRAND.displayPhones}</span>
            </a>
            <Link
              to={isAuthenticated ? '/admin' : '/admin/login'}
              style={{
                color: 'var(--gold-300)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                opacity: 0.9,
                textDecoration: 'none'
              }}
              title="Admin Portal"
            >
              <ShieldCheck size={12} />
              <span>{isAuthenticated ? 'Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.65rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo & Tamil Title */}
          <Link
            to="/"
            onClick={handleLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', cursor: 'pointer' }}
            title="Rani Matrimony Home"
          >
            <LogoMark size={46} />
            <div>
              <div
                className="font-tamil-brand"
                style={{
                  color: 'var(--maroon-900)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                  fontWeight: 800,
                  lineHeight: 1.15
                }}
              >
                {BRAND.tamilName}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--gold-800)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                {BRAND.englishName}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{
                    color: active ? 'var(--maroon-900)' : 'var(--ink)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.9rem',
                    position: 'relative',
                    padding: '0.35rem 0.15rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast)'
                  }}
                  className="nav-link-item"
                >
                  {link.name}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--maroon-700)',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </a>
              );
            })}

            <Link
              to="/register"
              onClick={handleRegisterClick}
              className="btn btn-primary btn-sm"
              style={{
                padding: '0.55rem 1.15rem',
                border: location.pathname === '/register' ? '2px solid var(--gold-300)' : undefined
              }}
              title="Register Profile Online"
            >
              <HeartHandshake size={16} />
              <span>Register Profile</span>
            </Link>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem',
              color: 'var(--maroon-900)',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              animation: 'fadeIn 0.2s ease-in-out'
            }}
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    color: active ? 'var(--maroon-900)' : 'var(--ink)',
                    backgroundColor: active ? 'var(--cream)' : 'transparent',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.name}</span>
                  {active && <span style={{ color: 'var(--maroon-700)', fontSize: '0.8rem' }}>●</span>}
                </a>
              );
            })}

            <div style={{ paddingTop: '0.5rem', marginTop: '0.25rem', borderTop: '1px dashed var(--border)' }}>
              <Link
                to="/register"
                onClick={handleRegisterClick}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <HeartHandshake size={18} />
                <span>Register Profile Online</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .nav-link-item:hover {
          color: var(--maroon-700) !important;
        }
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
