import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-primary dark:text-primary-light">404</p>
      <h1 className="mt-4 text-4xl font-extrabold text-ink dark:text-white md:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-md text-lg font-medium text-ink/70 dark:text-white/70">
        The service or page you're looking for may have moved
      </p>
      <Link
        href="/hospitals"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-extrabold text-white transition-colors hover:bg-primary-deep"
      >
        Browse the Directory
      </Link>
    </div>
  );
}
