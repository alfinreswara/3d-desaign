import Link from "next/link";
import ModelViewer from "@/components/ModelViewer";
import { models } from "@/lib/models";
import { LAPTOP_HOTSPOTS } from "@/lib/hotspots";

const SPECS = [
  { value: "0.34 m", label: "Real scale" },
  { value: "164", label: "Modelled parts" },
  { value: "glTF 2.0", label: "Web-ready" },
];

export default function Hero() {
  const featured = models[0];
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* soft catalog backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7efe2] via-[#faf7f1] to-[#faf7f1]" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f5dcc4] opacity-60 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#dce7d5] opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-96 rounded-full bg-[#f2e2ee] opacity-50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-20 lg:pt-16">
        <div className="max-w-xl">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-stone-600 shadow-sm backdrop-blur">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            Collection 001 — {featured.name}
          </p>
          <h1
            id="hero-heading"
            className="rise rise-1 mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl"
          >
            Soft on the eyes,
            <br />
            <em className="font-serif font-normal italic text-stone-700">
              true in every angle.
            </em>
          </h1>
          <p className="rise rise-2 mt-5 max-w-md text-[17px] leading-relaxed text-stone-500">
            A calm, curated catalog of objects you can orbit, zoom, and
            inspect — rendered live in your browser with gentle studio light.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/models/${featured.slug}`}
              className="group rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white shadow-[0_16px_30px_-16px_rgba(28,25,23,0.7)] transition-all hover:bg-stone-700"
            >
              View the {featured.name}
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="#explore"
              className="rounded-full border border-stone-900/10 bg-white/80 px-6 py-3 text-sm font-medium text-stone-700 backdrop-blur transition-colors hover:bg-white"
            >
              Browse catalog
            </Link>
          </div>
          <dl className="rise rise-3 mt-9 flex max-w-md items-center gap-7 border-t border-stone-900/[0.07] pt-6">
            {SPECS.map((s) => (
              <div key={s.label}>
                <dt className="order-2 mt-1 text-xs text-stone-400">
                  {s.label}
                </dt>
                <dd className="order-1 text-lg font-semibold tracking-tight text-stone-900">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise rise-2 relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[#f3d9b8] via-[#e8e4d5] to-[#cfdcc9] opacity-60 blur-2xl"
          />
          <ModelViewer
            src={featured.glbPath}
            alt={`Interactive 3D preview of the ${featured.name}`}
            hotspots={LAPTOP_HOTSPOTS}
            className="relative aspect-[4/3] w-full rounded-[28px] shadow-[0_30px_70px_-30px_rgba(120,100,80,0.5)] ring-1 ring-white/70"
            showHints={false}
          />
          <p className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
            />
            Live 3D — drag to rotate
          </p>
        </div>
      </div>
    </section>
  );
}
