import { useMemo, useState } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import type { GameId } from '../types/game';
import type { CatalogMap } from '../utils/catalog';
import { GAMES } from '../data/games';
import { formatPrice } from '../utils/price';
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from '../utils/whatsapp';

interface OrderPanelProps {
  catalogs: CatalogMap;
  gameId: GameId;
  categoryId: string | null;
  serviceId: string | null;
  onGameChange: (gameId: GameId) => void;
  onCategoryChange: (categoryId: string) => void;
  onServiceChange: (serviceId: string) => void;
}

export default function OrderPanel({
  catalogs,
  gameId,
  categoryId,
  serviceId,
  onGameChange,
  onCategoryChange,
  onServiceChange,
}: OrderPanelProps) {
  const [notes, setNotes] = useState('');
  const [showSetupWarning, setShowSetupWarning] = useState(false);

  const catalog = catalogs[gameId];
  const category = catalog.categories.find((c) => c.id === categoryId) ?? null;
  const service = category?.services.find((s) => s.id === serviceId) ?? null;
  const game = GAMES.find((g) => g.id === gameId)!;

  const waConfigured = isWhatsAppConfigured();
  const ready = category !== null && service !== null;

  const waUrl = useMemo(() => {
    if (!ready || !waConfigured) return null;
    const message = buildOrderMessage({
      gameName: game.name,
      categoryName: category.name,
      serviceName: service.name,
      priceLabel: formatPrice(service.price),
      notes,
    });
    return buildWhatsAppUrl(message);
  }, [ready, waConfigured, game.name, category, service, notes]);

  const handleOrder = () => {
    if (!ready) return;
    if (!waConfigured) {
      setShowSetupWarning(true);
      return;
    }
    if (waUrl) {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <aside className="order-panel" id="cara-pesan" aria-labelledby="order-panel-title">
      <h2 className="order-panel__title" id="order-panel-title">
        Ringkasan Pesanan
      </h2>
      <p className="order-panel__subtitle">
        Pilih game, kategori, dan layanan — lalu lanjutkan ke WhatsApp.
      </p>

      <div className="order-panel__fields">
        <label className="field">
          <span className="field__label">Game</span>
          <select
            className="field__control"
            value={gameId}
            onChange={(e) => onGameChange(e.target.value as GameId)}
          >
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Kategori</span>
          <select
            className="field__control"
            value={categoryId ?? ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={catalog.categories.length === 0}
          >
            <option value="" disabled>
              {catalog.categories.length === 0
                ? 'Daftar layanan sedang diperbarui'
                : 'Pilih kategori'}
            </option>
            {catalog.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Layanan</span>
          <select
            className="field__control"
            value={serviceId ?? ''}
            onChange={(e) => onServiceChange(e.target.value)}
            disabled={!category || category.services.length === 0}
          >
            <option value="" disabled>
              {!category
                ? 'Pilih kategori dulu'
                : category.services.length === 0
                  ? 'Daftar layanan sedang diperbarui'
                  : 'Pilih layanan'}
            </option>
            {category?.services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Catatan (opsional)</span>
          <textarea
            className="field__control field__control--textarea"
            rows={3}
            placeholder="Contoh: UID, server, request khusus..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
      </div>

      <div className="order-panel__summary" aria-live="polite">
        {ready ? (
          <dl className="summary">
            <div className="summary__row">
              <dt>Game</dt>
              <dd>{game.name}</dd>
            </div>
            <div className="summary__row">
              <dt>Kategori</dt>
              <dd>{category.name}</dd>
            </div>
            <div className="summary__row">
              <dt>Layanan</dt>
              <dd>{service.name}</dd>
            </div>
            <div className="summary__row">
              <dt>Harga</dt>
              <dd className="summary__price">{formatPrice(service.price)}</dd>
            </div>
          </dl>
        ) : (
          <p className="order-panel__empty">
            Pilih layanan dari katalog di atas, atau gunakan panel ini — ringkasan pesanan akan
            muncul di sini.
          </p>
        )}
      </div>

      {showSetupWarning && (
        <p className="order-panel__warning" role="alert">
          <AlertTriangle size={16} aria-hidden="true" />
          Nomor WhatsApp belum dikonfigurasi. Isi <code>whatsappNumber</code> di{' '}
          <code>src/config.ts</code> terlebih dahulu.
        </p>
      )}

      <button
        type="button"
        className="btn btn--primary btn--block"
        disabled={!ready}
        onClick={handleOrder}
      >
        <Send size={18} aria-hidden="true" />
        Pesan via WhatsApp
      </button>

      {!waConfigured && !showSetupWarning && (
        <p className="order-panel__hint">
          Konfigurasi WhatsApp belum diisi — tombol akan aktif setelah{' '}
          <code>whatsappNumber</code> diisi di <code>src/config.ts</code>.
        </p>
      )}
    </aside>
  );
}