export default function FilterBar({ categories, active, onChange, counts }) {
  const allOption = { id: 'all', label: 'All Work', emoji: '✨' };
  const items = [allOption, ...categories];

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const count = item.id === 'all' ? totalCount : (counts[item.id] || 0);

        return (
          <button
            key={item.id}
            id={`filter-${item.id}`}
            className={`filter-pill flex items-center gap-1.5 cursor-pointer ${active === item.id ? 'active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.emoji && <span>{item.emoji}</span>}
            <span>{item.label}</span>
            <span
              className={`text-xs rounded-full px-2 py-0.5 font-mono ${
                active === item.id
                  ? 'bg-black/25 text-black font-semibold'
                  : 'bg-gold/15 text-gold'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
