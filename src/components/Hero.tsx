import React from 'react';
import { ArrowDown, Calendar, Sparkles, MapPin, Star, Clock } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface HeroProps {
  onReserveClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick }) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Kicker & Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#7D736A] font-medium tracking-wide mb-4">
          <span className="flex items-center gap-1.5 text-[#8C3A27] font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Kala Ghoda, Fort
          </span>
          <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
          <span>Est. 2023</span>
          <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
          <span>By Kermeen & Neville Bose</span>
          <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
          <span className="flex items-center gap-1 text-[#231F1E] font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
            4.5 ({CAFE_INFO.reviewCount} diners)
          </span>
        </div>

        {/* Main Title & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E1A19] leading-[1.1] tracking-tight text-balance">
              Authentic Parsi dining, artisanal roasts, and evening apéro in Kala Ghoda.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-base text-[#5C534B] leading-relaxed mb-6">
              An intimate 40-seater sanctuary where century-old family recipes, single-origin roasts, and analog vinyl records live in harmony in Mumbai&apos;s art district.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onReserveClick}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#8C3A27] hover:bg-[#732F1F] rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
              <a
                href="#menu"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#231F1E] bg-[#EFE9DF] hover:bg-[#E5DFD7] rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Menu</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5DFD7] bg-[#EAE3D9] aspect-16/9 max-h-[580px] w-full group">
          <img
            src="/src/assets/images/hero_cafe_interior_1791139969863.jpg"
            alt="Interior view of Malido Cafe & Apero showing warm teakwood tables, high ceilings, and amber lighting in Kala Ghoda"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />

          {/* Measured gradient scrim for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

          {/* Bottom Bar Info Overlay on Image */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                The Heritage Space
              </span>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-medium mt-1">
                40 seats. Hand-carved teakwood. Unhurried conversation.
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                Natural morning light through high colonial arches by day, shifting into warm amber vinyl-lit apéro evenings.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#gallery"
                className="px-3.5 py-2 text-xs font-medium bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg transition-colors border border-white/20"
              >
                View 4 Interior Frames
              </a>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-medium bg-[#8C3A27] hover:bg-[#732F1F] text-white rounded-lg transition-colors shadow-xs"
              >
                Maps & Directions
              </a>
            </div>
          </div>
        </div>

        {/* Quiet 4-Pillar Highlights Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#E5DFD7]">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#7D736A] font-semibold">Cuisine</span>
            <p className="text-sm font-semibold text-[#231F1E]">Authentic Parsi Family Recipes</p>
            <p className="text-xs text-[#5C534B]">Dhansak, Berry Pulao & Malido</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#7D736A] font-semibold">Analog Music</span>
            <p className="text-sm font-semibold text-[#231F1E]">Turntable & Vinyl Thursdays</p>
            <p className="text-xs text-[#5C534B]">Curated rare analog pressings</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#7D736A] font-semibold">Service Hours</span>
            <p className="text-sm font-semibold text-[#231F1E]">8:00 AM – 11:30 PM Daily</p>
            <p className="text-xs text-[#5C534B]">Breakfast, Lunch, High Tea & Apéro</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#7D736A] font-semibold">Assurance</span>
            <p className="text-sm font-semibold text-[#231F1E]">100% Halal Meats & Veg Kitchen</p>
            <p className="text-xs text-[#5C534B]">Dedicated preparation hygiene</p>
          </div>
        </div>
      </div>
    </section>
  );
};
