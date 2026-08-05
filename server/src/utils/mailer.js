const dns = require("dns").promises;
const nodemailer = require("nodemailer");

const GMAIL_HOST = "smtp.gmail.com";
const HOST_TTL_MS = 5 * 60 * 1000;

let transporter = null;
let transporterHost = null;
let cachedIp = null;
let cachedAt = 0;

// Nodemailer resolves both A and AAAA records for the SMTP host and picks a
// RANDOM address to connect to (see resolveHostname/formatDNSValue in
// nodemailer/lib/shared). On hosts with broken outbound IPv6 routing (e.g.
// Render's free tier), that means some fraction of sends hang until they hit
// ENETUNREACH on an IPv6 address. Resolving to a literal IPv4 address
// ourselves makes nodemailer skip its own resolver (it only resolves
// hostnames, not IPs) so it always connects over IPv4.
async function resolveGmailIPv4() {
  const now = Date.now();
  if (cachedIp && now - cachedAt < HOST_TTL_MS) return cachedIp;

  try {
    const addresses = await dns.resolve4(GMAIL_HOST);
    if (addresses && addresses.length) {
      cachedIp = addresses[Math.floor(Math.random() * addresses.length)];
      cachedAt = now;
      return cachedIp;
    }
  } catch {
    // fall through to hostname below
  }
  return GMAIL_HOST;
}

async function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD are not configured");
  }

  const host = await resolveGmailIPv4();

  if (!transporter || transporterHost !== host) {
    transporter = nodemailer.createTransport({
      host,
      port: 465,
      secure: true,
      auth: { user, pass },
      // required for correct TLS certificate validation when host is a raw IP
      tls: { servername: GMAIL_HOST },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });
    transporterHost = host;
  }
  return transporter;
}

async function sendContactMail({ name, email, subject, message }) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;
  const t = await getTransporter();

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
