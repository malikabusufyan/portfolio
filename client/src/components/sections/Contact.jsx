import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import api from "../../api/client";

const INITIAL = { name: "", email: "", subject: "", message: "" };

const fieldClass =
  "w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 transition focus:ring-2 dark:border-gray-700 dark:bg-gray-950/60 dark:text-white";

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Let's Talk" title="Get In Touch" />
          <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
            Have a role, project, or question in mind? Send a message and I'll get back to you by email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={fieldClass}
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                className={fieldClass}
              />
            </div>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject (optional)"
              className={fieldClass}
            />
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your message"
              className={fieldClass}
            />

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm font-medium text-green-600 dark:text-green-400"
                >
                  Thanks — your message has been sent. I'll be in touch soon!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm font-medium text-red-600 dark:text-red-400"
                >
                  Something went wrong sending your message. Please try again in a moment.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
