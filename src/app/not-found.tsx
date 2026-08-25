import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-date">Massar</p>
        <h1 className="display mt-3 text-5xl text-forest">Page not found</h1>
        <Link href="/en" className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-cream">
          Return home
        </Link>
      </div>
    </div>
  );
}
