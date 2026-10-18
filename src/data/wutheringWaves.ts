import type { Catalog, Price, Service } from '../types/service';

/* ------------------------------------------------------------------ */
/* Struktur 3 tingkat: Region -> Wilayah -> Harga                      */
/* ------------------------------------------------------------------ */

interface AreaDef {
  id: string;
  name: string;
  price: Price;
}

interface RegionDef {
  id: string;
  name: string;
  /** Deskripsi khusus untuk kartu "All Region". */
  description?: string;
  /** Jika diisi, dibuatkan kartu paket lengkap dengan badge "Paket Lengkap". */
  allPrice?: Price;
  areas: AreaDef[];
}

/** Generator kartu dari definisi region (pola sama seperti genshin.ts). */
function buildExplorationServices(
  prefix: string,
  defaultAllName: string,
  regions: readonly RegionDef[],
  areaDescription: (region: RegionDef, area: AreaDef) => string,
): Service[] {
  return regions.flatMap((region) => {
    const services: Service[] = [];
    if (region.allPrice) {
      services.push({
        id: `${prefix}-${region.id}-all`,
        // "All" hanya dipakai kalau region punya sub-wilayah.
        name:
          region.areas.length > 0
            ? `${defaultAllName} All ${region.name}`
            : `${defaultAllName} ${region.name}`,
        region: region.name,
        description:
          region.description ?? `Paket lengkap eksplorasi seluruh wilayah ${region.name}.`,
        price: region.allPrice,
        status: 'available',
        badge: 'Paket Lengkap',
      });
    }
    for (const area of region.areas) {
      services.push({
        id: `${prefix}-${region.id}-${area.id}`,
        name: `${defaultAllName} ${area.name}`,
        region: region.name,
        description: areaDescription(region, area),
        price: area.price,
        status: 'available',
      });
    }
    return services;
  });
}

/* ------------------------------------------------------------------ */
/* 1. EXPLORATION (Explor)                                             */
/* ------------------------------------------------------------------ */

const EXPLORATION_REGIONS: readonly RegionDef[] = [
  {
    id: 'huanglong',
    name: 'Huanglong',
    description: 'Paket lengkap: seluruh Jinzhou + Black Shores + Mt. Firmament.',
    allPrice: { type: 'fixed', amount: 320000 },
    areas: [
      { id: 'jinzhou', name: 'Jinzhou All', price: { type: 'fixed', amount: 260000 } },
      { id: 'black-shores', name: 'Black Shores', price: { type: 'fixed', amount: 80000 } },
      { id: 'mt-firmament', name: 'Mt. Firmament', price: { type: 'fixed', amount: 60000 } },
    ],
  },
  {
    id: 'rinascita',
    name: 'Rinascita',
    allPrice: { type: 'fixed', amount: 380000 },
    areas: [
      { id: 'septimont', name: 'Septimont', price: { type: 'fixed', amount: 100000 } },
    ],
  },
  {
    id: 'laharoi',
    name: 'Laharoi',
    allPrice: { type: 'fixed', amount: 480000 },
    areas: [
      { id: 'lahai-roi', name: 'Lahai-Roi', price: { type: 'fixed', amount: 180000 } },
      { id: 'frostlands-surface', name: 'Frostlands Surface', price: { type: 'fixed', amount: 160000 } },
      { id: 'dimmr-plains', name: 'Dimmr Plains', price: { type: 'fixed', amount: 140000 } },
    ]
  },
  {
    id: 'mengzhou',
    name: 'Mengzhou',
    allPrice: { type: 'fixed', amount: 280000 },
    areas: [
      { id: 'simulacrum-nexus', name: 'Simulacrum Nexus', price: { type: 'fixed', amount: 100000 } },
    ],
  },
];

const explorationServices: Service[] = buildExplorationServices(
  'explorasi',
  'Explorasi',
  EXPLORATION_REGIONS,
  (region, area) =>
    `Jasa eksplorasi ${area.name} (${region.name}): chest, puzzle, supply chest, dan progress.`,
);

/* ------------------------------------------------------------------ */
/* 2. RE-EXPLORATION (ReExplor)                                        */
/* ------------------------------------------------------------------ */

const RE_EXPLORATION_REGIONS: readonly RegionDef[] = [
  {
    id: 'huanglong',
    name: 'Huanglong',
    description: 'Eksplorasi ulang seluruh Huanglong — sudah termasuk Black Shores dan Mt. Firmament.',
    allPrice: { type: 'fixed', amount: 160000 },
    areas: [
      { id: 'jinzhou', name: 'Jinzhou All', price: { type: 'fixed', amount: 80000 } },
      { id: 'black-shores', name: 'Black Shores', price: { type: 'fixed', amount: 40000 } },
      { id: 'mt-firmament', name: 'Mt. Firmament', price: { type: 'fixed', amount: 20000 } },
    ],
  },
  {
    id: 'rinascita',
    name: 'Rinascita',
    allPrice: { type: 'fixed', amount: 120000 },
    areas: [
      { id: 'septimont', name: 'Septimont', price: { type: 'fixed', amount: 50000 } },
      { id: 'lahai-roi', name: 'Lahai-Roi', price: { type: 'fixed', amount: 80000 } },
      { id: 'frostlands-surface', name: 'Frostlands Surface', price: { type: 'fixed', amount: 60000 } },
      { id: 'dimmr-plains', name: 'Dimmr Plains', price: { type: 'fixed', amount: 40000 } },
    ],
  },
  {
    id: 'mengzhou',
    name: 'Mengzhou',
    allPrice: { type: 'fixed', amount: 80000 },
    areas: [], // tanpa sub-wilayah -> jadi satu kartu "Explorasi Ulang Mengzhou"
  },
];

const reExplorationServices: Service[] = buildExplorationServices(
  'eksplorasi-ulang',
  'Explorasi Ulang',
  RE_EXPLORATION_REGIONS,
  (region, area) =>
    `Eksplorasi ulang ${area.name} (${region.name}): membersihkan sisa supply chest + hidden chest.`,
);

/* ------------------------------------------------------------------ */
/* 3. Katalog WuWa                                                     */
/* ------------------------------------------------------------------ */

export const wuwaCatalog: Catalog = {
  gameId: 'wuwa',
  categories: [
    {
      id: 'exploration',
      name: 'Exploration',
      services: explorationServices,
    },
    {
      id: 're-exploration',
      name: 'Re-Exploration',
      services: reExplorationServices,
    },
    {
      id: 'quest',
      name: 'Quest',
      services: [
        {
          id: 'quest-utama',
          name: 'Quest Utama',
          description: 'Penyelesaian quest utama (main quest). Harga per act, tergantung panjang act.',
          price: { type: 'starting', amount: 25000 }, // tampil: "Mulai Rp25.000" (range 25k–35k/act)
          status: 'available',
          badge: 'Populer',
        },
        {
          id: 'quest-hijau',
          name: 'Quest Hijau',
          description: 'Penyelesaian quest berikon hijau.',
          price: { type: 'fixed', amount: 20000 },
          status: 'available',
        },
        {
          id: 'quest-ungu',
          name: 'Quest Ungu',
          description: 'Penyelesaian quest berikon ungu.',
          price: { type: 'fixed', amount: 25000 },
          status: 'available',
        },
        {
          id: 'quest-biru',
          name: 'Quest Biru',
          description: 'Penyelesaian quest berikon biru. Rp5.000 per 2 quest.',
          price: { type: 'fixed', amount: 5000 },
          status: 'available',
        },
      ],
    },
    // Kategori Endgame dipertahankan dari struktur lama — menunggu data harga asli.

    {
      id: 'endgame',
      name: 'Endgame',
      services: [
        {
          id: 'tower-of-adversity',
          name: 'Tower of Adversity',
          description: 'Penyelesaian Menyesuaikan Akun User',
          price: {type: 'unconfigured'},
          status: 'available',
          badge: 'Populer',
        },
        {
          id: 'whimpering_wastes',
          name: 'Whimpering Wastes',
          description: 'Penyelesaian Menyesuaikan Akun User',
          price: {type: 'custom' },
          status: 'available',
          badge: 'Populer',
        },
        {
          id: 'endstate_matrix',
          name: 'Endstate Matrix',
          description: 'Penyelesaian Menyesaikan Akun User',
          price: {type: 'custom'},
          status: 'available',
          badge: 'Populer',
        },
        {
          id: 'tactical_hologram',
          name: 'Tactical Hologram',
          description: 'Penyelesaian Menyesuaikan Akun User',
          price: {type: 'custom'},
          status: 'available',
          badge: 'Populer',
        },
        {
          id: 'depths_of_illusive_realm',
          name: 'Depths of Illusive Realm',
          description: 'Penyelesaian Menyesuaikan Akun Use',
          price: {type: 'custom'},
          status: 'available',
          badge: 'Populer'
        },
      ],
    },
  ],
};