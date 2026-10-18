import type { Catalog, Price, Service } from '../types/service';

/**
 * Struktur harga Explorasi:
 *   Region -> allPrice (paket "All <Region>") + daftar wilayah dengan harga masing-masing.
 * Semua harga di bawah adalah harga asli ShinJoki (sudah diisi).
 * Untuk menambah/mengubah: edit angka `amount` pada wilayah terkait.
 */

interface AreaDef {
  id: string;
  name: string;
  price: Price;
}

interface RegionDef {
  id: string;
  name: string;
  /** Harga paket lengkap seluruh wilayah di region ini (opsional). */
  allPrice?: Price;
  areas: AreaDef[];
}

const fixed = (amount: number): Price => ({ type: 'fixed', amount });

const EXPLORATION_REGIONS: RegionDef[] = [
  {
    id: 'mondstadt',
    name: 'Mondstadt',
    allPrice: fixed(300000),
    areas: [
      { id: 'starfell-valley', name: 'Starfell Valley', price: fixed(50000) },
      { id: 'brightcrown-mountain', name: 'Brightcrown Mountain', price: fixed(40000) },
      { id: 'windwail-highland', name: 'Windwail Highland', price: fixed(35000) },
      { id: 'windcry-hill', name: 'Windcry Hill', price: fixed(35000) },
      { id: 'windrest-peak', name: 'Windrest Peak', price: fixed(30000) },
      { id: 'dragonspine', name: 'Dragonspine', price: fixed(60000) },
      { id: 'temple-of-space', name: 'Temple of Space', price: fixed(100000) },
    ],
  },
  {
    id: 'liyue',
    name: 'Liyue',
    allPrice: fixed(200000),
    areas: [
      { id: 'minlin', name: 'Minlin', price: fixed(60000) },
      { id: 'bishui-plain', name: 'Bishui Plain', price: fixed(40000) },
      { id: 'qiongji-estuary', name: 'Qiongji Estuary', price: fixed(40000) },
      { id: 'lisha', name: 'Lisha', price: fixed(40000) },
      { id: 'sea-of-clouds', name: 'Sea of Clouds', price: fixed(40000) },
      { id: 'the-chasm', name: 'The Chasm', price: fixed(40000) },
      { id: 'the-chasm-underground', name: 'The Chasm Underground', price: fixed(70000) },
    ],
  },
  {
    id: 'chenyu-vale',
    name: 'Chenyu Vale',
    allPrice: fixed(120000),
    areas: [
      { id: 'upper-vale', name: 'Upper Vale', price: fixed(60000) },
      { id: 'southern-mountain', name: 'Southern Mountain', price: fixed(60000) },
      { id: 'mt-laixin', name: 'Mt. Laixin', price: fixed(20000) },
    ],
  },
  {
    id: 'inazuma',
    name: 'Inazuma',
    allPrice: fixed(400000),
    areas: [
      { id: 'narukami', name: 'Narukami', price: fixed(70000) },
      { id: 'kannazuka', name: 'Kannazuka', price: fixed(70000) },
      { id: 'yashiori', name: 'Yashiori', price: fixed(70000) },
      { id: 'watatsumi', name: 'Watatsumi', price: fixed(70000) },
      { id: 'seirai', name: 'Seirai', price: fixed(70000) },
      { id: 'tsurumi', name: 'Tsurumi', price: fixed(70000) },
      { id: 'enkanomiya', name: 'Enkanomiya', price: fixed(70000) },
    ],
  },
  {
    id: 'sumeru-forest',
    name: 'Sumeru Forest',
    allPrice: fixed(300000),
    areas: [
      { id: 'aranyaka', name: 'Aranyaka (All Quest)', price: fixed(200000) },
      { id: 'lokapala-jungle', name: 'Lokapala Jungle', price: fixed(60000) },
      { id: 'avidya-forest', name: 'Avidya Forest', price: fixed(60000) },
      { id: 'ardravi-valley', name: 'Ardravi Valley', price: fixed(60000) },
      { id: 'vanarana', name: 'Vanarana', price: fixed(40000) },
      { id: 'vissudha-field', name: 'Vissudha Field', price: fixed(50000) },
      { id: 'lost-nursery', name: 'Lost Nursery', price: fixed(20000) },
      { id: 'ashavan-realm', name: 'Ashavan Realm', price: fixed(70000) },
    ],
  },
  {
    id: 'sumeru-desert',
    name: 'Sumeru Desert',
    allPrice: fixed(400000),
    areas: [
      { id: 'all-quest', name: 'All Quest', price: fixed(200000) },
      { id: 'land-of-lower-setekh', name: 'Land of Lower Setekh', price: fixed(70000) },
      { id: 'land-of-upper-setekh', name: 'Land of Upper Setekh', price: fixed(60000) },
      { id: 'hypostyle-desert', name: 'Hypostyle Desert', price: fixed(70000) },
      { id: 'desert-of-hadramaveth', name: 'Desert of Hadramaveth', price: fixed(80000) },
      { id: 'gavireh-lajavard', name: 'Gavireh Lajavard', price: fixed(60000) },
      { id: 'realm-of-farakhkert', name: 'Realm of Farakhkert', price: fixed(60000) },
    ],
  },
  {
    id: 'fontaine',
    name: 'Fontaine',
    allPrice: fixed(550000),
    areas: [
      { id: 'beryl-region', name: 'Beryl Region', price: fixed(70000) },
      { id: 'belleau-region', name: 'Belleau Region', price: fixed(40000) },
      { id: 'court-of-fontaine', name: 'Court of Fontaine Region', price: fixed(70000) },
      { id: 'liffey-region', name: 'Liffey Region', price: fixed(70000) },
      { id: 'erinnyes-forest', name: 'Erinnyes Forest', price: fixed(70000) },
      { id: 'morte-region', name: 'Morte Region', price: fixed(70000) },
      { id: 'nostoi-region', name: 'Nostoi Region', price: fixed(40000) },
      { id: 'sea-of-bygone-eras', name: 'Sea of Bygone Eras', price: fixed(70000) },
    ],
  },
  {
    id: 'natlan',
    name: 'Natlan',
    allPrice: fixed(500000),
    areas: [
      { id: 'tequemecan-valley', name: 'Tequemecan Valley', price: fixed(50000) },
      { id: 'coatepec-mountain', name: 'Coatepec Mountain', price: fixed(50000) },
      { id: 'basin-of-unnumbered-flames', name: 'Basin of Unnumbered Flames', price: fixed(50000) },
      { id: 'toyac-springs', name: 'Toyac Springs', price: fixed(50000) },
      { id: 'tezcatepetonco-range', name: 'Tezcatepetonco Range', price: fixed(50000) },
      { id: 'quahuacan-cliff', name: 'Quahuacan Cliff', price: fixed(50000) },
      { id: 'ochkanatlan', name: 'Ochkanatlan', price: fixed(60000) },
      { id: 'atocpan', name: 'Atocpan', price: fixed(50000) },
      { id: 'easybreeze-paradise-resort', name: 'EasyBreeze Paradise Resort', price: fixed(80000) },
      { id: 'ancient-sacred-mountain', name: 'Ancient Sacred Mountain', price: fixed(60000) },
    ],
  },
  {
    id: 'nod-krai',
    name: 'Nod-Krai',
    allPrice: fixed(400000),
    areas: [
      { id: 'lempo-isle', name: 'Lempo Isle', price: fixed(80000) },
      { id: 'hiisi-isle', name: 'Hiisi Isle', price: fixed(60000) },
      { id: 'paha-isle', name: 'Paha Isle', price: fixed(60000) },
      { id: 'voidsea-outlook', name: 'Voidsea Outlook', price: fixed(50000) },
      { id: 'wavechaser-plain', name: 'Wavechaser Plain', price: fixed(70000) },
      { id: 'ashveil-peak', name: 'Ashveil Peak', price: fixed(40000) },
      { id: 'frostmoon', name: 'Frostmoon', price: fixed(100000) },
    ],
  },
  {
    id: 'snezhnaya',
    name: 'Snezhnaya',
    allPrice: fixed(250000),
    areas: [
      { id: 'volkodlak-tundra', name: 'Volkodlak Tundra', price: fixed(60000) },
      { id: 'flamefeather-valley', name: 'FlameFeather Valley', price: fixed(60000) },
      { id: 'everfrozen-earth', name: 'Everfrozen Earth', price: fixed(60000) },
      { id: 'fellfrost-peak', name: 'Fellfrost Peak', price: fixed(60000) },
      { id: 'white-birch-snowgrave', name: 'White Birch Snowgrave', price: fixed(60000) },
    ],
  },
];

/**
 * Generate kartu layanan per region:
 * 1. Kartu "All <Region>" (jika allPrice ada) — badge Paket Lengkap.
 * 2. Satu kartu per wilayah dengan harga masing-masing.
 */
const explorationServices: Service[] = EXPLORATION_REGIONS.flatMap((region): Service[] => {
  const allCard: Service[] = region.allPrice
    ? [
        {
          id: `explorasi-${region.id}-all`,
          name: `Explorasi All ${region.name}`,
          region: region.name,
          description: `Paket lengkap seluruh wilayah ${region.name} dalam satu order.`,
          price: region.allPrice,
          status: 'available',
          badge: 'Paket Lengkap',
        },
      ]
    : [];

  const areaCards: Service[] =
    region.areas.length > 0
      ? region.areas.map((area) => ({
          id: `explorasi-${region.id}-${area.id}`,
          name: `Explorasi ${area.name}`,
          region: region.name,
          description: `Jasa eksplorasi ${area.name} (${region.name}): chest, waypoint, dan progress.`,
          price: area.price,
          status: 'available',
        }))
      : [
          {
            id: `explorasi-${region.id}`,
            name: `Explorasi ${region.name}`,
            region: region.name,
            description: `Jasa eksplorasi region ${region.name}: chest, waypoint, dan progress.`,
            price: { type: 'unconfigured' },
            status: 'available',
          },
        ];

  return [...allCard, ...areaCards];
});

export const genshinCatalog: Catalog = {
  gameId: 'genshin',
  categories: [
    {
      id: 'explorasi',
      name: 'Explorasi',
      services: explorationServices,
    },
    {
      id: 'endgame',
      name: 'Endgame',
      services: [
        {
          id: 'spiral-abyss',
          name: 'Spiral Abyss',
          description: 'Penyelesaian Spiral Abyss full star sesuai kemampuan akun.',
          price: { type: 'custom' },
          status: 'available',
          badge: 'Populer',
        },
        {
          id: 'imaginarium-theater',
          name: 'Imaginarium Theater',
          description: 'Penyelesaian mode Imaginarium Theater.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
        {
          id: 'stygian-onslaught',
          name: 'Stygian Onslaught',
          description: 'Penyelesaian tantangan endgame Stygian Onslaught.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
      ],
    },
    {
      id: 'quest',
      name: 'Quest',
      services: [
        {
          id: 'archon-quest',
          name: 'Archon Quest',
          description: 'Penyelesaian story quest utama sesuai chapter yang dipilih.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
        {
          id: 'character-story-quest',
          name: 'Character Story Quest',
          description: 'Penyelesaian story quest karakter (hangout/story).',
          price: { type: 'unconfigured' },
          status: 'available',
        },
        {
          id: 'world-quest',
          name: 'World Quest',
          description: 'Penyelesaian world quest dan rangkaian quest dunia.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
      ],
    },
    {
      id: 'build-character',
      name: 'Build Character',
      services: [
        {
          id: 'character-build',
          name: 'Character Build',
          description: 'Pengaturan build karakter: senjata, artefak, dan stat target.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
        {
          id: 'artifact-farming',
          name: 'Artifact Farming',
          description: 'Farming artefak domain sesuai target stat dan set.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
        {
          id: 'talent-materials',
          name: 'Talent Materials',
          description: 'Farming material talent: book, boss drop, dan weekly boss.',
          price: { type: 'unconfigured' },
          status: 'available',
        },
      ],
    },
    {
      // Kategori Joki IF dipertahankan dari website lama.
      // Detail paket & harga asli belum tersedia -> placeholder kosong.
      id: 'joki-if',
      name: 'Joki IF',
      services: [],
    },
  ],
};