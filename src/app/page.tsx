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
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-bg-dark text-cream">
      <canvas id="embers" ref={canvasRef}></canvas>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/75 backdrop-blur-xl border-b border-white/10">
        <nav className="flex items-center justify-between px-6 py-5 mx-auto max-w-7xl md:px-12">
          <div className="text-2xl italic font-serif text-cream sm:text-3xl">
            Ember <span className="text-copper-bright">&</span> Ash
          </div>
          <ul className="hidden gap-10 text-xs font-semibold tracking-widest uppercase md:flex text-cream/80">
            <li><a href="#menu" className="transition duration-300 hover:text-copper-bright">Menu</a></li>
            <li><a href="#kitchen" className="transition duration-300 hover:text-copper-bright">Kitchen</a></li>
            <li><a href="#gallery" className="transition duration-300 hover:text-copper-bright">Gallery</a></li>
          </ul>
          <button
            className="px-5 py-3 text-xs font-bold tracking-widest text-bg-dark uppercase transition duration-300 bg-copper hover:bg-copper-bright sm:px-6"
            onClick={() => setIsModalOpen(true)}
          >
            Reserve a Table
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center min-h-[100svh] px-6 py-32 mx-auto max-w-7xl md:px-12 z-10">
        <div className="mb-6 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright animate-fadeUp opacity-0" style={{ animationDelay: '0s' }}>
          Wood-Fired Kitchen — New Delhi
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[140px] leading-[0.9] font-serif max-w-5xl tracking-tight animate-fadeUp opacity-0" style={{ animationDelay: '0.1s' }}>
          Everything<br />touches <em className="italic text-copper-bright">fire</em>.
        </h1>
        <div className="flex flex-col items-start justify-between gap-8 mt-12 md:flex-row md:items-end animate-fadeUp opacity-0" style={{ animationDelay: '0.3s' }}>
          <p className="max-w-md text-base leading-relaxed sm:text-lg text-muted">
            No gas burners, no microwaves. Every plate that leaves this kitchen has spent time over the same wood-fired hearth — from the bread to the dessert.
          </p>
          <button
            className="px-8 py-4 text-sm font-bold tracking-widest text-bg-dark uppercase transition duration-300 bg-copper hover:bg-copper-bright w-full md:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Reserve a Table
          </button>
        </div>
        <div className="absolute flex items-center gap-3 text-xs tracking-widest uppercase bottom-10 left-6 md:left-12 text-muted">
          Scroll
          <div className="w-[1px] h-10 bg-gradient-to-b from-copper-bright to-transparent animate-pulse-line"></div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="relative z-10 py-6 overflow-hidden border-y border-white/10 bg-bg-dark">
        <div className="inline-flex gap-12 whitespace-nowrap animate-scroll">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 text-lg italic sm:text-xl font-serif text-muted">
              <span>Hearth-Roasted <b className="not-italic font-normal text-copper-bright">Nightly</b></span><span>·</span>
              <span>Open-Fire <b className="not-italic font-normal text-copper-bright">Since 2021</b></span><span>·</span>
              <span>Seasonal <b className="not-italic font-normal text-copper-bright">Menu, Weekly</b></span><span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <section className="relative z-10 px-6 py-32 mx-auto max-w-4xl md:px-12" id="menu">
        <div className="mb-16 text-center reveal">
          <div className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright">This Week's Fire</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif">The Menu</h2>
        </div>
        
        <div className="relative p-8 sm:p-14 border border-white/10 bg-gradient-to-b from-copper/5 to-transparent reveal backdrop-blur-sm">
          {/* Decorative Corner Accents */}
          <div className="absolute top-[-1px] left-[-1px] w-6 h-6 border-t border-l border-copper-bright/50"></div>
          <div className="absolute bottom-[-1px] right-[-1px] w-6 h-6 border-b border-r border-copper-bright/50"></div>

          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-2xl italic font-serif text-copper-bright">To Start</h3>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-dashed border-white/10">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg text-cream truncate text-wrap">Charred Bread & Cultured Butter</div>
                    <div className="mt-1 text-sm italic text-muted">Hearth-baked sourdough, smoked salt</div>
                  </div>
                  <div className="text-xl font-serif text-cream shrink-0">₹320</div>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg text-cream truncate text-wrap">Ember-Roasted Beets</div>
                    <div className="mt-1 text-sm italic text-muted">Whipped goat cheese, charred citrus</div>
                  </div>
                  <div className="text-xl font-serif text-cream shrink-0">₹460</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl italic font-serif text-copper-bright">From the Hearth</h3>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-dashed border-white/10">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg text-cream truncate text-wrap">Whole Fire-Roasted Chicken</div>
                    <div className="mt-1 text-sm italic text-muted">Wood-fired 90 minutes, pan jus, charred lemon</div>
                  </div>
                  <div className="text-xl font-serif text-cream shrink-0">₹980</div>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-dashed border-white/10">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg text-cream truncate text-wrap">Dry-Aged Ribeye</div>
                    <div className="mt-1 text-sm italic text-muted">28-day aged, bone marrow butter</div>
                  </div>
                  <div className="text-xl font-serif text-cream shrink-0">₹2,150</div>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg text-cream truncate text-wrap">Charred Cauliflower Steak</div>
                    <div className="mt-1 text-sm italic text-muted">Smoked almond romesco, herb oil</div>
                  </div>
                  <div className="text-xl font-serif text-cream shrink-0">₹720</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl italic font-serif text-copper-bright">To Finish</h3>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg text-cream truncate text-wrap">Fire-Toasted Basque Cheesecake</div>
                    <div className="mt-1 text-sm italic text-muted">Burnt top, salted caramel</div>
                  </div>
                  <div className="text-xl font-serif text-cream shrink-0">₹420</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 px-6 py-24 mx-auto max-w-7xl md:px-12 lg:py-32" id="kitchen">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative overflow-hidden aspect-[4/5] reveal group">
            <Image 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" 
              alt="Wood fire kitchen" 
              fill
              className="object-cover transition duration-700 saturate-110 contrast-105 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent"></div>
          </div>
          <div className="reveal">
            <div className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright">The Kitchen</div>
            <h2 className="mb-6 text-4xl leading-tight sm:text-5xl md:text-6xl font-serif">One hearth, three chefs, zero shortcuts.</h2>
            <p className="mb-10 text-lg leading-relaxed text-muted">
              Our kitchen runs on a single wood-fired hearth that never goes cold. Every dish is timed around it, not around a ticket printer — which means some nights the menu moves slower than others. We're fine with that.
            </p>
            <div className="flex flex-wrap gap-8 sm:gap-12">
              <div>
                <b className="block text-4xl italic font-serif sm:text-5xl text-copper-bright">480°</b>
                <span className="text-xs tracking-widest uppercase text-muted">Peak Hearth Temp</span>
              </div>
              <div>
                <b className="block text-4xl italic font-serif sm:text-5xl text-copper-bright">4</b>
                <span className="text-xs tracking-widest uppercase text-muted">Years Burning</span>
              </div>
              <div>
                <b className="block text-4xl italic font-serif sm:text-5xl text-copper-bright">0</b>
                <span className="text-xs tracking-widest uppercase text-muted">Gas Burners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 px-6 py-24 mx-auto max-w-7xl md:px-12 lg:py-32" id="gallery">
        <div className="mb-10 text-left reveal">
          <div className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-copper-bright">On the Pass</div>
          <h2 className="text-4xl sm:text-5xl font-serif">From the Kitchen</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 h-auto lg:h-[420px] reveal">
          {[
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80",
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=80",
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80"
          ].map((src, idx) => (
            <div key={idx} className="relative overflow-hidden group aspect-square lg:aspect-auto cursor-pointer">
              <Image 
                src={src} 
                alt={`Kitchen ${idx + 1}`} 
                fill
                className="object-cover transition duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 text-center bg-copper text-bg-dark lg:py-32">
        <h2 className="mb-10 text-5xl leading-tight sm:text-6xl md:text-7xl font-serif">The hearth is lit<br className="hidden sm:block" /> every night.</h2>
        <button 
          className="px-10 py-5 text-sm font-bold tracking-widest text-cream uppercase transition duration-300 bg-bg-dark hover:bg-bg-darker hover:-translate-y-1"
          onClick={() => setIsModalOpen(true)}
        >
          Reserve Your Table
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-16 mx-auto max-w-7xl md:px-12 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">Ember & Ash</h4>
            <p className="text-sm leading-relaxed text-cream/80">18 Shahpur Jat<br />New Delhi, 110049</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">Service</h4>
            <p className="mb-2 text-sm text-cream/80">Dinner: 7pm – 12am</p>
            <p className="text-sm text-cream/80">Closed Tuesdays</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">Contact</h4>
            <a href="#" className="block mb-2 text-sm transition text-cream/80 hover:text-copper-bright">+91 98100 22345</a>
            <a href="#" className="block text-sm transition text-cream/80 hover:text-copper-bright">table@emberandash.in</a>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest uppercase text-muted">Follow</h4>
            <a href="#" className="block mb-2 text-sm transition text-cream/80 hover:text-copper-bright">Instagram</a>
            <a href="#" className="block text-sm transition text-cream/80 hover:text-copper-bright">Zomato</a>
          </div>
        </div>
      </footer>

      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
