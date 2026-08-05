const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD are not configured");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

async function sendContactMail({ name, email, subject, message }) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;
  const t = getTransporter();

  await t.sendMail({
    from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `,
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = { sendContactMail };
