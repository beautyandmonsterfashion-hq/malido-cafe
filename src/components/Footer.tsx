import React from 'react';
import { MapPin, Phone, Mail, Instagram, ExternalLink, Heart } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E1A19] text-[#E8E1D5] pt-16 pb-12 border-t border-[#38312D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#38312D]">
          {/* Col 1: Brand & Heritage */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl text-white font-semibold block tracking-normal">
              Malido Cafe & Apéro
            </span>
            <p className="text-xs sm:text-sm text-[#A89D91] leading-relaxed max-w-sm">
              An intimate 40-seater Parsi kitchen, artisanal roast bar, and analog vinyl sanctuary in Kala Ghoda, South Mumbai. Founded by Kermeen and Neville Bose.
            </p>
            <p className="text-xs text-[#7D736A] italic">
              {CAFE_INFO.heritageNote}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-white block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-[#A89D91]">
              <li>
                <a href="#story" className="hover:text-white transition-colors">The Founders & Heritage</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Responsive Menu & Pulaos</a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-white transition-colors">Online Table Booking</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Interior & Vinyl Gallery</a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">Vinyl Thursdays with Soundrise</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Directions & Hours</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-white block">
              Art District Location
            </span>
            <div className="space-y-2 text-xs text-[#A89D91]">
              <p className="text-white font-medium">
                Ropewalk Lane, Kala Ghoda, Fort, Mumbai 400001
              </p>
              <p>
                Open daily: 8:00 AM – 11:30 PM
              </p>
              <p>
                Reservations: <a href={`tel:${CAFE_INFO.phone}`} className="text-white hover:underline">{CAFE_INFO.phone}</a>
              </p>
              <div className="pt-2">
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D736A]">
          <p>© {new Date().getFullYear()} Malido Cafe & Apéro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Kala Ghoda · South Mumbai</span>
            <span aria-hidden="true">·</span>
            <span>Halal Certified Meats</span>
            <span aria-hidden="true">·</span>
            <span>40-Seat Capacity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
