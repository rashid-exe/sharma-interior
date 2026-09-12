import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

export default function CategoryGrid() {
  const sectionRef = useRef(null);
  const { categories } = useProjects();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <section ref={sectionRef} className="section-py" style={{ background: 'var(--charcoal-2)' }}>
      <div className="page-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <div className="section-label mb-5">Our Portfolio Categories</div>
            <h2 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
              Explore by <span className="gold-gradient-text italic">Speciality</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-1">
            <Link to="/catalogue" className="btn-outline flex items-center gap-2 self-start">
              View All Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Grid of 8 categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              to={`/catalogue?category=${cat.id}`}
              key={cat.id}
              className={`category-card reveal reveal-delay-${(i % 4) + 1} group`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {cat.cover ? (
                <img
                  src={cat.cover}
                  alt={cat.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-surface flex items-center justify-center">
                  <ImageIcon size={32} className="text-cream/20" />
                </div>
              )}
              <div className="category-overlay" />
              <div className="category-border" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl">{cat.emoji}</div>
                  {cat.count > 0 && (
                    <span className="text-[11px] bg-black/60 text-gold border border-gold/25 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      {cat.count} Photos
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl text-cream font-light mb-1">{cat.label}</h3>
                <p className="text-cream/50 text-xs leading-relaxed mb-4 line-clamp-2">{cat.description}</p>
                <div className="flex items-center gap-2 text-gold text-xs font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Category</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Hover explore arrow */}
              <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 bg-gold/10 border border-gold/30 rounded-full p-2 z-10">
                <ArrowRight size={14} className="text-gold" />
              </div>

              {/* Bottom gold bar */}
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-500 w-0 group-hover:w-full z-10"
                style={{ transitionDuration: '500ms' }}
              />
            </Link>
          ))}

          {/* Custom Order Card */}
          <a
            href="https://wa.me/917838733356?text=Hi%20Sharma%20Interior!%20I%20have%20a%20custom%20requirement%20not%20listed%20in%20your%20catalogue.%20Can%20we%20discuss%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="category-card reveal reveal-delay-4 group cursor-pointer"
            style={{ transitionDelay: `${categories.length * 60}ms` }}
          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1208 40%, #0d0d0d 100%)',
              }}
            />
            {/* Gold shimmer overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 50%, rgba(201,169,110,0.12) 100%)',
              }}
            />
            {/* Decorative radial glow */}
            <div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(201,169,110,0.35) 0%, transparent 65%)' }}
            />

            <div className="category-border" style={{ borderColor: 'rgba(201,169,110,0.3)' }} />

            {/* Pulsing ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-gold/20 group-hover:border-gold/50 transition-all duration-500"
              style={{ animation: 'pulse-gold 2.5s ease-in-out infinite' }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 text-center">
              {/* WhatsApp icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.06))',
                  border: '1px solid rgba(201,169,110,0.35)',
                  boxShadow: '0 0 24px rgba(201,169,110,0.15)',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-gold">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M8.5 9.5c0-.5.5-2 2-2 .5 0 1 .5 1.5 1.5l.5 1c.2.4.1.9-.2 1.2l-.3.3c-.1.1-.1.3 0 .4.4.7 1 1.4 1.7 1.9.1.1.3.1.4 0l.4-.4c.3-.3.8-.4 1.2-.2l1 .5c1 .5 1.5 1 1.5 1.5 0 1.5-1.5 2-2 2-3 0-7-4-7-7z" fill="currentColor"/>
                </svg>
              </div>

              <div className="text-xs text-gold tracking-widest uppercase mb-3 font-medium">Custom Order</div>
              <h3 className="font-display text-xl text-cream font-light mb-3 leading-snug">
                Don't see what<br />you need?
              </h3>
              <p className="text-cream/50 text-xs leading-relaxed mb-5">
                We do fully custom work — share your idea and we'll make it happen.
              </p>
              <div
                className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-all duration-300 group-hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                  color: '#0d0d0d',
                  boxShadow: '0 4px 16px rgba(201,169,110,0.2)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </div>
            </div>

            {/* Bottom gold bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-500 w-0 group-hover:w-full z-10"
              style={{ transitionDuration: '500ms' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
