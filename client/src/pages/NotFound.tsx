import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <span className="font-display text-7xl font-800 text-accent">404</span>
        <h1 className="mt-4 font-display text-2xl font-700 text-ink">Page not found</h1>
        <p className="mt-2 max-w-sm text-ink-soft">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </PageShell>
  );
}
