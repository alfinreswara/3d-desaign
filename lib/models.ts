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
    name: "Creator Laptop",
    description:
      "A low-poly creator laptop with an RGB keyboard, glowing display accents, and an open lid.",
    longDescription:
      "A procedural low-poly creator laptop with an RGB backlit keyboard, neon display accents, side ports, and rubber feet. Presented at real-world scale — drag to orbit around it and zoom in to inspect the details.",
    glbPath: withBasePath("/models/laptop.glb"),
    previewImage: withBasePath("/images/laptop-preview.png"),
  },
];

export function getModel(slug: string): ModelMeta | undefined {
  return models.find((m) => m.slug === slug);
}
