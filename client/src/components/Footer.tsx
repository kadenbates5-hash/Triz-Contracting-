import { Link } from "react-router-dom";
import { company } from "../data/content";
import logoMark from "../assets/logo-mark.png";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logoMark} alt="Triz Contracting LLC" className="h-16 w-16 object-contain" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Full-service contracting based in {company.city}, {company.state}. Owned and
            operated by {company.owner} — quality work, done right the first time.
          </p>
          <p className="mt-4 text-xs text-white/40">Licensed & insured. [PLACEHOLDER LICENSE #]</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-700 uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-accent-light">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-accent-light">Gallery</Link></li>
            <li><Link to="/reviews" className="hover:text-accent-light">Reviews</Link></li>
            <li><Link to="/about" className="hover:text-accent-light">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent-light">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-700 uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={company.phoneHref} className="hover:text-accent-light">{company.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-accent-light">{company.email}</a>
            </li>
            <li>{company.address}</li>
            <li className="text-white/40">{company.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
