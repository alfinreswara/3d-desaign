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

const CATEGORIES = ["All", "Laptops", "Chairs", "Audio"];

const PERKS = [
  {
    title: "Soft studio light",
    text: "Every piece is lit with a calm, neutral studio setup — no harsh glare.",
  },
  {
    title: "True to scale",
    text: "Models sit at real-world size, so proportions feel honest and familiar.",
  },
  {
    title: "Touch friendly",
    text: "Drag, pinch, and zoom with gentle damping on any device.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        <section
          id="explore"
          aria-labelledby="explore-heading"
          className="scroll-mt-24"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                  Catalog
                </p>
                <h2
                  id="explore-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight text-stone-900"
                >
                  The{" "}
                  <em className="font-serif font-normal italic">
                    collection
                  </em>
                </h2>
                <p className="mt-2 max-w-xl leading-relaxed text-stone-500">
                  Every model is fully interactive — rotate, zoom, and inspect
                  it right in your browser.
                </p>
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter categories"
              >
                {CATEGORIES.map((c, i) => (
                  <span
                    key={c}
                    className={
                      i === 0
                        ? "rounded-full bg-stone-900 px-4 py-2 text-[13px] font-medium text-white"
                        : "rounded-full border border-stone-900/10 bg-white/70 px-4 py-2 text-[13px] font-medium text-stone-400"
                    }
                  >
                    {c}
                    {i > 1 ? " · soon" : ""}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <ModelCard key={model.slug} model={model} />
              ))}
              <ComingSoonCard label="Studio chair" />
              <ComingSoonCard label="Headphones" />
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-20">
            <div className="rounded-[32px] bg-white p-8 shadow-[0_24px_60px_-35px_rgba(120,100,80,0.5)] ring-1 ring-stone-900/[0.06] sm:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                About the atelier
              </p>
              <h2
                id="about-heading"
                className="mt-2 max-w-lg text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl"
              >
                A quiet shelf for{" "}
                <em className="font-serif font-normal italic">
                  beautiful objects.
                </em>
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-stone-500">
                Atelier 3D is a small, curated gallery for exploring 3D objects
                directly in the browser. No marketplace, no checkout, no
                account — just the models themselves, presented with care.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {PERKS.map((p, i) => (
                  <div
                    key={p.title}
                    className="rounded-3xl bg-[#faf7f1] p-6 ring-1 ring-stone-900/[0.05]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm text-stone-500 shadow-sm"
                    >
                      {["◐", "◎", "○"][i]}
                    </span>
                    <h3 className="mt-4 text-[15px] font-semibold text-stone-900">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                      {p.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
