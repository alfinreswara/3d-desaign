import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelViewer from "@/components/ModelViewer";
import { getModel } from "@/lib/models";

export const metadata: Metadata = {
  title: "Laptop",
  description:
    "A procedurally modeled laptop, presented as a fully interactive 3D model.",
};

export default function LaptopPage() {
  const model = getModel("laptop");
  if (!model) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
          <Link
            href="/#explore"
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            <span aria-hidden="true">&larr;</span> All models
          </Link>

          <div className="mt-6 max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {model.name}
            </h1>
            <p className="mt-3 leading-relaxed text-slate-500">
              {model.longDescription}
            </p>
          </div>

          <section aria-label={`Interactive 3D viewer: ${model.name}`}>
            <ModelViewer
              src={model.glbPath}
              alt={`Interactive 3D model of a ${model.name}`}
              poster={model.previewImage}
              lazy={false}
              className="mt-8 aspect-[4/3] w-full shadow-sm ring-1 ring-slate-200/70 sm:aspect-[16/10]"
            />
          </section>

          <dl className="mt-8 grid gap-6 rounded-2xl bg-slate-50 p-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Format
              </dt>
              <dd className="mt-1 text-sm text-slate-700">glTF 2.0 binary</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Interaction
              </dt>
              <dd className="mt-1 text-sm text-slate-700">
                Drag to rotate, pinch or scroll to zoom
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Origin
              </dt>
              <dd className="mt-1 text-sm text-slate-700">
                Procedurally modeled, no scans
              </dd>
            </div>
          </dl>
        </div>
      </main>
      <Footer />
    </>
  );
}
