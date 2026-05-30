"use client";
import { useEffect } from "react";

/**
 * Finds every `<pre>` rendered inside `.prose` (rehype-pretty-code
 * emits `pre[data-language]` for fenced blocks, untagged fences get
 * a plain `<pre>`) and appends a copy-to-clipboard button. Idempotent —
 * skips blocks that already have a button.
 */
export function CopyCodeButtons() {
  useEffect(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;
    const blocks = prose.querySelectorAll("pre");
    blocks.forEach((pre) => {
      if (pre.querySelector(".copy-code-btn")) return;
      const code = pre.querySelector("code");
      if (!code) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-code-btn";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.textContent ?? "");
          btn.textContent = "Copied";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 1200);
        } catch {
          btn.textContent = "Failed";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 1200);
        }
      });
      // <pre> needs position:relative for the absolute button — set
      // here rather than mutating the rule in globals.css.
      const style = (pre as HTMLElement).style;
      if (!style.position) style.position = "relative";
      pre.appendChild(btn);
    });
  }, []);
  return null;
}
