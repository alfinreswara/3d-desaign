import Link from "next/link";
import ModelViewer from "@/components/ModelViewer";
import { models } from "@/lib/models";

export default function Hero() {
  const featured = models[0];
  return (
    <section aria-labelledby="hero-heading" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="max-w-lg">
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Explore Objects in 3D.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Discover every detail from every angle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/models/${featured.slug}`}
              className="rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
              View the {featured.name}
            </Link>
            <Link
              href="#explore"
              className="rounded-full bg-slate-100 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              Browse gallery
            </Link>
          </div>
        </div>
        <ModelViewer
          src={featured.glbPath}
          alt={`Interactive 3D preview of the ${featured.name}`}
          poster={featured.previewImage}
          className="aspect-[3/2] w-full shadow-sm ring-1 ring-slate-200/70"
          showHints={false}
        />
      </div>
    </section>
  );
}
