export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-900/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-10 text-center text-sm text-stone-500 sm:flex-row sm:px-6 sm:text-left">
        <p className="flex items-center gap-2 font-medium text-stone-800">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-[11px] text-amber-100"
          >
            ✦
          </span>
          Atelier 3D
        </p>
        <p>A soft catalog of interactive 3D objects.</p>
      </div>
    </footer>
  );
}
