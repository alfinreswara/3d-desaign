import Image from "next/image";
import Link from "next/link";
import type { ModelMeta } from "@/lib/models";

export function ModelCard({ model }: { model: ModelMeta }) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className="group flex flex-col rounded-[26px] bg-white p-3 shadow-[0_24px_50px_-30px_rgba(120,100,80,0.45)] ring-1 ring-stone-900/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_60px_-28px_rgba(120,100,80,0.55)]"
      aria-label={`View ${model.name} in 3D`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-gradient-to-br from-[#f7f0e3] via-[#f3ede1] to-[#e9ede4]">
        <Image
          src={model.previewImage}
          alt={`${model.name} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-stone-600 shadow-sm backdrop-blur">
          Interactive 3D
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm text-white shadow-md transition-transform duration-300 group-hover:rotate-[-35deg]"
        >
          →
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
          Collection 001
        </p>
        <h3 className="mt-1 text-[17px] font-semibold tracking-tight text-stone-900">
          {model.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
          {model.description}
        </p>
        <span className="mt-4 flex items-center justify-between border-t border-stone-900/[0.06] pt-3 text-[13px]">
          <span className="font-medium text-stone-800">Open viewer</span>
          <span className="text-stone-400">glTF 2.0 · Web-ready</span>
        </span>
      </div>
    </Link>
  );
}

export function ComingSoonCard({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-[26px] border-2 border-dashed border-stone-900/10 bg-white/50 p-6 text-center"
      aria-label={`${label} — coming soon`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg text-stone-300 shadow-sm">
        <span aria-hidden="true">+</span>
      </div>
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="rounded-full bg-stone-900/[0.05] px-3 py-1 text-xs text-stone-400">
        Coming soon
      </p>
    </div>
  );
}
