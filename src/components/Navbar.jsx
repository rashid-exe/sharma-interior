import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/images/logo.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar px-6 py-4 md:px-12 ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="Sharma Interior Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase transition-all duration-300 relative group ${
                    isActive ? 'text-gold' : 'text-cream/70 hover:text-cream'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:9971870698"
              className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors duration-300"
            >
              <Phone size={14} />
              <span className="tracking-wider">9971870698</span>
            </a>
            <a href="/catalogue" className="btn-gold text-xs py-2.5 px-5">
              View Catalogue
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cream/80 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-90 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 99 }}
      >
        <div
          className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div className={`relative h-full flex flex-col items-center justify-center gap-8 transition-all duration-500 ${mobileOpen ? 'translate-y-0' : '-translate-y-8'}`}>
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={({ isActive }) =>
                `font-display text-4xl font-light tracking-wider transition-all duration-300 ${
                  isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
                } ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="tel:9971870698"
            className="flex items-center gap-2 text-cream/60 hover:text-gold transition-colors mt-4"
          >
            <Phone size={16} />
            <span className="tracking-widest text-sm">9971870698</span>
          </a>
        </div>
      </div>
    </>
  );
}
