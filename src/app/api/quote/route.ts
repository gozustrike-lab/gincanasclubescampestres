import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, participants, clubId, services } = body;

    // Base prices per event type
    const basePrices: Record<string, number> = {
      corporativo: 35,
      escolar: 25,
      universitario: 30,
      privado: 45,
    };

    // Club multipliers
    const clubMultipliers: Record<string, number> = {
      'hacienda': 1.2,
      'villa-verde': 1.3,
      'rancho-sol': 1.1,
      'encanto': 1.15,
      'la-quintrala': 1.4,
      'campestre-sur': 1.0,
      'paraiso': 1.35,
      'oasis': 1.05,
    };

    // Service prices per participant
    const servicePrices: Record<string, number> = {
      transport: 15,
      catering: 25,
      gincanas: 20,
      photography: 12,
      av: 8,
    };

    const numParticipants = parseInt(participants) || 0;
    const basePrice = (basePrices[eventType] || 30) * numParticipants;
    const clubMultiplier = clubMultipliers[clubId] || 1.0;

    let serviceFees = 0;
    if (Array.isArray(services)) {
      services.forEach((sId: string) => {
        serviceFees += (servicePrices[sId] || 0) * numParticipants;
      });
    }

    const subtotal = basePrice * clubMultiplier + serviceFees;

    // Volume discount
    const volumeDiscount =
      numParticipants >= 300 ? 0.15 :
      numParticipants >= 200 ? 0.12 :
      numParticipants >= 100 ? 0.1 : 0;

    const discountAmount = subtotal * volumeDiscount;
    const total = subtotal - discountAmount;

    const tier =
      total >= 20000 ? 'Enterprise' :
      total >= 10000 ? 'Premium' :
      total >= 5000 ? 'Standard' : 'Básico';

    return NextResponse.json({
      basePrice: Math.round(basePrice * clubMultiplier),
      serviceFees: Math.round(serviceFees),
      volumeDiscount: Math.round(discountAmount),
      total: Math.round(total),
      tier,
      participants: numParticipants,
      eventType,
      clubId,
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar la cotización' },
      { status: 400 }
    );
  }
}
