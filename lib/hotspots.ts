/**
 * Numbered annotation hotspots for the laptop model.
 * Positions/normals are in meters in the model's local space
 * (Y-up, centered at origin, 0.34 m wide).
 */
export interface Hotspot {
  id: string;
  n: number;
  position: [number, number, number];
  normal: [number, number, number];
  title: string;
  body: string;
}

export const LAPTOP_HOTSPOTS: Hotspot[] = [
  {
    id: "display",
    n: 1,
    position: [0, 0.02, -0.088],
    normal: [0, 0.25, 1],
    title: "Layar Nebula",
    body: "Glow panel dengan bezel tipis dan aksen neon.",
  },
  {
    id: "keyboard",
    n: 2,
    position: [0, -0.093, -0.023],
    normal: [0, 1, 0.25],
    title: "Keyboard RGB",
    body: "71 tombol low-profile dengan backlight RGB.",
  },
  {
    id: "trackpad",
    n: 3,
    position: [0.03, -0.095, 0.066],
    normal: [0, 1, 0.3],
    title: "Trackpad kaca",
    body: "Permukaan kaca yang presisi dan responsif.",
  },
  {
    id: "ports",
    n: 4,
    position: [-0.068, -0.107, 0.118],
    normal: [0, -0.1, 1],
    title: "Port USB-C · HDMI",
    body: "Deretan port lengkap plus light strip depan.",
  },
  {
    id: "webcam",
    n: 5,
    position: [0, 0.113, -0.104],
    normal: [0, 0.3, 1],
    title: "Webcam",
    body: "Kamera di bezel atas untuk meeting.",
  },
];
