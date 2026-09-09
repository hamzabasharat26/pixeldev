import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function NotFound() {
  return (
    <div className="pt-32 pb-32 max-w-layout flex flex-col items-start justify-center min-h-[50vh]">
      <Reveal>
        <span className="mono-tag text-alert mb-4 block">404_NOT_FOUND</span>
        <h1 className="mb-6">That page does not exist.</h1>
        <p className="text-xl text-ink/80 mb-8">
          The work does, though.
        </p>
        <Link 
          href="/work"
          className="bg-signal text-white px-6 py-3 rounded hover:bg-signal/90 transition-colors font-semibold"
        >
          See the work
        </Link>
      </Reveal>
    </div>
  );
}
