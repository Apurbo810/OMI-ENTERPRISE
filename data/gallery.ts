export type GalleryItem = {
  id: string;
  type: "image";
  src: string;
} | {
  id: string;
  type: "video";
  src?: string;
  poster: string;
};

const projectPlaceholder = "/images/placeholders/project-placeholder.svg";

export const GALLERY: GalleryItem[] = [
  { id: "g1", type: "image", src: projectPlaceholder },
  { id: "g2", type: "image", src: projectPlaceholder },
  { id: "g3", type: "video", poster: projectPlaceholder },
  { id: "g4", type: "image", src: projectPlaceholder },
  { id: "g5", type: "image", src: projectPlaceholder },
  { id: "g6", type: "image", src: projectPlaceholder },
];