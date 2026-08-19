import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!supabase) {
      // If Supabase is not configured yet, we can mock success for now so the UI works
      console.warn("Supabase is not configured. Mocking reservation success.");
      return NextResponse.json({ success: true, mocked: true });
    }

    const { data, error } = await supabase
      .from('reservations')
      .insert([
        { name, email, phone, date, time, guests: parseInt(guests, 10) }
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: 'Database error. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
