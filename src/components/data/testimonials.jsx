// ======================================================
// Srikrishn Organics - Testimonial Data
// ======================================================

const testimonialData = [
  {
    id: 1,

    name: "Priya Sharma",
    location: "Pune, Maharashtra",

    rating: 5,

    message:
      "The cold pressed groundnut oil has a wonderful natural aroma and taste. It feels fresh and authentic, and it has become a regular part of our kitchen.",

    image: "",

    product: "Cold Pressed Groundnut Oil",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-01-10T10:00:00.000Z",
  },

  {
    id: 2,

    name: "Rahul Patil",
    location: "Kolhapur, Maharashtra",

    rating: 5,

    message:
      "I really liked the quality and packaging of the products. Everything feels authentic and thoughtfully made. The traditional taste is something I really appreciate.",

    image: "",

    product: "Traditional A2 Cow Ghee",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-01-15T10:00:00.000Z",
  },

  {
    id: 3,

    name: "Sneha Deshmukh",
    location: "Mumbai, Maharashtra",

    rating: 5,

    message:
      "The ghee tastes amazing and has such a rich natural aroma. It feels very different from regular store-bought ghee. I will definitely order again.",

    image: "",

    product: "A2 Cow Ghee",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-01-20T10:00:00.000Z",
  },

  {
    id: 4,

    name: "Amit Kulkarni",
    location: "Nashik, Maharashtra",

    rating: 4,

    message:
      "I ordered the cold pressed sesame oil and was impressed by its aroma and flavour. The packaging was also neat and secure.",

    image: "",

    product: "Cold Pressed Sesame Oil",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-02-02T10:00:00.000Z",
  },

  {
    id: 5,

    name: "Neha Joshi",
    location: "Satara, Maharashtra",

    rating: 5,

    message:
      "The organic turmeric powder has a beautiful colour and aroma. I really like the focus on natural ingredients and traditional processing.",

    image: "",

    product: "Organic Turmeric Powder",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-02-08T10:00:00.000Z",
  },

  {
    id: 6,

    name: "Vikas Jadhav",
    location: "Sangli, Maharashtra",

    rating: 5,

    message:
      "The products arrived well packed and fresh. I especially liked the natural taste of the products. Good quality and worth trying.",

    image: "",

    product: "Organic Products",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-02-15T10:00:00.000Z",
  },

  {
    id: 7,

    name: "Anjali More",
    location: "Aurangabad, Maharashtra",

    rating: 5,

    message:
      "I loved the Healthy Kitchen Combo. It is convenient to order multiple everyday essentials together, and the quality is excellent.",

    image: "",

    product: "Healthy Kitchen Combo",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-02-22T10:00:00.000Z",
  },

  {
    id: 8,

    name: "Saurabh Desai",
    location: "Pimpri-Chinchwad, Maharashtra",

    rating: 4,

    message:
      "The traditional products have a genuine homemade feel. The website was easy to use and my order arrived safely.",

    image: "",

    product: "Traditional Products",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-03-01T10:00:00.000Z",
  },

  {
    id: 9,

    name: "Meenal Pawar",
    location: "Karad, Maharashtra",

    rating: 5,

    message:
      "The natural jaggery powder is very good and has a pleasant traditional taste. I appreciate the quality and simple packaging.",

    image: "",

    product: "Natural Jaggery Powder",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-03-05T10:00:00.000Z",
  },

  {
    id: 10,

    name: "Rohit Shinde",
    location: "Thane, Maharashtra",

    rating: 5,

    message:
      "The products are fresh, well packed and have a natural taste. I have already recommended Srikrishn Organics to my family.",

    image: "",

    product: "Organic Products",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-03-10T10:00:00.000Z",
  },

  {
    id: 11,

    name: "Kavita Bhosale",
    location: "Pune, Maharashtra",

    rating: 5,

    message:
      "The organic ragi flour is excellent for everyday recipes. The quality feels consistent and the product was packed very well.",

    image: "",

    product: "Organic Ragi Flour",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-03-15T10:00:00.000Z",
  },

  {
    id: 12,

    name: "Manish Patil",
    location: "Mumbai, Maharashtra",

    rating: 4,

    message:
      "Good quality products with a traditional touch. I particularly enjoyed the cold pressed oils and will be trying more products soon.",

    image: "",

    product: "Cold Pressed Oils",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-03-20T10:00:00.000Z",
  },

  {
    id: 13,

    name: "Swati Chavan",
    location: "Kolhapur, Maharashtra",

    rating: 5,

    message:
      "I really enjoyed the traditional snacks. The taste reminded me of homemade snacks and the quality was very good.",

    image: "",

    product: "Traditional Chakli",

    verified: true,

    status: "Active",

    featured: false,

    createdAt: "2026-03-25T10:00:00.000Z",
  },

  {
    id: 14,

    name: "Akshay Deshmukh",
    location: "Navi Mumbai, Maharashtra",

    rating: 5,

    message:
      "The ordering experience was smooth and the products were packed carefully. I liked the combination of traditional methods and modern presentation.",

    image: "",

    product: "Organic Products",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-04-01T10:00:00.000Z",
  },

  {
    id: 15,

    name: "Pooja Joshi",
    location: "Nagpur, Maharashtra",

    rating: 5,

    message:
      "The cold pressed oils have a lovely natural flavour. I am happy with the quality and will definitely continue purchasing from Srikrishn Organics.",

    image: "",

    product: "Cold Pressed Oil",

    verified: true,

    status: "Active",

    featured: true,

    createdAt: "2026-04-05T10:00:00.000Z",
  },

  // =====================================================
  // INACTIVE TESTIMONIAL
  // =====================================================

  {
    id: 16,

    name: "Test Customer",

    location: "Maharashtra",

    rating: 4,

    message:
      "This testimonial is currently inactive and can be enabled from the Admin Panel when required.",

    image: "",

    product: "Organic Products",

    verified: false,

    status: "Inactive",

    featured: false,

    createdAt: "2026-04-10T10:00:00.000Z",
  },
];

export default testimonialData;

