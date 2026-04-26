"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") ||
      "light") as Theme;
    setTheme(current);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={isDark ? "Switch to light" : "Switch to dark"}
      className="theme-rocker"
      suppressHydrationWarning
    >
      <span className="theme-rocker__plate" aria-hidden>
        <span className="theme-rocker__screw theme-rocker__screw--top" />
        <span className="theme-rocker__screw theme-rocker__screw--bottom" />

        <span className="theme-rocker__well">
          <span className="theme-rocker__label theme-rocker__label--top">
            {/* moon */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>
          <span className="theme-rocker__label theme-rocker__label--bottom">
            {/* sun */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </span>

          <span
            className="theme-rocker__knob"
            data-position={mounted ? (isDark ? "top" : "bottom") : "bottom"}
          >
            <span className="theme-rocker__knob-grip" />
            <span className="theme-rocker__knob-grip" />
            <span className="theme-rocker__knob-grip" />
          </span>
        </span>
      </span>
    </button>
  );
}
