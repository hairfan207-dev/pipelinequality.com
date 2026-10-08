import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (field(formData, 'pq_leave_blank')) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const name = field(formData, 'name');
    const company = field(formData, 'company');
    const email = field(formData, 'email');
    const phone = field(formData, 'phone');
    const location = field(formData, 'location');
    const industry = field(formData, 'industry');
    const services = formData.getAll('services').map((item) => String(item).trim()).filter(Boolean);
    const projectStart = field(formData, 'projectStart');
    const duration = field(formData, 'duration');
    const message = field(formData, 'message');
    const privacy = field(formData, 'privacy');
    const supportType = field(formData, 'supportType');
    const file = formData.get('file') as File | null;

    if (!name || !company || !email || !EMAIL_PATTERN.test(email) || !location || !industry || services.length === 0 || !message || privacy !== 'yes') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const safeName = name.replace(/[\r\n]/g, ' ');
    const serviceList = services.map((item) => escapeHtml(item)).join('<br />');

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
      subject: `New project enquiry from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">New project enquiry</h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c49c00;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${escapeHtml(company)}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
            <p style="margin: 8px 0;"><strong>Project location:</strong> ${escapeHtml(location)}</p>
            <p style="margin: 8px 0;"><strong>Industry:</strong> ${escapeHtml(industry)}</p>
            <p style="margin: 8px 0;"><strong>Service required:</strong><br />${serviceList}</p>
            <p style="margin: 8px 0;"><strong>Project start:</strong> ${escapeHtml(projectStart || 'Not provided')}</p>
            <p style="margin: 8px 0;"><strong>Expected duration:</strong> ${escapeHtml(duration || 'Not provided')}</p>
            ${supportType ? `<p style="margin: 8px 0;"><strong>Support type:</strong> ${escapeHtml(supportType)}</p>` : ''}
            ${file ? `<p style="margin: 8px 0;"><strong>Attachment:</strong> ${escapeHtml(file.name)}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1a365d;">Project details:</h3>
            <p style="white-space: pre-wrap; background-color: #f7fafc; padding: 15px; border-radius: 8px; line-height: 1.6;">${escapeHtml(message)}</p>
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
          
          <p style="color: #4a5568; line-height: 1.6;">Dear ${escapeHtml(name)},</p>
          
          <p style="color: #4a5568; line-height: 1.6;">We have received your contact request and appreciate you reaching out to Pipeline Quality.</p>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c49c00;">
            <h3 style="color: #1a365d; margin-top: 0; margin-bottom: 10px;">Your Information:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${escapeHtml(company)}</p>
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
