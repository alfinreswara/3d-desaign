import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atelier 3D — Explore Objects in 3D",
    template: "%s · Atelier 3D",
  },
  description:
    "A minimal showcase of interactive 3D models. Discover every detail from every angle.",
  metadataBase: new URL("https://atelier3d.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
