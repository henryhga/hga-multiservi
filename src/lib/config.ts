// Centralized business configuration — do not duplicate these values in components.

export const business = {
  name: "HGA MULTISERVI",
  legalDisclaimerName: "HGA Multiservi",
  phoneDisplay: "305 498 8610",
  phoneHref: "tel:+13054988610",
  smsHref: "sms:+13054988610",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@hgamultiservi.com",
  domain: "hgamultiservi.com",
  siteUrl: "https://hgamultiservi.com",
  // Confirmed by the business owner — keep in sync with reality; remove if it ever stops being true.
  licensedAndInsured: true,
  serviceAreas: ["Hialeah", "Miami Lakes", "Miami Gardens", "Miramar"],
  socials: {
    facebook: "https://facebook.com/hgamultiservi",
    instagram: "https://instagram.com/hgamultiservi",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Exterior Cleaning", href: "/exterior-cleaning" },
  { label: "Bin Cleaning", href: "/bin-cleaning" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const web3formsAccessKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "cae3309e-c4f5-4e30-9d63-7a085e6898a8";

// --- Exterior Cleaning ------------------------------------------------

export const exteriorServices = [
  {
    slug: "house-washing",
    name: "House Washing",
    description:
      "Remove dirt, mold and mildew for a fresh, like-new look.",
  },
  {
    slug: "driveway-cleaning",
    name: "Driveway Cleaning",
    description:
      "Deep clean driveways and walkways to restore curb appeal.",
  },
  {
    slug: "roof-cleaning",
    name: "Roof Cleaning",
    description:
      "Professional soft washing to remove algae, stains and organic buildup.",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    description:
      "Keep your business exterior clean, professional and inviting.",
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    description:
      "Streak-free exterior window cleaning for homes and businesses.",
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    description:
      "Remove surface dirt and debris from solar panels with appropriate cleaning methods.",
  },
] as const;

export const serviceNeededOptions = [
  "House Washing",
  "Driveway Cleaning",
  "Roof Cleaning",
  "Commercial Cleaning",
  "Window Cleaning",
  "Solar Panel Cleaning",
  "Trash Bin Cleaning",
  "Other",
] as const;

export const exteriorFaqs = [
  {
    q: "How much does exterior cleaning cost?",
    a: "Pricing depends on the size of the property, the service selected and its current condition. Request a free quote and we'll follow up with an accurate price for your job.",
  },
  {
    q: "Do I need to be home?",
    a: "Not usually. As long as we have access to the areas being cleaned (driveway, exterior walls, roof, windows) and, if needed, a water source, you don't need to be present.",
  },
  {
    q: "Do you clean roofs and driveways?",
    a: "Yes. Roof cleaning uses a soft-washing method safe for most roofing materials, and driveway cleaning restores concrete, pavers and walkways.",
  },
  {
    q: "How quickly can service be scheduled?",
    a: "Availability varies by week and service area. Submit a quote request and we'll confirm the soonest available appointment.",
  },
  {
    q: "What happens during bad weather?",
    a: "If weather makes service unsafe or ineffective, we'll contact you to reschedule at no extra cost.",
  },
  {
    q: "Do you provide commercial estimates?",
    a: "Yes, select Commercial Cleaning on the quote form and share your property details so we can prepare an accurate estimate.",
  },
] as const;

// --- Bin Cleaning -------------------------------------------------------

export type BillingInterval = "monthly" | "every_two_months" | "one_time";

export const binPlans: Record<
  BillingInterval,
  {
    key: BillingInterval;
    name: string;
    badge?: string;
    firstBin: number;
    secondBin: number;
    frequencyLabel: string;
    description: string;
    features: string[];
    ctaLabel: string;
    recurring: boolean;
  }
> = {
  monthly: {
    key: "monthly",
    name: "Monthly",
    badge: "MOST POPULAR",
    firstBin: 19.99,
    secondBin: 5,
    frequencyLabel: "Every month",
    description: "One scheduled cleaning every month.",
    features: [
      "Interior cleaning",
      "Exterior cleaning",
      "Sanitizing treatment",
      "Odor control",
      "Monthly automatic billing",
      "Manage or cancel according to service terms",
    ],
    ctaLabel: "Choose Monthly",
    recurring: true,
  },
  every_two_months: {
    key: "every_two_months",
    name: "Every 2 Months",
    firstBin: 29.99,
    secondBin: 7,
    frequencyLabel: "Every two months",
    description: "One cleaning every two months.",
    features: [
      "Interior cleaning",
      "Exterior cleaning",
      "Sanitizing treatment",
      "Odor control",
      "Automatic billing every two months",
      "Manage or cancel according to service terms",
    ],
    ctaLabel: "Choose Every 2 Months",
    recurring: true,
  },
  one_time: {
    key: "one_time",
    name: "One-Time Cleaning",
    firstBin: 39.99,
    secondBin: 10,
    frequencyLabel: "Single visit",
    description: "Single cleaning visit with no recurring subscription.",
    features: [
      "Interior cleaning",
      "Exterior cleaning",
      "Sanitizing treatment",
      "Odor control",
      "One-time payment",
      "No recurring billing",
    ],
    ctaLabel: "Book One-Time",
    recurring: false,
  },
};

export function calculateBinTotal(plan: BillingInterval, bins: number): number {
  const safeBins = Math.max(1, Math.min(2, Math.trunc(bins) || 1));
  const config = binPlans[plan];
  const total =
    safeBins === 2 ? config.firstBin + config.secondBin : config.firstBin;
  return Math.round(total * 100) / 100;
}

export const binFaqs = [
  {
    q: "Do I need to be home?",
    a: "No. Just leave your bins outside in the agreed location on your scheduled cleaning day.",
  },
  {
    q: "Can I add a second bin?",
    a: "Yes. Add a second bin at signup or later through your account for the listed second-bin rate.",
  },
  {
    q: "Can I cancel or change plans?",
    a: "Yes, you can manage or cancel your plan any time in accordance with our bin cleaning terms.",
  },
  {
    q: "Do you offer one-time service?",
    a: "Yes, choose the One-Time Cleaning plan for a single visit with no subscription.",
  },
  {
    q: "When should I leave the bins outside?",
    a: "Leave bins in the agreed pickup location the night before or early on your scheduled cleaning day.",
  },
  {
    q: "What happens if the bins are not accessible?",
    a: "If our team cannot access your bins, the visit may be marked as a missed cleaning per our service terms.",
  },
  {
    q: "What items must be removed before cleaning?",
    a: "Bins must be empty of trash and free of hazardous, sharp or prohibited items before cleaning.",
  },
  {
    q: "What happens during bad weather?",
    a: "If weather prevents safe service, your cleaning will be rescheduled to the next available date.",
  },
] as const;

// ZIP codes currently serviced. Placeholder set grouped by service area —
// TODO(business owner): confirm exact ZIP list before enabling paid signups.
export const allowedZipCodes: Record<string, string[]> = {
  Hialeah: ["33010", "33012", "33013", "33014", "33015", "33016", "33018"],
  "Miami Lakes": ["33014", "33016", "33018"],
  "Miami Gardens": ["33054", "33055", "33056", "33169"],
  Miramar: ["33023", "33025", "33027", "33029"],
};

export function isZipServiced(zip: string): boolean {
  const trimmed = zip.trim();
  return Object.values(allowedZipCodes).some((zips) => zips.includes(trimmed));
}
