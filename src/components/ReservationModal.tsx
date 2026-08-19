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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-[#161210] border border-[rgba(237,230,218,0.1)] p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a8078] hover:text-[#E8944F] transition-colors"
        >
          ✕
        </button>
        
        <h2 className="font-['Instrument_Serif'] text-4xl mb-2 text-[#EDE6DA]">Reserve a Table</h2>
        <p className="text-[#8a8078] text-sm mb-6">Join us around the hearth. We'll confirm your reservation shortly.</p>

        {success ? (
          <div className="text-[#E8944F] text-center py-8">
            <h3 className="font-['Instrument_Serif'] text-3xl italic mb-2">Confirmed</h3>
            <p className="text-[#EDE6DA]">Your reservation request has been received. We look forward to hosting you.</p>
            <button 
              onClick={onClose}
              className="mt-6 bg-[#C1793B] hover:bg-[#E8944F] text-[#0D0B09] px-6 py-2 font-semibold text-sm transition-colors uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[#8a8078] text-xs uppercase tracking-wider mb-1">Name</label>
              <input 
                required 
                name="name" 
                type="text" 
                className="w-full bg-[#0D0B09] border border-[rgba(237,230,218,0.1)] text-[#EDE6DA] p-3 focus:outline-none focus:border-[#C1793B] transition-colors" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8a8078] text-xs uppercase tracking-wider mb-1">Email</label>
                <input 
                  required 
                  name="email" 
                  type="email" 
                  className="w-full bg-[#0D0B09] border border-[rgba(237,230,218,0.1)] text-[#EDE6DA] p-3 focus:outline-none focus:border-[#C1793B] transition-colors" 
                />
              </div>
              <div>
                <label className="block text-[#8a8078] text-xs uppercase tracking-wider mb-1">Phone</label>
                <input 
                  required 
                  name="phone" 
                  type="tel" 
                  className="w-full bg-[#0D0B09] border border-[rgba(237,230,218,0.1)] text-[#EDE6DA] p-3 focus:outline-none focus:border-[#C1793B] transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8a8078] text-xs uppercase tracking-wider mb-1">Date</label>
                <input 
                  required 
                  name="date" 
                  type="date" 
                  className="w-full bg-[#0D0B09] border border-[rgba(237,230,218,0.1)] text-[#EDE6DA] p-3 focus:outline-none focus:border-[#C1793B] transition-colors [color-scheme:dark]" 
                />
              </div>
              <div>
                <label className="block text-[#8a8078] text-xs uppercase tracking-wider mb-1">Time</label>
                <input 
                  required 
                  name="time" 
                  type="time" 
                  className="w-full bg-[#0D0B09] border border-[rgba(237,230,218,0.1)] text-[#EDE6DA] p-3 focus:outline-none focus:border-[#C1793B] transition-colors [color-scheme:dark]" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8a8078] text-xs uppercase tracking-wider mb-1">Guests</label>
              <select 
                required 
                name="guests"
                className="w-full bg-[#0D0B09] border border-[rgba(237,230,218,0.1)] text-[#EDE6DA] p-3 focus:outline-none focus:border-[#C1793B] transition-colors"
              >
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
            </div>

            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 bg-[#C1793B] hover:bg-[#E8944F] text-[#0D0B09] py-3 font-semibold text-sm uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              {loading ? "Confirming..." : "Confirm Reservation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
