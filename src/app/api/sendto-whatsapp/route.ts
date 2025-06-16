import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request: NextRequest) {
  const { phone, name, grade, date, status } = await request.json();

  const message = await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${phone}`,
    contentSid: process.env.TWILIO_CONTENT_SID,
    contentVariables: JSON.stringify({
      1: name,
      2: grade,
      3: date,
      4: status,
    }),
  });

  return NextResponse.json({ sid: message.sid }, { status: 200 });
}
