import { appConfig } from '../config';

/** Satu-satunya sumber kebenaran nomor WhatsApp. */
export function getWhatsAppNumber(): string {
  return appConfig.whatsappNumber.trim();
}

/** Nomor valid: 8–15 digit angka, format internasional tanpa "+". */
export function isWhatsAppConfigured(): boolean {
  return /^\d{8,15}$/.test(getWhatsAppNumber());
}

export interface OrderMessageInput {
  gameName: string;
  categoryName: string;
  serviceName: string;
  priceLabel: string;
  notes: string;
}

/** Bangun pesan order berbahasa Indonesia yang rapi dan terstruktur. */
export function buildOrderMessage(input: OrderMessageInput): string {
  const notes = input.notes.trim();
  const lines = [
    'Halo ShinJoki, saya ingin memesan layanan.',
    '',
    `Game: ${input.gameName}`,
    `Kategori: ${input.categoryName}`,
    `Layanan: ${input.serviceName}`,
    `Harga: ${input.priceLabel}`,
    '',
    'Catatan:',
    notes.length > 0 ? notes : '(tidak ada)',
    '',
    'Mohon informasi selanjutnya. Terima kasih.',
  ];
  return lines.join('\n');
}

/** Bangun URL wa.me yang aman. Null jika nomor belum dikonfigurasi. */
export function buildWhatsAppUrl(message: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

/** Buka WhatsApp di tab baru; kembalikan false jika belum dikonfigurasi. */
export function openWhatsApp(message: string): boolean {
  const url = buildWhatsAppUrl(message);
  if (url === null) return false;
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}