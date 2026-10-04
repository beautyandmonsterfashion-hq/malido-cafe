import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Check,
  Flame,
  Info,
  Sparkles,
  UtensilsCrossed,
  X,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/cafeData';

interface MenuSectionProps {
  onAddToTasting: (item: MenuItem) => void;
  onRemoveFromTasting: (id: string) => void;
  tastingItems: { [id: string]: number };
  onOpenReservationWithItems?: (itemNames: string[]) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToTasting,
  onRemoveFromTasting,
  tastingItems,
  onOpenReservationWithItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'signature'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false;
      if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') return false;
      if (dietaryFilter === 'signature' && !item.isSignature) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesParsi = item.parsiName?.toLowerCase().includes(query);
        const matchesIngredient = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesParsi || matchesIngredient;
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  // Counts for filters
  const counts = useMemo(() => {
    return {
      all: MENU_ITEMS.length,
      veg: MENU_ITEMS.filter((i) => i.dietary === 'veg').length,
      nonVeg: MENU_ITEMS.filter((i) => i.dietary === 'non-veg').length,
      signatures: MENU_ITEMS.filter((i) => i.isSignature).length,
    };
  }, []);

  const totalTastingCount = Object.values(tastingItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A27]">
            Culinary Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231F1E] font-medium mt-2">
            The Kala Ghoda Menu
          </h2>
          <p className="text-sm sm:text-base text-[#5C534B] mt-3">
            Hand-ground masalas, slow-braised meats, fragrant saffron berry pulaos, and warm Malido pudding. Prepared with love by Kermeen and Neville Bose.
          </p>
        </div>

        {/* Controls Container */}
        <div className="space-y-6 mb-10">
          {/* Category Tabs: responsive scrollable navigation */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar pb-2 gap-2 border-b border-[#E5DFD7]">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#231F1E] text-white shadow-xs'
                  : 'text-[#5C534B] hover:text-[#231F1E] hover:bg-[#EFE9DF]'
              }`}
            >
              All Offerings ({MENU_ITEMS.length})
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#8C3A27] text-white shadow-xs'
                    : 'text-[#5C534B] hover:text-[#231F1E] hover:bg-[#EFE9DF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filter & Search Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Dietary segment controls */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DF] rounded-xl self-start overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'all' ? 'bg-white text-[#231F1E] shadow-xs' : 'text-[#5C534B] hover:text-[#231F1E]'
                }`}
              >
                All ({counts.all})
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  dietaryFilter === 'veg' ? 'bg-white text-emerald-800 shadow-xs' : 'text-[#5C534B] hover:text-[#231F1E]'
                }`}
              >
                <span className="w-2.5 h-2.5 border border-emerald-600 flex items-center justify-center p-0.5 rounded-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                </span>
                <span>Vegetarian ({counts.veg})</span>
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  dietaryFilter === 'non-veg' ? 'bg-white text-rose-800 shadow-xs' : 'text-[#5C534B] hover:text-[#231F1E]'
                }`}
              >
                <span className="w-2.5 h-2.5 border border-rose-600 flex items-center justify-center p-0.5 rounded-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                </span>
                <span>Non-Veg (Halal) ({counts.nonVeg})</span>
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter('signature')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  dietaryFilter === 'signature' ? 'bg-white text-[#8C3A27] shadow-xs' : 'text-[#5C534B] hover:text-[#231F1E]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#8C3A27]" />
                <span>Signatures ({counts.signatures})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#7D736A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dish, spice, berry, akuri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E5DFD7] rounded-xl text-[#231F1E] placeholder:text-[#9E948A] focus:outline-none focus:ring-1 focus:ring-[#8C3A27] focus:border-[#8C3A27] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7D736A] hover:text-[#231F1E]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results summary bar if filtered */}
        {(selectedCategory !== 'all' || dietaryFilter !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-[#7D736A] pb-4 mb-6 border-b border-[#E5DFD7]">
            <span>
              Showing <strong className="text-[#231F1E]">{filteredItems.length}</strong> delicacies
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="text-[#8C3A27] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Menu Items Grid: 2 columns on desktop, 1 on mobile */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const qtyInTasting = tastingItems[item.id] || 0;

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-xl p-5 sm:p-6 border border-[#E5DFD7] hover:border-[#C4B9AC] transition-all hover:shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Dietary Symbol & Price */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        {/* FSSAI Standard Veg / Non-Veg Indicator */}
                        <span
                          className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-2xs ${
                            item.dietary === 'veg' ? 'border-emerald-600' : 'border-rose-600'
                          }`}
                          title={item.dietary === 'veg' ? 'Vegetarian' : 'Non-Vegetarian (100% Halal)'}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          />
                        </span>

                        {item.isSignature && (
                          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C3A27]">
                            House Signature
                          </span>
                        )}

                        {item.isHalal && item.dietary === 'non-veg' && (
                          <span className="text-[10px] text-[#7D736A] font-medium">
                            · Halal
                          </span>
                        )}
                      </div>

                      {/* Tabular Price */}
                      <span className="font-mono text-base font-semibold text-[#1E1A19] tabular-nums">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Dish Title & Authentic Parsi Subtitle */}
                    <div className="mb-2">
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#231F1E] group-hover:text-[#8C3A27] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {item.parsiName && (
                        <p className="text-xs text-[#8C3A27] font-medium tracking-wide">
                          {item.parsiName}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>

                    {/* Metadata line: Serves, spice level, ingredients preview */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#7D736A] mb-4">
                      <span>Serves: {item.serves}</span>
                      {item.spiceLevel > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-0.5 text-amber-800">
                            <Flame className="w-3 h-3 text-amber-700" />
                            {item.spiceLevel === 1 ? 'Mild' : item.spiceLevel === 2 ? 'Medium' : 'Fiery'} Spice
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(item)}
                      className="text-xs font-medium text-[#7D736A] hover:text-[#231F1E] inline-flex items-center gap-1 py-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details & Pairings</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {qtyInTasting > 0 ? (
                        <div className="flex items-center bg-[#EFE9DF] rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onRemoveFromTasting(item.id)}
                            className="px-2 py-1 text-xs font-bold text-[#231F1E] hover:text-[#8C3A27]"
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-semibold text-[#231F1E]">
                            {qtyInTasting}
                          </span>
                          <button
                            type="button"
                            onClick={() => onAddToTasting(item)}
                            className="px-2 py-1 text-xs font-bold text-[#231F1E] hover:text-[#8C3A27]"
                            title="Add one more"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAddToTasting(item)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#231F1E] hover:text-[#8C3A27] bg-[#FAF8F5] hover:bg-[#EFE9DF] border border-[#E5DFD7] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Table Plan</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E5DFD7] p-8 max-w-md mx-auto">
            <UtensilsCrossed className="w-8 h-8 text-[#9E948A] mx-auto mb-3" />
            <h4 className="font-serif text-lg text-[#231F1E]">No delicacies matched your search</h4>
            <p className="text-xs text-[#5C534B] mt-1 mb-4">
              Try searching for &quot;Dhansak&quot;, &quot;Akuri&quot;, &quot;Pulao&quot;, or reset your active filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#8C3A27] rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Tasting Table Floating Summary Bar (if items added) */}
        {totalTastingCount > 0 && (
          <div className="sticky bottom-6 z-30 mt-8 max-w-2xl mx-auto bg-[#231F1E] text-white p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 border border-[#4D453E] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#8C3A27] flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Table Selection: {totalTastingCount} {totalTastingCount === 1 ? 'dish' : 'dishes'}
                </p>
                <p className="text-[11px] text-[#A89D91]">
                  Attach your planned delicacies directly to your reservation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const itemsList = Object.entries(tastingItems)
                    .map(([id, qty]) => {
                      const found = MENU_ITEMS.find((m) => m.id === id);
                      return found ? `${found.name} (x${qty})` : null;
                    })
                    .filter(Boolean) as string[];

                  if (onOpenReservationWithItems) {
                    onOpenReservationWithItems(itemsList);
                  }
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#8C3A27] hover:bg-[#732F1F] rounded-lg cursor-pointer transition-colors shadow-xs whitespace-nowrap"
              >
                Proceed to Reservation →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dish Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-lg w-full border border-[#E5DFD7] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-2xs ${
                        activeModalItem.dietary === 'veg' ? 'border-emerald-600' : 'border-rose-600'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeModalItem.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      />
                    </span>
                    <span className="text-[11px] font-semibold text-[#8C3A27] uppercase tracking-wider">
                      {activeModalItem.category.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#231F1E]">
                    {activeModalItem.name}
                  </h3>
                  {activeModalItem.parsiName && (
                    <p className="text-xs text-[#8C3A27] font-medium">{activeModalItem.parsiName}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#231F1E] hover:bg-[#EFE9DF] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="my-4 text-base font-mono font-semibold text-[#231F1E]">
                ₹{activeModalItem.price} <span className="text-xs font-sans text-[#7D736A] font-normal">· {activeModalItem.serves}</span>
              </div>

              <p className="text-sm text-[#5C534B] leading-relaxed mb-5">
                {activeModalItem.description}
              </p>

              {activeModalItem.history && (
                <div className="bg-[#EFE9DF]/80 rounded-xl p-3.5 mb-4 border border-[#E5DFD7]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C3A27] block mb-1">
                    Heritage & Tradition
                  </span>
                  <p className="text-xs text-[#4D453E] leading-relaxed">
                    {activeModalItem.history}
                  </p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-xs font-semibold text-[#231F1E] block mb-1.5">
                    Ingredients & Craft
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalItem.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2.5 py-1 text-xs bg-white border border-[#E5DFD7] text-[#4D453E] rounded-md"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {activeModalItem.pairingNotes && (
                  <div>
                    <span className="text-xs font-semibold text-[#231F1E] block mb-1">
                      Recommended Pairing
                    </span>
                    <p className="text-xs text-[#5C534B] italic">
                      {activeModalItem.pairingNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5DFD7]">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#5C534B] hover:text-[#231F1E]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAddToTasting(activeModalItem);
                    setActiveModalItem(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#8C3A27] hover:bg-[#732F1F] rounded-lg cursor-pointer"
                >
                  Add to Table Selection (₹{activeModalItem.price})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
