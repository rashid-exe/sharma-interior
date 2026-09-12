import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { useProjects } from '../context/ProjectsContext';

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const { categories } = useProjects();

  return (
    <footer style={{ background: 'var(--charcoal-2)', borderTop: '1px solid rgba(201,169,110,0.12)' }}>
      <div className="page-container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Sharma Interior" className="h-12 w-auto" />
          </Link>
          <p className="text-cream/40 text-sm leading-relaxed mb-5">
            Crafting bespoke interiors that blend aesthetics with functionality. Serving Noida, Greater Noida & Ghaziabad since 2016.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/sharma.interior9?igsi=MTk5aWptbmxyOHBs" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-gold/20 text-cream/40 hover:border-gold hover:text-gold transition-all" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/share/1KsWNibCde/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-gold/20 text-cream/40 hover:border-gold hover:text-gold transition-all" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://youtube.com/@sharmainterior7707?si=FfCnX9rOYBugMNrU" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-gold/20 text-cream/40 hover:border-gold hover:text-gold transition-all" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs text-gold tracking-widest uppercase mb-5">Navigation</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-cream/50 text-sm hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs text-gold tracking-widest uppercase mb-5">Specialities</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/catalogue?category=${cat.id}`} className="text-cream/50 text-xs hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>{cat.emoji}</span>
                  <span className="truncate">{cat.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs text-gold tracking-widest uppercase mb-5">Contact Us</h4>
          <div className="flex flex-col gap-4">
            <a
              href="tel:9971870698"
              className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors group"
            >
              <div className="w-8 h-8 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-colors flex-shrink-0">
                <Phone size={13} className="text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-cream/30 uppercase tracking-wider">Mobile</span>
                <span className="text-sm">+91 99718 70698</span>
              </div>
            </a>
            <a
              href="https://wa.me/917838733356"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors group"
            >
              <div className="w-8 h-8 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-colors flex-shrink-0">
                <MessageCircle size={13} className="text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-cream/30 uppercase tracking-wider">WhatsApp</span>
                <span className="text-sm">+91 78387 33356</span>
              </div>
            </a>
            <div className="flex items-start gap-3 text-cream/40">
              <div className="w-8 h-8 flex items-center justify-center border border-gold/10 flex-shrink-0 mt-0.5">
                <MapPin size={13} className="text-gold/60" />
              </div>
              <span className="text-sm leading-relaxed">Noida · Greater Noida · Ghaziabad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: 'rgba(201,169,110,0.08)' }}
      >
        <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          <p className="text-cream/25 text-xs tracking-wider">
            © {new Date().getFullYear()} Sharma Interior. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs">
            Noida · Greater Noida · Ghaziabad
          </p>
        </div>
      </div>
    </footer>
  );
}
