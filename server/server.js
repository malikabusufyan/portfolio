require("dotenv").config();
require("express-async-errors");
const dns = require("dns");
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Render's outbound network doesn't reliably route IPv6; Node's resolver sometimes
// hands back an AAAA record for smtp.gmail.com, which then hangs until it times out.
// Preferring IPv4 avoids that dead end for all outbound connections (SMTP, etc.).
dns.setDefaultResultOrder("ipv4first");

const buildCrudRouter = require("./src/routes/crudFactory");
const Experience = require("./src/models/Experience");
const Education = require("./src/models/Education");
const Skill = require("./src/models/Skill");
const Project = require("./src/models/Project");
const Publication = require("./src/models/Publication");
const Certification = require("./src/models/Certification");
const Achievement = require("./src/models/Achievement");

const authRoutes = require("./src/routes/auth");
const contactRoutes = require("./src/routes/contact");
const messageRoutes = require("./src/routes/messages");
const uploadRoutes = require("./src/routes/upload");

const app = express();

const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/+$/, "");

app.use(
  cors({
    origin: clientUrl,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// TEMPORARY diagnostic route for the SMTP IPv4/IPv6 investigation - remove once resolved.
app.get("/api/_diag/dns", async (req, res) => {
  const dnsPromises = require("dns").promises;
  const net = require("net");
  const result = { checks: [] };

  try {
    const t0 = Date.now();
    const v4 = await dnsPromises.resolve4("smtp.gmail.com");
    result.resolve4 = { ok: true, addresses: v4, ms: Date.now() - t0 };
  } catch (err) {
    result.resolve4 = { ok: false, error: err.message };
  }

  try {
    const t0 = Date.now();
    const v6 = await dnsPromises.resolve6("smtp.gmail.com");
    result.resolve6 = { ok: true, addresses: v6, ms: Date.now() - t0 };
  } catch (err) {
    result.resolve6 = { ok: false, error: err.message };
  }

  if (result.resolve4.ok) {
    const ip = result.resolve4.addresses[0];
    const t0 = Date.now();
    await new Promise((resolve) => {
      const socket = net.connect({ host: ip, port: 465, timeout: 8000 }, () => {
        result.tcpConnect = { ok: true, ip, ms: Date.now() - t0 };
        socket.destroy();
        resolve();
      });
      socket.on("error", (err) => {
        result.tcpConnect = { ok: false, ip, error: err.message, ms: Date.now() - t0 };
        resolve();
      });
      socket.on("timeout", () => {
        result.tcpConnect = { ok: false, ip, error: "timeout", ms: Date.now() - t0 };
        socket.destroy();
        resolve();
      });
    });
  }

  res.json(result);
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/experience", buildCrudRouter(Experience));
app.use("/api/education", buildCrudRouter(Education));
app.use("/api/skills", buildCrudRouter(Skill));
app.use("/api/projects", buildCrudRouter(Project));
app.use("/api/publications", buildCrudRouter(Publication));
app.use("/api/certifications", buildCrudRouter(Certification));
app.use("/api/achievements", buildCrudRouter(Achievement));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
