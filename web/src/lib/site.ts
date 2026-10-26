// Everything brand-specific in one place. Swap these when the agency name is final.
export const site = {
  name: "Parashar Digital",
  short: "PD",
  tagline: "Websites, apps and Google growth for Indian businesses",
  owner: "Vikash Parashar",
  email: "gowithvikash@gmail.com",
  whatsapp: "", // digits with country code, e.g. 9198xxxxxxxx; empty hides the WhatsApp button
  city: "Haryana, India",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
};

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
];
