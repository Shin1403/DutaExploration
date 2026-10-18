import type { GameId } from './game';

/**
 * Representasi harga yang terstruktur.
 * - fixed: harga pasti.
 * - starting: harga mulai dari.
 * - custom: harga menyesuaikan, hubungi admin.
 * - unconfigured: harga belum diisi — TAMPIL transparan, jangan dikarang.
 */
export type Price =
  | { type: 'fixed'; amount: number }
  | { type: 'starting'; amount: number }
  | { type: 'custom' }
  | { type: 'unconfigured' };

export type ServiceStatus = 'available' | 'unavailable';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: Price;
  region?: string;
  duration?: string;
  details?: string[];
  status: ServiceStatus;
  badge?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

export interface Catalog {
  gameId: GameId;
  categories: ServiceCategory[];
}