import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredRole: z.string().min(1, 'Please select a role'),
  experience: z.string().optional(),
  availability: z.string().min(1, 'Please describe your availability'),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = volunteerSchema.parse(body);

    // Send notification to organizers
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'hello@ecstaticsunday.com',
      to: process.env.RESEND_FROM_EMAIL || 'hello@ecstaticsunday.com',
      subject: `New Volunteer Application: ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF7828;">New Angel Team Application</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${data.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${data.phone}</td></tr>` : ''}
            <tr><td style="padding: 8px; font-weight: bold;">Preferred Role</td><td style="padding: 8px;">${data.preferredRole}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Availability</td><td style="padding: 8px;">${data.availability}</td></tr>
            ${data.experience ? `<tr><td style="padding: 8px; font-weight: bold;">Experience</td><td style="padding: 8px;">${data.experience}</td></tr>` : ''}
            ${data.message ? `<tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${data.message}</td></tr>` : ''}
          </table>
        </div>
      `,
    });

    // Send confirmation to volunteer
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'hello@ecstaticsunday.com',
      to: data.email,
      subject: 'Thank You for Volunteering with Ecstatic Sunday!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF7828;">Thank You, ${data.name}!</h1>
          <p>We've received your application to join the Angel Team as a <strong>${data.preferredRole}</strong>.</p>
          <p>We'll review your application and get back to you soon. Thank you for wanting to give back to the community!</p>
          <p style="color: #8A8A8A; font-size: 14px;">— The Ecstatic Sunday Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Volunteer form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
