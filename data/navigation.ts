export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "supply", href: "/supply" },
  { key: "equipment", href: "/equipment" },
  { key: "construction", href: "/construction" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

export const QUOTE_CTA = { key: "getQuote", href: "/contact" } as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];