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
    <section ref={sectionRef} className="py-28 px-6 md:px-12 lg:px-24" style={{ background: 'var(--charcoal-2)' }}>
      <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    </section>
  );
}
