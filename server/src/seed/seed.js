require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

const Experience = require("../models/Experience");
const Education = require("../models/Education");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Publication = require("../models/Publication");
const Certification = require("../models/Certification");
const Achievement = require("../models/Achievement");
const Admin = require("../models/Admin");

const experiences = [
  {
    company: "Tata Consultancy Services",
    role: "Assistant System Engineer",
    location: "Noida, India",
    startDate: "May 2022",
    endDate: "Dec 2023",
    type: "work",
    logo: "/images/logo-tcs.png",
    bullets: [
      "Built optimized APIs using Node.js for streamlined policy creation, focusing on scalability, security, and performance.",
      "Collaborated seamlessly across cross-functional units, leveraging deep insurance domain expertise.",
      "Used Git for version control, orchestrated CI/CD pipelines via GitHub Actions, and integrated Jira workflows for efficient project management.",
    ],
    order: 1,
  },
  {
    company: "Conformis",
    role: "CAD Engineer Trainee",
    location: "Hyderabad, India",
    startDate: "Aug 2021",
    endDate: "Feb 2022",
    type: "work",
    logo: "/images/logo-conformis.jpg",
    bullets: [
      "Generated 3D models from CT scan images.",
      "Designed patient-specific implants and surgical instruments using Solidworks.",
      "Performed tasks under the company's FDA and ISO conforming quality system.",
      "Participated in research programs and quality assurance/improvement projects.",
    ],
    order: 2,
  },
  {
    company: "Amazon India",
    role: "Machine Learning Alexa Data Associate",
    location: "Hyderabad, India",
    startDate: "Oct 2020",
    endDate: "Aug 2021",
    type: "work",
    logo: "/images/logo-amazon.jpg",
    bullets: [
      "Provided data creation, curation, and analytics services to help develop, test, and train Alexa AI.",
      "Worked closely with the ML modelling team to train Alexa across several work types, maintaining performance targets of 95%+ on every workflow.",
      "Provided support to new and tenured batches.",
    ],
    order: 3,
  },
  {
    company: "Eleation",
    role: "CAE Internship Program (Virtual)",
    location: "Remote",
    startDate: "Aug 2019",
    endDate: "Jan 2020",
    type: "internship",
    logo: "/images/logo-eleation.webp",
    bullets: [
      'Completed the project "Design and Analysis of Engine Block Using Solidworks and Ansys".',
      "Learned meshing, and structural, thermal, and modal analysis.",
      "Gained hands-on exposure to computational fluid dynamics (CFD).",
    ],
    order: 4,
  },
  {
    company: "National Institute of Technology, Warangal",
    role: "Winter Intern",
    location: "Warangal, India",
    startDate: "Dec 2019",
    endDate: "Jan 2020",
    type: "internship",
    logo: "/images/logo-nitw.png",
    bullets: [
      'Completed the project "Elastic Modulus Measurement of Solids Using Ultrasonic Technique".',
      "Learned non-destructive testing techniques and MATLAB.",
    ],
    order: 5,
  },
  {
    company: "HMT Machine Tools Limited",
    role: "Summer Intern",
    location: "Hyderabad, India",
    startDate: "Jul 2019",
    endDate: "Aug 2019",
    type: "internship",
    logo: "/images/logo-hmt.jpg",
    bullets: [
      "Explored casting and manufacturing processes at HMT Machine Tools Limited.",
      'Completed a mini-project titled "Study of Casting and Manufacturing Process in HMT Machine Tools Limited".',
    ],
    order: 6,
  },
];

const education = [
  {
    degree: "Masters in Information System Management",
    institution: "Union Commonwealth University, Kentucky, USA",
    duration: "Jan 2024 - May 2026",
    grade: "3.78/4 GPA",
    logo: "/images/logo-ucu.webp",
    order: 1,
  },
  {
    degree: "Advance Diploma in Fullstack Web Development",
    institution: "Coding Ninjas",
    duration: "2022 - 2023",
    grade: "",
    logo: "/images/logo-coding-ninjas.jpg",
    order: 2,
  },
  {
    degree: "Bachelor of Technology in Mechanical Engineering",
    institution: "Jawaharlal Nehru Technological University, Hyderabad",
    duration: "2016 - 2020",
    grade: "7.43/10 CGPA",
    logo: "/images/logo-jntuh.jpg",
    order: 3,
  },
  {
    degree: "Senior Secondary Certificate",
    institution: "Bright Way College, Lucknow (CBSE)",
    duration: "2015",
    grade: "78.6%",
    logo: "/images/logo-brightway.jpg",
    order: 4,
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Bright Way College, Lucknow (CBSE)",
    duration: "2015",
    grade: "8.8/10 CGPA",
    logo: "/images/logo-brightway.jpg",
    order: 5,
  },
];

const skills = [
  ...["Python", "HTML", "CSS", "JavaScript", "SQL"].map((name, i) => ({
    name,
    category: "Languages",
    order: i,
  })),
  ...["Node.js", "React.js", "Express.js", "EJS", "MongoDB", "Bootstrap", "Passport.js", "jQuery"].map(
    (name, i) => ({ name, category: "Frameworks/Libraries", order: i })
  ),
  ...["Git & GitHub", "Render", "MongoDB Atlas", "Postman", "VS Code"].map((name, i) => ({
    name,
    category: "Tools",
    order: i,
  })),
  ...["AutoCAD", "CATIA", "Solidworks"].map((name, i) => ({ name, category: "CAD", order: i })),
  ...["Ansys", "Workbench", "Abaqus"].map((name, i) => ({ name, category: "CAE", order: i })),
  ...["Leadership", "Communication", "Self-Disciplined"].map((name, i) => ({
    name,
    category: "Interpersonal",
    order: i,
  })),
];

const projects = [
  {
    title: "Codeial - A Social Media Web App",
    category: "software",
    description:
      "Sign-in/sign-up with Google OAuth, posting, commenting, and liking. Real-time email notifications for comments and posts, a notification page for account/post/comment alerts, Passport authentication with support for multiple strategies, profile customization, and a responsive design.",
    techStack: ["Node.js", "Express", "MongoDB", "Passport", "EJS"],
    githubLink: "https://github.com/malikabusufyan/socialMedia",
    order: 1,
    featured: true,
  },
  {
    title: "Issue Tracker",
    category: "software",
    description:
      "A clean, intuitive UI for a project management system. The home page lists projects with an option to create new ones; each project has a detail page for related bugs, filterable by labels, author, and search by title/description.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    githubLink: "https://github.com/malikabusufyan/issueTracker",
    order: 2,
    featured: true,
  },
  {
    title: "NodeJS Authentication",
    category: "software",
    description:
      "An authentication system with email sign-up/sign-in, encrypted password storage, password reset after login, Google social login, and clear notifications for unmatched passwords or incorrect credentials.",
    techStack: ["Node.js", "Express", "Passport", "MongoDB"],
    githubLink: "https://github.com/malikabusufyan/NodejsAuthentication",
    order: 3,
    featured: false,
  },
  {
    title: "Polling API",
    category: "software",
    description:
      "A feature-rich polling system: create questions with multiple options, vote on options, delete questions/options (only if no votes are cast), and view questions with their options and vote counts. Testable via Postman.",
    techStack: ["Node.js", "Express", "MongoDB", "REST API"],
    githubLink: "https://github.com/malikabusufyan/PollingAPI",
    order: 4,
    featured: false,
  },
  {
    title: "Measurement of Elastic Modulus by Using Ultrasonic Waveguide",
    category: "academic",
    description:
      "Used an ultrasonic transducer to find the elastic modulus of aluminum and copper, cross-checked with Abaqus analysis and destructive testing methods, arriving at comparable values across all three approaches.",
    techStack: ["Abaqus", "Ultrasonic Testing", "Destructive Testing"],
    githubLink: "https://drive.google.com/file/d/1fnn8J3Tmba_AAt8k22-rjYNpiwg-q2a9/view?usp=sharing",
    order: 5,
    featured: false,
  },
  {
    title: "Automated Guided Vehicle with Robotic Arm",
    category: "academic",
    description:
      "Designed a model of an AGV with a fixed, three-degree-of-freedom robotic arm in Solidworks and built a working real-time model, intended to support automation processes in manufacturing.",
    techStack: ["Solidworks", "Robotics"],
    githubLink: "https://drive.google.com/drive/folders/1uAmVwimuGQsFs_TP05cWafnKFkCzKWSq?usp=sharing",
    order: 6,
    featured: false,
  },
  {
    title: "Experimental & Microstructural Analysis of TIG and MIG Welding on Dissimilar Steels",
    category: "academic",
    description:
      "Welded mild steel and stainless steel using TIG and MIG welding, performed destructive testing (tensile, impact, hardness) and microstructural analysis of the welded joint and heat-affected zone, and compared the two processes.",
    techStack: ["Materials Testing", "Microstructural Analysis"],
    githubLink: "https://drive.google.com/file/d/1YHdKdMjXtu74fjdimgVEbNu94o0-X_dN/view?usp=sharing",
    order: 7,
    featured: false,
  },
  {
    title: "Performance Characteristics of Four Stroke Single Cylinder CI Engine Using Tamarind Oil Bio-Diesel",
    category: "academic",
    description:
      "Blended diesel with B20/B40/B50/B60 tamarind oil biodiesel and measured specific fuel consumption, brake thermal efficiency, air-fuel ratio, mechanical and volumetric efficiency, comparing each blend against pure diesel.",
    techStack: ["Experimental Analysis", "Fuel Testing"],
    githubLink: "https://drive.google.com/file/d/1gS0FI2EM6lvK_NBLS4aIgZYRBDBZzJfL/view?usp=sharing",
    order: 8,
    featured: false,
  },
];

const publications = [
  {
    title: "Experimental & Microstructural Analysis of TIG and MIG Welding on Dissimilar Steels",
    journal: "Lecture Notes in Mechanical Engineering, Springer",
    description:
      "Compares TIG and MIG welding on mild steel and stainless steel, including destructive and microstructural analysis of heat-affected zones and weld bead, covering tensile strength, impact strength, and hardness.",
    link: "https://link.springer.com/chapter/10.1007/978-981-15-1201-8_81",
    order: 1,
  },
  {
    title: "Performance Characteristics of Four Stroke Single Cylinder CI Engine Using Tamarind Oil Bio-Diesel",
    journal: "International Journal of Recent Trends in Engineering and Research",
    description:
      "Finds that a B60 blend (60% biodiesel, 40% diesel) performs approximately the same as pure diesel, with under 5% difference in volumetric and mechanical efficiency.",
    link: "https://scholar.google.com/citations?user=jTzZDfsAAAAJ&hl=en",
    order: 2,
  },
  {
    title: "Design and Analysis of Shock Absorber for 150cc Bike",
    journal: "International Research Journal of Engineering and Technology",
    description:
      "Designed a shock absorber in Pro-E for a 150cc bike, ran structural and modal analysis in Ansys Workbench comparing Structural Steel vs. Beryllium Copper, and concluded Structural Steel performs better.",
    link: "https://www.irjet.net/archives/V7/i11/IRJET-V7I1152.pdf",
    order: 3,
  },
];

const certifications = [
  {
    title: "National Program for Technology Enhanced Learning",
    issuer: "IIT Madras / IIT Kharagpur / KTH University, Sweden",
    items: [
      "Welding of High Strength Steels for Automotive Applications - IIT Madras",
      "Kinematics of Mechanism and Machine - IIT Kharagpur",
      "Machine Learning - KTH University, Sweden",
      "Computer Numerical Control (CNC) of Machine Tools and Processes - IIT Kharagpur",
    ],
    order: 1,
  },
  {
    title: "Canter CADD",
    issuer: "Canter CADD",
    items: ["AutoCAD", "Professional in Mechanical CADD"],
    order: 2,
  },
  {
    title: "Workshops",
    issuer: "",
    items: [
      "Assembly of Mercedes Engine by Elan and Nvision at IIT Hyderabad",
      "Intelligent Robotics and Machine Vision Technology in Current Scenario by ISTE STTP",
    ],
    order: 3,
  },
];

const achievements = [
  { text: "Spot on the Team Award from Tata Consultancy Services", order: 1 },
  { text: "Superstar Performance Award from Amazon India", order: 2 },
  { text: "Pat on the Back Award from Conformis India LLP", order: 3 },
  {
    text: 'Paper presentation at ICAMER 2019 on "Experimental and Microstructural Analysis of TIG and MIG Welding on Dissimilar Steels", organized by NIT Warangal',
    order: 4,
  },
  {
    text: 'Paper presentation at SV National Institute of Technology, Surat on "Experimental and Microstructural Investigation of Different Welding Processes on Dissimilar Steels"',
    order: 5,
  },
  { text: 'Paper presentation on "Nanotechnology" at Technomist 2017', order: 6 },
  { text: "Participated in the CADD Competition organized by Vasavi College", order: 7 },
  { text: 'Participated in the Group Discussion organized by "Technomist"', order: 8 },
  { text: "Participated in a one-week Special Camp by NSS", order: 9 },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Skill.deleteMany({}),
    Project.deleteMany({}),
    Publication.deleteMany({}),
    Certification.deleteMany({}),
    Achievement.deleteMany({}),
  ]);

  await Experience.insertMany(experiences);
  await Education.insertMany(education);
  await Skill.insertMany(skills);
  await Project.insertMany(projects);
  await Publication.insertMany(publications);
  await Certification.insertMany(certifications);
  await Achievement.insertMany(achievements);

  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await Admin.findOneAndUpdate(
      { email: adminEmail },
      { email: adminEmail, passwordHash },
      { upsert: true, new: true }
    );
    console.log(`Admin user ready: ${adminEmail}`);
  } else {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set - skipping admin user creation");
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
