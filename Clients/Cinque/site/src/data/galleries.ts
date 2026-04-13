export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  date?: string;
  aspect?: "4/3" | "3/2" | "1/1";
  gradient: string;
}

export interface Gallery {
  slug: string;
  title: string;
  country: string;
  description: string;
  coverGradient: string;
  photoCount: number;
  photos: Photo[];
}

const francePhotos: Photo[] = [
  {
    id: "fr-001",
    src: "",
    alt: "Lavender fields at golden hour",
    caption: "Lavender fields stretching toward the horizon",
    location: "Provence",
    date: "June 2024",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #C9A96E 0%, #9B7DB8 50%, #D4B896 100%)",
  },
  {
    id: "fr-002",
    src: "",
    alt: "Morning light on limestone facade",
    caption: "First light on the old quarter",
    location: "Aix-en-Provence",
    date: "June 2024",
    aspect: "4/3",
    gradient: "linear-gradient(135deg, #D4C5A0 0%, #A68DB8 50%, #E0CFA8 100%)",
  },
  {
    id: "fr-003",
    src: "",
    alt: "Seine reflections at dusk",
    caption: "The river at its quietest",
    location: "Paris",
    date: "March 2024",
    aspect: "1/1",
    gradient: "linear-gradient(135deg, #B8A080 0%, #8B78A8 50%, #C9B898 100%)",
  },
  {
    id: "fr-004",
    src: "",
    alt: "Vineyard rows in autumn",
    caption: "October color between the vines",
    location: "Burgundy",
    date: "October 2023",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #D0B878 0%, #B89AC8 50%, #DCCAA0 100%)",
  },
  {
    id: "fr-005",
    src: "",
    alt: "Market stall with fresh flowers",
    caption: "Saturday morning at the market",
    location: "Nice",
    date: "July 2024",
    aspect: "4/3",
    gradient: "linear-gradient(135deg, #C4A870 0%, #A088B8 50%, #D8C090 100%)",
  },
  {
    id: "fr-006",
    src: "",
    alt: "Coastal cliff at sunset",
    caption: "Where the land gives way to sea",
    location: "Etretat",
    date: "August 2023",
    aspect: "1/1",
    gradient: "linear-gradient(135deg, #BDA078 0%, #9480A8 50%, #CCBA90 100%)",
  },
];

const ukPhotos: Photo[] = [
  {
    id: "uk-001",
    src: "",
    alt: "Fog rolling across the moors",
    caption: "Morning mist lifting slowly",
    location: "Yorkshire",
    date: "September 2024",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #8A9B8A 0%, #A0A8B0 50%, #7B8C7B 100%)",
  },
  {
    id: "uk-002",
    src: "",
    alt: "Georgian terrace in soft rain",
    caption: "Bath stone in the rain",
    location: "Bath",
    date: "April 2024",
    aspect: "4/3",
    gradient: "linear-gradient(135deg, #96A898 0%, #B0B8C0 50%, #88998A 100%)",
  },
  {
    id: "uk-003",
    src: "",
    alt: "Canal boats at rest",
    caption: "Still water, quiet afternoon",
    location: "London",
    date: "May 2024",
    aspect: "1/1",
    gradient: "linear-gradient(135deg, #7E907E 0%, #9BA4AC 50%, #708270 100%)",
  },
  {
    id: "uk-004",
    src: "",
    alt: "Highland loch at dawn",
    caption: "The loch before anyone else arrives",
    location: "Scottish Highlands",
    date: "August 2024",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #A0B2A0 0%, #B8C0C8 50%, #92A492 100%)",
  },
  {
    id: "uk-005",
    src: "",
    alt: "Cottage garden in full bloom",
    caption: "An English garden in July",
    location: "Cotswolds",
    date: "July 2024",
    aspect: "4/3",
    gradient: "linear-gradient(135deg, #8C9E8C 0%, #A8B0B8 50%, #7E907E 100%)",
  },
  {
    id: "uk-006",
    src: "",
    alt: "Cliffs meeting the North Sea",
    caption: "Chalk and sea and wind",
    location: "Dover",
    date: "June 2024",
    aspect: "1/1",
    gradient: "linear-gradient(135deg, #94A694 0%, #ACB4BC 50%, #869886 100%)",
  },
];

const usPhotos: Photo[] = [
  {
    id: "us-001",
    src: "",
    alt: "Desert road stretching to the horizon",
    caption: "The long road west",
    location: "Utah",
    date: "November 2023",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #C8A060 0%, #7090B0 50%, #D4AA70 100%)",
  },
  {
    id: "us-002",
    src: "",
    alt: "Brooklyn brownstones at golden hour",
    caption: "Warm stone, warm light",
    location: "New York",
    date: "October 2024",
    aspect: "4/3",
    gradient: "linear-gradient(135deg, #B89850 0%, #6080A0 50%, #C4A260 100%)",
  },
  {
    id: "us-003",
    src: "",
    alt: "Redwood canopy from below",
    caption: "Looking up through centuries",
    location: "California",
    date: "March 2024",
    aspect: "1/1",
    gradient: "linear-gradient(135deg, #D0A868 0%, #8098B8 50%, #DCBA78 100%)",
  },
  {
    id: "us-004",
    src: "",
    alt: "Lake at sunrise with mountain backdrop",
    caption: "Still water, first light",
    location: "Montana",
    date: "July 2024",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #C09858 0%, #6888A8 50%, #CCA868 100%)",
  },
];

const italyPhotos: Photo[] = [
  {
    id: "it-001",
    src: "",
    alt: "Terracotta rooftops at sunset",
    caption: "The rooftops at the end of the day",
    location: "Florence",
    date: "September 2024",
    aspect: "3/2",
    gradient: "linear-gradient(135deg, #B88860 0%, #8A9868 50%, #C49870 100%)",
  },
  {
    id: "it-002",
    src: "",
    alt: "Olive grove in afternoon light",
    caption: "Silver leaves, golden hour",
    location: "Tuscany",
    date: "September 2024",
    aspect: "4/3",
    gradient: "linear-gradient(135deg, #A88058 0%, #7E8E60 50%, #B49068 100%)",
  },
];

export const galleries: Gallery[] = [
  {
    slug: "france",
    title: "France",
    country: "France",
    description:
      "From the lavender of Provence to the limestone of Paris, these photographs trace a country that reveals itself slowly — in morning markets, quiet rivers, and light that arrives differently in every season.",
    coverGradient: "linear-gradient(135deg, #C9A96E 0%, #9B7DB8 50%, #D4B896 100%)",
    photoCount: 31,
    photos: francePhotos,
  },
  {
    slug: "united-kingdom",
    title: "United Kingdom",
    country: "United Kingdom",
    description:
      "Mist on the moors, rain on Georgian stone, the particular green of an English garden in July. The United Kingdom photographs find beauty in the muted palette that makes this landscape unmistakable.",
    coverGradient: "linear-gradient(135deg, #8A9B8A 0%, #A0A8B0 50%, #7B8C7B 100%)",
    photoCount: 28,
    photos: ukPhotos,
  },
  {
    slug: "united-states",
    title: "United States",
    country: "United States",
    description:
      "The scale of the American landscape — desert roads that vanish into heat, redwoods that block the sky, city light that competes with the sun. A country best understood at its extremes.",
    coverGradient: "linear-gradient(135deg, #C8A060 0%, #7090B0 50%, #D4AA70 100%)",
    photoCount: 12,
    photos: usPhotos,
  },
  {
    slug: "italy",
    title: "Italy",
    country: "Italy",
    description:
      "Terracotta and olive, the particular warmth of Tuscan light. A small but growing collection from a country that earns its reputation.",
    coverGradient: "linear-gradient(135deg, #B88860 0%, #8A9868 50%, #C49870 100%)",
    photoCount: 2,
    photos: italyPhotos,
  },
];

export function hasPhotoAsset(photo: Photo): boolean {
  return photo.src.trim().length > 0;
}

export function getGallery(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export function getGalleryCoverPhoto(gallery: Gallery): Photo | undefined {
  return gallery.photos.find(hasPhotoAsset) ?? gallery.photos[0];
}

export function isGalleryPreviewOnly(gallery: Gallery): boolean {
  return gallery.photos.length > 0 && gallery.photos.every((photo) => !hasPhotoAsset(photo));
}

export function getGalleryCountLabel(gallery: Gallery): string {
  if (gallery.photoCount > gallery.photos.length) {
    return `Previewing ${gallery.photos.length} of ${gallery.photoCount} photographs`;
  }

  return `${gallery.photoCount} photographs`;
}
