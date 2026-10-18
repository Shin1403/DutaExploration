import { ArrowRight, MessageCircle } from 'lucide-react';
import { openWhatsApp, buildWhatsAppUrl, isWhatsAppConfigured } from '../utils/whatsapp';

const GREETING_MESSAGE = 'Halo Duta Exploration, saya ingin bertanya tentang layanan joki.';

export default function Hero() {
  const waConfigured = isWhatsAppConfigured();

  const handleWhatsAppClick = () => {
    if (!waConfigured) {
      window.alert(
        'Nomor WhatsApp belum dikonfigurasi. Isi whatsappNumber di src/config.ts terlebih dahulu.',
      );
      return;
    }
    openWhatsApp(GREETING_MESSAGE);
  };

  return (
    <section className="hero" id="beranda">
      <div className="hero__glow hero__glow--one" aria-hidden="true" />
      <div className="hero__glow hero__glow--two" aria-hidden="true" />
      <div className="container hero__inner">
        <span className="hero__badge">Gaming Assistance Service</span>
        <h1 className="hero__title">
          Duta<span className="hero__title-accent">Exploration</span>
        </h1>
        <p className="hero__headline">Layanan joki game yang cepat, aman, dan profesional.</p>
        <p className="hero__description">
          Kami melayani <strong>Genshin Impact</strong>, <strong>Honkai: Star Rail</strong>, dan{' '}
          <strong>Wuthering Waves</strong> — dari eksplorasi region, quest, hingga konten endgame.
          Pilih layanan, cek ringkasan pesanan, lalu lanjutkan langsung via WhatsApp.
        </p>
        <div className="hero__actions">
          <a href="#layanan" className="btn btn--primary">
            Explore Services
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          {waConfigured && buildWhatsAppUrl(GREETING_MESSAGE) !== null ? (
            <a
              href={buildWhatsAppUrl(GREETING_MESSAGE) ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Order via WhatsApp
            </a>
          ) : (
            <button type="button" className="btn btn--ghost" onClick={handleWhatsAppClick}>
              <MessageCircle size={18} aria-hidden="true" />
              Order via WhatsApp
            </button>
          )}
        </div>
      </div>
    </section>
  );
}