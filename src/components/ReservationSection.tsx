import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Share2,
  CalendarPlus,
  Phone,
  Disc3,
  Coffee,
  Sun,
  Wine,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { CAFE_INFO, SEATING_ZONES } from '../data/cafeData';

interface ReservationSectionProps {
  initialDishes?: string[];
}

export interface ReservationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  mealType: string;
  guests: number;
  seatingZone: string;
  occasion: string;
  specialRequests: string;
  attachedDishes: string[];
  createdAt: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  initialDishes = [],
}) => {
  // Today's date in YYYY-MM-DD format
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [mealType, setMealType] = useState<string>('dinner');
  const [timeSlot, setTimeSlot] = useState<string>('8:00 PM');
  const [guests, setGuests] = useState<number>(2);
  const [seatingZone, setSeatingZone] = useState<string>('vinyl-lounge');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [attachedDishes, setAttachedDishes] = useState<string[]>(initialDishes);

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Sync initialDishes if prop updates
  React.useEffect(() => {
    if (initialDishes.length > 0) {
      setAttachedDishes(initialDishes);
    }
  }, [initialDishes]);

  const mealSlots: { [key: string]: { label: string; slots: string[] } } = {
    breakfast: {
      label: 'Morning Breakfast & Irani Chai (8:00 AM – 11:30 AM)',
      slots: ['8:30 AM', '9:30 AM', '10:30 AM', '11:00 AM'],
    },
    lunch: {
      label: 'Parsi Heritage Lunch (12:00 PM – 3:30 PM)',
      slots: ['12:30 PM', '1:15 PM', '2:00 PM', '2:45 PM'],
    },
    hightea: {
      label: 'Afternoon Tea & Single-Origin Coffee (3:30 PM – 6:30 PM)',
      slots: ['4:00 PM', '4:45 PM', '5:30 PM', '6:00 PM'],
    },
    dinner: {
      label: 'Evening Apéro & Heritage Dinner (7:00 PM – 11:30 PM)',
      slots: ['7:15 PM', '8:00 PM', '8:45 PM', '9:30 PM', '10:15 PM'],
    },
  };

  const handleMealChange = (type: string) => {
    setMealType(type);
    setTimeSlot(mealSlots[type].slots[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please provide a valid contact number for confirmation');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant reservation confirmation
    setTimeout(() => {
      const generatedId = `MLD-${Math.floor(1000 + Math.random() * 9000)}`;
      const reservation: ReservationData = {
        id: generatedId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        timeSlot,
        mealType: mealSlots[mealType].label.split('(')[0].trim(),
        guests,
        seatingZone:
          SEATING_ZONES.find((z) => z.id === seatingZone)?.name || 'Heritage Teak Hall',
        occasion,
        specialRequests: specialRequests.trim(),
        attachedDishes,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConfirmedReservation(reservation);
      setIsSubmitting(false);
    }, 600);
  };

  // Generate iCalendar file for reservation
  const handleDownloadCalendar = () => {
    if (!confirmedReservation) return;

    const [year, month, day] = confirmedReservation.date.split('-');
    const eventTitle = `Dinner / Dine-in at Malido Cafe & Apéro (${confirmedReservation.seatingZone})`;
    const eventDescription = `Reservation for ${confirmedReservation.guests} guests at Malido Cafe & Apéro, Kala Ghoda. Booking ID: ${confirmedReservation.id}. Phone: +91 98200 48219`;
    const eventLocation = `Malido Cafe & Apero, Kala Ghoda, Fort, Mumbai (Google Maps: ${CAFE_INFO.googleMapsUrl})`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Malido Cafe//Reservation Pass//EN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Malido-Reservation-${confirmedReservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    if (!confirmedReservation) return;
    const text = `Hi! Here are our reservation details for Malido Cafe & Apéro (Kala Ghoda, Mumbai):
Booking ID: ${confirmedReservation.id}
Date: ${confirmedReservation.date} at ${confirmedReservation.timeSlot}
Guests: ${confirmedReservation.guests}
Seating Zone: ${confirmedReservation.seatingZone}
Address: Ropewalk Lane, Kala Ghoda, Mumbai
Google Maps: ${CAFE_INFO.googleMapsUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reservations" className="py-16 lg:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context, Policies & Atmosphere */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A27]">
                Intimate 40-Seater Space
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#231F1E] font-medium mt-2">
                Reserve Your Table
              </h2>
              <p className="text-sm text-[#5C534B] leading-relaxed mt-3">
                Due to our cozy 40-seat footprint in the heart of Kala Ghoda, we hold reservations for 15 minutes. Walk-ins are always welcomed subject to availability.
              </p>
            </div>

            {/* Seating Zones Visual Explanation */}
            <div className="bg-white rounded-xl p-5 border border-[#E5DFD7] space-y-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C3A27] block">
                Choose Your Atmosphere
              </span>
              <div className="space-y-3">
                {SEATING_ZONES.map((zone) => {
                  const isSelected = seatingZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => setSeatingZone(zone.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8C3A27] bg-[#FAF8F5]'
                          : 'border-[#E5DFD7] hover:border-[#C4B9AC]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#231F1E] flex items-center gap-2">
                          {zone.id === 'vinyl-lounge' && <Disc3 className="w-3.5 h-3.5 text-[#8C3A27]" />}
                          {zone.id === 'heritage-hall' && <Coffee className="w-3.5 h-3.5 text-[#8C3A27]" />}
                          {zone.id === 'window-nook' && <Sun className="w-3.5 h-3.5 text-[#8C3A27]" />}
                          {zone.id === 'apero-bar' && <Wine className="w-3.5 h-3.5 text-[#8C3A27]" />}
                          {zone.name}
                        </span>
                        <span className="text-[10px] text-[#7D736A] font-mono">{zone.capacity}</span>
                      </div>
                      <p className="text-xs text-[#5C534B] leading-normal">{zone.vibe}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Hospitality Policies */}
            <div className="p-4 bg-[#EFE9DF]/70 rounded-xl border border-[#E5DFD7] space-y-2 text-xs text-[#4D453E]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C3A27] shrink-0 mt-0.5" />
                <span>
                  <strong>Dietary Hygiene:</strong> All chicken and mutton are 100% Halal certified. Separate cookware is dedicated to vegetarian preparations.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8C3A27] shrink-0 mt-0.5" />
                <span>
                  <strong>Grace Period:</strong> We hold tables for 15 minutes past your booking time before releasing to waiting guests.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form OR Confirmation Card */}
          <div className="lg:col-span-7">
            {confirmedReservation ? (
              <div className="bg-white rounded-2xl border border-[#8C3A27]/30 p-6 sm:p-8 shadow-xl animate-in zoom-in-95 duration-300">
                {/* Confirmation Header */}
                <div className="text-center pb-6 border-b border-[#E5DFD7]">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#8C3A27] font-semibold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#231F1E] font-semibold mt-1">
                    We Look Forward to Welcoming You
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] border border-[#E5DFD7] rounded-md font-mono text-xs text-[#231F1E]">
                    <span>Reference ID:</span>
                    <strong className="text-[#8C3A27]">{confirmedReservation.id}</strong>
                  </div>
                </div>

                {/* Reservation Summary Details */}
                <div className="py-6 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#F0EAE1]">
                    <div>
                      <span className="text-[#7D736A] block text-xs">Guest Name</span>
                      <strong className="text-[#231F1E]">{confirmedReservation.name}</strong>
                    </div>
                    <div>
                      <span className="text-[#7D736A] block text-xs">Party Size</span>
                      <strong className="text-[#231F1E]">
                        {confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#7D736A] block text-xs">Date & Time</span>
                      <strong className="text-[#231F1E]">
                        {confirmedReservation.date} at {confirmedReservation.timeSlot}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#7D736A] block text-xs">Seating Zone</span>
                      <strong className="text-[#231F1E]">{confirmedReservation.seatingZone}</strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-[#5C534B]">
                    <p>
                      <strong>Phone:</strong> {confirmedReservation.phone}
                    </p>
                    {confirmedReservation.email && (
                      <p>
                        <strong>Email:</strong> {confirmedReservation.email}
                      </p>
                    )}
                    <p>
                      <strong>Occasion:</strong> {confirmedReservation.occasion}
                    </p>
                    {confirmedReservation.specialRequests && (
                      <p>
                        <strong>Special Note:</strong> {confirmedReservation.specialRequests}
                      </p>
                    )}
                  </div>

                  {confirmedReservation.attachedDishes.length > 0 && (
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
                      <span className="text-xs font-semibold text-[#8C3A27] block mb-1">
                        Pre-Selected Tasting Wishes:
                      </span>
                      <ul className="list-disc list-inside text-xs text-[#4D453E] space-y-0.5">
                        {confirmedReservation.attachedDishes.map((dish, i) => (
                          <li key={i}>{dish}</li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-[#7D736A] mt-1">
                        Our kitchen team has received your dish preferences.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions: Add to Calendar, Share to WhatsApp, Modify */}
                <div className="pt-4 border-t border-[#E5DFD7] flex flex-wrap items-center gap-3 justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadCalendar}
                      className="px-3.5 py-2 text-xs font-semibold text-[#231F1E] bg-[#EFE9DF] hover:bg-[#E5DFD7] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-[#8C3A27]" />
                      <span>Add to Calendar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Share Details</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedReservation(null);
                      setAttachedDishes([]);
                    }}
                    className="text-xs text-[#7D736A] hover:text-[#231F1E] underline cursor-pointer"
                  >
                    Make another booking
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#E5DFD7] p-6 sm:p-8 shadow-sm space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#231F1E] font-medium">
                    Table Booking Form
                  </h3>
                  <p className="text-xs text-[#5C534B] mt-1">
                    Instant confirmation. No booking fee required.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Pre-attached tasting wishes preview if any */}
                {attachedDishes.length > 0 && (
                  <div className="p-3 bg-[#FAF8F5] border border-[#8C3A27]/20 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#8C3A27]">
                        {attachedDishes.length} delicacies attached from menu
                      </span>
                      <p className="text-[11px] text-[#7D736A]">
                        {attachedDishes.slice(0, 2).join(', ')}
                        {attachedDishes.length > 2 ? ` and ${attachedDishes.length - 2} more` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedDishes([])}
                      className="text-[11px] text-[#7D736A] hover:text-rose-600 underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Row 1: Date & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D453E] mb-1.5">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={todayStr}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg text-[#231F1E] focus:outline-none focus:ring-1 focus:ring-[#8C3A27]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D453E] mb-1.5">
                      Party Size
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 6, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`flex-1 py-2 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                            guests === num
                              ? 'bg-[#231F1E] text-white border-[#231F1E]'
                              : 'bg-[#FAF8F5] text-[#4D453E] border-[#E5DFD7] hover:border-[#C4B9AC]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Service Meal & Time Slot */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D453E] mb-1.5">
                    Dining Service
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {Object.keys(mealSlots).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleMealChange(type)}
                        className={`py-2 px-2.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg border transition-all cursor-pointer text-center ${
                          mealType === type
                            ? 'bg-[#8C3A27] text-white border-[#8C3A27]'
                            : 'bg-[#FAF8F5] text-[#5C534B] border-[#E5DFD7] hover:border-[#C4B9AC]'
                        }`}
                      >
                        {type === 'hightea' ? 'High Tea' : type}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mealSlots[mealType].slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                          timeSlot === slot
                            ? 'bg-[#231F1E] text-white border-[#231F1E]'
                            : 'bg-[#FAF8F5] text-[#4D453E] border-[#E5DFD7] hover:border-[#C4B9AC]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 3: Occasion selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D453E] mb-1.5">
                    Occasion / Vibe
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Casual Dining',
                      'Date Night',
                      'Vinyl Listening',
                      'Birthday Celebration',
                      'Business Discussion',
                      'Solo Coffee & Read',
                    ].map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasion(occ)}
                        className={`px-3 py-1 text-xs rounded-md border transition-colors cursor-pointer ${
                          occasion === occ
                            ? 'bg-[#EFE9DF] text-[#8C3A27] border-[#8C3A27] font-medium'
                            : 'bg-white text-[#5C534B] border-[#E5DFD7] hover:border-[#C4B9AC]'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 4: Guest Contact Details */}
                <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4D453E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Neville Bose"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg text-[#231F1E] focus:outline-none focus:ring-1 focus:ring-[#8C3A27]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4D453E] mb-1">
                        Contact / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98200 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg text-[#231F1E] focus:outline-none focus:ring-1 focus:ring-[#8C3A27]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4D453E] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="For calendar invite"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg text-[#231F1E] focus:outline-none focus:ring-1 focus:ring-[#8C3A27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4D453E] mb-1">
                        Special Requests (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. quiet corner, high chair"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg text-[#231F1E] focus:outline-none focus:ring-1 focus:ring-[#8C3A27]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#8C3A27] hover:bg-[#732F1F] active:bg-[#5E2518] rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing Table...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Reservation for {guests} Guests ({timeSlot})</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
