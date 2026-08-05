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
- **Mail**: Nodemailer via Gmail SMTP (App Password)
- **Image hosting**: Cloudinary (logo uploads from the admin dashboard)

## 1. Create a MongoDB Atlas database
1. Sign up / log in at https://cloud.mongodb.com and create a free (M0) cluster.
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add your current IP (or `0.0.0.0/0` for development).
4. Click **Connect → Drivers**, copy the connection string — it looks like:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`
   Add a database name before the `?`, e.g. `.../portfolio?retryWrites=true...`.

## 2. Create a Gmail App Password (for the contact form)
1. On the Google Account used to receive messages (malikabusufyan@gmail.com), turn on
   **2-Step Verification**: https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords, create an app password (name it e.g. "Portfolio"),
   and copy the 16-character password it generates. This — not your normal Gmail password — is what
   goes in `GMAIL_APP_PASSWORD`.

## 3. Create a Cloudinary account (for logo uploads in the admin dashboard)
1. Sign up free at https://cloudinary.com.
2. On the Dashboard home page, copy your **Cloud name**, **API Key**, and **API Secret**.
3. These go in `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## 4. Configure environment variables
```
cd server
cp .env.example .env
# fill in MONGODB_URI, JWT_SECRET (any long random string), ADMIN_EMAIL, ADMIN_PASSWORD,
# GMAIL_USER, GMAIL_APP_PASSWORD, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

cd ../client
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api for local dev
```

## 5. Install, seed, and run
```
# Server
cd server
npm install
npm run seed      # loads CV content into Atlas and creates the admin user
npm run dev        # http://localhost:5000

# Client (separate terminal)
cd client
npm install
npm run dev        # http://localhost:5173
```

Visit `http://localhost:5173` for the public site and `http://localhost:5173/admin/login` to sign in
with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `server/.env`.

## Editing content after launch
- **Projects, Skills, Experience, Education**: use the admin dashboard — no redeploy needed, changes
  are live immediately. Experience and Education logos have a real upload button (stored on
  Cloudinary); paste a URL only if you'd rather link an existing image.
- **Publications, Certifications, Achievements**: currently seeded from `server/src/seed/seed.js`.
  They're served from the same database/API as everything else, so admin screens for them can be added
  later using the same `ResourceManager` pattern (see `client/src/admin/components/ResourceManager.jsx`),
  or edited directly in Atlas.
- **Contact messages**: view, mark read, or delete from `/admin/messages`.

## Deployment
- **API → Render**: `render.yaml` at the repo root describes a web service rooted at `server/`. Push
  the repo, create a new Blueprint on Render pointing at it, and fill in the env vars marked
  `sync: false` in the Render dashboard.
- **Client → Vercel/Netlify**: point either at the `client/` directory, build command `npm run build`,
  output directory `dist`. Set `VITE_API_URL` to your deployed API's URL (e.g.
  `https://portfolio-api.onrender.com/api`).
- Update `CLIENT_URL` in the server's env vars to your deployed client URL so CORS allows it.

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
