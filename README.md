# Abu Sufyan Malik — Portfolio (MERN)

A full-stack portfolio site. Content (experience, education, skills, projects, publications,
certifications, achievements) is stored in MongoDB and rendered dynamically. Projects, skills, and
experience can be added, edited, or removed from a password-protected `/admin` dashboard without
touching code or redeploying. The contact form on the public site emails submissions straight to
malikabusufyan@gmail.com and also stores them for the admin to review.

## Stack
- **Client**: React (Vite), React Router, Tailwind CSS, Axios, Motion (animations)
- **Server**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Auth**: JWT + bcrypt (single admin account)
- **Mail**: Resend (HTTP email API — see note below on why not raw SMTP)
- **Image hosting**: Cloudinary (logo uploads from the admin dashboard)

## Project structure
```
server/
  server.js              Express app entry
  src/
    config/db.js          Mongoose connection
    models/                Experience, Education, Skill, Project, Publication,
                            Certification, Achievement, ContactMessage, Admin
    middleware/auth.js     JWT verification
    routes/                auth, contact, messages, and generic CRUD routers
    utils/mailer.js        Nodemailer wrapper
    seed/seed.js            CV content + admin user seeding script
client/
  src/
    api/client.js           Axios instance (attaches JWT if present)
    context/AuthContext.jsx Admin auth state
    components/             Public site building blocks
    pages/Home.jsx           Public single-page site
    admin/                   Login, layout, dashboard, CRUD screens, messages inbox
```
