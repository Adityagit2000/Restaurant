"use client";

import { useEffect, useRef, useState } from "react";
import ReservationModal from "@/components/ReservationModal";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
    },{threshold:0.15});
    revealEls.forEach(el=>io.observe(el));

    // ember particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize(){
      if (!canvas) return;
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
    }
    resize(); 
    window.addEventListener('resize',resize);
    
    let particles = Array.from({length:40},()=>({
      x:Math.random()*window.innerWidth,
      y:window.innerHeight+Math.random()*window.innerHeight,
      r:Math.random()*2+0.5,
      speed:Math.random()*0.6+0.2,
      drift:Math.random()*0.4-0.2,
      alpha:Math.random()*0.5+0.2
    }));

    let animationId: number;

    function animate(){
      if (!canvas || !ctx) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{
        p.y -= p.speed; p.x += p.drift;
        if(p.y < -10){ p.y = canvas.height+10; p.x = Math.random()*canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
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
    <>
      <canvas id="embers" ref={canvasRef}></canvas>

      <header>
        <nav>
          <div className="logo">Ember <span>&</span> Ash</div>
          <ul className="nav-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#kitchen">Kitchen</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
          <button className="reserve-btn" onClick={() => setIsModalOpen(true)}>Reserve a Table</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-eyebrow">Wood-Fired Kitchen — New Delhi</div>
        <h1>Everything<br/>touches <em>fire</em>.</h1>
        <div className="hero-sub">
          <p>No gas burners, no microwaves. Every plate that leaves this kitchen has spent time over the same wood-fired hearth — from the bread to the dessert.</p>
          <button className="reserve-btn" onClick={() => setIsModalOpen(true)}>Reserve a Table</button>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <div className="strip">
        <div className="strip-inner">
          <span>Hearth-Roasted <b>Nightly</b></span><span>·</span>
          <span>Open-Fire <b>Since 2021</b></span><span>·</span>
          <span>Seasonal <b>Menu, Weekly</b></span><span>·</span>
          <span>Hearth-Roasted <b>Nightly</b></span><span>·</span>
          <span>Open-Fire <b>Since 2021</b></span><span>·</span>
          <span>Seasonal <b>Menu, Weekly</b></span><span>·</span>
        </div>
      </div>

      <section className="menu-section" id="menu">
        <div className="menu-head reveal">
          <div className="hero-eyebrow">This Week's Fire</div>
          <h2>The Menu</h2>
        </div>
        <div className="menu-card reveal">
          <div className="menu-group">
            <h3>To Start</h3>
            <div className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-name">Charred Bread & Cultured Butter</div>
                <div className="menu-item-desc">Hearth-baked sourdough, smoked salt</div>
              </div>
              <div className="menu-item-price">₹320</div>
            </div>
            <div className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-name">Ember-Roasted Beets</div>
                <div className="menu-item-desc">Whipped goat cheese, charred citrus</div>
              </div>
              <div className="menu-item-price">₹460</div>
            </div>
          </div>
          <div className="menu-group">
            <h3>From the Hearth</h3>
            <div className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-name">Whole Fire-Roasted Chicken</div>
                <div className="menu-item-desc">Wood-fired 90 minutes, pan jus, charred lemon</div>
              </div>
              <div className="menu-item-price">₹980</div>
            </div>
            <div className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-name">Dry-Aged Ribeye</div>
                <div className="menu-item-desc">28-day aged, bone marrow butter</div>
              </div>
              <div className="menu-item-price">₹2,150</div>
            </div>
            <div className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-name">Charred Cauliflower Steak</div>
                <div className="menu-item-desc">Smoked almond romesco, herb oil</div>
              </div>
              <div className="menu-item-price">₹720</div>
            </div>
          </div>
          <div className="menu-group">
            <h3>To Finish</h3>
            <div className="menu-item">
              <div className="menu-item-left">
                <div className="menu-item-name">Fire-Toasted Basque Cheesecake</div>
                <div className="menu-item-desc">Burnt top, salted caramel</div>
              </div>
              <div className="menu-item-price">₹420</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature" id="kitchen">
        <div className="feature-img reveal">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="Wood fire kitchen" />
        </div>
        <div className="feature-text reveal">
          <div className="hero-eyebrow">The Kitchen</div>
          <h2>One hearth, three chefs, zero shortcuts.</h2>
          <p>Our kitchen runs on a single wood-fired hearth that never goes cold. Every dish is timed around it, not around a ticket printer — which means some nights the menu moves slower than others. We're fine with that.</p>
          <div className="stat-row">
            <div className="stat"><b>480°</b><span>Peak Hearth Temp</span></div>
            <div className="stat"><b>4</b><span>Years Burning</span></div>
            <div className="stat"><b>0</b><span>Gas Burners</span></div>
          </div>
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="menu-head reveal" style={{textAlign: "left", marginBottom: "40px"}}>
          <div className="hero-eyebrow">On the Pass</div>
          <h2>From the Kitchen</h2>
        </div>
        <div className="gallery-grid reveal">
          <a><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" alt="Kitchen 1" /></a>
          <a><img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80" alt="Kitchen 2" /></a>
          <a><img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=80" alt="Kitchen 3" /></a>
          <a><img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80" alt="Kitchen 4" /></a>
          <a><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80" alt="Kitchen 5" /></a>
        </div>
      </section>

      <section className="cta-block">
        <h2>The hearth is lit<br/>every night.</h2>
        <button className="reserve-btn" onClick={() => setIsModalOpen(true)}>Reserve Your Table</button>
      </section>

      <footer>
        <div className="footer-col">
          <h4>Ember & Ash</h4>
          <p>18 Shahpur Jat<br/>New Delhi, 110049</p>
        </div>
        <div className="footer-col">
          <h4>Service</h4>
          <p>Dinner: 7pm – 12am</p>
          <p>Closed Tuesdays</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="#">+91 98100 22345</a>
          <a href="#">table@emberandash.in</a>
        </div>
        <div className="footer-col">
          <h4>Follow</h4>
          <a href="#">Instagram</a>
          <a href="#">Zomato</a>
        </div>
      </footer>

      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
