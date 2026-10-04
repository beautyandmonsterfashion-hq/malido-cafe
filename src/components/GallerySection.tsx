import React, { useState, useEffect, useCallback } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Sparkles,
  Disc3,
  Coffee,
} from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto, CAFE_INFO } from '../data/cafeData';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  }, [activePhotoIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => ((prev! - 1 + filteredPhotos.length) % filteredPhotos.length));
  }, [activePhotoIndex, filteredPhotos.length]);

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleClose, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#F5F1EB] border-y border-[#E5DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A27]">
              The Kala Ghoda Sanctuary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231F1E] font-medium mt-2">
              Interior & Ambiance
            </h2>
            <p className="text-sm sm:text-base text-[#5C534B] mt-2 max-w-xl">
              Step inside our 40-seater haven. High colonial ceilings, aged teakwood dining furniture, warm analog vinyl warmth, and fragrant Parsi kitchens.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#E8E1D5] rounded-xl self-start overflow-x-auto no-scrollbar max-w-full">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#231F1E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#231F1E]'
              }`}
            >
              All Spaces ({GALLERY_PHOTOS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('interior')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'interior'
                  ? 'bg-white text-[#231F1E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#231F1E]'
              }`}
            >
              Dining Hall
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('vinyl-bar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'vinyl-bar'
                  ? 'bg-white text-[#231F1E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#231F1E]'
              }`}
            >
              Vinyl & Apéro Bar
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('culinary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'culinary'
                  ? 'bg-white text-[#231F1E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#231F1E]'
              }`}
            >
              Parsi Feasts
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('heritage')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'heritage'
                  ? 'bg-white text-[#231F1E] shadow-xs'
                  : 'text-[#5C534B] hover:text-[#231F1E]'
              }`}
            >
              Heritage Malido
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#E2DBD0] border border-[#DDD5C9] shadow-xs cursor-pointer hover:shadow-md transition-all duration-300"
            >
              {/* Photo Image with smooth zoom on hover */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-900">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Quick inspect button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1 block">
                    {photo.moodTag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2 leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photography Ethos Kicker */}
        <div className="mt-12 text-center text-xs text-[#7D736A] flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#8C3A27]" />
            Ropewalk Lane, Kala Ghoda, South Mumbai
          </span>
          <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
          <span>Natural daylight from 8 AM to 5 PM</span>
          <span aria-hidden="true" className="text-[#C4B9AC]">·</span>
          <span>Amber analog vinyl acoustics from 6 PM</span>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activePhoto && activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {filteredPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Card */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-[#1E1A19] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 min-h-[300px] max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            {/* Bottom Details Drawer */}
            <div className="p-6 bg-[#231F1E] text-white border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    {activePhoto.moodTag}
                  </span>
                  <span className="text-white/40 text-xs">·</span>
                  <span className="text-xs text-stone-300">
                    Photo {activePhotoIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-medium text-white">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 max-w-2xl">
                  {activePhoto.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <a
                  href="#reservations"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#8C3A27] hover:bg-[#732F1F] rounded-lg transition-colors cursor-pointer"
                >
                  Book a Table Here
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
