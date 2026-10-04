import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Car,
  Utensils,
  Share2,
} from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const LocationSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do I need a reservation or do you welcome walk-ins?',
      a: 'We warmly welcome walk-in guests at all times! However, as Malido is an intimate 40-seater sanctuary, reserving ahead is recommended for weekend brunches, Thursday vinyl nights, and dinner services to avoid waiting.',
    },
    {
      q: 'Where can I park in Kala Ghoda?',
      a: 'Street parking is available on Ropewalk Lane and around Kala Ghoda circle via MCGM pay-and-park. Alternatively, the multi-level parking facility at Asiatic Library / Horniman Circle is a 5-minute stroll away.',
    },
    {
      q: 'Are all non-vegetarian meats Halal certified?',
      a: 'Yes, 100%. All chicken and mutton served at Malido are certified Halal. Furthermore, our kitchen maintains strictly dedicated cookware and prep stations for all vegetarian and Parsi Jain-friendly dishes.',
    },
    {
      q: 'When do the Analog Vinyl sessions take place?',
      a: 'Our signature "Vinyl Thursdays with Soundrise" take place every Thursday evening from 7:30 PM to 11:00 PM. We also spin mellow vintage jazz and bossa nova records daily during late afternoons and evening apéro hours.',
    },
    {
      q: 'Can I host a private gathering or book the entire 40-seat space?',
      a: 'Yes, we curate bespoke private family feasts, intimate book launches, and corporate dinners for groups of up to 40 guests. Please connect directly via WhatsApp or call our management.',
    },
  ];

  return (
    <section id="location" className="py-16 lg:py-24 bg-[#F5F1EB] border-t border-[#E5DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A27]">
            Find Us in the Art District
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231F1E] font-medium mt-2">
            Visit Malido in Kala Ghoda
          </h2>
          <p className="text-sm sm:text-base text-[#5C534B] mt-2">
            Nestled on Ropewalk Lane among colonial facades, art galleries, and heritage bookstores in South Mumbai.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Contact & Hours Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD7] shadow-xs space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3 pb-6 border-b border-[#F0EAE1]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5DFD7] text-[#8C3A27] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C3A27] mb-1">
                    Cafe Address
                  </h3>
                  <p className="text-base font-medium text-[#231F1E]">
                    Malido Cafe & Apéro
                  </p>
                  <p className="text-xs sm:text-sm text-[#5C534B] mt-0.5">
                    Ropewalk Lane, Kala Ghoda, Fort, Mumbai, Maharashtra 400001
                  </p>
                  <p className="text-xs text-[#7D736A] mt-1.5">
                    {CAFE_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pb-6 border-b border-[#F0EAE1]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5DFD7] text-[#8C3A27] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C3A27] mb-1">
                    Hours of Hospitality
                  </h3>
                  <div className="space-y-1 text-xs text-[#5C534B]">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#231F1E]">Dine-in Every Day:</span>
                      <span className="font-mono text-[#231F1E] font-semibold">{CAFE_INFO.hours.dineIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parsi Breakfast & Chai:</span>
                      <span className="font-mono">{CAFE_INFO.hours.breakfast}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heritage Lunch:</span>
                      <span className="font-mono">{CAFE_INFO.hours.lunch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Afternoon High Tea & Roasts:</span>
                      <span className="font-mono">{CAFE_INFO.hours.highTea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Apéro Bar & Dinner:</span>
                      <span className="font-mono">{CAFE_INFO.hours.dinnerApero}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone & Direct Contact */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5DFD7] text-[#8C3A27] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C3A27] mb-1">
                    Reservations & Inquiries
                  </h3>
                  <p className="text-sm font-medium text-[#231F1E]">
                    <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-[#8C3A27] transition-colors">
                      {CAFE_INFO.phone}
                    </a>
                    {' · '}
                    <a href={`tel:${CAFE_INFO.alternatePhone}`} className="hover:text-[#8C3A27] transition-colors">
                      {CAFE_INFO.alternatePhone}
                    </a>
                  </p>
                  <p className="text-xs text-[#7D736A] mt-0.5">
                    Direct line to our host stand and table management.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#8C3A27] hover:bg-[#732F1F] rounded-xl transition-colors shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hello%20Malido%20Cafe,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Cafe</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Google Maps Preview Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E5DFD7] shadow-xs">
              {/* Map Preview Visual Mockup */}
              <div className="relative aspect-16/10 bg-[#E8E1D5] overflow-hidden">
                {/* Styled Map Background Representation */}
                <div className="absolute inset-0 bg-[#EBE7DF]">
                  {/* Stylized street lines */}
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/70 -translate-y-1/2 rotate-12" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white/80 -rotate-6" />
                  <div className="absolute top-0 bottom-0 right-1/4 w-5 bg-white/70 rotate-6" />
                  <div className="absolute top-1/4 left-0 right-0 h-3 bg-amber-100/60 -rotate-3" />
                  <div className="absolute bottom-1/4 left-0 right-0 h-4 bg-white/60 rotate-2" />
                </div>

                {/* Kala Ghoda Pin in Center */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative group flex flex-col items-center">
                    <div className="px-3 py-1.5 bg-[#231F1E] text-white text-xs font-serif font-semibold rounded-lg shadow-lg mb-1 whitespace-nowrap flex items-center gap-1.5 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-[#8C3A27] animate-pulse"></span>
                      <span>Malido Cafe & Apéro</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#8C3A27] text-white flex items-center justify-center shadow-xl border-2 border-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="w-4 h-1.5 rounded-full bg-black/20 blur-2xs mt-1" />
                  </div>
                </div>

                {/* Subtle Map Coordinates Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-md text-[10px] font-mono text-[#5C534B] border border-[#DDD5C9]">
                  18.9287° N, 72.8321° E · Kala Ghoda, Fort
                </div>

                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#231F1E] rounded-md text-xs font-semibold shadow-xs border border-[#DDD5C9] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#8C3A27]" />
                </a>
              </div>

              {/* Transit & Arrival Guide */}
              <div className="p-6 bg-[#FAF8F5] border-t border-[#E5DFD7] space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A27] block">
                  Transit & Neighborhood Navigation
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs text-[#5C534B]">
                  <div>
                    <strong className="text-[#231F1E] block">By Train</strong>
                    <span>Churchgate (10 min walk) · CSMT (12 min walk)</span>
                  </div>
                  <div>
                    <strong className="text-[#231F1E] block">By Cab</strong>
                    <span>Drop at Ropewalk Lane / Kala Ghoda Circle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guest FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl text-[#231F1E] font-medium">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#5C534B] mt-1">
              Everything you need to know for an effortless visit.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#E5DFD7] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#231F1E]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7D736A] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#8C3A27]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#5C534B] leading-relaxed border-t border-[#F0EAE1]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
