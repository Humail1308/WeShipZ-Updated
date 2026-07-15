const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: 'https://www.weshipz.com'
}));
app.use(express.json());

const thankYouEmailHTML = (name, email, whatsapp, service, message) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;">
  <div style="max-width:520px;margin:0 auto;padding:24px;">
    <div style="background:#05050a;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
      <div style="padding:28px 36px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="font-family:Arial,sans-serif;font-size:1.5rem;font-weight:900;letter-spacing:-0.02em;">
          <span style="color:#ffffff;">WE</span><span style="color:#2563eb;">SHIPZ</span>
        </span>
      </div>
      <div style="padding:32px 36px;">
        <h2 style="font-family:Arial,sans-serif;color:#ffffff;font-size:1.15rem;font-weight:700;margin:0 0 8px;">We've got your request!</h2>
        <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.55);font-size:0.88rem;margin:0 0 24px;line-height:1.6;">
          Hi ${name}, thank you for reaching out. We'll get back to you within <strong style="color:#2563eb;">24 hours</strong>.
        </p>
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px 24px;margin-bottom:24px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.35);font-size:0.8rem;padding:5px 0;width:90px;">Name</td><td style="font-family:Arial,sans-serif;color:#ffffff;font-size:0.8rem;padding:5px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.35);font-size:0.8rem;padding:5px 0;">Email</td><td style="font-family:Arial,sans-serif;color:#ffffff;font-size:0.8rem;padding:5px 0;font-weight:600;">${email}</td></tr>
            <tr><td style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.35);font-size:0.8rem;padding:5px 0;">WhatsApp</td><td style="font-family:Arial,sans-serif;color:#ffffff;font-size:0.8rem;padding:5px 0;font-weight:600;">${whatsapp}</td></tr>
            <tr><td style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.35);font-size:0.8rem;padding:5px 0;">Service</td><td style="font-family:Arial,sans-serif;color:#2563eb;font-size:0.8rem;padding:5px 0;font-weight:700;">${service}</td></tr>
            ${message ? `<tr><td style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.35);font-size:0.8rem;padding:5px 0;vertical-align:top;">Message</td><td style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.8);font-size:0.8rem;padding:5px 0;line-height:1.5;">${message}</td></tr>` : ''}
          </table>
        </div>
      </div>
      <div style="padding:18px 36px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.3);font-size:0.78rem;margin:0 0 4px;">Team WeShipZ</p>
        <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.15);font-size:0.72rem;margin:0;">&copy; 2026 WeShipZ &middot; Karachi, Pakistan</p>
      </div>
    </div>
  </div>
</body>
</html>`;

const teamNotificationHTML = (name, email, whatsapp, service, message, companyName, website, companySize) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;">
  <div style="max-width:520px;margin:0 auto;padding:24px;">
    <div style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#2563eb;padding:24px 32px;">
        <h2 style="font-family:Arial,sans-serif;color:#fff;margin:0;font-size:1.1rem;font-weight:700;">New Lead — WeShipZ</h2>
      </div>
      <div style="padding:28px 32px;">
        <p style="font-family:Arial,sans-serif;color:#9ca3af;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 8px;font-weight:700;">Contact Info</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;width:130px;">Name</td><td style="font-family:Arial,sans-serif;color:#111;font-size:0.82rem;padding:10px 0;font-weight:600;">${name}</td></tr>
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;">Email</td><td style="font-family:Arial,sans-serif;color:#2563eb;font-size:0.82rem;padding:10px 0;font-weight:600;">${email}</td></tr>
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;">WhatsApp</td><td style="font-family:Arial,sans-serif;color:#111;font-size:0.82rem;padding:10px 0;font-weight:600;">${whatsapp}</td></tr>
        </table>

        <p style="font-family:Arial,sans-serif;color:#9ca3af;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 8px;font-weight:700;">Business Info</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;width:130px;">Business Name</td><td style="font-family:Arial,sans-serif;color:#111;font-size:0.82rem;padding:10px 0;font-weight:600;">${companyName || 'Not provided'}</td></tr>
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;">Website</td><td style="font-family:Arial,sans-serif;color:#2563eb;font-size:0.82rem;padding:10px 0;font-weight:600;">${website || 'Not provided'}</td></tr>
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;">Company Size</td><td style="font-family:Arial,sans-serif;color:#111;font-size:0.82rem;padding:10px 0;font-weight:600;">${companySize || 'Not provided'}</td></tr>
        </table>

        <p style="font-family:Arial,sans-serif;color:#9ca3af;font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 8px;font-weight:700;">Project Details</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="border-bottom:1px solid #f0f0f0;"><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;width:130px;">Service</td><td style="font-family:Arial,sans-serif;color:#111;font-size:0.82rem;padding:10px 0;font-weight:600;">${service}</td></tr>
          ${message ? `<tr><td style="font-family:Arial,sans-serif;color:#6b7280;font-size:0.82rem;padding:10px 0;vertical-align:top;">Problem Description</td><td style="font-family:Arial,sans-serif;color:#111;font-size:0.82rem;padding:10px 0;line-height:1.5;">${message}</td></tr>` : ''}
        </table>
      </div>
      <div style="padding:16px 32px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
        <p style="font-family:Arial,sans-serif;color:#9ca3af;font-size:0.75rem;margin:0;">WeShipZ Lead Notification &middot; ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
      </div>
    </div>
  </div>
</body>
</html>`;

app.post('/api/submit', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    service,
    message,
    companyName,
    website,
    companySize
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    await resend.emails.send({
      from: 'WeShipZ <noreply@weshipz.com>',
      to: email,
      subject: 'We received your request — WeShipZ',
      html: thankYouEmailHTML(name, email, whatsapp, service, message),
    });
    await resend.emails.send({
      from: 'WeShipZ <noreply@weshipz.com>',
      to: 'weshipzhq@gmail.com',
      subject: `New Lead: ${name} — ${service}`,
      html: teamNotificationHTML(name, email, whatsapp, service, message, companyName, website, companySize),
    });
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`WeShipZ backend running on port ${PORT}`));
