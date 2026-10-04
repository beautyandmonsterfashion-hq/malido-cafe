import React, { useState, useRef, useEffect } from 'react';
import { Disc3, Volume2, VolumeX, Sparkles, HeartHandshake, History, Music } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const StorySection: React.FC = () => {
  const [isPlayingVinyl, setIsPlayingVinyl] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Web Audio vinyl crackle & warm chord simulator (completely self-contained, no external files)
  const toggleVinylSound = () => {
    if (isPlayingVinyl) {
      // Stop
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingVinyl(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm ambient hum (analog tape/vinyl hum 50Hz with harmonics)
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 note
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        // Warm fifth harmony (164.8Hz - E3)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(164.81, ctx.currentTime);
        const oscGain2 = ctx.createGain();
        oscGain2.gain.setValueAtTime(0.02, ctx.currentTime);
        osc2.connect(oscGain2);
        oscGain2.connect(masterGain);
        osc2.start();

        // Periodic vinyl crackle bursts
        const crackleTimer = window.setInterval(() => {
          if (!audioCtxRef.current) return;
          const popCtx = audioCtxRef.current;
          const bufferSize = popCtx.sampleRate * 0.03;
          const buffer = popCtx.createBuffer(1, bufferSize, popCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (popCtx.sampleRate * 0.005));
          }
          const noise = popCtx.createBufferSource();
          noise.buffer = buffer;
          const filter = popCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 2200;
          filter.Q.value = 3;

          const popGain = popCtx.createGain();
          popGain.gain.setValueAtTime(0.03 + Math.random() * 0.05, popCtx.currentTime);

          noise.connect(filter);
          filter.connect(popGain);
          popGain.connect(masterGain);
          noise.start();
        }, 320);

        intervalRef.current = crackleTimer;
        setIsPlayingVinyl(true);
      } catch (e) {
        console.error('Audio not supported:', e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <section id="story" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Heritage Story */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3A27]">
                The Story Behind the Door
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231F1E] font-medium mt-2 leading-tight">
                Born in Kala Ghoda, Rooted in 100 Years of Parsi Heritage
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#5C534B] leading-relaxed">
              <p>
                Founded in 2023 by mother-son duo <strong>Kermeen and Neville Bose</strong>, Malido was conceived as an unhurried haven away from the kinetic rush of South Mumbai. Neville is the grand-nephew of the iconic Indian freedom luminary <strong>Netaji Subhash Chandra Bose</strong>, carrying forward a family lineage steeped in culture, literature, and hospitality.
              </p>
              <p>
                The cafe takes its name from <em>Malido</em>—the revered Parsi celebration pudding made by slow-roasting golden semolina in pure cow ghee with saffron, cardamom, and toasted nuts. Originating from the Pashto word for &ldquo;finely crushed&rdquo;, Malido has for centuries symbolized abundance, warmth, and heartfelt welcome at Parsi family gatherings.
              </p>
              <p>
                In 2025, we expanded our soul with the <strong>Apéro Bar</strong>, celebrating the analog art of the pre-dinner cocktail and evening unwind. Surrounded by vintage vinyl records, curated photography, and the gentle chime of vintage glassware, Malido is where old Bombay and modern Kala Ghoda hold hands.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5DFD7]">
              <div>
                <span className="text-xs font-semibold text-[#8C3A27] uppercase tracking-wider block mb-1">
                  The Kitchen
                </span>
                <p className="text-xs text-[#5C534B]">
                  Hand-pounded Kolah vinegars, fresh grated coconuts, and recipes guarded across four generations.
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#8C3A27] uppercase tracking-wider block mb-1">
                  The Coffee & Bar
                </span>
                <p className="text-xs text-[#5C534B]">
                  Single-estate Chikmagalur beans, botanical spritzes, and classic Negronis.
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#8C3A27] uppercase tracking-wider block mb-1">
                  The Turntable
                </span>
                <p className="text-xs text-[#5C534B]">
                  Analogue vinyl sessions, rare jazz pressings, and acoustic songwriter gatherings.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Vinyl Soundscape Card & Vintage Quote */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Analog Vinyl Player Experience */}
            <div className="bg-white rounded-2xl border border-[#E5DFD7] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Disc3 className={`w-5 h-5 text-[#8C3A27] ${isPlayingVinyl ? 'animate-spin' : ''}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#231F1E]">
                    The Malido Soundscape
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7D736A]">
                  Kala Ghoda Analog
                </span>
              </div>

              {/* Vinyl Art Simulation */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#1E1A19] flex items-center justify-center border border-[#3E3834] mb-4">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div
                    className={`w-24 h-24 rounded-full border-4 border-[#3D352E] bg-[#141211] flex items-center justify-center relative shadow-inner transition-transform duration-1000 ${
                      isPlayingVinyl ? 'rotate-180 animate-spin' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#8C3A27] flex items-center justify-center text-[8px] text-white font-mono font-bold tracking-tighter">
                      MALIDO
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 font-serif mt-3">
                    {isPlayingVinyl ? 'Now spinning: Analog warmth & crackle' : 'Vinyl turntable on standby'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-xs text-[#5C534B]">
                  <p className="font-medium text-[#231F1E]">Experience Cafe Acoustics</p>
                  <p className="text-[11px] text-[#7D736A]">Analog needle drop & room hum</p>
                </div>

                <button
                  type="button"
                  onClick={toggleVinylSound}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 ${
                    isPlayingVinyl
                      ? 'bg-[#8C3A27] text-white shadow-xs'
                      : 'bg-[#EFE9DF] text-[#231F1E] hover:bg-[#E5DFD7]'
                  }`}
                >
                  {isPlayingVinyl ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#8C3A27]" />
                      <span>Play Analog Mood</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Founder Note Block */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E5DFD7] relative">
              <span className="font-serif text-4xl text-[#8C3A27]/20 absolute top-2 right-4 select-none">&ldquo;</span>
              <p className="font-serif italic text-base text-[#231F1E] leading-relaxed mb-3">
                &ldquo;We wanted a room where time stretches. Where you can come at eight in the morning for crisp Brun Pav and warm fig jam, and stay till eleven at night sipping an Apéro Spritz while the vinyl turns.&rdquo;
              </p>
              <div className="text-xs text-[#7D736A] font-medium">
                — Kermeen & Neville Bose, <span className="text-[#231F1E]">Proprietors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
