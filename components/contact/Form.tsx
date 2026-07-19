"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Send } from "lucide-react";

export default function Form() {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(
      `Thanks ${formData.name || "there"}! Your message has been received.`,
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {submitMessage}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
            placeholder="Your name"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label
        className={`block space-y-2 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
      >
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
          placeholder="Tell us how we can help..."
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}
