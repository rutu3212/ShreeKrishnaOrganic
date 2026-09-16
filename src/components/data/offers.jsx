// ======================================================
// Srikrishn Organics - Offer Data
// ======================================================

const offerData = [
  {
    id: 1,

    title: "Welcome Offer",

    description:
      "Get a special discount on your first order of natural and traditionally crafted products.",

    code: "WELCOME10",

    discountType: "Percentage",

    discountValue: 10,

    minimumOrder: 499,

    maximumDiscount: 200,

    startDate: "2026-01-01",

    endDate: "2026-12-31",

    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=85",

    status: "Active",

    featured: true,

    usageLimit: 1000,

    usedCount: 0,

    createdAt: "2026-01-01T10:00:00.000Z",
  },

  {
    id: 2,

    title: "Organic Goodness Sale",

    description:
      "Enjoy great savings across selected organic products and everyday essentials.",

    code: "ORGANIC15",

    discountType: "Percentage",

    discountValue: 15,

    minimumOrder: 999,

    maximumDiscount: 500,

    startDate: "2026-09-01",

    endDate: "2026-09-30",

    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",

    status: "Active",

    featured: true,

    usageLimit: 500,

    usedCount: 0,

    createdAt: "2026-08-25T10:00:00.000Z",
  },

  {
    id: 3,

    title: "Festive Savings",

    description:
      "Celebrate with traditional goodness and save on selected products and combo packs.",

    code: "FESTIVE20",

    discountType: "Percentage",

    discountValue: 20,

    minimumOrder: 1499,

    maximumDiscount: 750,

    startDate: "2026-10-01",

    endDate: "2026-10-31",

    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=85",

    status: "Scheduled",

    featured: true,

    usageLimit: 750,

    usedCount: 0,

    createdAt: "2026-09-01T10:00:00.000Z",
  },

  {
    id: 4,

    title: "Flat ₹200 Off",

    description:
      "Get a flat ₹200 discount when you shop for ₹1499 or more.",

    code: "FLAT200",

    discountType: "Fixed",

    discountValue: 200,

    minimumOrder: 1499,

    maximumDiscount: 200,

    startDate: "2026-09-01",

    endDate: "2026-09-30",

    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",

    status: "Active",

    featured: false,

    usageLimit: 300,

    usedCount: 0,

    createdAt: "2026-08-28T10:00:00.000Z",
  },

  {
    id: 5,

    title: "Cold Pressed Oil Offer",

    description:
      "Save more when you explore our collection of traditional cold pressed oils.",

    code: "OIL10",

    discountType: "Percentage",

    discountValue: 10,

    minimumOrder: 699,

    maximumDiscount: 250,

    startDate: "2026-09-01",

    endDate: "2026-10-15",

    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85",

    status: "Active",

    featured: false,

    usageLimit: 500,

    usedCount: 0,

    createdAt: "2026-08-30T10:00:00.000Z",
  },

  {
    id: 6,

    title: "Ghee Special",

    description:
      "Enjoy special savings on our authentic traditional A2 ghee collection.",

    code: "GHEE15",

    discountType: "Percentage",

    discountValue: 15,

    minimumOrder: 999,

    maximumDiscount: 400,

    startDate: "2026-08-01",

    endDate: "2026-09-15",

    image:
      "https://images.unsplash.com/photo-1631206758627-2b0e7b1f0e14?auto=format&fit=crop&w=1200&q=85",

    status: "Expired",

    featured: false,

    usageLimit: 250,

    usedCount: 250,

    createdAt: "2026-07-25T10:00:00.000Z",
  },

  {
    id: 7,

    title: "Combo Pack Savings",

    description:
      "Save more with specially curated combinations of our popular organic products.",

    code: "COMBO15",

    discountType: "Percentage",

    discountValue: 15,

    minimumOrder: 1299,

    maximumDiscount: 500,

    startDate: "2026-09-01",

    endDate: "2026-12-31",

    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",

    status: "Active",

    featured: true,

    usageLimit: 1000,

    usedCount: 0,

    createdAt: "2026-08-25T10:00:00.000Z",
  },

  {
    id: 8,

    title: "Weekend Special",

    description:
      "Make your weekend healthier with special savings on selected products.",

    code: "WEEKEND10",

    discountType: "Percentage",

    discountValue: 10,

    minimumOrder: 799,

    maximumDiscount: 300,

    startDate: "2026-09-01",

    endDate: "2026-09-30",

    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85",

    status: "Active",

    featured: false,

    usageLimit: 400,

    usedCount: 0,

    createdAt: "2026-08-28T10:00:00.000Z",
  },
];

export default offerData;