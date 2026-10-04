export interface MenuItem {
  id: string;
  name: string;
  parsiName?: string;
  category: 'all-day-breakfast' | 'parsi-mains' | 'apero-small-plates' | 'desserts' | 'drinks-bar';
  price: number;
  description: string;
  dietary: 'veg' | 'non-veg';
  isSignature?: boolean;
  isHalal?: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  serves: string;
  ingredients: string[];
  pairingNotes?: string;
  history?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'interior' | 'vinyl-bar' | 'culinary' | 'heritage';
  imageUrl: string;
  description: string;
  moodTag: string;
  aspectRatio: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  schedule: string;
  description: string;
  curator: string;
  timeSlot: string;
}

export const CAFE_INFO = {
  name: "Malido Cafe & Apéro",
  tagline: "Authentic Parsi Kitchen, Artisanal Roasts & Analog Apéro Bar",
  location: "Kala Ghoda, Fort, Mumbai, Maharashtra 400001",
  landmark: "Near Ropewalk Lane, 2 mins from Jehangir Art Gallery & David Sassoon Library",
  googleMapsUrl: "https://maps.app.goo.gl/xAn5Zj2S9MZf5ESG6",
  googleRating: 4.5,
  reviewCount: 630,
  phone: "+91 98200 48219",
  alternatePhone: "+91 22 2281 9045",
  email: "hello@malidocafe.com",
  whatsappNumber: "919820048219",
  hours: {
    dineIn: "8:00 AM – 11:30 PM (Daily)",
    breakfast: "8:00 AM – 11:30 AM",
    lunch: "12:00 PM – 3:30 PM",
    highTea: "3:30 PM – 6:30 PM",
    dinnerApero: "7:00 PM – 11:30 PM",
    delivery: "10:00 AM – 6:00 PM"
  },
  capacity: "40 Seater Intimate Heritage Space",
  founders: "Kermeen & Neville Bose",
  heritageNote: "Neville Bose is the grand-nephew of Netaji Subhash Chandra Bose.",
  dietaryCertification: "All mutton and chicken dishes are 100% Halal certified. Separate cookware maintained for vegetarian dishes.",
};

export const MENU_CATEGORIES = [
  { id: 'all-day-breakfast', label: 'All-Day Breakfast & Eggs' },
  { id: 'parsi-mains', label: 'Parsi Heritage Mains & Pulaos' },
  { id: 'apero-small-plates', label: 'Apéro Small Plates & Bites' },
  { id: 'desserts', label: 'Desserts & Traditional Malido' },
  { id: 'drinks-bar', label: 'Artisanal Coffee & Libations' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // ALL-DAY BREAKFAST & EGGS
  {
    id: 'bharuchi-akuri',
    name: 'Bharuchi Akuri',
    parsiName: 'ભરૂચી અકુરી',
    category: 'all-day-breakfast',
    price: 380,
    description: 'The royal Parsi scrambled egg specialty from Bharuch. Slow-stirred creamy eggs infused with ginger, green chilies, cashews, golden raisins, and rich milk, crowned with fresh coriander and served with hot crusty ladi pav.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 2,
    serves: '1-2 persons',
    ingredients: ['Farm-fresh eggs', 'Roasted cashews & raisins', 'Green chilies', 'Ghee', 'Fresh milk', 'Toasted Ladi Pav'],
    pairingNotes: 'Best paired with our hot Spiced Irani Chai or single-origin French Press.',
    history: 'A festive variation originating among Parsi families in the port city of Bharuch, made richer with dry fruits for auspicious breakfast mornings.'
  },
  {
    id: 'parsi-poro',
    name: 'Authentic Parsi Poro',
    parsiName: 'પારસી પોરો',
    category: 'all-day-breakfast',
    price: 290,
    description: 'Thick, fluffy, and golden herbed Parsi omelette loaded with chopped red onions, vine-ripened tomatoes, fresh coriander, green chilies, and a gentle pinch of turmeric. Served with buttered sourdough or pav.',
    dietary: 'non-veg',
    spiceLevel: 2,
    serves: '1 person',
    ingredients: ['Free-range eggs', 'Kothmir (fresh coriander)', 'Desi onions', 'Vine tomatoes', 'Ladi pav / buttered sourdough'],
    pairingNotes: 'Pairs wonderfully with freshly pressed Valencia Orange Juice or Cortado.'
  },
  {
    id: 'bun-maska-irani-chai',
    name: 'Charcoal Bun Maska & Irani Chai',
    parsiName: 'બન મસ્કા અને ઈરાની ચાય',
    category: 'all-day-breakfast',
    price: 210,
    description: 'Pillowy soft hearth-baked sweet bun generously slathered with cold whipped salted Amul butter, paired with slow-brewed caramelized milk Irani tea steeped with crushed green cardamom and lemongrass.',
    dietary: 'veg',
    isSignature: true,
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Fresh baker bun', 'Whipped salted butter', 'Assam black tea leaves', 'Evaporated milk', 'Cardamom & lemongrass'],
    pairingNotes: 'Dip the warm buttery bun directly into the sweet Irani chai for the classic colonial cafe ritual.'
  },
  {
    id: 'brun-pav-fig-jam',
    name: 'Crispy Brun Pav with Kermeen’s Fig Jam',
    parsiName: 'બ્રુન પાવ અને અંજીર જામ',
    category: 'all-day-breakfast',
    price: 240,
    description: 'Ultra-crisp crusty Brun Pav with an airy tender crumb, served with Kermeen Bose’s homemade small-batch spiced fig and star anise preserve, topped with a slab of salted farmhouse butter.',
    dietary: 'veg',
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Wood-fired Brun Pav', 'Homemade Mahabaleshwar fig jam', 'Star anise', 'Cold farmhouse butter'],
    pairingNotes: 'Perfect accompaniment to our single-origin pour-over.'
  },
  {
    id: 'mutton-kheema-ghotala',
    name: 'Mutton Kheema Ghotala Pav',
    parsiName: 'મટન ખીમા ઘોટાળા',
    category: 'all-day-breakfast',
    price: 490,
    description: 'Slow-simmered hand-minced tender mutton cooked with warm spices, jiggling egg scrambled into the meat, and crowned with a sunny-side-up fried egg with golden runny yolk. Served with hot buttered pav and sliced pickled onions.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 3,
    serves: '1-2 persons',
    ingredients: ['Prime minced mutton (Halal)', 'Parsi sambhar masala', 'Farm eggs', 'Caramelized onions', 'Ladi Pav'],
    pairingNotes: 'Complements the chilled Parsi Raspberry Soda Fizz to balance the hearty spices.'
  },

  // PARSI HERITAGE MAINS & PULAOS
  {
    id: 'saffron-mutton-berry-pulao',
    name: 'Saffron Mutton Berry Pulao',
    parsiName: 'ઝેરેશ્ક બેરી પુલાવ',
    category: 'parsi-mains',
    price: 720,
    description: 'Our crown jewel dish. Long-grain aged Basmati rice layered with succulent morsels of slow-braised mutton in saffron-cardamom broth, garnished with tart ruby Iranian zereshk (barberries), golden fried birista onions, toasted cashews, and fresh mint. Served with cold mint kachumber.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 1,
    serves: '1-2 persons',
    ingredients: ['Aged Dehradun Basmati rice', 'Tender boneless mutton (Halal)', 'Iranian zereshk berries', 'Kashmiri saffron', 'Toasted cashews & almonds', 'Birista onions'],
    pairingNotes: 'Pairs exceptionally well with our signature Kala Ghoda Negroni or chilled Apéro Spritz.',
    history: 'Adapted from the famous Irani-Parsi immigrant tradition celebrating Iranian barberries that cut through rich braised meat.'
  },
  {
    id: 'sali-boti',
    name: 'Grandmother’s Sali Boti',
    parsiName: 'સાળી બોટી',
    category: 'parsi-mains',
    price: 660,
    description: 'Classic festive Parsi curry of boneless lamb cooked in an aromatic, complex sweet-and-sour gravy of Kolah vinegar, jaggery, tomatoes, and ground spices. Heaped generously with crisp, golden deep-fried potato matchsticks (sali) and served with warm pav or rotli.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 2,
    serves: '1-2 persons',
    ingredients: ['Tender lamb cubes (Halal)', 'Navsari cane sugar jaggery', 'Parsi toddy vinegar', 'Crisp potato matchsticks (Sali)', 'Warm rotli / pav'],
    pairingNotes: 'Delicious with a glass of dry red wine or artisanal ginger-mint cooler.'
  },
  {
    id: 'kolmi-no-patio',
    name: 'Kolmi No Patio',
    parsiName: 'કોલમી નો પાટિયો',
    category: 'parsi-mains',
    price: 680,
    description: 'Plump coastal tiger prawns simmered in an addictive, piquant gravy balancing sour cane vinegar, sweet sugarcane jaggery, fenugreek, garlic, and Kashmiri red chillies. Served alongside warm whole wheat rotlis or steamed rice.',
    dietary: 'non-veg',
    isHalal: true,
    spiceLevel: 3,
    serves: '1-2 persons',
    ingredients: ['Fresh Arabian Sea tiger prawns', 'Garlic fenugreek masala', 'Parsi cane vinegar', 'Cumin jaggery reduction', 'Warm rotlis'],
    pairingNotes: 'A bold, zesty dish suited to our citrusy Apéro Spritz or chilled sparkling soda.'
  },
  {
    id: 'patra-ni-machhi',
    name: 'Patra Ni Machhi',
    parsiName: 'પાત્રા ની મચ્છી',
    category: 'parsi-mains',
    price: 740,
    description: 'Parsi wedding classic. Fillet of fresh silver pomfret generously coated in freshly pounded green chutney (fresh coconut, coriander, mint, green chillies, cumin, and lemon), tightly parcels in charred banana leaf and gently steamed to tender perfection.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 2,
    serves: '1 person',
    ingredients: ['Silver pomfret fillet', 'Fresh grated coconut', 'Coriander & mint chutney', 'Banana leaf parcel', 'Lemon wedge'],
    pairingNotes: 'Subtle and aromatic; pairs seamlessly with our single-origin iced coffee or crisp tonic.'
  },
  {
    id: 'parsi-dhansak',
    name: 'Sunday Special Mutton Dhansak',
    parsiName: 'પારસી ધનસાક',
    category: 'parsi-mains',
    price: 680,
    description: 'The beloved Sunday family feast. A velvety slow-cooked stew of four indigenous lentils (toor, masoor, moong, chana), pumpkin, fenugreek, and tender mutton, infused with roasted Dhansak masala. Accompanied by caramelized onion brown rice, mutton kebabs, and tangy kachumber.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 2,
    serves: '1-2 persons',
    ingredients: ['Quad-lentil blend', 'Tender mutton pieces (Halal)', 'Caramelized brown rice', 'Minced meat kebabs', 'Piquant onion kachumber'],
    pairingNotes: 'Traditional pairing: sip our chilled Parsi Raspberry Soda.'
  },
  {
    id: 'veg-dhansak-paneer-akuri',
    name: 'Heritage Veg Dhansak & Brown Rice',
    parsiName: 'શાકાહારી ધનસાક',
    category: 'parsi-mains',
    price: 520,
    description: 'Vegetarian slow-simmered medley of yellow lentils, red pumpkin, aubergine, fenugreek greens, and baby potatoes in hand-ground spices. Served with traditional caramelized brown rice, spiced vegetable cutlets, and kachumber.',
    dietary: 'veg',
    spiceLevel: 2,
    serves: '1-2 persons',
    ingredients: ['Four-lentil slow blend', 'Red pumpkin & vegetables', 'Caramelized rice', 'Veg cutlets', 'Kachumber salad'],
    pairingNotes: 'Wholesome and comforting with our iced Rose Cardamom brew.'
  },

  // APÉRO SMALL PLATES & BITES
  {
    id: 'mutton-kheema-cutlet',
    name: 'Mutton Kheema Na Cutlet (3 pcs)',
    parsiName: 'ખીમા ના કટલેસ',
    category: 'apero-small-plates',
    price: 440,
    description: 'Crispy panko-crusted spiced mutton cutlets seasoned with Kermeen’s secret blend of roasted spices, ginger, and fresh mint. Served piping hot with house piquant coriander-mint dip and lime wedges.',
    dietary: 'non-veg',
    isSignature: true,
    isHalal: true,
    spiceLevel: 2,
    serves: '2 persons',
    ingredients: ['Minced mutton (Halal)', 'Fresh mint & coriander', 'Panko breadcrumbs', 'Spiced mint dip'],
    pairingNotes: 'The quintessential Mumbai apéro bar bite, perfect with craft beers or a dry gin cocktail.'
  },
  {
    id: 'truffle-mushroom-malido-crostini',
    name: 'Wild Mushroom & Truffle Crostini',
    category: 'apero-small-plates',
    price: 390,
    description: 'Sautéed forest mushrooms, garlic thyme butter, white truffle oil, and shaved aged Parmesan served on toasted house sourdough slices with microgreens.',
    dietary: 'veg',
    spiceLevel: 1,
    serves: '1-2 persons',
    ingredients: ['Portobello & button mushrooms', 'House sourdough', 'Truffle oil', 'Parmesan shavings', 'Fresh thyme'],
    pairingNotes: 'Designed specifically for early evening apéro drinks.'
  },
  {
    id: 'paneer-akuri-tostadas',
    name: 'Spiced Paneer Akuri Tostadas',
    category: 'apero-small-plates',
    price: 360,
    description: 'Bite-sized crisp mini sourdough tostadas topped with creamy spiced scrambled malai paneer, pickled radish, roasted pumpkin seeds, and cilantro crema.',
    dietary: 'veg',
    spiceLevel: 2,
    serves: '2 persons',
    ingredients: ['Fresh malai paneer', 'Mini crisp sourdough', 'Pickled radish', 'Cilantro crema'],
    pairingNotes: 'A fresh, tangy bar plate that pairs cleanly with our Negroni.'
  },
  {
    id: 'kurkuri-bhindi-aioli',
    name: 'Crispy Kurkuri Okra & Mango Mayo',
    category: 'apero-small-plates',
    price: 310,
    description: 'Julienned okra tossed in chickpea flour, dried mango powder (amchur), and crushed carom seeds, flash-fried to an irresistible crunch. Served with roasted garlic raw-mango aioli.',
    dietary: 'veg',
    spiceLevel: 1,
    serves: '2 persons',
    ingredients: ['Crisp farm okra', 'Gram flour & amchur', 'Ajwain seeds', 'Raw mango aioli'],
    pairingNotes: 'Addictive finger food while listening to vinyl records.'
  },

  // DESSERTS & TRADITIONAL MALIDO
  {
    id: 'signature-malido-pudding',
    name: 'Signature Warm Parsi Malido Pudding',
    parsiName: 'શુદ્ધ પારસી માલીદો',
    category: 'desserts',
    price: 340,
    description: 'The cafe’s namesake and our heart. A sacred, ancient Parsi celebration delicacy made by slowly roasting coarse semolina and whole wheat flour in pure cow ghee, steeped in sugar syrup, infused with green cardamom and saffron, and crowned with roasted slivered almonds, pistachios, and dried raisins. Served warm.',
    dietary: 'veg',
    isSignature: true,
    spiceLevel: 0,
    serves: '1-2 persons',
    ingredients: ['Coarse golden semolina', 'Pure cow ghee', 'Kashmiri saffron', 'Crushed green cardamom', 'Slivered pistachios & almonds'],
    pairingNotes: 'Best savored with a steaming cup of freshly brewed Irani Chai or single-origin espresso.',
    history: 'In Parsi tradition, Malido is prepared during Jashan ceremonies and celebratory milestones as a symbol of abundance and love.'
  },
  {
    id: 'lagan-nu-custard',
    name: 'Traditional Lagan Nu Custard',
    parsiName: 'લગન નું કસ્ટર્ડ',
    category: 'desserts',
    price: 310,
    description: 'The iconic Parsi wedding dessert. Slow-baked rich custard made with condensed milk, whole milk, farm eggs, infused with fresh grated nutmeg and rose water, baked until the crust develops a caramel-bronze glaze with crunchy slivered almonds.',
    dietary: 'non-veg',
    isSignature: true,
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Condensed & whole milk', 'Farm eggs', 'Grated nutmeg', 'Rose water', 'Toasted almond flakes'],
    pairingNotes: 'Silky, fragrant, and decadent with an espresso tonic.'
  },
  {
    id: 'parsi-mawa-cake',
    name: 'Warm Parsi Mawa Cake Slice',
    parsiName: 'માવા કેક',
    category: 'desserts',
    price: 240,
    description: 'Dense, moist, cardamom-scented sponge cake enriched with slow-reduced milk mawa (khoya) and pure butter, topped with slivered cashews and served warm with a dollop of clotted cream.',
    dietary: 'veg',
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Slow-simmered fresh mawa', 'Butter sponge', 'Cardamom', 'Cashew crust', 'Clotted cream'],
    pairingNotes: 'A timeless staple of colonial Bombay bakeries.'
  },
  {
    id: 'dark-chocolate-sea-salt-truffles',
    name: 'Artisanal Dark Chocolate & Sea Salt Truffles',
    category: 'desserts',
    price: 280,
    description: 'Three handcrafted 70% single-origin Indian cacao ganache truffles dusted with bitter cocoa powder and flaked Arabian sea salt.',
    dietary: 'veg',
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['70% Single-origin chocolate', 'Heavy cream', 'Flaked sea salt', 'Dusted dark cocoa'],
    pairingNotes: 'An exquisite finish with our pour-over coffee or a digestif.'
  },

  // DRINKS & LIBATIONS
  {
    id: 'parsi-raspberry-soda',
    name: 'Old-School Parsi Raspberry Soda Fizz',
    category: 'drinks-bar',
    price: 220,
    description: 'The nostalgic red elixir of Parsi weddings. House-made sweet-tart raspberry and rose reduction charged with crisp sparkling soda and finished with fresh mint and a squeeze of lime.',
    dietary: 'veg',
    isSignature: true,
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Natural raspberry reduction', 'Rose essence', 'Fizzy soda', 'Fresh mint', 'Kala Ghoda lime'],
    pairingNotes: 'The authentic Bombay accompaniment to Mutton Kheema or Berry Pulao.'
  },
  {
    id: 'rose-cardamom-cold-brew',
    name: 'Rose & Cardamom Cold Brew',
    category: 'drinks-bar',
    price: 260,
    description: '18-hour slow-steeped Arabica cold brew infused with organic damask rose water and crushed green cardamom, served over crystal clear ice with optional oat milk splash.',
    dietary: 'veg',
    isSignature: true,
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Chikmagalur single-origin Arabica', 'Organic rose water', 'Crushed cardamom pods', 'Crystal ice'],
    pairingNotes: 'Refreshing and floral afternoon pick-me-up.'
  },
  {
    id: 'kala-ghoda-negroni',
    name: 'Kala Ghoda Heritage Negroni',
    category: 'drinks-bar',
    price: 590,
    description: 'Our signature apéro cocktail. Botanical gin stirred with Campari, sweet Italian vermouth, and a house-made cordial infused with star anise and bitter orange peel.',
    dietary: 'veg',
    isSignature: true,
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Artisanal gin', 'Campari', 'Carpano Antica vermouth', 'Star anise bitter orange infusion'],
    pairingNotes: 'The quintessential evening apéro ritual before dinner.'
  },
  {
    id: 'apero-spritz',
    name: 'Malido Apéro Spritz',
    category: 'drinks-bar',
    price: 540,
    description: 'Aperol, crisp sparkling Prosecco, splash of blood orange soda, and an olive-stuffed green grape garnish.',
    dietary: 'veg',
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Aperol', 'Sparkling wine', 'Blood orange soda', 'Citrus wheel'],
    pairingNotes: 'Crisp, effervescent, and uplifting.'
  },
  {
    id: 'single-origin-aeropress',
    name: 'Estate Aeropress / Pour Over',
    category: 'drinks-bar',
    price: 230,
    description: 'Hand-poured filter coffee using light-roasted single estate beans from Karnataka hills, delivering tasting notes of citrus blossom and caramel.',
    dietary: 'veg',
    spiceLevel: 0,
    serves: '1 person',
    ingredients: ['Freshly ground single estate Arabica', 'Filtered brew water'],
    pairingNotes: 'Clean finish to savor alongside Mawa Cake.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-interior-hero',
    title: 'The Colonial Dining Hall',
    category: 'interior',
    imageUrl: '/src/assets/images/hero_cafe_interior_1791139969863.jpg',
    description: 'Sunlit morning light streaming across polished dark teakwood dining tables, vintage bentwood chairs, and heritage arched walls.',
    moodTag: 'Morning Light & Heritage',
    aspectRatio: '16/9'
  },
  {
    id: 'photo-vinyl-bar',
    title: 'The Analog Vinyl & Apéro Corner',
    category: 'vinyl-bar',
    imageUrl: '/src/assets/images/cafe_vinyl_apero_bar_1791139982242.jpg',
    description: 'Our intimate wooden turntable nook with handpicked vinyl records, amber glow from pendant glass lamps, and evening cocktail bar.',
    moodTag: 'Analog Vinyl & Libations',
    aspectRatio: '4/3'
  },
  {
    id: 'photo-berry-pulao',
    title: 'Saffron Mutton Berry Pulao & Akuri',
    category: 'culinary',
    imageUrl: '/src/assets/images/food_berry_pulao_spread_1791139993451.jpg',
    description: 'Fragrant saffron-tinted long grain rice with Iranian zereshk berries, slow-cooked tender mutton, and golden Bharuchi Akuri.',
    moodTag: 'Signature Parsi Feast',
    aspectRatio: '4/3'
  },
  {
    id: 'photo-malido-pudding',
    title: 'The Sacred Malido Pudding & Chai',
    category: 'heritage',
    imageUrl: '/src/assets/images/dessert_malido_pudding_1791140006549.jpg',
    description: 'Warm semolina pudding toasted in golden ghee with crushed pistachios, cardamom, and steaming Irani chai in vintage glassware.',
    moodTag: 'The 100-Year Recipe',
    aspectRatio: '4/3'
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'vinyl-thursdays',
    title: 'Vinyl Thursdays with Soundrise',
    tagline: 'Analog Soul, Jazz & Global Funk on Turntable',
    schedule: 'Every Thursday Evening · 7:30 PM onwards',
    description: 'No digital playlists, only pure vinyl warmth. Analog audiophile collective Soundrise spins rare pressings across soul, jazz, retro funk, and 70s Bombay psych while you enjoy apéritifs and small plates.',
    curator: 'Soundrise Vinyl Collective & Malido Sound Bar',
    timeSlot: '7:30 PM – 11:00 PM'
  },
  {
    id: 'there-and-back-again',
    title: 'There & Back Again: Songwriter Nights',
    tagline: 'Intimate Acoustic Sessions in the Art District',
    schedule: 'Alternate Saturday Afternoons · 4:30 PM to 6:30 PM',
    description: 'A curated listening circle featuring independent singer-songwriters performing acoustic folk and poetry in an unplugged, candlelit setting with artisan single-origin pour-overs.',
    curator: 'Kala Ghoda Cultural Guild',
    timeSlot: '4:30 PM – 6:30 PM'
  },
  {
    id: 'sunday-dhansak-table',
    title: 'The Great Parsi Sunday Feast Table',
    tagline: 'The Authentic Family Tradition in Kala Ghoda',
    schedule: 'Every Sunday Lunch · 12:00 PM to 4:00 PM',
    description: 'A tribute to the cherished Sunday ritual of Mumbai’s Parsi homes: slow-cooked Dhansak with caramelized brown rice, crispy mutton cutlets, kachumber salad, and chilled raspberry soda.',
    curator: 'Chef Kermeen Bose',
    timeSlot: '12:00 PM – 4:00 PM'
  }
];

export const SEATING_ZONES = [
  {
    id: 'vinyl-lounge',
    name: 'Analog Vinyl Listening Corner',
    vibe: 'Warm amber lighting, adjacent to the record player & vinyl library. Perfect for music lovers and intimate dates.',
    icon: 'Disc3',
    capacity: 'Tables for 2 to 4 guests'
  },
  {
    id: 'heritage-hall',
    name: 'Colonial Heritage Teak Hall',
    vibe: 'High ceilings, brass pendant chandeliers, and vintage Parsi portraits. Ideal for family gatherings and lively feasts.',
    icon: 'Coffee',
    capacity: 'Tables for 2 to 8 guests'
  },
  {
    id: 'window-nook',
    name: 'Sunlit Kala Ghoda Window Nook',
    vibe: 'Overlooking quiet cobblestone lanes of the art district. Abundant natural daylight, great for breakfasts and slow reads.',
    icon: 'Sun',
    capacity: 'Tables for 1 to 4 guests'
  },
  {
    id: 'apero-bar',
    name: 'Apéro Marble Bar Counter',
    vibe: 'High seating facing the espresso machine and cocktail station. Watch baristas and mixologists craft signature libations.',
    icon: 'Wine',
    capacity: 'Bar counter stools for 1 to 3 guests'
  }
];
