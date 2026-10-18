import type { Catalog, Price, Service } from '../types/service';
import { formatIdr } from '../utils/price';

/* ------------------------------------------------------------------ */
/* Helper                                                              */
/* ------------------------------------------------------------------ */

/** Format rentang harga, contoh: rangeIdr(25000, 50000) -> "Rp25.000–Rp50.000" */
function rangeIdr(min: number, max: number): string {
  return `${formatIdr(min)}–${formatIdr(max)}`;
}

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

/** Generator kartu dari definisi region (pola sama seperti genshin.ts / wuwa). */
function buildExplorationServices(
  prefix: string,
  defaultName: string,
  regions: readonly RegionDef[],
  areaDescription: (region: RegionDef, area: AreaDef) => string,
): Service[] {
  return regions.flatMap((region) => {
    const services: Service[] = [];
    if (region.allPrice) {
      services.push({
        id: `${prefix}-${region.id}-all`,
        name:
          region.areas.length > 0
            ? `Eksplorasi All ${region.name}`
            : `Eksplorasi ${region.name}`,
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
        name: `${defaultName} ${area.name}`,
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
/* 1. EXPLORATION (Eksplor)                                            */
/* ------------------------------------------------------------------ */

const EXPLORATION_REGIONS: readonly RegionDef[] = [
  {
    id: 'herta-space-station',
    name: 'Herta Space Station',
    allPrice: { type: 'fixed', amount: 20000 },
    areas: [
      { id: 'per-chest', name: 'Per Chest', price: { type: 'fixed', amount: 250 } },
    ],
  },
  {
    id: 'jarilo-vi',
    name: 'Jarilo-VI',
    allPrice: { type: 'fixed', amount: 35000 },
    areas: [
      { id: 'per-chest', name: 'Per Chest', price: { type: 'fixed', amount: 250 } },
    ],
  },
  {
    id: 'xianzhou-luofu',
    name: 'The Xianzhou Luofu',
    allPrice: { type: 'fixed', amount: 80000 },
    areas: [
      { id: 'per-chest', name: 'Per Chest', price: { type: 'fixed', amount: 250 } },
    ],
  },
  {
    id: 'penacony',
    name: 'Penacony',
    allPrice: { type: 'fixed', amount: 120000 },
    areas: [
      { id: 'per-chest', name: 'Per Chest', price: { type: 'fixed', amount: 500 } },
      { id: 'origami', name: 'Origami Bird', price: { type: 'fixed', amount: 200 } },
    ],
  },
  {
    id: 'amphoreus',
    name: 'Amphoreus',
    allPrice: { type: 'fixed', amount: 250000 },
    areas: [
      { id: 'per-chest', name: 'Per Chest', price: { type: 'fixed', amount: 500 } },
      { id: 'puzzle-kambing', name: 'Puzzle Kambing', price: { type: 'fixed', amount: 1000 } },
      { id: 'nimfa', name: 'Per Nimfa', price: { type: 'fixed', amount: 200 } },
    ],
  },
  {
    id: 'planarcadia',
    name: 'Planarcadia',
    // allPrice sengaja kosong (Anda belum mengisi) -> tidak ada kartu "All".
    areas: [
      { id: 'per-chest', name: 'Per Chest', price: { type: 'fixed', amount: 500 } },
    ],
  },
];

const explorationServices: Service[] = buildExplorationServices(
  'eksplorasi',
  'Eksplorasi',
  EXPLORATION_REGIONS,
  (region, area) => {
    if (area.id === 'per-chest') {
      return `Eksplorasi ${region.name} per chest: ${formatIdr(area.price.type === 'fixed' ? area.price.amount : 0)}/chest.`;
    }
    if (area.id === 'origami') {
      return 'Pengumpulan Origami Bird di Penacony — per origami bird.';
    }
    if (area.id === 'nimfa') {
      return 'Pengumpulan Creation Nymph (Nimfa) di Amphoreus — per nimfa.';
    }
    if (area.id === 'puzzle-kambing') {
      return 'Penyelesaian puzzle kambing di Amphoreus — per puzzle.';
    }
    return `Layanan eksplorasi ${area.name} (${region.name}).`;
  },
);

/* ------------------------------------------------------------------ */
/* 2. QUEST                                                            */
/* ------------------------------------------------------------------ */

const questServices: Service[] = [
  {
    id: 'quest-utama',
    name: 'Quest Utama (Trailblaze Mission)',
    description: 'Penyelesaian quest utama / Trailblaze Mission.',
    price: { type: 'fixed', amount: 15000 },
    status: 'available',
    badge: 'Populer',
    details: [`Harga per act: ${formatIdr(15000)}`],
  },
  {
    id: 'quest-orange',
    name: 'Quest Orange',
    description: 'Penyelesaian quest berikon orange (misalnya quest karakter/companion).',
    price: { type: 'fixed', amount: 20000 },
    status: 'available',
  },
  {
    id: 'quest-ungu',
    name: 'Quest Ungu',
    description: 'Penyelesaian quest berikon ungu (Adventure Mission).',
    price: { type: 'fixed', amount: 5000 },
    status: 'available',
  },
  {
    id: 'quest-biru',
    name: 'Quest Biru',
    description: 'Penyelesaian quest berikon biru (side quest harian/kecil).',
    price: { type: 'fixed', amount: 5000 },
    status: 'available',
    details: [`Harga: ${formatIdr(5000)} per 3 quest`],
  },
];

/* ------------------------------------------------------------------ */
/* 3. ENDGAME                                                          */
/* ------------------------------------------------------------------ */

const endgameServices: Service[] = [
  {
    id: 'memory-of-chaos',
    name: 'Memory of Chaos (MOC)',
    description: 'Penyelesaian Memory of Chaos. Harga menyesuaikan stage dan kemampuan akun.',
    price: { type: 'starting', amount: 15000 },
    status: 'available',
    badge: 'Populer',
    details: [
      `Stage 1–10: ${formatIdr(15000)}`,
      `Stage 11–12: ${rangeIdr(25000, 50000)}`,
      `Full Clear: ${rangeIdr(35000, 50000)}`,
    ],
  },
  {
    id: 'pure-fiction',
    name: 'Pure Fiction (PF)',
    description: 'Penyelesaian mode Pure Fiction.',
    price: { type: 'starting', amount: 15000 },
    status: 'available',
    details: [
      `Stage 1–3: ${formatIdr(15000)}`,
      `Stage 4: ${rangeIdr(25000, 50000)}`,
      `Full Clear: ${rangeIdr(35000, 50000)}`,
    ],
  },
  {
    id: 'apocalyptic-shadow',
    name: 'Apocalyptic Shadow (APOC)',
    description: 'Penyelesaian mode Apocalyptic Shadow.',
    price: { type: 'starting', amount: 15000 },
    status: 'available',
    details: [
      `Stage 1–3: ${formatIdr(15000)}`,
      `Stage 4: ${rangeIdr(25000, 50000)}`,
      `Full Clear: ${rangeIdr(35000, 50000)}`,
    ],
  },
  {
    id: 'anomaly-arbitration',
    name: 'Anomaly Arbitration',
    description: 'Penyelesaian mode Anomaly Arbitration.',
    price: { type: 'starting', amount: 25000 },
    status: 'available',
    details: [
      `Knight 1–3: ${rangeIdr(25000, 50000)}`,
      `Stage King: ${rangeIdr(35000, 70000)}`,
    ],
  },
  {
    id: 'simulated-universe',
    name: 'Simulated Universe (SU)',
    description: 'Penyelesaian World Simulated Universe stage 1–9.',
    price: { type: 'starting', amount: 25000 },
    status: 'available',
    details: [
      `Stage 1–7 (Diff 1–4): ${formatIdr(25000)}`,
      `Stage 8–9 (Diff 1–4): ${rangeIdr(25000, 35000)}`,
    ],
  },
  {
    id: 'swarm-disaster',
    name: 'Swarm Disaster',
    description: 'Penyelesaian Simulated Universe: Swarm Disaster.',
    price: { type: 'starting', amount: 10000 },
    status: 'available',
    details: [
      `Misi Pathstrider: ${formatIdr(10000)}`,
      `Prologue & Diff 1: ${formatIdr(20000)}`,
      `Diff 2–5: ${formatIdr(25000)}`,
      `Clear All Reward: ${formatIdr(80000)}`,
    ],
  },
  {
    id: 'gold-and-gears',
    name: 'Gold and Gears',
    description: 'Penyelesaian Simulated Universe: Gold and Gears.',
    price: { type: 'starting', amount: 20000 },
    status: 'available',
    details: [
      `Per Difficulty: ${formatIdr(20000)}`,
      `Conundrum 1–12: ${formatIdr(80000)}`,
    ],
  },
  {
    id: 'secret-zones',
    name: 'Zona Rahasia (Secret Zones)',
    description: 'Penyelesaian Secret Zones di Simulated Universe.',
    price: { type: 'starting', amount: 25000 },
    status: 'available',
    details: [
      `Per Difficulty: ${formatIdr(25000)}`,
      `Kumpulan Manusia Fana: ${formatIdr(30000)}`,
      `Clear All: ${formatIdr(80000)}`,
    ],
  },
  {
    id: 'divergent-universe',
    name: 'Divergent Universe (DU)',
    description: 'Penyelesaian mode Divergent Universe.',
    price: { type: 'starting', amount: 20000 },
    status: 'available',
    details: [
      `Per Difficulty: ${formatIdr(20000)}`,
      `Per Protocol: ${formatIdr(25000)}`,
      `Tier X7–X9: ${formatIdr(80000)}`,
      `Clear All Reward: ${formatIdr(120000)}`,
    ],
  },
  {
    id: 'currency-war',
    name: 'Currency War (CW)',
    description: 'Penyelesaian event/mode Currency War.',
    price: { type: 'starting', amount: 20000 },
    status: 'available',
    details: [
      `A0–A4: ${formatIdr(20000)}`,
      `A4–A8: ${formatIdr(40000)}`,
      `A0–A8: ${formatIdr(80000)}`,
      `All Reward Lv. Ascend: ${formatIdr(100000)}`,
      `All Koneksi Ikatan: ${formatIdr(100000)}`,
      `Clear All: ${formatIdr(180000)}`,
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 4. Katalog HSR                                                      */
/* ------------------------------------------------------------------ */

export const hsrCatalog: Catalog = {
  gameId: 'hsr',
  categories: [
    {
      id: 'exploration',
      name: 'Exploration',
      services: explorationServices,
    },
    {
      id: 'quest',
      name: 'Quest',
      services: questServices,
    },
    {
      id: 'endgame',
      name: 'Endgame',
      services: endgameServices,
    },
  ],
};