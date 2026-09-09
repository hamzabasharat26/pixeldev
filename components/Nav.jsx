import Link from "next/link";
import { site } from "@/content/site";

export default function Nav() {
  return (
    <nav className="max-w-layout flex flex-col sm:flex-row items-center justify-between py-6 gap-4 border-b border-line/50">
      <Link href="/" className="font-bricolage font-bold text-xl hover:text-signal transition-colors group">
        <span className="text-signal mr-1 group-hover:ml-1 group-hover:mr-0 transition-all">{"["}</span> 
        {site.name} 
        <span className="text-signal ml-1 group-hover:mr-1 group-hover:ml-0 transition-all">{"]"}</span>
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/work" className="text-sm font-semibold hover:text-signal hover:-translate-y-0.5 transition-all">Work</Link>
        <Link href="/services" className="text-sm font-semibold hover:text-signal hover:-translate-y-0.5 transition-all">Services</Link>
        <Link href="/about" className="text-sm font-semibold hover:text-signal hover:-translate-y-0.5 transition-all">About</Link>
        <Link href="/careers" className="text-sm font-semibold text-signal hover:text-ink hover:-translate-y-0.5 transition-all flex items-center gap-1">
          Careers <span className="relative flex h-2 w-2 ml-0.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span></span>
        </Link>
        <Link href="/contact" className="text-sm font-semibold bg-ink text-paper px-4 py-2 rounded hover:bg-signal transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
