import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CATEGORIES as DEFAULT_CATEGORIES, PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqcDBjuGpARGFJhl3t4vGidFyOHEqwXFc2Odn5bOKdnAlarByM1VKRgh_UssMv4wFy/exec';
const CACHE_KEY = 'sharma_interior_drive_data_v2'; // Bumped cache key to invalidate raw uncompressed URLs

const ProjectsContext = createContext();

const CATEGORY_META = {
  'almirah': { emoji: '🚪', desc: 'Modern sliding, walk-in, and custom fitted wardrobes with smart storage.' },
  'bed': { emoji: '🛏️', desc: 'Designer king & queen beds with upholstered headboards and hydraulic storage.' },
  'main-gate': { emoji: '⛩️', desc: 'Premium CNC cut, wrought iron, and modern wooden grand entrance gates.' },
  'mandir': { emoji: '🪔', desc: 'Sacred home temples with intricate CNC jali work and warm golden backlighting.' },
  'modular-kitchen': { emoji: '🍳', desc: 'Ergonomic modular kitchens with smart pull-outs and quartz island counters.' },
  'showcase': { emoji: '🏺', desc: 'Living room showcase display units, crockery cabinets, and trophy displays.' },
  'study-table': { emoji: '📚', desc: 'Ergonomic study desks, bookshelf combos, and productive home office setups.' },
  'tv-panel': { emoji: '📺', desc: 'Floating TV wall panels, fluted acoustic slats, and luxury media consoles with LED.' },
};

export function formatDriveImageUrl(urlOrId, size = 'w800') {
  if (!urlOrId) return '';
  if (urlOrId.startsWith('data:') || urlOrId.startsWith('blob:') || urlOrId.startsWith('/')) {
    return urlOrId;
  }
  // Strip any existing =wXXX or =sXXX modifier
  const cleanUrl = urlOrId.replace(/=[ws]\d+.*$/, '');
  const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : cleanUrl;
  return `https://lh3.googleusercontent.com/d/${id}=${size}`;
}

export function getDriveThumbnailFallback(urlOrId, size = '800') {
  if (!urlOrId) return '';
  const match = urlOrId.match(/\/d\/([a-zA-Z0-9_-]+)/) || urlOrId.match(/id=([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : urlOrId;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
}

function normalizeProjects(rawProjects) {
  if (!Array.isArray(rawProjects)) return [];
  return rawProjects.map((p, idx) => {
    const catId = p.category || 'other';
    const catName = p.categoryName || (catId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    const title = p.title && !p.title.startsWith('IMG') && !p.title.startsWith('202')
      ? p.title
      : `${catName} Design #${idx + 1}`;

    const rawImg = p.image || p.id || '';
    const optimizedImage = formatDriveImageUrl(rawImg, 'w800');
    const fullResImage = formatDriveImageUrl(rawImg, 'w1600');
    const fallbackImage = getDriveThumbnailFallback(rawImg, '800');

    return {
      id: p.id || `proj-${idx}`,
      title: title,
      category: catId,
      categoryName: catName,
      image: optimizedImage,
      fullImage: fullResImage,
      fallbackImage: fallbackImage,
      featured: p.featured || idx % 8 === 0,
      location: p.location || 'Noida / NCR',
      style: p.style || 'Custom Sharma Interior',
      area: p.area || 'Bespoke Size',
      description: p.description || `Custom ${catName.toLowerCase()} crafted with premium materials, precision hardware, and bespoke finishes by Sharma Interior.`,
      date: p.date || null
    };
  });
}

function normalizeCategories(rawCategories) {
  if (!Array.isArray(rawCategories)) return DEFAULT_CATEGORIES;
  return rawCategories.map(cat => {
    const meta = CATEGORY_META[cat.id] || { emoji: '✨', desc: 'Bespoke interior craftmanship customized for your home.' };
    return {
      id: cat.id,
      label: cat.label || cat.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      emoji: cat.emoji || meta.emoji,
      description: cat.description || meta.desc,
      cover: formatDriveImageUrl(cat.cover || '', 'w800'),
      fallbackCover: getDriveThumbnailFallback(cat.cover || '', '800'),
      count: cat.count || 0
    };
  });
}

export function ProjectsProvider({ children }) {
  // Load from cache first for instantaneous rendering
  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.categories && parsed.categories.length > 0) {
          return normalizeCategories(parsed.categories);
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage cache', e);
    }
    return DEFAULT_CATEGORIES;
  });

  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.projects && parsed.projects.length > 0) {
          return normalizeProjects(parsed.projects);
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage cache', e);
    }
    return DEFAULT_PROJECTS;
  });

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFromDrive = useCallback(async (isManual = false) => {
    try {
      if (isManual) setLoading(true);
      const res = await fetch(SCRIPT_URL);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      
      if (data && data.categories && data.projects) {
        const normCats = normalizeCategories(data.categories);
        const normProjs = normalizeProjects(data.projects);
        
        setCategories(normCats);
        setProjects(normProjs);
        setLastUpdated(data.updatedAt || new Date().toISOString());

        // Cache in localStorage
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            categories: normCats,
            projects: normProjs,
            updatedAt: data.updatedAt
          }));
        } catch (e) {
          console.warn('Failed to cache in localStorage', e);
        }
      }
    } catch (err) {
      console.error('Error fetching live Google Drive photos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFromDrive();
  }, [fetchFromDrive]);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 8);

  return (
    <ProjectsContext.Provider
      value={{
        categories,
        projects,
        featuredProjects,
        loading,
        lastUpdated,
        refreshProjects: () => fetchFromDrive(true),
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return ctx;
}
