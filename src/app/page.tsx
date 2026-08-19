"use client";

import { useEffect, useRef, useState } from "react";
import ReservationModal from "@/components/ReservationModal";
import Image from "next/image";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    // Ember particles effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.6 + 0.2,
      drift: Math.random() * 0.4 - 0.2,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let animationId: number;

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,148,79,${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      io.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-bg-dark text-cream selection:bg-copper selection:text-bg-dark">
      <canvas id="embers" ref={canvasRef}></canvas>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/60 backdrop-blur-2xl border-b border-white/[0.03] transition-all">
        <nav className="flex items-center justify-between px-8 py-6 mx-auto max-w-7xl md:px-12">
          <div className="text-2xl italic font-serif text-cream sm:text-3xl tracking-wide">
            Ember <span className="text-copper-bright">&</span> Ash
          </div>
          <ul className="hidden gap-12 text-xs font-semibold tracking-[0.15em] uppercase md:flex text-cream/70">
            <li><a href="#menu" className="transition duration-300 hover:text-copper-bright">Menu</a></li>
            <li><a href="#kitchen" className="transition duration-300 hover:text-copper-bright">Kitchen</a></li>
            <li><a href="#gallery" className="transition duration-300 hover:text-copper-bright">Gallery</a></li>
          </ul>
          <button
            className="px-6 py-3.5 text-xs font-bold tracking-[0.15em] text-bg-dark uppercase transition duration-300 bg-copper hover:bg-copper-bright sm:px-8 hover:shadow-lg hover:shadow-copper/20"
            onClick={() => setIsModalOpen(true)}
          >
            Reserve
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center min-h-[100svh] px-8 py-32 mx-auto max-w-7xl md:px-12 z-10">
        <div className="mb-8 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright animate-fadeUp opacity-0" style={{ animationDelay: '0s' }}>
          Wood-Fired Kitchen — New Delhi
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[150px] leading-[0.85] font-serif max-w-5xl tracking-tight animate-fadeUp opacity-0" style={{ animationDelay: '0.1s' }}>
          Everything<br />touches <em className="italic text-copper-bright">fire</em>.
        </h1>
        <div className="flex flex-col items-start justify-between gap-10 mt-16 md:flex-row md:items-end animate-fadeUp opacity-0" style={{ animationDelay: '0.3s' }}>
          <p className="max-w-md text-base leading-relaxed sm:text-lg text-muted/90 font-light">
            No gas burners, no microwaves. Every plate that leaves this kitchen has spent time over the same wood-fired hearth — from the bread to the dessert.
          </p>
          <button
            className="px-8 py-4.5 text-xs font-bold tracking-[0.15em] text-bg-dark uppercase transition duration-300 bg-copper hover:bg-copper-bright w-full md:w-auto hover:shadow-lg hover:shadow-copper/20"
            onClick={() => setIsModalOpen(true)}
          >
            Reserve a Table
          </button>
        </div>
        <div className="absolute flex items-center gap-4 text-xs tracking-[0.2em] uppercase bottom-12 left-8 md:left-12 text-muted">
          Scroll
          <div className="w-[1px] h-12 bg-gradient-to-b from-copper-bright/50 to-transparent animate-pulse-line"></div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="relative z-10 py-8 overflow-hidden border-y border-white/[0.03] bg-bg-darker/50">
        <div className="inline-flex gap-16 whitespace-nowrap animate-scroll">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-16 text-lg italic sm:text-xl font-serif text-muted/70">
              <span>Hearth-Roasted <b className="not-italic font-normal text-copper-bright/90">Nightly</b></span><span className="text-white/10">·</span>
              <span>Open-Fire <b className="not-italic font-normal text-copper-bright/90">Since 2021</b></span><span className="text-white/10">·</span>
              <span>Seasonal <b className="not-italic font-normal text-copper-bright/90">Menu, Weekly</b></span><span className="text-white/10">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <section className="relative z-10 px-8 py-40 mx-auto max-w-4xl md:px-12" id="menu">
        <div className="mb-24 text-center reveal">
          <div className="mb-6 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright">This Week's Fire</div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight">The Menu</h2>
        </div>
        
        <div className="relative reveal">
          <div className="space-y-20">
            <div>
              <h3 className="mb-10 text-3xl italic font-serif text-copper-bright border-b border-white/[0.03] pb-4">To Start</h3>
              <div className="space-y-8">
                <div className="flex items-baseline justify-between gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-xl text-cream/90 group-hover:text-cream transition-colors">Charred Bread & Cultured Butter</div>
                    <div className="mt-2 text-sm italic text-muted font-light">Hearth-baked sourdough, smoked salt</div>
                  </div>
                  <div className="text-2xl font-serif text-copper/80 shrink-0">₹320</div>
                </div>
                <div className="flex items-baseline justify-between gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-xl text-cream/90 group-hover:text-cream transition-colors">Ember-Roasted Beets</div>
                    <div className="mt-2 text-sm italic text-muted font-light">Whipped goat cheese, charred citrus</div>
                  </div>
                  <div className="text-2xl font-serif text-copper/80 shrink-0">₹460</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-10 text-3xl italic font-serif text-copper-bright border-b border-white/[0.03] pb-4">From the Hearth</h3>
              <div className="space-y-8">
                <div className="flex items-baseline justify-between gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-xl text-cream/90 group-hover:text-cream transition-colors">Whole Fire-Roasted Chicken</div>
                    <div className="mt-2 text-sm italic text-muted font-light">Wood-fired 90 minutes, pan jus, charred lemon</div>
                  </div>
                  <div className="text-2xl font-serif text-copper/80 shrink-0">₹980</div>
                </div>
                <div className="flex items-baseline justify-between gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-xl text-cream/90 group-hover:text-cream transition-colors">Dry-Aged Ribeye</div>
                    <div className="mt-2 text-sm italic text-muted font-light">28-day aged, bone marrow butter</div>
                  </div>
                  <div className="text-2xl font-serif text-copper/80 shrink-0">₹2,150</div>
                </div>
                <div className="flex items-baseline justify-between gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-xl text-cream/90 group-hover:text-cream transition-colors">Charred Cauliflower Steak</div>
                    <div className="mt-2 text-sm italic text-muted font-light">Smoked almond romesco, herb oil</div>
                  </div>
                  <div className="text-2xl font-serif text-copper/80 shrink-0">₹720</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-10 text-3xl italic font-serif text-copper-bright border-b border-white/[0.03] pb-4">To Finish</h3>
              <div className="space-y-8">
                <div className="flex items-baseline justify-between gap-6 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-xl text-cream/90 group-hover:text-cream transition-colors">Fire-Toasted Basque Cheesecake</div>
                    <div className="mt-2 text-sm italic text-muted font-light">Burnt top, salted caramel</div>
                  </div>
                  <div className="text-2xl font-serif text-copper/80 shrink-0">₹420</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 px-8 py-32 mx-auto max-w-7xl md:px-12 lg:py-40 border-t border-white/[0.03]" id="kitchen">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative overflow-hidden aspect-[3/4] reveal group rounded-sm">
            <Image 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80" 
              alt="Wood fire kitchen" 
              fill
              className="object-cover transition duration-1000 saturate-[1.15] contrast-105 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent"></div>
          </div>
          <div className="reveal">
            <div className="mb-6 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright">The Kitchen</div>
            <h2 className="mb-8 text-5xl leading-[1.1] sm:text-6xl md:text-7xl font-serif tracking-tight">One hearth,<br/>three chefs,<br/>zero shortcuts.</h2>
            <p className="mb-12 text-lg leading-relaxed text-muted/90 font-light">
              Our kitchen runs on a single wood-fired hearth that never goes cold. Every dish is timed around it, not around a ticket printer — which means some nights the menu moves slower than others. We're fine with that.
            </p>
            <div className="flex flex-wrap gap-10 sm:gap-16">
              <div>
                <b className="block text-5xl italic font-serif sm:text-6xl text-copper-bright mb-3">480°</b>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-semibold">Peak Hearth Temp</span>
              </div>
              <div>
                <b className="block text-5xl italic font-serif sm:text-6xl text-copper-bright mb-3">4</b>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-semibold">Years Burning</span>
              </div>
              <div>
                <b className="block text-5xl italic font-serif sm:text-6xl text-copper-bright mb-3">0</b>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-semibold">Gas Burners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 px-8 py-32 mx-auto max-w-7xl md:px-12 lg:py-40" id="gallery">
        <div className="mb-16 text-left reveal">
          <div className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright">On the Pass</div>
          <h2 className="text-5xl sm:text-6xl font-serif tracking-tight">From the Kitchen</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 h-auto lg:h-[480px] reveal">
          {[
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
          ].map((src, idx) => (
            <div key={idx} className="relative overflow-hidden group aspect-[4/5] lg:aspect-auto cursor-pointer rounded-sm">
              <Image 
                src={src} 
                alt={`Kitchen ${idx + 1}`} 
                fill
                className="object-cover transition duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 py-32 text-center bg-copper text-bg-dark lg:py-40">
        <h2 className="mb-12 text-6xl leading-[1.1] sm:text-7xl md:text-8xl font-serif tracking-tight">The hearth is lit<br className="hidden sm:block" /> every night.</h2>
        <button 
          className="px-12 py-5 text-xs font-bold tracking-[0.2em] text-cream uppercase transition-all duration-300 bg-bg-dark hover:bg-bg-darker hover:-translate-y-1 shadow-2xl hover:shadow-black/50"
          onClick={() => setIsModalOpen(true)}
        >
          Reserve Your Table
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-20 mx-auto max-w-7xl md:px-12 lg:py-24">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-20">
          <div>
            <h4 className="mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted">Ember & Ash</h4>
            <p className="text-sm leading-relaxed text-cream/70 font-light">18 Shahpur Jat<br />New Delhi, 110049</p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted">Service</h4>
            <p className="mb-3 text-sm text-cream/70 font-light">Dinner: 7pm – 12am</p>
            <p className="text-sm text-cream/70 font-light">Closed Tuesdays</p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted">Contact</h4>
            <a href="#" className="block mb-3 text-sm transition text-cream/70 hover:text-copper-bright font-light">+91 98100 22345</a>
            <a href="#" className="block text-sm transition text-cream/70 hover:text-copper-bright font-light">table@emberandash.in</a>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted">Follow</h4>
            <a href="#" className="block mb-3 text-sm transition text-cream/70 hover:text-copper-bright font-light">Instagram</a>
            <a href="#" className="block text-sm transition text-cream/70 hover:text-copper-bright font-light">Zomato</a>
          </div>
        </div>
      </footer>

      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
