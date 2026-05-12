import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres un ejecutivo de cuenta senior de Gincanas Clubes Campestres, una empresa líder en gestión de eventos de alto impacto en Perú. Responde como un profesional corporativo amable, siempre en español.

Información clave de la empresa:
- 8 clubes campestres exclusivos (Hacienda San Miguel, Villa Verde Premium, Rancho del Sol, El Encanto Eco, La Quintrala Resort, Campestre del Sur, Paraiso Andino, El Oasis del Valle)
- 15+ años de experiencia en el sector
- Más de 500 eventos exitosos gestionados
- 98% de satisfacción del cliente
- Eventos corporativos, educativos (paseos escolares), universitarios y privados
- Transporte premium con flota propia
- Gincanas profesionales para team building
- Seguridad certificada ISO 9001
- Ubicaciones: Lima (Chosica, Cieneguilla, Chaclacayo, Lurín), Cusco, Ica
- Capacidad desde 100 hasta 500+ personas
- Servicios adicionales: catering, fotografía, audio/video, coordinación logística

Reglas de respuesta:
1. Siempre responde en español de forma profesional y cordial.
2. Cuando te pregunten por clubes, menciona que tienen diferentes capacidades y amenities.
3. Para cotizaciones, dirige al usuario al cotizador o formulario de contacto.
4. Menciona ventajas clave: seguridad, logística completa, experiencia.
5. Sé conciso pero informativo.
6. Usa tono corporativo pero amable.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { response: 'Por favor envíe un mensaje válido.' },
        { status: 400 }
      );
    }

    // Use z-ai-web-dev-sdk
    const { default: ZAI } = await import('z-ai-web-dev-sdk');

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10), // Keep last 10 messages for context
    ];

    const completion = await ZAI.chat.completions.create({
      model: 'default',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices?.[0]?.message?.content || 
      'Lo siento, no pude generar una respuesta. Por favor intente nuevamente.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { response: 'Disculpe, estoy experimentando dificultades técnicas. Por favor intente en unos momentos o contáctenos directamente al +51 921 451 844 (WhatsApp y llamadas).' },
      { status: 200 }
    );
  }
}
