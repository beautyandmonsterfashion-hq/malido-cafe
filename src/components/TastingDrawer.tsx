import React from 'react';
import { X, Trash2, CalendarCheck, UtensilsCrossed, Plus, Minus } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/cafeData';

interface TastingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tastingItems: { [id: string]: number };
  onUpdateQty: (id: string, delta: number) => void;
  onClear: () => void;
  onProceedToReservation: (itemNames: string[]) => void;
}

export const TastingDrawer: React.FC<TastingDrawerProps> = ({
  isOpen,
  onClose,
  tastingItems,
  onUpdateQty,
  onClear,
  onProceedToReservation,
}) => {
  if (!isOpen) return null;

  const selectedList = Object.entries(tastingItems)
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      return item ? { item, qty } : null;
    })
    .filter(Boolean) as { item: MenuItem; qty: number }[];

  const totalPrice = selectedList.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  const handleProceed = () => {
    const formatted = selectedList.map((entry) => `${entry.item.name} (x${entry.qty})`);
    onProceedToReservation(formatted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E5DFD7] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E5DFD7] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8C3A27] text-white flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                  Your Table Tasting Plan
                </h3>
                <p className="text-[11px] text-[#7D736A]">
                  Pre-select culinary wishes for your dine-in visit
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#231F1E] hover:bg-[#EFE9DF]"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {selectedList.length > 0 ? (
              <>
                <div className="flex items-center justify-between text-xs text-[#7D736A] pb-2 border-b border-[#E5DFD7]">
                  <span>{selectedList.length} unique delicacies</span>
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-[#8C3A27] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear all</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedList.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="bg-white p-3.5 rounded-xl border border-[#E5DFD7] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={`w-2.5 h-2.5 border flex items-center justify-center p-0.5 rounded-2xs ${
                              item.dietary === 'veg' ? 'border-emerald-600' : 'border-rose-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            />
                          </span>
                          <span className="text-xs font-semibold text-[#231F1E] truncate">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7D736A]">
                          ₹{item.price} each · <span className="font-mono text-[#231F1E] font-semibold">₹{item.price * qty}</span>
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="p-1 hover:text-[#8C3A27] text-[#5C534B]"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-[#231F1E]">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="p-1 hover:text-[#8C3A27] text-[#5C534B]"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs text-[#5C534B] space-y-1">
                  <p className="font-semibold text-[#231F1E]">Kitchen Note:</p>
                  <p>
                    These items are attached to your reservation request so our culinary team can ensure fresh availability upon your arrival. Payment is settled at the cafe.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <UtensilsCrossed className="w-10 h-10 text-[#C4B9AC] mx-auto mb-3" />
                <h4 className="font-serif text-lg text-[#231F1E]">Your table plan is empty</h4>
                <p className="text-xs text-[#5C534B] mt-1 max-w-xs mx-auto">
                  Explore our menu and click &ldquo;Add to Table Plan&rdquo; to plan your courses ahead of time.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {selectedList.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E5DFD7] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7D736A]">Estimated Tasting Total</span>
                <span className="font-mono text-lg font-bold text-[#1E1A19]">₹{totalPrice}</span>
              </div>

              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#8C3A27] hover:bg-[#732F1F] rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Attach to Table Reservation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
