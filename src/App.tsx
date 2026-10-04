import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { TastingDrawer } from './components/TastingDrawer';
import { MenuItem } from './data/cafeData';

export default function App() {
  const [tastingItems, setTastingItems] = useState<{ [id: string]: number }>({});
  const [isTastingDrawerOpen, setIsTastingDrawerOpen] = useState(false);
  const [reservationPrefillDishes, setReservationPrefillDishes] = useState<string[]>([]);

  // Add to tasting plan
  const handleAddToTasting = (item: MenuItem) => {
    setTastingItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  // Remove one quantity or delete if 0
  const handleRemoveFromTasting = (id: string) => {
    setTastingItems((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  // Stepper update
  const handleUpdateQty = (id: string, delta: number) => {
    setTastingItems((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleClearTasting = () => {
    setTastingItems({});
  };

  // Smooth scroll helper
  const scrollToReservation = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill reservation with selected dishes
  const handleOpenReservationWithItems = (dishes: string[]) => {
    setReservationPrefillDishes(dishes);
    scrollToReservation();
  };

  // Event booking shortcut
  const handleSelectEvent = (eventTitle: string) => {
    scrollToReservation();
  };

  const totalTastingCount = Object.values(tastingItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231F1E] font-sans selection:bg-[#E8D8C8]">
      {/* Top Bar adhering to 3-zone contract */}
      <Navbar
        onOpenReservation={scrollToReservation}
        savedTastingCount={totalTastingCount}
        onOpenTastingDrawer={() => setIsTastingDrawerOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onReserveClick={scrollToReservation} />

        {/* The Heritage Story & Kermeen / Neville Bose */}
        <StorySection />

        {/* Responsive Culinary Menu with Search, Filters & Dish Modal */}
        <MenuSection
          onAddToTasting={handleAddToTasting}
          onRemoveFromTasting={handleRemoveFromTasting}
          tastingItems={tastingItems}
          onOpenReservationWithItems={handleOpenReservationWithItems}
        />

        {/* Interactive Reservation System */}
        <ReservationSection initialDishes={reservationPrefillDishes} />

        {/* Integrated Gallery of Interior & Ambiance Photos */}
        <GallerySection />

        {/* Vinyl Thursdays & Curated Events */}
        <EventsSection onSelectEvent={handleSelectEvent} />

        {/* Google Maps Location, Hours & Visiting Info */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Tasting Selection Slide-over Drawer */}
      <TastingDrawer
        isOpen={isTastingDrawerOpen}
        onClose={() => setIsTastingDrawerOpen(false)}
        tastingItems={tastingItems}
        onUpdateQty={handleUpdateQty}
        onClear={handleClearTasting}
        onProceedToReservation={handleOpenReservationWithItems}
      />
    </div>
  );
}
