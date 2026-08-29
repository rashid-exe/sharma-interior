import { useState } from 'react';
import { Eye, ImageOff } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(project.image);
  const [triedFallback, setTriedFallback] = useState(false);
  const [error, setError] = useState(false);

  const categoryLabel = project.categoryName || project.category
    .split('-')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ');

  const handleImageError = () => {
    if (!triedFallback && project.fallbackImage && project.fallbackImage !== imgSrc) {
      setTriedFallback(true);
      setImgSrc(project.fallbackImage);
    } else {
      setError(true);
    }
  };

  return (
    <article
      className="project-card group cursor-pointer relative overflow-hidden bg-surface flex flex-col"
      onClick={() => onClick(project)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-2 flex items-center justify-center">
        {!loaded && !error && (
          <div className="absolute inset-0 animate-pulse bg-charcoal-2 flex items-center justify-center z-0">
            <span className="text-cream/20 text-xs tracking-wider">Loading photo...</span>
          </div>
        )}

        {error ? (
          <div className="flex flex-col items-center justify-center text-cream/30 gap-2 p-4 text-center">
            <ImageOff size={24} />
            <span className="text-xs">Photo preview</span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover overlay CTA */}
        <div className="project-card-overlay">
          <button className="self-center mb-3 flex items-center gap-2 text-xs text-cream tracking-widest uppercase border border-cream/40 px-4 py-2 hover:border-gold hover:text-gold transition-all backdrop-blur-xs">
            <Eye size={13} />
            View Photo
          </button>
          <div className="font-display text-lg text-cream font-light text-center px-4">{project.title}</div>
        </div>
      </div>

      {/* Info bar */}
      <div className="project-card-info p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] text-gold tracking-widest uppercase mb-1">{categoryLabel}</div>
            <h3 className="font-display text-base text-cream font-light leading-snug line-clamp-1">{project.title}</h3>
          </div>
          {project.featured && (
            <span className="text-[10px] bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 tracking-wider flex-shrink-0">
              Featured
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
