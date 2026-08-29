import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag, ExternalLink } from 'lucide-react';

export default function Lightbox({ project, onClose, projects = [] }) {
  const [current, setCurrent] = useState(project);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(project.fullImage || project.image);

  useEffect(() => {
    setCurrent(project);
    setImgSrc(project.fullImage || project.image);
    setImgLoaded(false);
  }, [project]);

  // Find adjacent projects in same category (or whole filtered list if only 1 in category)
  const pool = projects.filter(p => p.category === current.category);
  const activeList = pool.length > 0 ? pool : projects;
  const currentIdx = activeList.findIndex(p => p.id === current.id);

  const switchProject = (proj) => {
    setCurrent(proj);
    setImgSrc(proj.fullImage || proj.image);
    setImgLoaded(false);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    const newIdx = (currentIdx - 1 + activeList.length) % activeList.length;
    switchProject(activeList[newIdx]);
  };
  const goNext = (e) => {
    e.stopPropagation();
    const newIdx = (currentIdx + 1) % activeList.length;
    switchProject(activeList[newIdx]);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const newIdx = (currentIdx - 1 + activeList.length) % activeList.length;
        switchProject(activeList[newIdx]);
      }
      if (e.key === 'ArrowRight') {
        const newIdx = (currentIdx + 1) % activeList.length;
        switchProject(activeList[newIdx]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, activeList, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Hi Sharma Interior! I'm interested in this design: "${current.title}" (${current.categoryName || current.category}). Could you share more details or a quote?`
  );

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 glass-card overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 text-cream hover:text-gold hover:bg-black transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col lg:flex-row h-full overflow-hidden" style={{ maxHeight: '90vh' }}>
          {/* Image panel */}
          <div className="relative lg:w-3/5 bg-charcoal flex items-center justify-center flex-shrink-0 min-h-[300px] lg:min-h-[500px]">
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal-2 animate-pulse">
                <span className="text-cream/20 text-xs tracking-wider">Loading high-res photo...</span>
              </div>
            )}

            <img
              key={current.id}
              src={imgSrc}
              alt={current.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                if (current.fallbackImage && imgSrc !== current.fallbackImage) {
                  setImgSrc(current.fallbackImage);
                }
              }}
              className={`w-full h-full object-contain max-h-[85vh] transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Nav arrows */}
            {activeList.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-cream hover:text-gold hover:bg-black/90 transition-all cursor-pointer z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-cream hover:text-gold hover:bg-black/90 transition-all cursor-pointer z-10"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-cream/70 px-3 py-1 rounded-full backdrop-blur-xs tracking-widest">
              {currentIdx + 1} / {activeList.length}
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:w-2/5 p-6 overflow-y-auto flex flex-col justify-between" style={{ background: 'var(--surface)' }}>
            <div>
              <div className="text-xs text-gold tracking-widest uppercase mb-2">
                {current.categoryName || current.category}
              </div>
              <h2 className="font-display text-2xl text-cream font-light mb-4 leading-tight">{current.title}</h2>

              <div className="flex flex-wrap gap-2 mb-5">
                <div className="flex items-center gap-1 text-xs text-cream/60 bg-surface-2 px-2.5 py-1 border border-gold/10">
                  <MapPin size={11} className="text-gold" />
                  {current.location || 'Noida & NCR'}
                </div>
                <div className="flex items-center gap-1 text-xs text-cream/60 bg-surface-2 px-2.5 py-1 border border-gold/10">
                  <Tag size={11} className="text-gold" />
                  {current.categoryName || current.category}
                </div>
              </div>

              <p className="text-cream/60 text-sm leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            <div>
              <div className="border-t border-gold/10 pt-5 flex flex-col gap-3">
                <a
                  href={`https://wa.me/919625352772?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full justify-center text-xs"
                >
                  Enquire for this Design
                  <ExternalLink size={13} />
                </a>
                <a
                  href="tel:9625352772"
                  className="btn-outline w-full justify-center text-xs"
                >
                  Call Us Directly (9625352772)
                </a>
              </div>

              {/* Thumbnail strip */}
              {activeList.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {activeList.slice(0, 12).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => switchProject(p)}
                      className={`flex-shrink-0 w-14 h-12 overflow-hidden transition-all rounded-xs cursor-pointer ${
                        p.id === current.id ? 'ring-2 ring-gold' : 'opacity-40 hover:opacity-80'
                      }`}
                    >
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
