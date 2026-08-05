import { useState } from "react";
import SectionHeading from "../SectionHeading";
import api from "../../api/client";

const INITIAL = { name: "", email: "", subject: "", message: "" };

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
        <SectionHeading eyebrow="Let's Talk" title="Get In Touch" />
        <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
          Have a role, project, or question in mind? Send a message and I'll get back to you by email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject (optional)"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Your message"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none ring-indigo-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
              Thanks — your message has been sent. I'll be in touch soon!
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
              Something went wrong sending your message. Please try again in a moment.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
