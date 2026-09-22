import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter using Namecheap SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Namecheap shared hosting uses wildcard cert (*.web-hosting.com)
    // This is necessary for shared hosting environments
    rejectUnauthorized: false,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const supportType = formData.get('supportType') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare attachments array
    const attachments: any[] = [];
    
    // Handle file attachment if provided
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Send email to company
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@pipelinequality.com',
      subject: `New Contact Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">New Contact Request</h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c49c00;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 8px 0;"><strong>Support Type:</strong> ${supportType || 'Not specified'}</p>
            ${file ? `<p style="margin: 8px 0;"><strong>Attachment:</strong> ${file.name}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1a365d;">Message:</h3>
            <p style="white-space: pre-wrap; background-color: #f7fafc; padding: 15px; border-radius: 8px; line-height: 1.6;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #718096; font-size: 12px;">
            This email was sent from your Pipeline Quality website contact form.
          </p>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'We received your contact request - Pipeline Quality',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Thank You for Contacting Us</h2>
          
          <p style="color: #4a5568; line-height: 1.6;">Dear ${name},</p>
          
          <p style="color: #4a5568; line-height: 1.6;">We have received your contact request and appreciate you reaching out to Pipeline Quality.</p>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c49c00;">
            <h3 style="color: #1a365d; margin-top: 0; margin-bottom: 10px;">Your Information:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>
          </div>

          <p style="color: #4a5568; line-height: 1.6;">Our team will review your request and get back to you as soon as possible, typically within 24-48 hours.</p>

          <p style="color: #4a5568; line-height: 1.6;"><strong>If you have any urgent matters, please contact us directly:</strong></p>
          <ul style="color: #4a5568; line-height: 1.8;">
            <li>Email: <a href="mailto:info@pipelinequality.com" style="color: #c49c00; text-decoration: none;">info@pipelinequality.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/491728137111" style="color: #c49c00; text-decoration: none;">+49 172 813 7111</a></li>
          </ul>

          <p style="color: #4a5568; line-height: 1.6;">Best regards,<br/>
          <strong>Pipeline Quality Team</strong></p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #718096; font-size: 12px;">
            © 2024 Pipeline Quality. All rights reserved.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
