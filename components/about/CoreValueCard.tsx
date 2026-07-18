"use client";

import { useTheme } from "@/context/ThemeContext";

type CoreValueCardProps = {
  title: string;
  text: string;
  featured: boolean;
};

export default function CoreValueCard({
  title,
  text,
  featured,
}: CoreValueCardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-full lg:max-w-[320px] h-full rounded-3xl border 
        px-6 py-8 md:px-6 md:pt-6 md:pb-10 flex flex-col flex-wrap ${
          featured
            ? "border-neutral-200 bg-emerald-600 text-white"
            : isDark
              ? "bg-slate-900/70 border-slate-700 text-slate-200"
              : "bg-white border-neutral-200 text-neutral-800"
        }`}
    >
      <h3
        className={`mb-4 font-bold text-xl md:text-[20px] ${
          featured
            ? "text-white"
            : isDark
              ? "text-slate-100"
              : "text-primary-800"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-[13px] leading-6 font-normal px-4 text-justify ${
          featured
            ? "text-white"
            : isDark
              ? "text-slate-400"
              : "text-neutral-500"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
