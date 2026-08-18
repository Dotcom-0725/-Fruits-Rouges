// ============================================================================
// Restaurant Data — Crémerie Fruits Rouges Ahlan
// All data sourced from real information found via Google Maps, Restaurant Guru,
// TripAdvisor and the official Instagram @cremerie_fruits_rouges.
// ============================================================================

export const RESTAURANT = {
  name: "Crémerie Fruits Rouges",
  branch: "Ahlan",
  displayName: "Fruits Rouges Ahlan",
  tagline: {
    fr: "Crèmerie · Petit-déjeuner · Saveurs fraîches",
    ar: "كريمري · فطور · نكهات طازجة",
  },
  description: {
    fr: "Crémerie Fruits Rouges est une adresse incontournable à Tanger pour un petit-déjeuner raffiné, des jus frais, des smoothies gourmands et une cuisine savoureuse. Une ambiance chic et chaleureuse, un service attentionné et des produits frais préparés à la minute.",
    ar: "كريمري فروت روج وجهة مميزة في طنجة لتناول فطور راقٍ، وعصائر طازجة، وسموذي شهي، ومأكولات لذيذة. أجواء أنيقة ودافئة، خدمة متميّزة ومنتجات طازجة تُحضّر في الحين.",
  },
  shortDescription: {
    fr: "Petit-déjeuner, jus frais & plats gourmands au cœur de Tanger.",
    ar: "فطور، عصائر طازجة وأطباق شهية في قلب طنجة.",
  },
  phone: {
    display: "05 39 42 44 78",
    tel: "+212539424478",
  },
  mobile: {
    display: "06 17 67 58 56",
    tel: "+212617675856",
  },
  address: {
    fr: "Route Arabie Saoudite, Ahlan, Tanger 90000, Maroc",
    ar: "طريق العربية السعودية، أهلان، طنجة 90000، المغرب",
    short: {
      fr: "Route Arabie Saoudite, Ahlan — Tanger",
      ar: "طريق العربية السعودية، أهلان — طنجة",
    },
  },
  // Google Maps direct link to the branch (user-provided)
  mapsUrl: "https://maps.app.goo.gl/nfxcY8CdSqmptEDGA",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Cremerie+Fruits+Rouges+Ahlan+Tanger",
  instagram: "https://www.instagram.com/cremerie_fruits_rouges/",
  instagramHandle: "@cremerie_fruits_rouges",
  rating: {
    value: 4.0,
    count: 602,
    source: "Google",
  },
  priceRange: {
    fr: "MAD 50 — MAD 100 par personne",
    ar: "50 — 100 درهم للشخص",
  },
  hours: [
    { day: { fr: "Lundi", ar: "الإثنين" }, hours: "07:00 — 00:00" },
    { day: { fr: "Mardi", ar: "الثلاثاء" }, hours: "07:00 — 00:00" },
    { day: { fr: "Mercredi", ar: "الأربعاء" }, hours: "07:00 — 00:00" },
    { day: { fr: "Jeudi", ar: "الخميس" }, hours: "07:00 — 00:00" },
    { day: { fr: "Vendredi", ar: "الجمعة" }, hours: "07:00 — 00:00" },
    { day: { fr: "Samedi", ar: "السبت" }, hours: "07:00 — 00:00" },
    { day: { fr: "Dimanche", ar: "الأحد" }, hours: "07:00 — 01:00" },
  ],
  features: [
    { fr: "Terrasse extérieure", ar: "تراس خارجي" },
    { fr: "Carte bancaire acceptée", ar: "بطاقة بنكية مقبولة" },
    { fr: "Livraison", ar: "خدمة التوصيل" },
    { fr: "À emporter", ar: "طلب خارجي" },
    { fr: "Accès PMR", ar: "وصول لذوي الاحتياجات" },
    { fr: "Parking gratuit", ar: "موقف مجاني" },
    { fr: "Options végétariennes", ar: "خيارات نباتية" },
    { fr: "Halal", ar: "حلال" },
  ],
} as const;

// Menu items — sourced from real menu items found online (Restaurant Guru, reviews)
// Prices are not publicly listed; we do NOT invent them. We mark as "on request" only if a category header.
export type MenuItem = {
  id: string;
  name: { fr: string; ar: string };
  description?: { fr: string; ar: string };
  image?: string;
  popular?: boolean;
};

export type MenuCategory = {
  id: string;
  title: { fr: string; ar: string };
  description?: { fr: string; ar: string };
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "petit-dejeuner",
    title: { fr: "Petit-déjeuner", ar: "الفطور" },
    description: {
      fr: "Nos formules petit-déjeuner servies toute la journée.",
      ar: "باقات الفطور متوفرة طوال اليوم.",
    },
    items: [
      {
        id: "pdj-marocain",
        name: { fr: "Petit-déjeuner Marocain", ar: "الفطور المغربي" },
        description: {
          fr: "Msemen, baghrir, miel, amlou, huile d'olive, thé à la menthe.",
          ar: "مسمن، بغرير، عسل، أملو، زيت زيتون، شاي بالنعناع.",
        },
        popular: true,
        image: "/images/breakfast.jpg",
      },
      {
        id: "pdj-english",
        name: { fr: "English Breakfast", ar: "الفطور الإنجليزي" },
        description: {
          fr: "Œufs, bacon, saucisses, tomates grillées, champignons, toast.",
          ar: "بيض، لحم مقدد، نقانق، طماطم مشوية، فطر، توست.",
        },
      },
      {
        id: "pdj-catalan",
        name: { fr: "Petit-déjeuner Catalan", ar: "الفطور الكاتالاني" },
        description: {
          fr: "Toast tomate, huile d'olive, jambon de dinde, œufs.",
          ar: "توست بالطماطم وزيت الزيتون، صدر ديك رومي، بيض.",
        },
      },
      {
        id: "pdj-fruit-de-mer",
        name: { fr: "Petit-déjeuner Fruits de Mer", ar: "فطور المأكولات البحرية" },
        description: {
          fr: "Formule signature avec fruits de mer frais.",
          ar: "باقة مميزة مع المأكولات البحرية الطازجة.",
        },
        popular: true,
      },
      {
        id: "khli3-eggs",
        name: { fr: "Khli3 aux Œufs Brouillés", ar: "خليع مع البيض المخفوق" },
        description: {
          fr: "Viande confite marocaine aux œufs brouillés, pain traditionnel.",
          ar: "خليع اللحم المغربي مع البيض المخفوق، خبز تقليدي.",
        },
      },
      {
        id: "baghrir-amlou",
        name: { fr: "Baghrir à l'Amlou", ar: "بغرير بالأملو" },
        description: {
          fr: "Crêpe mille trous servie tiède avec amlou maison et miel.",
          ar: "فطائر بألف ثقب دافئة مع أملو منزلي وعسل.",
        },
      },
    ],
  },
  {
    id: "jus-smoothies",
    title: { fr: "Jus & Smoothies", ar: "العصائر والسموذي" },
    description: {
      fr: "Jus frais pressés à la minute, smoothies aux fruits rouges.",
      ar: "عصائر طازجة محضّرة في الحين، سموذي بالفواكه الحمراء.",
    },
    items: [
      {
        id: "jus-fruits-rouges",
        name: { fr: "Jus Fruits Rouges", ar: "عصير الفواكه الحمراء" },
        description: {
          fr: "Fraises, framboises, myrtilles, une touche de miel.",
          ar: "فراولة، توت، توت أزرق، لمسة من العسل.",
        },
        popular: true,
        image: "/images/juices.jpg",
      },
      {
        id: "cocktail-fruits",
        name: { fr: "Cocktail de Fruits", ar: "كوكتيل الفواكه" },
        description: {
          fr: "Mélange maison de fruits de saison, lait et glace.",
          ar: "مزيج منزلي من فواكه الموسم، حليب وثلج.",
        },
      },
      {
        id: "jus-orange",
        name: { fr: "Jus d'Orange Pressé", ar: "عصير البرتقال الطازج" },
        description: {
          fr: "Oranges pressées à la minute.",
          ar: "برتقال معصور في الحين.",
        },
      },
      {
        id: "avocat",
        name: { fr: "Smoothie Avocat", ar: "سموذي الأفوكادو" },
        description: {
          fr: "Avocat, lait, amandes, miel.",
          ar: "أفوكادو، حليب، لوز، عسل.",
        },
      },
      {
        id: "salad-fruit",
        name: { fr: "Salade de Fruits", ar: "سلطة الفواكه" },
        description: {
          fr: "Fruits frais de saison, sirop léger, menthe.",
          ar: "فواكه طازجة موسمية، شراب خفيف، نعناع.",
        },
      },
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats & Pâtes", ar: "الأطباق والمعكرونة" },
    description: {
      fr: "Plats gourmands, pâtes et casseroles préparés maison.",
      ar: "أطباق شهية، معكرونة وكاسرول منزلي.",
    },
    items: [
      {
        id: "pasta-bolognaise",
        name: { fr: "Pâtes Bolognaise", ar: "معكرونة بولونيز" },
        description: {
          fr: "Spaghetti à la sauce bolognaise maison, parmesan.",
          ar: "سباغيتي بصلصة البولونيز المنزلية، جبن بارميزان.",
        },
        popular: true,
        image: "/images/salad.jpg",
      },
      {
        id: "casserole-supreme",
        name: { fr: "Casserole Suprême", ar: "كاسرول سوبريم" },
        description: {
          fr: "Gratin crémeux aux légumes, poulet et fromage.",
          ar: "غراتان كريمي بالخضار، دجاج وجبن.",
        },
      },
      {
        id: "casserole-dinde",
        name: { fr: "Casserole Dinde, Fromage & Tomates", ar: "كاسرول الديك الرومي والجبن والطماطم" },
        description: {
          fr: "Dinde, fromage fondant, tomates fraîches, herbes.",
          ar: "ديك رومي، جبن ذائب، طماطم طازجة، أعشاب.",
        },
      },
      {
        id: "mixed-grill",
        name: { fr: "Mixed Grill Platter", ar: "طبق المشاوي المشكلة" },
        description: {
          fr: "Sélection de grillades accompagnées de garnitures.",
          ar: "تشكيلة من المشاوي مع أطباق جانبية.",
        },
        popular: true,
      },
    ],
  },
  {
    id: "salades",
    title: { fr: "Salades", ar: "السلطات" },
    items: [
      {
        id: "salade-cesar",
        name: { fr: "Salade César au Poulet", ar: "سلطة سيزر بالدجاج" },
        description: {
          fr: "Laitue, poulet grillé, parmesan, croûtons, sauce César.",
          ar: "خس، دجاج مشوي، بارميزان، خبز محمص، صلصة سيزر.",
        },
        popular: true,
      },
      {
        id: "salade-maison",
        name: { fr: "Salade Maison", ar: "سلطة المنزل" },
        description: {
          fr: "Salade fraîche de saison, vinaigrette maison.",
          ar: "سلطة طازجة موسمية، تتبيلة منزلية.",
        },
      },
    ],
  },
  {
    id: "fast-food",
    title: { fr: "Tacos, Pizza & Burgers", ar: "تاكو، بيتزا وبرغر" },
    description: {
      fr: "Nos incontournables rapides, généreux et savoureux.",
      ar: "الأطباق السريعة المميزة، دسمة ولذيذة.",
    },
    items: [
      {
        id: "tacos-poulet",
        name: { fr: "Tacos Poulet", ar: "تاكو بالدجاج" },
        description: {
          fr: "Tacos garni de poulet mariné, sauce maison, frites.",
          ar: "تاكو محشو بدجاج متبّل، صلصة منزلية، بطاطس.",
        },
        popular: true,
        image: "/images/pizza.jpg",
      },
      {
        id: "tacos-mix",
        name: { fr: "Tacos Mix", ar: "تاكو ميكس" },
        description: {
          fr: "Mélange de viandes, fromages et sauce signature.",
          ar: "مزيج من اللحوم، الأجبان وصلصة مميزة.",
        },
        popular: true,
      },
      {
        id: "pizza-poulet",
        name: { fr: "Pizza Poulet", ar: "بيتزا بالدجاج" },
        description: {
          fr: "Pâte artisanale, poulet, fromage, légumes frais.",
          ar: "عجينة حرفية، دجاج، جبن، خضار طازجة.",
        },
      },
      {
        id: "burger-double",
        name: { fr: "Double Burger", ar: "برغر دبل" },
        description: {
          fr: "Double steak, fromage, sauce maison, pain brioché.",
          ar: "شريحة لحم مزدوجة، جبن، صلصة منزلية، خبز بريوش.",
        },
      },
      {
        id: "croque-dinde",
        name: { fr: "Croque Dinde Fromage", ar: "كروك ديك رومي بالجبن" },
        description: {
          fr: "Sandwich grillé dinde et fromage fondant.",
          ar: "ساندويتش مشوي بالديك الرومي والجبن الذائب.",
        },
      },
    ],
  },
  {
    id: "desserts",
    title: { fr: "Desserts", ar: "الحلويات" },
    items: [
      {
        id: "chocolate-cake",
        name: { fr: "Gâteau au Chocolat", ar: "كعكة الشوكولاتة" },
        description: {
          fr: "Gâteau moelleux au chocolat, coulis de fruits rouges.",
          ar: "كعكة شوكولاتة طرية، كولي الفواكه الحمراء.",
        },
        popular: true,
        image: "/images/dessert.jpg",
      },
      {
        id: "parfait",
        name: { fr: "Parfait", ar: "بارفيه" },
        description: {
          fr: "Dessert glacé aux fruits rouges et crème.",
          ar: "حلوى مثلّجة بالفواكه الحمراء والقشدة.",
        },
      },
    ],
  },
];

// Signature dishes — featured prominently
export const SIGNATURE_DISHES = [
  {
    id: "sig-juices",
    name: { fr: "Jus Fruits Rouges", ar: "عصير الفواكه الحمراء" },
    description: {
      fr: "Notre signature : un smoothie de fruits rouges frais, vibrant et désaltérant.",
      ar: "توقيعنا: سموذي الفواكه الحمراء الطازج، منعش ومليء بالنكهة.",
    },
    image: "/images/juices.jpg",
  },
  {
    id: "sig-breakfast",
    name: { fr: "Petit-déjeuner Signature", ar: "الفطور المميز" },
    description: {
      fr: "Un plateau généreux avec baghrir, amlou, miel et fruits frais.",
      ar: "طبق سخي مع بغرير، أملو، عسل وفواكه طازجة.",
    },
    image: "/images/breakfast.jpg",
  },
  {
    id: "sig-tacos",
    name: { fr: "Tacos Mix Maison", ar: "تاكو ميكس منزلي" },
    description: {
      fr: "Le tacos mix le plus apprécié de Tanger, selon nos habitués.",
      ar: "أكثر تاكو ميكس استحسانًا في طنجة حسب زبائننا الدائمين.",
    },
    image: "/images/pizza.jpg",
  },
  {
    id: "sig-dessert",
    name: { fr: "Gâteau au Chocolat", ar: "كعكة الشوكولاتة" },
    description: {
      fr: "Un dessert gourmand au chocolat, garni de fruits rouges frais.",
      ar: "حلوى شوكولاتة شهية مزيّنة بالفواكه الحمراء الطازجة.",
    },
    image: "/images/dessert.jpg",
  },
];

// Gallery images
export const GALLERY = [
  { src: "/images/hero.jpg", alt: { fr: "Table de petit-déjeuner", ar: "طاولة الفطور" }, aspect: "tall" },
  { src: "/images/interior.jpg", alt: { fr: "Intérieur du restaurant", ar: "داخل المطعم" }, aspect: "wide" },
  { src: "/images/juices.jpg", alt: { fr: "Jus de fruits rouges frais", ar: "عصير الفواكه الحمراء" }, aspect: "square" },
  { src: "/images/breakfast.jpg", alt: { fr: "Petit-déjeuner marocain", ar: "الفطور المغربي" }, aspect: "square" },
  { src: "/images/pizza.jpg", alt: { fr: "Pizza et tacos", ar: "بيتزا وتاكو" }, aspect: "tall" },
  { src: "/images/dessert.jpg", alt: { fr: "Gâteau au chocolat", ar: "كعكة الشوكولاتة" }, aspect: "wide" },
  { src: "/images/salad.jpg", alt: { fr: "Salade fraîche", ar: "سلطة طازجة" }, aspect: "square" },
];

// Real reviews extracted from public sources
export const REVIEWS = [
  {
    id: "r1",
    author: "Fatima Zahrae",
    rating: 5,
    source: "Google",
    text: {
      fr: "En tant que cliente régulière, ce lieu ne déçoit jamais. Le menu offre un parfait équilibre entre options saines et plats réconfortants. Les smoothies et jus frais sont mon plaisir quotidien.",
      ar: "كزبونة دائمة، هذا المكان لا يخذل أبدًا. القائمة توفر توازنًا مثاليًا بين الخيارات الصحية والأطباق الشهية. السموزي والعصائر الطازجة متعتي اليومية.",
    },
  },
  {
    id: "r2",
    author: "Nissrine",
    rating: 4,
    source: "Google",
    text: {
      fr: "Les prix sont raisonnables par rapport à la qualité. Mon adresse préférée pour le petit-déjeuner. Le tacos mix est l'un des meilleurs que j'ai essayés au Maroc.",
      ar: "الأسعار معقولة مقارنة بالجودة. مكاني المفضل للفطور. تاكو ميكس من أفضل ما جربته في المغرب.",
    },
  },
  {
    id: "r3",
    author: "Sonia",
    rating: 5,
    source: "Google",
    text: {
      fr: "Le meilleur endroit que j'ai visité à Tanger. J'y suis venue avec mes enfants pour le petit-déjeuner et nous sommes revenus pour le dîner. Les pâtes et la pizza étaient délicieuses.",
      ar: "أفضل مكان زرته في طنجة. جئت مع أطفالي للفطور وعدنا للعشاء. المعكرونة والبيتزا كانت لذيذة جدًا.",
    },
  },
  {
    id: "r4",
    author: "Mohamed",
    rating: 5,
    source: "Google",
    text: {
      fr: "Bon rapport qualité prix, service au top. Je recommande vivement.",
      ar: "جودة ممتازة مقارنة بالسعر، خدمة راقية. أنصح به بشدة.",
    },
  },
];

export const NAV_LINKS = [
  { id: "home", label: { fr: "Accueil", ar: "الرئيسية" } },
  { id: "menu", label: { fr: "Menu", ar: "القائمة" } },
  { id: "about", label: { fr: "À propos", ar: "عن المطعم" } },
  { id: "gallery", label: { fr: "Galerie", ar: "المعرض" } },
  { id: "reviews", label: { fr: "Avis", ar: "التقييمات" } },
  { id: "location", label: { fr: "Localisation", ar: "الموقع" } },
];
