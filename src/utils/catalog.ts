import type { Catalog } from '../types/service';
import type { GameId } from '../types/game';

export function findCategory(catalog: Catalog, categoryId: string | null) {
  if (categoryId === null) return undefined;
  return catalog.categories.find((c) => c.id === categoryId);
}

export function findService(catalog: Catalog, categoryId: string | null, serviceId: string | null) {
  const category = findCategory(catalog, categoryId);
  if (!category || serviceId === null) return undefined;
  return category.services.find((s) => s.id === serviceId);
}

/** Pastikan pilihan masih valid terhadap katalog aktif (dipakai saat ganti game). */
export function sanitizeSelection(
  catalog: Catalog,
  categoryId: string | null,
  serviceId: string | null,
): { categoryId: string | null; serviceId: string | null } {
  const category = findCategory(catalog, categoryId);
  if (!category) return { categoryId: null, serviceId: null };
  const service = category.services.find((s) => s.id === serviceId);
  if (!service) return { categoryId: category.id, serviceId: null };
  return { categoryId: category.id, serviceId: service.id };
}

export type CatalogMap = Record<GameId, Catalog>;