import { withBasePath } from "./site";

export interface ModelMeta {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  glbPath: string;
  previewImage: string;
}

export const models: ModelMeta[] = [
  {
    slug: "laptop",
    name: "Laptop",
    description:
      "A procedurally modeled laptop — aluminum chassis, full keyboard, trackpad, and an open display.",
    longDescription:
      "This laptop was generated entirely with procedural geometry: a beveled aluminum chassis, 78 individual keycaps, a glass trackpad, dual-barrel hinges, side ports (USB-C, USB-A, HDMI, audio), and an open lid with an emissive display. Drag to orbit around it and zoom in to inspect the details.",
    glbPath: withBasePath("/models/laptop.glb"),
    previewImage: withBasePath("/images/laptop-preview.png"),
  },
];

export function getModel(slug: string): ModelMeta | undefined {
  return models.find((m) => m.slug === slug);
}
