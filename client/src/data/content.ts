// Central place for placeholder business content.
// Replace these values with Andrew's real info before launch.

export const company = {
  name: "Triz Contracting",
  owner: "Andrew D. Trzcinski",
  tagline: "Built right, the first time.",
  city: "Franklin",
  state: "WI",
  serviceArea: "Franklin, Milwaukee, Oak Creek, Hales Corners & the greater Milwaukee area",
  phoneDisplay: "414-617-3337",
  phoneHref: "tel:+14146173337",
  email: "info@trizcontracting.com", // [PLACEHOLDER EMAIL]
  address: "Franklin, WI 53132", // [PLACEHOLDER ADDRESS]
  coords: { lat: 42.8892, lng: -88.0342 }, // Franklin, WI approx.
  hours: "Mon–Sat, 7:00am – 6:00pm",
  founded: 2011, // [PLACEHOLDER]
  yearsInBusiness: new Date().getFullYear() - 2011,
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  bullets: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "remodeling",
    name: "Kitchen & Bath Remodeling",
    short: "Full gut renovations to targeted refreshes.",
    description:
      "From layout changes to finish work, we handle every trade a remodel touches so you deal with one crew, not five subcontractors.",
    bullets: ["Custom cabinetry & counters", "Plumbing & electrical rough-in", "Tile, trim & fixture install"],
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "additions",
    name: "Additions & Framing",
    short: "Extra square footage, done to code.",
    description:
      "Room additions, second stories, and structural framing — engineered, permitted, and built to blend seamlessly with your existing home.",
    bullets: ["Structural framing", "Permitting & inspections", "Seamless roofline tie-ins"],
    image: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "roofing",
    name: "Roofing",
    short: "Repairs, tear-offs, and full replacements.",
    description:
      "Storm damage, aging shingles, or a full tear-off — we work with every major roofing system and back our work with a workmanship warranty.",
    bullets: ["Asphalt, metal & flat roofing", "Storm damage repair", "Gutter & fascia work"],
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "concrete",
    name: "Concrete & Foundations",
    short: "Driveways, patios, slabs & footings.",
    description:
      "Poured, finished, and cured right. We handle everything from decorative patios to structural foundation work.",
    bullets: ["Driveways & patios", "Foundations & footings", "Decorative & stamped finishes"],
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "exteriors",
    name: "Siding & Exteriors",
    short: "Protect and upgrade your home's exterior.",
    description:
      "Siding, soffit, fascia, and trim work that holds up to Wisconsin winters and looks sharp doing it.",
    bullets: ["Vinyl, fiber cement & wood siding", "Soffit & fascia", "Exterior trim & painting"],
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "outdoor-living",
    name: "Decks & Outdoor Living",
    short: "Decks, pergolas, and outdoor spaces.",
    description:
      "Custom-built decks and outdoor structures designed to fit your property and hold up through every season.",
    bullets: ["Custom deck builds", "Pergolas & covered porches", "Railings & lighting"],
    image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "interior",
    name: "Interior Renovations",
    short: "Drywall, flooring, trim & paint.",
    description:
      "Basement finishes, flooring replacement, drywall repair, and interior painting — the finish work that makes a house feel new.",
    bullets: ["Basement finishing", "Flooring install & repair", "Drywall & interior paint"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "general",
    name: "General Contracting",
    short: "Not seeing it here? We probably still do it.",
    description:
      "Triz Contracting takes on projects across every trade. If it's construction-related, tell us what you need and we'll give you a straight answer.",
    bullets: ["Project management", "Licensed & insured", "One point of contact, start to finish"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
];

export const galleryCategories = [
  "All",
  "Remodeling",
  "Additions",
  "Roofing",
  "Concrete",
  "Exteriors",
  "Outdoor Living",
] as const;

export type GalleryItem = {
  id: string;
  title: string;
  category: (typeof galleryCategories)[number];
  before: string;
  after: string;
};

// Placeholder gallery — swap for real finished-job photos via the admin gallery endpoint.
export const placeholderGallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Franklin Kitchen Remodel",
    category: "Remodeling",
    before: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g2",
    title: "Full Tear-Off Roof Replacement",
    category: "Roofing",
    before: "https://images.unsplash.com/photo-1622015663084-307d19eabca2?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g3",
    title: "Stamped Concrete Patio",
    category: "Concrete",
    before: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g4",
    title: "Two-Story Home Addition",
    category: "Additions",
    before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g5",
    title: "Backyard Deck & Pergola",
    category: "Outdoor Living",
    before: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "g6",
    title: "Siding & Exterior Refresh",
    category: "Exteriors",
    before: "https://images.unsplash.com/photo-1596205250966-6a26f7c2b7cf?q=80&w=1200&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200&auto=format&fit=crop",
  },
];
