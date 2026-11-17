const en = {
  nav: {
    home: "Home",
    about: "About",
    supply: "Supply",
    equipment: "Equipment",
    construction: "Construction",
    projects: "Projects",
    contact: "Contact",
    getQuote: "Get a Quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    tagline: "Suppliers & Construction",
  },
  hero: {
  eyebrow: "Suppliers & Construction",
  titleLine1: "Building Trust.",
  titleLine2: "Delivering Quality.",
  description:
    "Your reliable partner for construction, general supply and equipment solutions in Bangladesh.",
  exploreServices: "Explore Services",
  contactUs: "Contact Us",
  imageAlt: "Construction site in Bangladesh",
},

services: {
  eyebrow: "What We Do",
  title: "Our Services",
  description:
    "Supply, equipment and construction solutions for businesses and projects across Bangladesh.",
  learnMore: "Learn more",
  items: {
    constructionMaterials: {
      title: "Construction Materials",
      description: "Materials for building and civil construction work.",
    },
    generalSupply: {
      title: "General Supply",
      description: "General supply items for businesses and organizations.",
    },
    equipmentMachinery: {
      title: "Equipment & Machinery",
      description: "Equipment and machinery to support construction work.",
    },
    constructionServices: {
      title: "Construction Services",
      description:
        "Building, civil and renovation work with professional project support.",
    },
  },
},
products: {
  eyebrow: "Products",
  title: "Products & Supplies",
  description:
    "Materials, supplies and equipment we provide to our clients.",
  viewAll: "View all products",
  viewDetails: "View details",
  items: {
    constructionMaterials: {
      title: "Construction Materials",
      description: "Materials for building and civil construction work.",
    },
    generalSupply: {
      title: "General Supply",
      description: "General supply items for businesses and organizations.",
    },
    equipmentMachinery: {
      title: "Equipment & Machinery",
      description: "Equipment and machinery for construction and related work.",
    },
  },
},
};

const bn: typeof en = {
  nav: {
    home: "হোম",
    about: "আমাদের সম্পর্কে",
    supply: "সাপ্লাই",
    equipment: "যন্ত্রপাতি",
    construction: "নির্মাণ",
    projects: "প্রকল্প",
    contact: "যোগাযোগ",
    getQuote: "কোটেশন নিন",
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    tagline: "সাপ্লায়ার্স ও কনস্ট্রাকশন",
  },
    hero: {
    eyebrow: "সাপ্লায়ার্স ও কনস্ট্রাকশন",
    titleLine1: "বিশ্বাস গড়ি।",
    titleLine2: "মান নিশ্চিত করি।",
    description:
        "বাংলাদেশে নির্মাণ, সাধারণ সাপ্লাই ও যন্ত্রপাতি সমাধানে আপনার নির্ভরযোগ্য অংশীদার।",
    exploreServices: "সেবাসমূহ দেখুন",
    contactUs: "যোগাযোগ করুন",
    imageAlt: "বাংলাদেশের একটি নির্মাণ সাইট",
    },
  services: {
  eyebrow: "আমরা যা করি",
  title: "আমাদের সেবাসমূহ",
  description:
    "বাংলাদেশজুড়ে ব্যবসা ও প্রকল্পের জন্য সাপ্লাই, যন্ত্রপাতি ও নির্মাণ সমাধান।",
  learnMore: "বিস্তারিত দেখুন",
  items: {
    constructionMaterials: {
      title: "নির্মাণসামগ্রী",
      description: "ভবন ও সিভিল নির্মাণ কাজের জন্য সামগ্রী।",
    },
    generalSupply: {
      title: "সাধারণ সাপ্লাই",
      description: "ব্যবসা ও প্রতিষ্ঠানের জন্য সাধারণ সাপ্লাই সামগ্রী।",
    },
    equipmentMachinery: {
      title: "যন্ত্রপাতি ও মেশিনারি",
      description: "নির্মাণ কাজের জন্য যন্ত্রপাতি ও মেশিনারি।",
    },
    constructionServices: {
      title: "নির্মাণ সেবা",
      description: "ভবন, সিভিল ও সংস্কার কাজ, পেশাদার প্রকল্প সহায়তাসহ।",
    },
  },
  },
  products: {
  eyebrow: "পণ্য",
  title: "পণ্য ও সরবরাহ",
  description:
    "আমাদের ক্লায়েন্টদের জন্য আমরা যে সামগ্রী, সাপ্লাই ও যন্ত্রপাতি সরবরাহ করি।",
  viewAll: "সব পণ্য দেখুন",
  viewDetails: "বিস্তারিত দেখুন",
  items: {
    constructionMaterials: {
      title: "নির্মাণসামগ্রী",
      description: "ভবন ও সিভিল নির্মাণ কাজের জন্য সামগ্রী।",
    },
    generalSupply: {
      title: "সাধারণ সাপ্লাই",
      description: "ব্যবসা ও প্রতিষ্ঠানের জন্য সাধারণ সাপ্লাই সামগ্রী।",
    },
    equipmentMachinery: {
      title: "যন্ত্রপাতি ও মেশিনারি",
      description: "নির্মাণ কাজের জন্য যন্ত্রপাতি ও মেশিনারি।",
    },
  },
  },
};




export const translations = { en, bn };
export type Locale = keyof typeof translations;
export type Dictionary = typeof en;