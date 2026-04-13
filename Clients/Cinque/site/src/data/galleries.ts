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
  { id: "fr-001", src: "/photos/france/000047020007.jpg", alt: "000047020007", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-002", src: "/photos/france/000047020022.jpg", alt: "000047020022", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-003", src: "/photos/france/000047020028.jpg", alt: "000047020028", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-004", src: "/photos/france/000047020030.jpg", alt: "000047020030", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-005", src: "/photos/france/000047020031.jpg", alt: "000047020031", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-006", src: "/photos/france/000047020033.jpg", alt: "000047020033", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-007", src: "/photos/france/000047020040.jpg", alt: "000047020040", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-008", src: "/photos/france/000084680002.jpg", alt: "000084680002", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-009", src: "/photos/france/000084680010.jpg", alt: "000084680010", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-010", src: "/photos/france/000084680021.jpg", alt: "000084680021", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-011", src: "/photos/france/000084680030.jpg", alt: "000084680030", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-012", src: "/photos/france/000084680035.jpg", alt: "000084680035", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-013", src: "/photos/france/000084680038.jpg", alt: "000084680038", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-014", src: "/photos/france/000093400002.jpg", alt: "000093400002", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-015", src: "/photos/france/000093400020.jpg", alt: "000093400020", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-016", src: "/photos/france/000377050027.jpg", alt: "000377050027", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-017", src: "/photos/france/000377060005.jpg", alt: "000377060005", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-018", src: "/photos/france/000377060006.jpg", alt: "000377060006", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-019", src: "/photos/france/000377060014.jpg", alt: "000377060014", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-020", src: "/photos/france/000377060015.jpg", alt: "000377060015", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-021", src: "/photos/france/000377060024.jpg", alt: "000377060024", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-022", src: "/photos/france/R1-06254-0036.JPG", alt: "R1-06254-0036", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-023", src: "/photos/france/R1-06254-0037.JPG", alt: "R1-06254-0037", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-024", src: "/photos/france/R1-06255-001A.JPG", alt: "R1-06255-001A", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-025", src: "/photos/france/R1-06255-005A.JPG", alt: "R1-06255-005A", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-026", src: "/photos/france/R1-06256-0024.JPG", alt: "R1-06256-0024", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-027", src: "/photos/france/R1-06256-0025.JPG", alt: "R1-06256-0025", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-028", src: "/photos/france/R1-06256-0027.JPG", alt: "R1-06256-0027", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-029", src: "/photos/france/R1-06256-0031.JPG", alt: "R1-06256-0031", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-030", src: "/photos/france/R1-06256-0034.JPG", alt: "R1-06256-0034", caption: "France, 2024", aspect: "3/2", gradient: "" },
  { id: "fr-031", src: "/photos/france/R1-06256-0035.JPG", alt: "R1-06256-0035", caption: "France, 2024", aspect: "3/2", gradient: "" },
];

const ukPhotos: Photo[] = [
  { id: "uk-001", src: "/photos/uk/000375650012.jpg", alt: "000375650012", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-002", src: "/photos/uk/000375650013.jpg", alt: "000375650013", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-003", src: "/photos/uk/000375650014.jpg", alt: "000375650014", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-004", src: "/photos/uk/000375650015.jpg", alt: "000375650015", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-005", src: "/photos/uk/000377010001.jpg", alt: "000377010001", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-006", src: "/photos/uk/000377010011.jpg", alt: "000377010011", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-007", src: "/photos/uk/000377010012.jpg", alt: "000377010012", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-008", src: "/photos/uk/000377010015.jpg", alt: "000377010015", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-009", src: "/photos/uk/000377010028.jpg", alt: "000377010028", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-010", src: "/photos/uk/000377010029.jpg", alt: "000377010029", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-011", src: "/photos/uk/000377020025.jpg", alt: "000377020025", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-012", src: "/photos/uk/000377030003.jpg", alt: "000377030003", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-013", src: "/photos/uk/000377040014.jpg", alt: "000377040014", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-014", src: "/photos/uk/000377040018.jpg", alt: "000377040018", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-015", src: "/photos/uk/000377040030.jpg", alt: "000377040030", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-016", src: "/photos/uk/000377040031.jpg", alt: "000377040031", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-017", src: "/photos/uk/000377050001.jpg", alt: "000377050001", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-018", src: "/photos/uk/000377050004.jpg", alt: "000377050004", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-019", src: "/photos/uk/000377050005.jpg", alt: "000377050005", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-020", src: "/photos/uk/000377050006.jpg", alt: "000377050006", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-021", src: "/photos/uk/000377050007.jpg", alt: "000377050007", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-022", src: "/photos/uk/000377050013.jpg", alt: "000377050013", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-023", src: "/photos/uk/000377070002.jpg", alt: "000377070002", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-024", src: "/photos/uk/000377070026.jpg", alt: "000377070026", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-025", src: "/photos/uk/000377070027.jpg", alt: "000377070027", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-026", src: "/photos/uk/000377070030.jpg", alt: "000377070030", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-027", src: "/photos/uk/R1-06256-0006.JPG", alt: "R1-06256-0006", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-028", src: "/photos/uk/R1-06256-0009.JPG", alt: "R1-06256-0009", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-029", src: "/photos/uk/R1-06256-0014.JPG", alt: "R1-06256-0014", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
  { id: "uk-030", src: "/photos/uk/R1-06256-0015.JPG", alt: "R1-06256-0015", caption: "United Kingdom, 2024", aspect: "3/2", gradient: "" },
];

const usPhotos: Photo[] = [
  { id: "us-001", src: "/photos/us/R1-07714-0011.JPG", alt: "R1-07714-0011", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-002", src: "/photos/us/R1-07714-0012.JPG", alt: "R1-07714-0012", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-003", src: "/photos/us/R1-07714-0013.JPG", alt: "R1-07714-0013", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-004", src: "/photos/us/R1-07714-0021.JPG", alt: "R1-07714-0021", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-005", src: "/photos/us/R1-07714-0022.JPG", alt: "R1-07714-0022", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-006", src: "/photos/us/R1-07714-0023.JPG", alt: "R1-07714-0023", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-007", src: "/photos/us/R1-07714-0024.JPG", alt: "R1-07714-0024", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-008", src: "/photos/us/R1-07714-0028.JPG", alt: "R1-07714-0028", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-009", src: "/photos/us/R1-07714-0029.JPG", alt: "R1-07714-0029", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-010", src: "/photos/us/R1-07714-0030.JPG", alt: "R1-07714-0030", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-011", src: "/photos/us/R1-07714-0035.JPG", alt: "R1-07714-0035", caption: "United States, 2024", aspect: "3/2", gradient: "" },
  { id: "us-012", src: "/photos/us/R1-07714-0037.JPG", alt: "R1-07714-0037", caption: "United States, 2024", aspect: "3/2", gradient: "" },
];

const italyPhotos: Photo[] = [
  { id: "it-001", src: "/photos/italy/000377080011.jpg", alt: "000377080011", caption: "Italy, 2024", aspect: "3/2", gradient: "" },
  { id: "it-002", src: "/photos/italy/623.jpg", alt: "623", caption: "Italy, 2024", aspect: "3/2", gradient: "" },
];

const featuredPhotos: Photo[] = [
  { id: "ft-001", src: "/photos/featured/R1-06254-0004.JPG", alt: "R1-06254-0004", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-002", src: "/photos/featured/R1-06254-0007.JPG", alt: "R1-06254-0007", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-003", src: "/photos/featured/R1-06254-0008.JPG", alt: "R1-06254-0008", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-004", src: "/photos/featured/R1-06254-0013.JPG", alt: "R1-06254-0013", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-005", src: "/photos/featured/R1-06254-0014.JPG", alt: "R1-06254-0014", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-006", src: "/photos/featured/R1-06254-0016.JPG", alt: "R1-06254-0016", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-007", src: "/photos/featured/R1-06254-0022.JPG", alt: "R1-06254-0022", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-008", src: "/photos/featured/R1-06254-0023.JPG", alt: "R1-06254-0023", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-009", src: "/photos/featured/R1-06254-0027.JPG", alt: "R1-06254-0027", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-010", src: "/photos/featured/R1-06254-0031.JPG", alt: "R1-06254-0031", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-011", src: "/photos/featured/R1-06255-008A.JPG", alt: "R1-06255-008A", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-012", src: "/photos/featured/R1-06255-016A.JPG", alt: "R1-06255-016A", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-013", src: "/photos/featured/R1-06255-032A.JPG", alt: "R1-06255-032A", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-014", src: "/photos/featured/R1-06255-035A.JPG", alt: "R1-06255-035A", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
  { id: "ft-015", src: "/photos/featured/R1-06255-036A.JPG", alt: "R1-06255-036A", caption: "Selected Work, 2024", aspect: "3/2", gradient: "" },
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
    photoCount: 30,
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
  {
    slug: "featured",
    title: "Selected Work",
    country: "Various",
    description:
      "Photographs that stand on their own — drawn from travels without a fixed destination. A personal edit across places and moments.",
    coverGradient: "linear-gradient(135deg, #A08868 0%, #887868 50%, #B8A088 100%)",
    photoCount: 15,
    photos: featuredPhotos,
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
