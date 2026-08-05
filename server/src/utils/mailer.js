const { Resend } = require("resend");

let resend = null;

function getClient() {
  if (resend) return resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  resend = new Resend(apiKey);
  return resend;
}

async function sendContactMail({ name, email, subject, message }) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.RESEND_FROM_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Portfolio Contact Form <onboarding@resend.dev>";
  const client = getClient();

  const { error } = await client.emails.send({
    from,
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

  if (error) {
    throw new Error(error.message || "Resend API error");
  }
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
