import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send welcome email
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'hello@ecstaticsunday.com',
      to: email,
      subject: 'Welcome to the Ecstatic Sunday Tribe!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF7828;">Welcome to Ecstatic Sunday!</h1>
          <p>Thank you for joining our community. You'll receive updates about upcoming events, featured DJs, and community stories.</p>
          <p>See you on the dance floor!</p>
          <p style="color: #8A8A8A; font-size: 14px;">— The Ecstatic Sunday Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
