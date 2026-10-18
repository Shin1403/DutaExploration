import type { Price } from '../types/service';

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export function formatIdr(amount: number): string {
  return idrFormatter.format(amount);
}

/** Label harga yang konsisten untuk seluruh aplikasi. */
export function formatPrice(price: Price): string {
  switch (price.type) {
    case 'fixed':
      return formatIdr(price.amount);
    case 'starting':
      return `Mulai ${formatIdr(price.amount)}`;
    case 'custom':
      return 'Hubungi untuk harga';
    case 'unconfigured':
      return 'Harga belum ditentukan';
  }
}