import type { ServiceCategory } from '../types/service';

interface CategoryTabsProps {
  categories: ServiceCategory[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string) => void;
}

export default function CategoryTabs({ categories, activeCategoryId, onSelect }: CategoryTabsProps) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Pilih kategori layanan">
      {categories.map((category) => {
        const selected = category.id === activeCategoryId;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            id={`tab-category-${category.id}`}
            aria-selected={selected}
            aria-controls="category-panel"
            className={`category-tabs__tab${selected ? ' category-tabs__tab--active' : ''}`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
            <span className="category-tabs__count" aria-hidden="true">
              {category.services.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}