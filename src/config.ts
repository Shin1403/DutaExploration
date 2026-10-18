/**
 * Konfigurasi terpusat ShinJoki.
 *
 * WAJIB diganti sebelum produksi:
 * - whatsappNumber: nomor WhatsApp format internasional tanpa "+", contoh "6281234567890".
 * - links.tiktok / discord / socialBuzz / saweria: URL sosial media yang benar.
 *
 * Jika sebuah link dikosongkan (""), item tersebut otomatis disembunyikan.
 */
export interface BrandConfig {
  name: string;
  initials: string;
  tagline: string;
}

export interface SocialConfig {
  tiktok: string;
  discord: string;
  socialBuzz: string;
  saweria: string;
}

export interface AppConfig {
  brand: BrandConfig;
  whatsappNumber: string;
  social: SocialConfig;
}

export const appConfig: AppConfig = {
  brand: {
    name: 'DutaExploration',
    initials: 'DE',
    tagline: 'Fast • Trusted • Professional',
  },
  whatsappNumber: '085157734287', // TODO: isi nomor, contoh '6281234567890'
  social: {
    tiktok: 'https://www.tiktok.com/@shin_dgfx',
    discord: 'https://discord.gg/U2zSQukBuY',
    socialBuzz: 'https://sociabuzz.com/shinjoki/tribe',
    saweria: '',
  },
};

export function isLinkConfigured(url: string): boolean {
  return url.trim().length > 0;
}