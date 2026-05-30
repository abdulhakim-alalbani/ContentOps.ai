const DEFAULT_PROFILE = {
  name: "Shahid Miah",
  company: "Wavespace Agency",
  email: "wavespace.agency@gmail.com",
  phone: "+1 (360) 972-3394",
  address: "169 Rocky River Dr. Fresno, CA 93727",
  country: "United States",
  state: "Alaska",
  postalCode: "99950",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  timezone: "EST (GMT-5)",
  language: "en"
};

const DEFAULT_SETTINGS = {
  paymentReminders: false,
  lateFees: false,
  currency: "USD",
  invoiceAttachments: false,
  theme: "light"
};

const DEFAULT_ORDERS = [
  {
    id: "ORD-101",
    title: "How AI is Transforming Content Writing",
    type: "blog",
    status: "in_progress", // submitted, in_progress, review, revision, completed, delivered
    priority: "normal",
    wordCount: 1500,
    price: 150.00,
    deadline: "2026-06-05",
    createdAt: "2026-05-25",
    brief: "A detailed look at modern AI tools (LLMs) and how content writers can leverage them rather than fear them. Tone should be professional yet accessible.",
    keywords: ["AI writing", "Content creation", "Future of work"],
    feedback: "",
    rating: 0,
    revisions: []
  },
  {
    id: "ORD-102",
    title: "10 SEO Best Practices for E-commerce Sites",
    type: "blog",
    status: "review",
    priority: "high",
    wordCount: 2000,
    price: 200.00,
    deadline: "2026-06-01",
    createdAt: "2026-05-20",
    brief: "Practical, actionable guide for e-commerce store owners to optimize product pages, category pages, and speed up their load times for SEO.",
    keywords: ["E-commerce SEO", "SEO checklist", "Product page optimization"],
    feedback: "",
    rating: 0,
    deliveredContent: "Here is the completed article on E-commerce SEO best practices...",
    revisions: []
  },
  {
    id: "ORD-103",
    title: "Product Launch Email Campaign (3-Part Series)",
    type: "email",
    status: "completed",
    priority: "urgent",
    wordCount: 800,
    price: 120.00,
    deadline: "2026-05-28",
    createdAt: "2026-05-24",
    brief: "Email copy sequence to announce our new SaaS analytics dashboard features. Email 1: Teaser, Email 2: Launch & Offer, Email 3: Last Chance.",
    keywords: ["email copywriting", "SaaS launch", "conversion copywriting"],
    feedback: "Excellent work! The copy is extremely engaging and fits our brand perfectly.",
    rating: 5,
    deliveredContent: "Subject: Something big is coming...\n\nHi [Name],\n\nWe've been working on...",
    revisions: []
  },
  {
    id: "ORD-104",
    title: "Landing Page Copy for Tailwind UI Kit",
    type: "copywriting",
    status: "submitted",
    priority: "normal",
    wordCount: 1200,
    price: 180.00,
    deadline: "2026-06-10",
    createdAt: "2026-05-28",
    brief: "Persuasive landing page copy for a new Tailwind CSS UI Kit. Needs to target developers and designer-founders. Strong focus on speed, design quality, and ease of use.",
    keywords: ["Tailwind UI", "component library", "landing page copy"],
    feedback: "",
    rating: 0,
    revisions: []
  },
  {
    id: "ORD-105",
    title: "Social Media Pack - June 2026",
    type: "social",
    status: "revision",
    priority: "normal",
    wordCount: 600,
    price: 90.00,
    deadline: "2026-05-30",
    createdAt: "2026-05-15",
    brief: "15 LinkedIn posts and 15 Twitter posts for our CEO's personal brand focusing on bootstrapped SaaS growth and remote team culture.",
    keywords: ["SaaS growth", "remote work", "bootstrapped"],
    feedback: "Please make the Twitter posts slightly shorter to fit the character limit better.",
    rating: 0,
    revisions: [
      {
        id: "REV-1",
        notes: "Requested shorter Twitter posts to fit character limits.",
        createdAt: "2026-05-27"
      }
    ]
  }
];

const getStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error("Error reading localStorage", error);
    return fallback;
  }
};

const setStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing localStorage", error);
  }
};

export const getProfile = () => getStorage("cf_profile", DEFAULT_PROFILE);
export const saveProfile = (profile) => setStorage("cf_profile", profile);

export const getSettings = () => getStorage("cf_settings", DEFAULT_SETTINGS);
export const saveSettings = (settings) => setStorage("cf_settings", settings);

export const getOrders = () => getStorage("cf_orders", DEFAULT_ORDERS);
export const getOrderById = (id) => {
  const orders = getOrders();
  const order = orders.find(o => o.id.toString() === id.toString());
  if (order) return order;

  // Return a dynamic mockup for tasks that don't exist in the default list
  return {
    id: id,
    title: `Task Details (ID: ${id})`,
    type: "design",
    status: "in_progress",
    priority: "normal",
    wordCount: 0,
    price: 150.00,
    deadline: "2026-12-31",
    createdAt: new Date().toISOString().split('T')[0],
    brief: "This is a dynamically generated mockup for the selected task. It allows you to view the task UI and layout without needing hardcoded data for every single card in the Kanban board.",
    keywords: ["UI Mockup", "Design", "Task"],
    feedback: "",
    rating: 0,
    revisions: []
  };
};

export const saveOrders = (orders) => setStorage("cf_orders", orders);

export const createOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString().split('T')[0],
    status: "submitted",
    revisions: []
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

export const updateOrderStatus = (id, status) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    saveOrders(orders);
    return orders[index];
  }
  return null;
};

export const requestRevision = (id, notes) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = "revision";
    orders[index].revisions.push({
      id: `REV-${Math.floor(100 + Math.random() * 900)}`,
      notes,
      createdAt: new Date().toISOString().split('T')[0]
    });
    saveOrders(orders);
    return orders[index];
  }
  return null;
};

export const approveOrder = (id, rating, feedback) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = "completed";
    orders[index].rating = rating;
    orders[index].feedback = feedback;
    saveOrders(orders);
    return orders[index];
  }
  return null;
};
