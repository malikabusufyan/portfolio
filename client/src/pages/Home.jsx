import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Publications from "../components/sections/Publications";
import CertsAchievements from "../components/sections/CertsAchievements";
import Contact from "../components/sections/Contact";

const EMPTY = {
  experience: [],
  education: [],
  skills: [],
  projects: [],
  publications: [],
  certifications: [],
  achievements: [],
};

export default function Home() {
  const [data, setData] = useState(EMPTY);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [experience, education, skills, projects, publications, certifications, achievements] =
          await Promise.all([
            api.get("/experience"),
            api.get("/education"),
            api.get("/skills"),
            api.get("/projects"),
            api.get("/publications"),
            api.get("/certifications"),
            api.get("/achievements"),
          ]);

        if (cancelled) return;
        setData({
          experience: experience.data,
          education: education.data,
          skills: skills.data,
          projects: projects.data,
          publications: publications.data,
          certifications: certifications.data,
          achievements: achievements.data,
        });
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <Hero />
      <About />

      {status === "loading" && (
        <p className="py-20 text-center text-gray-500 dark:text-gray-400">Loading portfolio content…</p>
      )}

      {status === "error" && (
        <p className="py-20 text-center text-red-600 dark:text-red-400">
          Couldn&apos;t reach the API. Make sure the server is running.
        </p>
      )}

      {status === "ready" && (
        <>
          <Experience items={data.experience} />
          <Education items={data.education} />
          <Skills items={data.skills} />
          <Projects items={data.projects} />
          <Publications items={data.publications} />
          <CertsAchievements certifications={data.certifications} achievements={data.achievements} />
        </>
      )}

      <Contact />
      <Footer />
    </div>
  );
}
