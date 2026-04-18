// Service sheets — the editorial detail pages at /services/<slug>.
// Each sheet is designed to read like a page in a printed studio guide:
// tagline, short essay, process, pricing, sample photos, CTA.
//
// Sample photo ids reference entries in galleries.ts. If an id is missing
// (photo removed, typo), the ServiceSheetContent component filters it out
// gracefully rather than crashing.

export interface PricingTier {
  label: string;
  value: string;
  note?: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ServiceSheet {
  slug: "prints" | "commissions" | "licensing";
  title: string;
  tagline: string;
  description: string[];
  processSteps: ProcessStep[];
  pricing: PricingTier[];
  pricingNote?: string;
  samplePhotoIds: string[];
  cta: { label: string; href: string };
}

export const serviceSheets: ServiceSheet[] = [
  {
    slug: "prints",
    title: "Prints",
    tagline: "Limited runs on archival paper. Shot on 35mm.",
    description: [
      "Every print in the collection started as a frame on a roll of film. Shot on a 1970s Nikon FM across France, the United Kingdom, Italy, the United States, Indonesia, and Portugal. Developed, scanned, and printed on archival matte paper that takes the grain without flattening it.",
      "Prints are produced in limited runs. Once a size sells out, it is retired. If there is an image you want that is not listed for a particular size, ask. Custom work is part of the practice.",
      "Shipping is flat rate domestic. Framing is on request and priced separately, because the right frame depends on where the print is going.",
    ],
    processSteps: [
      { title: "Browse", body: "Open the shop or the country galleries. Note the frames you want." },
      { title: "Select", body: "Pick a size and quantity. Custom sizes quoted on request." },
      { title: "Confirm", body: "Orders confirm within 48 hours. Deposit secures the run." },
      { title: "Ship", body: "Prints leave the studio within 2 to 3 weeks, flat packed." },
    ],
    pricing: [
      { label: '5 x 7"', value: "$35" },
      { label: '8 x 10"', value: "$65" },
      { label: '11 x 14"', value: "$95" },
      { label: '16 x 20"', value: "$150", note: "limited" },
    ],
    pricingNote:
      "All prices USD, unframed, shipped flat. Framed or custom sizes priced separately. Once a size is retired, it is not reprinted.",
    samplePhotoIds: ["fr-001", "it-001", "uk-001"],
    cta: { label: "Browse prints", href: "/shop" },
  },
  {
    slug: "commissions",
    title: "Commissions",
    tagline: "Portraits, events, and editorial on film.",
    description: [
      "Natural light, 35mm film, a Nikon FM that is older than most of the people in front of it. Portraits are the quiet part. Events are the louder part. Editorial is where the brief tells me what the frame needs to do.",
      "Film slows the work down in a way digital cannot fake. Twenty four or thirty six exposures per roll. Every frame is a decision. Clients who book commissions are saying yes to that pace.",
      "Chicago area for most of the calendar. Travel bookings quote separately. If the work calls for a second shooter or studio time, that is folded into the estimate.",
    ],
    processSteps: [
      { title: "Inquiry", body: "Email or form. Tell me the occasion, the date, the location." },
      { title: "Scope call", body: "Fifteen minute call to confirm the brief and the look." },
      { title: "Deposit", body: "Fifty percent deposit holds the date." },
      { title: "Shoot", body: "On film. Contact sheet delivered within a week of the session." },
      { title: "Delivery", body: "High resolution scans of selected frames delivered within 2 to 3 weeks." },
    ],
    pricing: [
      { label: "Portrait · 30 min, 10 selects", value: "$150" },
      { label: "Portrait · 1 hr, 25 selects", value: "$275" },
      { label: "Portrait · 2 hr, 40 selects", value: "$400" },
      { label: "Event · 2 hours", value: "$350" },
      { label: "Event · 4 hours", value: "$600" },
      { label: "Event · full day", value: "$1,000" },
      { label: "Editorial", value: "from $750", note: "quoted" },
    ],
    pricingNote:
      "Sessions include digital scans of selected frames. Events include scans of all usable frames. Editorial quoted per brief. Travel, prints, and extended licensing priced separately.",
    samplePhotoIds: ["us-001", "fr-010", "uk-005"],
    cta: { label: "Start an inquiry", href: "/contact" },
  },
  {
    slug: "licensing",
    title: "Licensing",
    tagline: "Single use and extended licenses for editorial, commercial, or personal work.",
    description: [
      "Photographs from the archive license individually. Tell me where the image will run, how long, and how widely, and I will quote the terms. Most licenses are single use for a specific campaign or article. Ongoing usage is priced separately.",
      "Commercial licensing includes model and property releases where they exist. Ask before you plan a campaign around a specific image. Some frames have releases, some do not.",
      "Editorial licensing is fastest because the terms are usually clear. Personal non commercial use is the simplest option for anyone who wants a printed image for their own walls without buying a limited edition print.",
    ],
    processSteps: [
      { title: "Inquiry", body: "Send the image reference, the intended use, and the run dates." },
      { title: "Quote", body: "Terms and fee returned within 2 business days." },
      { title: "Agreement", body: "Short license agreement signed both sides." },
      { title: "Delivery", body: "High resolution file delivered on payment." },
    ],
    pricing: [
      { label: "Personal, non commercial", value: "$50" },
      { label: "Editorial, single use", value: "$150" },
      { label: "Commercial, single use", value: "$300" },
      { label: "Extended or exclusive", value: "quoted", note: "per project" },
    ],
    pricingNote:
      "All licenses cover specific frames, specific uses, and specific terms. Unlimited rights are never the default.",
    samplePhotoIds: ["ft-001", "fr-020", "it-002"],
    cta: { label: "Request licensing", href: "/contact" },
  },
];

export function getServiceSheet(slug: string): ServiceSheet | undefined {
  return serviceSheets.find((s) => s.slug === slug);
}
