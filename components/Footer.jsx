import { site } from "@/content/site";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-auto">
      <div className="max-w-layout py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="font-bricolage font-bold text-2xl text-white block mb-4">
            {site.name}
          </Link>
          <p className="text-paper/70 max-w-sm mb-6">
            Vision systems that count, inspect and measure. Built for the physical world.
          </p>
          <div className="flex gap-4">
            <a href={site.whatsapp} className="text-signal hover:text-white transition-colors underline underline-offset-4">WhatsApp</a>
            <a href={`mailto:${site.email}`} className="text-signal hover:text-white transition-colors underline underline-offset-4">Email</a>
          </div>
        </div>
        
        <div>
          <h4 className="mono-tag text-paper/50 mb-4 block">COMPANY</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-paper/80 hover:text-signal transition-colors">About the team</Link></li>
            <li>
              <Link href="/careers" className="text-paper/80 hover:text-signal transition-colors flex items-center gap-2">
                Careers <span className="bg-signal/20 text-signal text-xs px-2 py-0.5 rounded">Hiring</span>
              </Link>
            </li>
            <li><Link href="/contact" className="text-paper/80 hover:text-signal transition-colors">Contact us</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="mono-tag text-paper/50 mb-4 block">SERVICES</h4>
          <ul className="space-y-3">
            <li><Link href="/work" className="text-paper/80 hover:text-signal transition-colors">Case Studies</Link></li>
            <li><Link href="/services#vision" className="text-paper/80 hover:text-signal transition-colors">Computer Vision</Link></li>
            <li><Link href="/services#platform" className="text-paper/80 hover:text-signal transition-colors">Web Platforms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-layout py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-paper/40">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-paper transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-paper transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
