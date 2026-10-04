import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  savedTastingCount: number;
  onOpenTastingDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  savedTastingCount,
  onOpenTastingDrawer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DFD7] shadow-xs'
          : 'bg-[#FAF8F5] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-zone contract: Brand | 4-6 Links | Actions */}
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
          <a
            href="#"
            className="group flex flex-col justify-center select-none"
            aria-label="Malido Cafe and Apero home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-normal text-[#231F1E] font-semibold group-hover:text-[#8C3A27] transition-colors">
              Malido Cafe & Apéro
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#7D736A] font-medium hidden sm:block">
              Kala Ghoda · Mumbai
            </span>
          </a>

          {/* Zone 2: 4-6 Nav Links (Single-line, subtle hover underlines) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4D453E]">
            <a
              href="#story"
              className="hover:text-[#8C3A27] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#8C3A27] after:transition-all"
            >
              Our Story
            </a>
            <a
              href="#menu"
              className="hover:text-[#8C3A27] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#8C3A27] after:transition-all"
            >
              Heritage Menu
            </a>
            <a
              href="#reservations"
              className="hover:text-[#8C3A27] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#8C3A27] after:transition-all"
            >
              Reservations
            </a>
            <a
              href="#gallery"
              className="hover:text-[#8C3A27] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#8C3A27] after:transition-all"
            >
              Interior & Ambiance
            </a>
            <a
              href="#events"
              className="hover:text-[#8C3A27] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#8C3A27] after:transition-all"
            >
              Vinyl Nights
            </a>
            <a
              href="#location"
              className="hover:text-[#8C3A27] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#8C3A27] after:transition-all"
            >
              Find Us
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3">
            {savedTastingCount > 0 && (
              <button
                type="button"
                onClick={onOpenTastingDrawer}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#231F1E] bg-[#EFE9DF] hover:bg-[#E5DFD7] rounded-lg transition-colors"
                title="View planned tasting dishes"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#8C3A27]" />
                <span>Table Plan</span>
                <span className="w-4 h-4 rounded-full bg-[#8C3A27] text-white text-[10px] flex items-center justify-center font-mono">
                  {savedTastingCount}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#8C3A27] hover:bg-[#732F1F] active:bg-[#5E2518] rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#4D453E] hover:text-[#231F1E] hover:bg-[#EFE9DF] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5DFD7] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#4D453E]">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#8C3A27] py-1 border-b border-[#F0EAE1]"
            >
              Our Story
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#8C3A27] py-1 border-b border-[#F0EAE1]"
            >
              Heritage Menu
            </a>
            <a
              href="#reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#8C3A27] py-1 border-b border-[#F0EAE1]"
            >
              Book a Reservation
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#8C3A27] py-1 border-b border-[#F0EAE1]"
            >
              Interior & Ambiance
            </a>
            <a
              href="#events"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#8C3A27] py-1 border-b border-[#F0EAE1]"
            >
              Analog Vinyl Thursdays
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#8C3A27] py-1"
            >
              Location & Hours
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            {savedTastingCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTastingDrawer();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#231F1E] bg-[#EFE9DF] rounded-lg"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#8C3A27]" />
                <span>View Table Selection ({savedTastingCount} items)</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#8C3A27] rounded-lg"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserve a Table (40 seats)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
