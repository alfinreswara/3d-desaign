import Image from "next/image";
import Link from "next/link";
import type { ModelMeta } from "@/lib/models";

export function ModelCard({ model }: { model: ModelMeta }) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md"
      aria-label={`View ${model.name} in 3D`}
    >
      <div className="relative aspect-[3/2] bg-slate-100">
        <Image
          src={model.previewImage}
          alt={`${model.name} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold text-slate-900">{model.name}</h3>
        <p className="text-sm leading-relaxed text-slate-500">
          {model.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-sky-600">
          View in 3D
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

export function ComingSoonCard({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center"
      aria-label={`${label} — coming soon`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-xs text-slate-400">Coming soon</p>
    </div>
  );
}
