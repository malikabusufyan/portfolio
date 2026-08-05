require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

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

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messageRoutes);

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
