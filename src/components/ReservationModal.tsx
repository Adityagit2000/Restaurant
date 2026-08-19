"use client";

import { useState } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to make reservation");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 sm:px-6">
      <div 
        className="bg-bg-darker/90 backdrop-blur-xl border border-white/10 p-8 sm:p-12 max-w-md w-full relative shadow-2xl transition-all"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-muted hover:text-copper-bright transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="font-serif text-4xl sm:text-5xl mb-3 text-cream">Reserve a Table</h2>
        <p className="text-muted text-sm sm:text-base mb-8">Join us around the hearth. We'll confirm your reservation shortly.</p>

        {success ? (
          <div className="text-copper-bright text-center py-10 animate-fadeUp">
            <h3 className="font-serif text-4xl italic mb-4">Confirmed</h3>
            <p className="text-cream/90 text-base leading-relaxed">Your reservation request has been received. We look forward to hosting you.</p>
            <button 
              onClick={onClose}
              className="mt-8 bg-copper hover:bg-copper-bright text-bg-dark px-8 py-3 font-bold text-xs transition-colors uppercase tracking-[0.2em]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fadeUp">
            <div>
              <label className="block text-muted text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Name</label>
              <input 
                required 
                name="name" 
                type="text" 
                className="w-full bg-bg-dark/50 border border-white/10 text-cream p-3 sm:p-4 focus:outline-none focus:border-copper transition-colors placeholder:text-muted/50" 
                placeholder="John Doe"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-muted text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Email</label>
                <input 
                  required 
                  name="email" 
                  type="email" 
                  className="w-full bg-bg-dark/50 border border-white/10 text-cream p-3 sm:p-4 focus:outline-none focus:border-copper transition-colors placeholder:text-muted/50" 
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-muted text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Phone</label>
                <input 
                  required 
                  name="phone" 
                  type="tel" 
                  className="w-full bg-bg-dark/50 border border-white/10 text-cream p-3 sm:p-4 focus:outline-none focus:border-copper transition-colors placeholder:text-muted/50" 
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-muted text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Date</label>
                <input 
                  required 
                  name="date" 
                  type="date" 
                  className="w-full bg-bg-dark/50 border border-white/10 text-cream p-3 sm:p-4 focus:outline-none focus:border-copper transition-colors [color-scheme:dark]" 
                />
              </div>
              <div>
                <label className="block text-muted text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Time</label>
                <input 
                  required 
                  name="time" 
                  type="time" 
                  className="w-full bg-bg-dark/50 border border-white/10 text-cream p-3 sm:p-4 focus:outline-none focus:border-copper transition-colors [color-scheme:dark]" 
                />
              </div>
            </div>

            <div>
              <label className="block text-muted text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Guests</label>
              <select 
                required 
                name="guests"
                className="w-full bg-bg-dark/50 border border-white/10 text-cream p-3 sm:p-4 focus:outline-none focus:border-copper transition-colors appearance-none"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-6 bg-copper hover:bg-copper-bright text-bg-dark py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-lg shadow-copper/20"
            >
              {loading ? "Confirming..." : "Confirm Reservation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
