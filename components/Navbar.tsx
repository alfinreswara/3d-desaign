import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          Atelier&nbsp;3D
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <li>
            <Link href="/#explore" className="transition-colors hover:text-sky-600">
              Explore
            </Link>
          </li>
          <li>
            <Link href="/#about" className="transition-colors hover:text-sky-600">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
