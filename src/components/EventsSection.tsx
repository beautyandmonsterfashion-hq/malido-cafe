import React from 'react';
import { Disc3, Calendar, Clock, Music, Users, ArrowRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/cafeData';

interface EventsSectionProps {
  onSelectEvent: (eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  return (
    <section id="events" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A27]">
              Culture & Sound
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231F1E] font-medium mt-2">
              Analog Evenings & Curated Gatherings
            </h2>
            <p className="text-sm sm:text-base text-[#5C534B] mt-2 max-w-xl">
              We reject algorithmic playlists. Join us for vinyl listening sessions, acoustic songwriter sets, and Sunday family tables.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFE9DF] text-[#8C3A27] rounded-lg text-xs font-semibold">
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              Turntable Active Weekly
            </span>
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EVENTS_DATA.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DFD7] hover:border-[#8C3A27]/40 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#7D736A] font-medium mb-3">
                  <span className="flex items-center gap-1.5 text-[#8C3A27] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {evt.schedule}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#231F1E] group-hover:text-[#8C3A27] transition-colors leading-snug mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs font-medium text-[#7D736A] mb-3">
                  {evt.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed mb-6">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#7D736A]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8C3A27]" />
                    {evt.timeSlot}
                  </span>
                  <span>Curated by {evt.curator.split('&')[0]}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectEvent(evt.title)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-[#231F1E] hover:text-white bg-[#FAF8F5] hover:bg-[#8C3A27] border border-[#E5DFD7] hover:border-[#8C3A27] rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-2 group-hover:bg-[#8C3A27] group-hover:text-white group-hover:border-[#8C3A27]"
                >
                  <span>Reserve Table for this Evening</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
