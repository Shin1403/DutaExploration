import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, isWhatsAppConfigured } from '../utils/whatsapp';

const FLOAT_MESSAGE = 'Halo ShinJoki, saya ingin memesan layanan.';

export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  // Sembunyikan saat order panel terlihat di mobile agar tidak menutupi tombol pesan.
  useEffect(() => {
    const panel = document.getElementById('cara-pesan');
    if (!panel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting && window.innerWidth < 768),
      { threshold: 0.15 },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  if (!isWhatsAppConfigured()) return null;

  const url = buildWhatsAppUrl(FLOAT_MESSAGE);
  if (url === null) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-float${hidden ? ' wa-float--hidden' : ''}`}
      aria-label="Chat WhatsApp ShinJoki"
      title="Chat WhatsApp ShinJoki"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}