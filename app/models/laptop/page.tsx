import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelViewer from "@/components/ModelViewer";
import { getModel } from "@/lib/models";

export const metadata: Metadata = {
  title: "Creator Laptop",
  description:
    "A low-poly creator laptop with RGB keyboard, presented as a fully interactive 3D model.",
};

const SPECS = [
  { label: "Format", value: "glTF 2.0 binary" },
  { label: "Scale", value: "0.34 m · real-world" },
  { label: "Interaction", value: "Drag to rotate, pinch or scroll to zoom" },
  { label: "Origin", value: "Procedurally modelled, no scans" },
];

export default function LaptopPage() {
  const model = getModel("laptop");
  if (!model) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
          <Link
            href="/#explore"
            className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-4 py-2 text-[13px] font-medium text-stone-600 backdrop-blur transition-colors hover:bg-white hover:text-stone-900"
          >
            <span aria-hidden="true">←</span> All models
          </Link>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                Collection 001
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                {model.name}
              </h1>
              <p className="mt-3 leading-relaxed text-stone-500">
                {model.longDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["RGB edition", "Open lid", "360°"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-stone-900/[0.05] px-3.5 py-1.5 text-xs font-medium text-stone-600 ring-1 ring-stone-900/[0.06]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <section
            aria-label={`Interactive 3D viewer: ${model.name}`}
            className="relative mt-8"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-[#f3d9b8] via-[#e8e4d5] to-[#cfdcc9] opacity-50 blur-2xl"
            />
            <ModelViewer
              src={model.glbPath}
              alt={`Interactive 3D model of a ${model.name}`}
              lazy={false}
              className="relative aspect-[4/3] w-full rounded-[28px] shadow-[0_30px_70px_-30px_rgba(120,100,80,0.5)] ring-1 ring-white/70 sm:aspect-[16/10]"
            />
          </section>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPECS.map((s) => (
              <div
                key={s.label}
                className="rounded-3xl bg-white p-5 shadow-[0_18px_40px_-30px_rgba(120,100,80,0.5)] ring-1 ring-stone-900/[0.06]"
              >
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-stone-700">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[28px] bg-stone-900 p-7 text-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Suka dari sudut ini?
              </h2>
              <p className="mt-1 text-sm text-stone-300">
                Putar modelnya dan screenshot angle favoritmu untuk thumbnail
                katalog.
              </p>
            </div>
            <Link
              href="/#explore"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition-colors hover:bg-amber-100"
            >
              Back to catalog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
