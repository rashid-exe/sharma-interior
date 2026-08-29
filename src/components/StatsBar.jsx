import { useEffect, useRef } from 'react';
import { Award, Home, Users, LayoutGrid } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

export default function StatsBar() {
  const sectionRef = useRef(null);
  const { projects, categories } = useProjects();

  const stats = [
    { icon: Home, value: `${projects.length || 345}+`, label: 'Live Portfolio Photos', sub: 'Real executed work' },
    { icon: LayoutGrid, value: `${categories.length || 8}`, label: 'Speciality Categories', sub: 'Modular to Mandir' },
    { icon: Award, value: '8+', label: 'Years of Excellence', sub: 'Since 2016' },
    { icon: Users, value: '450+', label: 'Happy Clients', sub: 'Noida · Gr. Noida · Gzb' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d0d0d 0%, #141414 50%, #0d0d0d 100%)',
        borderTop: '1px solid rgba(201,169,110,0.12)',
        borderBottom: '1px solid rgba(201,169,110,0.12)',
      }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 60%), radial-gradient(circle at 80% 50%, #c9a96e 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map(({ icon: Icon, value, label, sub }, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-start gap-4`}>
              {/* Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))',
                  border: '1px solid rgba(201,169,110,0.2)',
                }}
              >
                <Icon size={20} className="text-gold" />
              </div>

              <div>
                <div className="font-display gold-gradient-text font-medium" style={{ fontSize: '2.2rem', lineHeight: 1.1 }}>
                  {value}
                </div>
                <div className="text-cream text-sm font-medium mt-0.5">{label}</div>
                <div className="text-muted text-xs mt-0.5 tracking-wide">{sub}</div>
              </div>

              {/* Divider (not after last) */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block stat-divider ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
