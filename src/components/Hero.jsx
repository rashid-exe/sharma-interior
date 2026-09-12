import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroBg from '../assets/images/cat_living_room.png';
import { useProjects } from '../context/ProjectsContext';

export default function Hero() {
  const bgRef = useRef(null);
  const { projects, featuredProjects } = useProjects();

  const heroCardProject = featuredProjects[0] || projects[0];
  const heroCardImage = heroCardProject?.image || heroBg;

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content w-full pt-24">
        <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-32">
          {/* Left */}
          <div>
            <div className="section-label mb-8" style={{ animationDelay: '0.1s' }}>
              Noida · Greater Noida · Ghaziabad
            </div>

            <h1
              className="font-display font-light leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#f5f0e8' }}
            >
              <span className="block">Spaces That</span>
              <span className="block gold-gradient-text italic" style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.5rem)' }}>
                Tell Your
              </span>
              <span className="block">Story</span>
            </h1>

            <p className="text-cream/60 text-lg font-light leading-relaxed mb-10 max-w-lg">
              Sharma Interior crafts bespoke living spaces — from designer almirahs & modular kitchens to luxury mandirs and TV panels.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/catalogue" className="btn-gold">
                Browse Catalogue ({projects.length}+ Photos)
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/917838733356"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-gold/10">
              {[
                { num: `${projects.length || 345}+`, label: 'Real Photos' },
                { num: '10+', label: 'Years Service' },
              ].map(({ num, label }, i) => (
                <div key={i} className="text-left">
                  <div className="font-display text-3xl gold-gradient-text font-medium">{num}</div>
                  <div className="text-xs text-cream/40 tracking-widest uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating card */}
          <div className="hidden lg:flex justify-end">
            <Link
              to="/catalogue"
              className="glass-card p-1 rounded-sm block cursor-pointer transition-transform hover:scale-[1.02]"
              style={{
                maxWidth: '380px',
                animation: 'float 4s ease-in-out infinite',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.12)',
              }}
            >
              <img
                src={heroCardImage}
                alt={heroCardProject?.title || "Featured interior"}
                className="w-full object-cover rounded-xs"
                style={{ height: '460px', objectPosition: 'center' }}
              />
              <div className="p-4">
                <div className="text-xs text-gold tracking-widest uppercase mb-1">
                  {heroCardProject?.categoryName || 'Featured Portfolio'}
                </div>
                <div className="font-display text-xl text-cream font-light">{heroCardProject?.title || 'Bespoke Interior Work'}</div>
                <div className="text-xs text-cream/40 mt-0.5">Sharma Interior · Noida & NCR</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
