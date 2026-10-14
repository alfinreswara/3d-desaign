import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { ModelCard, ComingSoonCard } from "@/components/ModelCard";
import { models } from "@/lib/models";

export const metadata: Metadata = {
  title: "Atelier 3D — Explore Objects in 3D",
  description:
    "Discover every detail from every angle. A minimal showcase of interactive 3D models.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        <section
          id="explore"
          aria-labelledby="explore-heading"
          className="scroll-mt-20 bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2
              id="explore-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              Models
            </h2>
            <p className="mt-2 max-w-xl text-slate-500">
              Every model is fully interactive — rotate, zoom, and inspect it
              right in your browser.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <ModelCard key={model.slug} model={model} />
              ))}
              <ComingSoonCard label="New model" />
              <ComingSoonCard label="New model" />
            </div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-20 bg-white"
        >
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <h2
              id="about-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              About
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-500">
              <p>
                Atelier 3D is a small, curated gallery for exploring 3D objects
                directly in the browser. There is no marketplace, no checkout,
                and no account — just the models themselves, presented with
                care.
              </p>
              <p>
                Each piece is rendered live with real-time lighting and can be
                orbited a full 360 degrees. The collection starts with a single
                procedurally modeled laptop; more studies will join over time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
