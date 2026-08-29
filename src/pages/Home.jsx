import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import StatsBar from '../components/StatsBar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Lightbox from '../components/Lightbox';
import { useProjects } from '../context/ProjectsContext';

const WHY_US = [
  { title: 'Free Consultation', desc: 'We start with a detailed in-home consultation to understand your vision, budget and lifestyle.' },
  { title: 'Premium Materials', desc: 'From Italian marble to German hardware — we source only quality-certified materials.' },
  { title: 'On-Time Delivery', desc: 'Our project timelines are firm commitments, not estimates. We deliver on schedule.' },
  { title: 'Post-Work Support', desc: 'Full after-sales service for 1 year — any adjustments, touch-ups or issues handled promptly.' },
];

export default function Home() {
  const { featuredProjects, projects } = useProjects();
  const [lightboxProject, setLightboxProject] = useState(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    document.title = 'Sharma Interior — Premium Interior Design | Noida, Greater Noida, Ghaziabad';
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const reveals = featuredRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [featuredProjects]);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <StatsBar />

      {/* Featured Projects */}
      <section ref={featuredRef} className="py-28 px-6 md:px-12 lg:px-24" style={{ background: 'var(--charcoal)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="reveal">
              <div className="section-label mb-5">Our Work</div>
              <h2 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Featured <span className="gold-gradient-text italic">Projects</span>
              </h2>
            </div>
            <Link to="/catalogue" className="btn-outline reveal reveal-delay-1 flex items-center gap-2 self-start">
              Browse All ({projects.length}) <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id}
                className={`reveal reveal-delay-${(i % 4) + 1}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProjectCard project={project} onClick={setLightboxProject} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sharma Interior */}
      <section className="py-28 px-6 md:px-12 lg:px-24" style={{ background: 'var(--charcoal-2)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-5">Why Choose Us</div>
            <h2 className="font-display font-light text-cream mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              The Sharma Interior <span className="gold-gradient-text italic">Difference</span>
            </h2>
            <p className="text-cream/50 text-base leading-relaxed mb-10 max-w-lg">
              We don't just design spaces — we craft experiences. Every project is handled with meticulous attention to detail, from the first sketch to the final finishing.
            </p>
            <div className="flex flex-col gap-6">
              {WHY_US.map(({ title, desc }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle size={20} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-cream font-medium text-sm mb-1">{title}</h4>
                    <p className="text-cream/40 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial card */}
          <div className="glass-card p-8 rounded-sm" style={{ border: '1px solid rgba(201,169,110,0.15)' }}>
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-gold fill-gold" />)}
            </div>
            <p className="font-display text-xl text-cream font-light leading-relaxed mb-6 italic">
              "Sharma Interior transformed our 2BHK into a home we're proud to show off. The modular kitchen and false ceiling in the living room are just stunning. Highly recommended for anyone in Noida."
            </p>
            <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-display text-gold text-lg">R</div>
              <div>
                <div className="text-cream text-sm font-medium">Rajat & Priya Sinha</div>
                <div className="text-cream/40 text-xs">Noida Sector 62</div>
              </div>
            </div>

            {/* Second testimonial */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(201,169,110,0.08)' }}>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-gold fill-gold" />)}
              </div>
              <p className="text-cream/60 text-sm leading-relaxed italic mb-4">
                "Professional team, beautiful work, and they finished ahead of schedule. The bedroom wardrobe design is exactly what we had envisioned."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center font-display text-gold text-sm">A</div>
                <div>
                  <div className="text-cream text-xs font-medium">Anita Verma</div>
                  <div className="text-cream/40 text-xs">Greater Noida West</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1208 50%, #0d0d0d 100%)',
          borderTop: '1px solid rgba(201,169,110,0.15)',
          borderBottom: '1px solid rgba(201,169,110,0.15)',
        }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #c9a96e 0%, transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="section-label justify-center mb-6">Get Started Today</div>
          <h2 className="font-display font-light text-cream mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Ready to Transform <span className="gold-gradient-text italic">Your Space?</span>
          </h2>
          <p className="text-cream/50 mb-10 leading-relaxed">
            Share your vision with us on WhatsApp — our designers respond within the hour.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919625352772?text=Hi%20Sharma%20Interior%2C%20I%27d%20like%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Get Free Consultation
              <ArrowRight size={16} />
            </a>
            <Link to="/catalogue" className="btn-outline">
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          projects={projects}
          onClose={() => setLightboxProject(null)}
        />
      )}

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919625352772"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  </>
  );
}
