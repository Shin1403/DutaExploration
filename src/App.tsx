import { useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialPanel from './components/SocialPanel';
import GameTabs from './components/GameTabs';
import CategoryTabs from './components/CategoryTabs';
import ServiceCard from './components/ServiceCard';
import OrderPanel from './components/OrderPanel';
import Footer from './components/Footer';
import SearchBar, { type SearchResult } from './components/SearchBar';
import WhatsAppButton from './components/WhatsAppButton';
import { GAMES } from './data/games';
import { CATALOGS } from './data/catalog';
import type { GameId } from './types/game';
import { sanitizeSelection } from './utils/catalog';

export default function App() {
  const [gameId, setGameId] = useState<GameId>('genshin');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);

  const catalog = CATALOGS[gameId];
  const game = useMemo(() => GAMES.find((g) => g.id === gameId)!, [gameId]);

  const handleGameChange = useCallback((nextGameId: GameId) => {
    setGameId(nextGameId);
    // Reset pilihan agar tidak ada layanan "nyangkut" dari game sebelumnya.
    setCategoryId(null);
    setServiceId(null);
  }, []);

  const handleCategoryChange = useCallback((nextCategoryId: string) => {
    setCategoryId(nextCategoryId);
    setServiceId(null);
  }, []);

  const handleServiceChange = useCallback((nextServiceId: string) => {
    setServiceId(nextServiceId);
  }, []);

  // Saat klik "Pilih Layanan" di kartu: pastikan kategori aktif sesuai kartu tersebut.
  const handleCardSelect = useCallback((category: string, nextServiceId: string) => {
    setCategoryId(category);
    setServiceId(nextServiceId);
  }, []);
  // Pencarian: pilih hasil -> pindah game/kategori/layanan + scroll ke katalog.
  const handleSearchSelect = useCallback((result: SearchResult) => {
    setGameId(result.gameId);
    setCategoryId(result.categoryId);
    setServiceId(result.serviceId);
    requestAnimationFrame(() => {
      document
        .getElementById('category-panel')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const activeCategory = catalog.categories.find((c) => c.id === categoryId) ?? null;
  // Validasi terhadap katalog aktif — ganti game tidak boleh meninggalkan seleksi invalid.
  const sanitized = sanitizeSelection(catalog, categoryId, serviceId);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialPanel />

        <section className="services" id="layanan" aria-labelledby="services-title">
          <div className="container">
            <header className="section-header">
              <span className="section-header__eyebrow">Katalog Layanan</span>
              <h2 className="section-header__title" id="services-title">
                Pilih Game &amp; Layanan
              </h2>
              <p className="section-header__description">
                Tiga game didukung. Pilih game, pilih kategori, lalu pilih layanan yang kamu butuhkan.
              </p>
            </header>
            <SearchBar catalogs={CATALOGS} onSelect={handleSearchSelect} />
            <GameTabs activeGame={gameId} onSelect={handleGameChange} />

            <div
              id="game-panel"
              role="tabpanel"
              aria-labelledby={`tab-${gameId}`}
              className="services__panel"
            >
              <CategoryTabs
                categories={catalog.categories}
                activeCategoryId={sanitized.categoryId}
                onSelect={handleCategoryChange}
              />

              <div
                id="category-panel"
                role="tabpanel"
                aria-labelledby={
                  sanitized.categoryId ? `tab-category-${sanitized.categoryId}` : undefined
                }
                className="services__content"
              >
                {activeCategory === null ? (
                  <div className="empty-state">
                    <p className="empty-state__title">Pilih kategori terlebih dahulu</p>
                    <p className="empty-state__description">
                      Gunakan tab kategori di atas untuk melihat daftar layanan {game.name}.
                    </p>
                  </div>
                ) : activeCategory.services.length === 0 ? (
                  <div className="empty-state">
                    <p className="empty-state__title">Daftar layanan sedang diperbarui</p>
                    <p className="empty-state__description">
                      Kategori <strong>{activeCategory.name}</strong> untuk {game.name} akan segera
                      diisi. Silakan cek kembali nanti atau tanyakan langsung via WhatsApp.
                    </p>
                  </div>
                ) : (
                  <div className="services__grid">
                    {activeCategory.services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        selected={service.id === sanitized.serviceId}
                        onSelect={(sid) => handleCardSelect(activeCategory.id, sid)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="services__order">
              <OrderPanel
                catalogs={CATALOGS}
                gameId={gameId}
                categoryId={sanitized.categoryId}
                serviceId={sanitized.serviceId}
                onGameChange={handleGameChange}
                onCategoryChange={handleCategoryChange}
                onServiceChange={handleServiceChange}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}