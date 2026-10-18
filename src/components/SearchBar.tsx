import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import type { GameId } from '../types/game';
import type { CatalogMap } from '../utils/catalog';
import { GAMES } from '../data/games';
import { formatPrice } from '../utils/price';

export interface SearchResult {
  gameId: GameId;
  gameName: string;
  categoryId: string;
  categoryName: string;
  serviceId: string;
  serviceName: string;
  priceLabel: string;
}

interface SearchBarProps {
  catalogs: CatalogMap;
  onSelect: (result: SearchResult) => void;
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 12;

export default function SearchBar({ catalogs, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /** Cari di semua game: nama layanan, region, kategori, game, dan deskripsi. */
  const results = useMemo<SearchResult[]>(() => {
    const q = normalize(query);
    if (q.length < MIN_QUERY_LENGTH) return [];

    const all: SearchResult[] = [];
    for (const game of GAMES) {
      const catalog = catalogs[game.id];
      for (const category of catalog.categories) {
        for (const service of category.services) {
          const haystack = normalize(
            [
              game.name,
              game.shortName,
              category.name,
              service.name,
              service.region ?? '',
              service.description,
            ].join(' '),
          );
          if (haystack.includes(q)) {
            all.push({
              gameId: game.id,
              gameName: game.name,
              categoryId: category.id,
              categoryName: category.name,
              serviceId: service.id,
              serviceName: service.name,
              priceLabel: formatPrice(service.price),
            });
          }
        }
      }
    }
    return all.slice(0, MAX_RESULTS);
  }, [query, catalogs]);

  // Tutup dropdown saat klik di luar komponen.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset highlight setiap hasil pencarian berubah.
  useEffect(() => {
    setHighlighted(0);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && results[highlighted]) {
      e.preventDefault();
      onSelect(results[highlighted]);
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const selectResult = (result: SearchResult) => {
    onSelect(result);
    setOpen(false);
  };

  const showResults = open && query.length >= MIN_QUERY_LENGTH;

  return (
    <div className="search" ref={containerRef}>
      <div className="search__box">
        <Search size={18} className="search__icon" aria-hidden="true" />
        <input
          type="text"
          className="search__input"
          placeholder="Cari layanan... (contoh: abyss, dragonspine, exploration)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showResults}
          aria-controls="search-results"
          aria-activedescendant={
            showResults && results[highlighted] ? `search-result-${highlighted}` : undefined
          }
          aria-label="Cari layanan"
        />
        {query && (
          <button
            type="button"
            className="search__clear"
            onClick={() => setQuery('')}
            aria-label="Hapus pencarian"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="search__results" id="search-results" role="listbox">
          {results.length === 0 ? (
            <p className="search__empty">
              Tidak ada layanan yang cocok dengan "{query}".
            </p>
          ) : (
            <ul className="search__list">
              {results.map((result, index) => (
                <li key={`${result.gameId}-${result.categoryId}-${result.serviceId}`}>
                  <button
                    type="button"
                    id={`search-result-${index}`}
                    role="option"
                    aria-selected={index === highlighted}
                    className={`search__result${
                      index === highlighted ? ' search__result--highlighted' : ''
                    }`}
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => selectResult(result)}
                  >
                    <span className="search__result-main">
                      <span className="search__result-name">{result.serviceName}</span>
                      <span className="search__result-meta">
                        {result.gameName} · {result.categoryName}
                      </span>
                    </span>
                    <span className="search__result-side">
                      <span className="search__result-price">{result.priceLabel}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}