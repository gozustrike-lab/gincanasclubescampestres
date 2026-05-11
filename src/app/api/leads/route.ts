import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, institution, email, phone, eventType, participants, dateRange, message, score, tier } = body;

    // Validate required fields
    if (!name || !institution || !email || !eventType || !participants) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Store lead in database
    const lead = await db.lead.create({
      data: {
        name,
        institution,
        email,
        phone: phone || null,
        eventType,
        participants: parseInt(participants) || 0,
        dateRange: dateRange || null,
        message: message || null,
        score: parseInt(score) || 0,
        tier: tier || 'bronce',
      },
    });

    return NextResponse.json({
      success: true,
      id: lead.id,
      tier: lead.tier,
      score: lead.score,
      message: 'Lead registrado exitosamente. Nuestro equipo se contactará en 24 horas.',
    });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
