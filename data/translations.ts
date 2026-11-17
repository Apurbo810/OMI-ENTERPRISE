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
};

export const translations = { en, bn };
export type Locale = keyof typeof translations;
export type Dictionary = typeof en;