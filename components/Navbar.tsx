import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-white/60 bg-white/70 py-2 pl-4 pr-2 shadow-[0_12px_40px_-24px_rgba(120,100,80,0.55)] backdrop-blur-xl"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-[13px] text-amber-100"
          >
            ✦
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-stone-900">
            Atelier&nbsp;3D
          </span>
        </Link>
        <ul className="flex items-center gap-1 text-sm font-medium text-stone-600 sm:gap-2">
          <li>
            <Link
              href="/#explore"
              className="rounded-full px-3 py-2 transition-colors hover:bg-stone-900/5 hover:text-stone-900"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/#about"
              className="rounded-full px-3 py-2 transition-colors hover:bg-stone-900/5 hover:text-stone-900"
            >
              About
            </Link>
          </li>
          <li className="ml-1 hidden sm:block">
            <Link
              href="/models/laptop"
              className="rounded-full bg-stone-900 px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-all hover:bg-stone-700"
            >
              View in 3D
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
