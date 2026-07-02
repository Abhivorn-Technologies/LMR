import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-light">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-8">
        <Button>Return Home</Button>
      </Link>
    </section>
  );
}
