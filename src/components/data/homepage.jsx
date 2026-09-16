// ======================================================
// Srikrishn Organics - Home Page Data
// ======================================================

const homePageData = {
  // ====================================================
  // SEO / Page Information
  // ====================================================

  seo: {
    title: "Srikrishn Organics | Pure Tradition, Naturally",
    description:
      "Discover authentic organic products made with natural ingredients and traditional methods.",
    keywords:
      "organic products, natural food, cold pressed oil, A2 ghee, spices, millets",
  },

  // ====================================================
  // Announcement / Promo Bar
  // ====================================================

  announcement: {
    enabled: true,

    text: "Free Shipping on orders above ₹999",

    highlight: "Use code SHREEKRISHNA10 for 10% Off",

    linkText: "Shop Now",

    link: "/shop",
  },

  // ====================================================
  // Hero Section
  // ====================================================

  hero: {
    enabled: true,

    eyebrow: "PURE • NATURAL • TRADITIONAL",

    title: "Goodness of Nature,",
    
    highlightTitle: "Rooted in Tradition",

    description:
      "Experience authentic organic goodness crafted with carefully sourced ingredients and traditional methods.",

    primaryButton: {
      text: "Shop Now",
      link: "/shop",
    },

    secondaryButton: {
      text: "Explore Our Story",
      link: "/about",
    },

    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85",

    mobileImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",

    badge: {
      enabled: true,
      title: "100% Natural",
      subtitle: "Carefully sourced ingredients",
    },
  },

  // ====================================================
  // Welcome Section
  // ====================================================

  welcome: {
    enabled: true,

    eyebrow: "WELCOME TO SRIKRISHN ORGANICS",

    title: "Nature's Goodness, Brought to Your Home",

    description:
      "At Srikrishn Organics, we believe that good food begins with good ingredients. We carefully source natural ingredients and preserve their authentic goodness through thoughtful, traditional processing.",

    secondaryDescription:
      "From cold pressed oils and A2 ghee to wholesome grains and spices, every product is created with quality, purity and tradition at its heart.",

    button: {
      text: "Discover Our Story",
      link: "/about",
    },

    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85",
  },

  // ====================================================
  // Category Section
  // ====================================================

  categories: {
    enabled: true,

    eyebrow: "EXPLORE OUR COLLECTION",

    title: "Shop By Category",

    description:
      "Explore our carefully curated collection of natural and traditionally crafted products.",

    button: {
      text: "View All Categories",
      link: "/shop",
    },

    categoryIds: [
      1,
      2,
      3,
      4,
      5,
    ],
  },

  // ====================================================
  // Featured Products
  // ====================================================

  featuredProducts: {
    enabled: true,

    eyebrow: "CUSTOMER FAVOURITES",

    title: "Our Best Sellers",

    description:
      "Discover the products our customers love most, made with natural ingredients and traditional care.",

    button: {
      text: "Shop All Products",
      link: "/shop",
    },

    productIds: [
      1,
      2,
      3,
      4,
      5,
      6,
    ],
  },

  // ====================================================
  // Why Choose Us
  // ====================================================

  whyChooseUs: {
    enabled: true,

    eyebrow: "WHY SRIKRISHN",

    title: "Goodness You Can Trust",

    description:
      "We keep things simple — authentic ingredients, traditional processes and a commitment to quality.",

    features: [
      {
        id: 1,
        title: "Naturally Sourced",
        description:
          "We carefully select ingredients from trusted sources while keeping their natural qualities intact.",
        icon: "Leaf",
      },

      {
        id: 2,
        title: "Traditional Processing",
        description:
          "Our products are inspired by traditional methods that respect the natural character of every ingredient.",
        icon: "Wheat",
      },

      {
        id: 3,
        title: "Quality Focused",
        description:
          "Every product goes through careful quality checks before reaching your home.",
        icon: "BadgeCheck",
      },

      {
        id: 4,
        title: "Made With Care",
        description:
          "We believe in creating products with honesty, care and respect for nature.",
        icon: "Heart",
      },
    ],
  },

  // ====================================================
  // Native Ingredients Section
  // ====================================================

  ingredients: {
    enabled: true,

    eyebrow: "FROM NATURE TO YOU",

    title: "Ingredients That Tell a Story",

    description:
      "We celebrate the natural ingredients that have been part of traditional kitchens for generations.",

    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1400&q=85",

    items: [
      {
        id: 1,
        name: "Sesame",
        description:
          "Naturally rich seeds traditionally used to create nourishing oils.",
      },

      {
        id: 2,
        name: "Groundnut",
        description:
          "A traditional kitchen favourite carefully selected for our cold pressed oils.",
      },

      {
        id: 3,
        name: "Turmeric",
        description:
          "A golden spice valued for its distinctive colour, aroma and traditional use.",
      },

      {
        id: 4,
        name: "Millets",
        description:
          "Wholesome traditional grains perfect for everyday meals.",
      },
    ],
  },

  // ====================================================
  // Product Focus - Cold Pressed Oils
  // ====================================================

  oilSection: {
    enabled: true,

    eyebrow: "TRADITIONAL GOODNESS",

    title: "Pure Cold Pressed Oils",

    description:
      "Experience the natural taste and goodness of oils made using traditional cold pressing methods.",

    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1400&q=85",

    points: [
      "Naturally sourced seeds",
      "Traditional cold pressing",
      "No unnecessary additives",
      "Rich natural flavour",
    ],

    button: {
      text: "Explore Cold Pressed Oils",
      link: "/shop?category=cold-pressed-oils",
    },
  },

  // ====================================================
  // Product Focus - A2 Ghee
  // ====================================================

  gheeSection: {
    enabled: true,

    eyebrow: "TIMELESS TRADITION",

    title: "Authentic A2 Ghee",

    description:
      "Rich, aromatic and traditionally crafted ghee made with care for your everyday kitchen.",

    image:
      "https://images.unsplash.com/photo-1631206758627-2b0e7b1f0e14?auto=format&fit=crop&w=1400&q=85",

    points: [
      "Traditional preparation",
      "Rich natural aroma",
      "Carefully selected ingredients",
      "Made with attention to quality",
    ],

    button: {
      text: "Explore A2 Ghee",
      link: "/shop?category=a2-ghee",
    },
  },

  // ====================================================
  // Offers Section
  // ====================================================

  offers: {
    enabled: true,

    eyebrow: "SPECIAL OFFERS",

    title: "Natural Goodness, Better Value",

    description:
      "Enjoy special savings on carefully selected products and curated combinations.",

    bannerImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85",

    offerIds: [
      1,
      2,
      3,
    ],

    button: {
      text: "View All Offers",
      link: "/offers",
    },
  },

  // ====================================================
  // Combo Packs
  // ====================================================

  comboPacks: {
    enabled: true,

    eyebrow: "CURATED FOR YOU",

    title: "Thoughtful Combo Packs",

    description:
      "Discover convenient combinations of our favourite products, curated for everyday use and gifting.",

    productIds: [
      7,
      8,
      9,
    ],

    button: {
      text: "Explore Combos",
      link: "/shop?category=combo-packs",
    },
  },

  // ====================================================
  // Testimonials
  // ====================================================

  testimonials: {
    enabled: true,

    eyebrow: "CUSTOMER LOVE",

    title: "What Our Customers Say",

    description:
      "Real experiences from people who enjoy the goodness of Srikrishn Organics.",

    items: [
      {
        id: 1,
        name: "Priya Sharma",
        location: "Pune",
        rating: 5,
        message:
          "The cold pressed oil has a wonderful natural aroma and taste. It has become a regular part of our kitchen.",
        image: "",
      },

      {
        id: 2,
        name: "Rahul Patil",
        location: "Kolhapur",
        rating: 5,
        message:
          "I really liked the quality and packaging. The products feel authentic and thoughtfully made.",
        image: "",
      },

      {
        id: 3,
        name: "Sneha Deshmukh",
        location: "Mumbai",
        rating: 5,
        message:
          "The ghee tastes amazing and feels very different from regular store-bought ghee. Will definitely order again.",
        image: "",
      },
    ],
  },

  // ====================================================
  // Newsletter Section
  // ====================================================

  newsletter: {
    enabled: true,

    eyebrow: "STAY CONNECTED",

    title: "Bring More Goodness Into Your Inbox",

    description:
      "Get updates about new products, special offers and stories from Srikrishn Organics.",

    placeholder: "Enter your email address",

    buttonText: "Subscribe",

    successMessage:
      "Thank you for subscribing to Srikrishn Organics!",
  },

  // ====================================================
  // Trust / Statistics
  // ====================================================

  trustStats: {
    enabled: true,

    items: [
      {
        id: 1,
        value: "100%",
        label: "Natural Ingredients",
      },

      {
        id: 2,
        value: "10+",
        label: "Product Categories",
      },

      {
        id: 3,
        value: "1000+",
        label: "Happy Customers",
      },

      {
        id: 4,
        value: "100%",
        label: "Made With Care",
      },
    ],
  },

  // ====================================================
  // Homepage Settings
  // ====================================================

  settings: {
    showAnnouncement: true,
    showWelcome: true,
    showCategories: true,
    showFeaturedProducts: true,
    showWhyChooseUs: true,
    showIngredients: true,
    showOilSection: true,
    showGheeSection: true,
    showOffers: true,
    showComboPacks: true,
    showTestimonials: true,
    showNewsletter: true,
    showTrustStats: true,
  },
};

export default homePageData;