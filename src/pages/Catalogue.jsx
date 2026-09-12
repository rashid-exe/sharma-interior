import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import Lightbox from '../components/Lightbox';
import Footer from '../components/Footer';
import { useProjects } from '../context/ProjectsContext';

const PAGE_SIZE = 24;

export default function Catalogue() {
  const { categories, projects, loading, refreshProjects, lastUpdated } = useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');
  const [lightboxProject, setLightboxProject] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    document.title = 'Catalogue — Sharma Interior | Browse All Work';
    window.scrollTo({ top: 0 });
  }, []);

  // Sync category param from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== activeFilter) {
      setActiveFilter(cat);
      setVisibleCount(PAGE_SIZE);
    }
  }, [searchParams]);

  // Sync URL with active filter
  const handleFilterChange = (catId) => {
    setActiveFilter(catId);
    setVisibleCount(PAGE_SIZE);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Counts per category
  const counts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = projects.filter(p => p.category === cat.id).length;
      return acc;
    }, {});
  }, [categories, projects]);

  // Filtered + searched projects
  const filtered = useMemo(() => {
    let list = projects;
    if (activeFilter !== 'all') {
      list = list.filter(p => p.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'featured') {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [projects, activeFilter, search, sortBy]);

  const displayedProjects = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const activeCategory = categories.find(c => c.id === activeFilter);
  const activeCategoryLabel = activeFilter === 'all' ? 'All Work' : (activeCategory?.label || activeFilter);

  return (
    <>
      {/* Page Header */}
      <div
        className="pt-36 pb-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, var(--charcoal-2) 0%, var(--charcoal) 100%)',
          borderBottom: '1px solid rgba(201,169,110,0.1)',
        }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #c9a96e 0%, transparent 60%)' }}
        />
        <div className="page-container relative">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="section-label">Our Work Gallery</div>
            <button
              onClick={() => refreshProjects()}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-cream/50 hover:text-gold transition-colors cursor-pointer border border-gold/15 px-3 py-1 bg-surface/40 rounded-full"
              title="Sync with Google Drive"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin text-gold' : ''} />
              <span>{loading ? 'Syncing Drive...' : 'Live Drive Sync'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                {activeFilter === 'all' ? (
                  <>Interior <span className="gold-gradient-text italic">Catalogue</span></>
                ) : (
                  <><span className="gold-gradient-text italic">{activeCategoryLabel}</span> Collection</>
                )}
              </h1>
              <p className="text-cream/50 text-sm mt-2">
                Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
                {activeCategory?.description && ` — ${activeCategory.description}`}
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-muted" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm text-cream/70 bg-surface border border-gold/15 px-3 py-1.5 focus:outline-none focus:border-gold/40 cursor-pointer"
                style={{ background: 'var(--surface)' }}
              >
                <option value="default">Default Order</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="sticky top-16 z-40 py-4"
        style={{
          background: 'rgba(13,13,13,0.96)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,169,110,0.08)',
        }}
      >
        <div className="page-container flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Filter bar */}
          <div className="overflow-x-auto w-full sm:w-auto pb-1">
            <FilterBar
              categories={categories}
              active={activeFilter}
              onChange={handleFilterChange}
              counts={counts}
            />
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gold/15 px-3 py-1.5 min-w-56 hover:border-gold/30 transition-colors w-full sm:w-auto">
            <Search size={14} className="text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Search in gallery..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="bg-transparent text-cream/70 text-sm placeholder-muted/50 outline-none w-full"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-muted hover:text-gold cursor-pointer">
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="min-h-screen section-py" style={{ background: 'var(--charcoal)' }}>
        <div className="page-container">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-2xl text-cream/60 font-light mb-2">No photos found</h3>
              <p className="text-muted text-sm">Try adjusting your filter or search term</p>
              <button
                onClick={() => { setActiveFilter('all'); setSearch(''); }}
                className="btn-outline mt-6 text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div
                className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {displayedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={setLightboxProject} />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filtered.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                    className="btn-outline px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold/10 transition-colors"
                  >
                    Load More Photos ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          projects={filtered}
          onClose={() => setLightboxProject(null)}
        />
      )}

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/917838733356"
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
